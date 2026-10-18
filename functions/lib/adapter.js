import { safeRequest } from './net-guard.js';
import { getPath } from './mapping.js';

/**
 * Sağlayıcıdan bağımsız REST adaptörü. Hangi muhasebe programı seçilirse seçilsin,
 * uç noktalar ve alan eşlemeleri ayar belgesinden gelir; gizli anahtar yalnızca sunucu ortamından okunur.
 */

export function redactSecrets(text, secrets) {
  let output = String(text ?? '');
  for (const secret of secrets) {
    if (secret && secret.length >= 4) output = output.split(secret).join('***');
  }
  return output;
}

function buildAuthHeaders(config, secrets) {
  const { apiKey, apiSecret } = secrets;
  if (!apiKey) throw new Error('API anahtarı sunucuda tanımlı değil (ACCOUNTING_API_KEY).');
  if (config.authType === 'bearer') return { Authorization: `Bearer ${apiKey}` };
  if (config.authType === 'header') return { [config.authHeaderName]: apiKey };
  if (!apiSecret) throw new Error('Basic kimlik doğrulama için ACCOUNTING_API_SECRET sunucuda tanımlı değil.');
  return { Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}` };
}

export function createAdapter(config, secrets, { allowLocalForTests = false, requestFn = safeRequest } = {}) {
  const secretValues = [secrets.apiKey, secrets.apiSecret];

  async function call(endpointKey, { query = {}, body, pathParams = {}, useUpdatePath = false, idempotencyKey } = {}) {
    const endpoint = config.endpoints[endpointKey];
    if (!endpoint) throw new Error(`"${endpointKey}" uç noktası ayarlanmamış.`);
    const templatePath = useUpdatePath && endpoint.updatePath ? endpoint.updatePath : endpoint.path;
    const path = templatePath.replace(/\{(\w+)\}/g, (_match, name) => {
      const value = pathParams[name];
      if (value === undefined || value === null || String(value) === '') throw new Error(`Yol parametresi eksik: ${name}`);
      return encodeURIComponent(String(value));
    });
    const url = new URL(`${config.baseUrl}${path}`);
    for (const [name, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(name, String(value));
    }

    const headers = {
      Accept: 'application/json',
      ...buildAuthHeaders(config, secrets),
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {})
    };

    let response;
    try {
      response = await requestFn({ url, method: useUpdatePath ? 'PUT' : endpoint.method, headers, body, allowLocalForTests });
    } catch (error) {
      throw new Error(`Muhasebe API'sine ulaşılamadı: ${redactSecrets(error.message, secretValues)}`);
    }

    if (response.status < 200 || response.status >= 300) {
      const detail = redactSecrets(response.text, secretValues).replace(/\s+/g, ' ').slice(0, 300);
      throw new Error(`Muhasebe API'si ${response.status} döndürdü${detail ? `: ${detail}` : '.'}`);
    }
    if (!response.text.trim()) return { status: response.status, data: null };
    try {
      return { status: response.status, data: JSON.parse(response.text) };
    } catch {
      throw new Error('Muhasebe API yanıtı geçerli JSON değil.');
    }
  }

  return {
    call,
    extractList(endpointKey, data) {
      const listPath = config.endpoints[endpointKey]?.listPath ?? '';
      const list = listPath ? getPath(data, listPath) : data;
      return Array.isArray(list) ? list : [];
    }
  };
}
