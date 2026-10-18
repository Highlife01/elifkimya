import dns from 'node:dns';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';

/** Dış API çağrıları için SSRF korumalı, yönlendirme izlemeyen, boyut ve süre sınırlı HTTP istemcisi. */

export function isPrivateAddress(address) {
  if (net.isIPv4(address)) {
    const [a, b] = address.split('.').map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224;
  }
  if (net.isIPv6(address)) {
    const lower = address.toLowerCase();
    if (lower === '::1' || lower === '::') return true;
    if (lower.startsWith('::ffff:')) return isPrivateAddress(lower.slice(7));
    return /^f[cd]/.test(lower) || /^fe[89ab]/.test(lower) || lower.startsWith('ff');
  }
  return true;
}

export function assertSafeBaseUrl(value, { allowLocalForTests = false } = {}) {
  let url;
  try {
    url = new URL(String(value));
  } catch {
    throw new Error('API adresi geçerli bir URL olmalıdır.');
  }
  const allowedProtocol = url.protocol === 'https:' || (allowLocalForTests && url.protocol === 'http:');
  if (!allowedProtocol) throw new Error('API adresi https:// ile başlamalıdır.');
  if (url.username || url.password) throw new Error('API adresinde kullanıcı adı/şifre bulunamaz.');
  if (url.search || url.hash) throw new Error('API adresi sorgu veya # içeremez.');
  const host = url.hostname.toLowerCase();
  if (!allowLocalForTests) {
    if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) {
      throw new Error('Yerel ağ adreslerine bağlanılamaz.');
    }
    if (net.isIP(host.replace(/^\[|\]$/g, '')) && isPrivateAddress(host.replace(/^\[|\]$/g, ''))) {
      throw new Error('Özel ağ IP adreslerine bağlanılamaz.');
    }
  }
  return url;
}

// DNS çözümü bağlantı anında doğrulanır; böylece DNS rebinding ile özel ağa yönlenilemez.
function guardedLookup(hostname, options, callback) {
  dns.lookup(hostname, { ...options, all: true }, (error, addresses) => {
    if (error) return callback(error);
    const blocked = addresses.find((entry) => isPrivateAddress(entry.address));
    if (blocked) return callback(new Error('Özel ağ adresine çözümlenen alan adı engellendi.'));
    if (options?.all) return callback(null, addresses);
    return callback(null, addresses[0].address, addresses[0].family);
  });
}

export function safeRequest({ url, method = 'GET', headers = {}, body, timeoutMs = 15000, maxBytes = 2 * 1024 * 1024, allowLocalForTests = false }) {
  const target = url instanceof URL ? url : new URL(url);
  const transport = target.protocol === 'https:' ? https : http;
  const payload = body === undefined ? undefined : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body));

  return new Promise((resolve, reject) => {
    const request = transport.request(target, {
      method,
      headers: { ...headers, ...(payload ? { 'Content-Length': payload.length } : {}) },
      timeout: timeoutMs,
      ...(allowLocalForTests ? {} : { lookup: guardedLookup })
    }, (response) => {
      const chunks = [];
      let size = 0;
      response.on('data', (chunk) => {
        size += chunk.length;
        if (size > maxBytes) {
          request.destroy(new Error('API yanıtı izin verilen boyutu aştı.'));
          return;
        }
        chunks.push(chunk);
      });
      response.on('end', () => {
        resolve({
          status: response.statusCode || 0,
          headers: response.headers,
          text: Buffer.concat(chunks).toString('utf8')
        });
      });
      response.on('error', reject);
    });
    request.on('timeout', () => request.destroy(new Error('API isteği zaman aşımına uğradı.')));
    request.on('error', reject);
    if (payload) request.write(payload);
    request.end();
  });
}
