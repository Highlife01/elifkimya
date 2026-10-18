/**
 * Elif Kimya - Güvenlik, XSS Koruması, Dosya Doğrulama ve Kriptografik Yardımcılar
 *
 * Bu modül:
 * - Tüm dinamik verileri HTML/Attribute bağlamında güvenli şekilde encode eder (escapeHtml / escapeAttr).
 * - innerHTML kullanmadan DOMParser + güvenli düğüm denetimi ve replaceChildren() ile DOM'a bağlar.
 * - Dosya yüklemelerinde uzantı, MIME türü, boyut (maks. 10 MB) ve Magic Bytes (PDF/PNG/JPEG/WebP) kontrolü yapar.
 * - Müşteri portalı paylaşımlarında iç maliyet, kâr marjı ve yönetici notlarını sunucuya yazmadan önce temizler.
 */

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

/**
 * Kullanıcı veya veritabanı kaynaklı metinleri XSS'e karşı güvenli hale getirir.
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (ch) => HTML_ESCAPE_MAP[ch] || ch);
}

/**
 * HTML öznitelik (attribute) değerlerini güvenli hale getirir.
 */
export function escapeAttr(value) {
  return escapeHtml(value);
}

const FORBIDDEN_TAGS = new Set(['SCRIPT', 'IFRAME', 'OBJECT', 'EMBED', 'APPLET', 'BASE', 'META']);

/**
 * DOM düğüm ağacındaki tehlikeli etiket ve öznitelikleri temizler.
 */
function sanitizeDomTree(rootNode) {
  const elements = rootNode.querySelectorAll ? Array.from(rootNode.querySelectorAll('*')) : [];
  for (const el of elements) {
    if (FORBIDDEN_TAGS.has(el.tagName)) {
      el.remove();
      continue;
    }
    const attrs = Array.from(el.attributes || []);
    for (const attr of attrs) {
      const name = attr.name.toLowerCase();
      const val = (attr.value || '').trim().toLowerCase();
      if (name.startsWith('on')) {
        el.removeAttribute(attr.name);
      } else if ((name === 'href' || name === 'src' || name === 'action') && (val.startsWith('javascript:') || val.startsWith('vbscript:') || val.startsWith('data:text/html'))) {
        el.removeAttribute(attr.name);
      }
    }
  }
}

/**
 * innerHTML kullanmadan, DOMParser ve replaceChildren() ile güvenli DOM render işlemi.
 */
export function renderSafeHtml(container, markupString) {
  if (!container) return;
  const parser = new DOMParser();
  const doc = parser.parseFromString(String(markupString || ''), 'text/html');
  sanitizeDomTree(doc.body);
  const nodes = Array.from(doc.body.childNodes);
  container.replaceChildren(...nodes);
}

/**
 * Kriptografik olarak tahmin edilemez güvenli paylaşım anahtarı üretir (48 karakter hex).
 */
export function generateSecureToken(byteLength = 24) {
  const bytes = new Uint8Array(byteLength);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * E-posta ve telefon gibi PII verilerini genel listelerde maskelemek için yardımcı.
 */
export function maskEmail(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) return '—';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0] || '*'}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

/**
 * Yüklenen dosyanın uzantısını, MIME türünü, boyutunu ve Magic Bytes başlığını doğrular.
 * TODO(security): Üretim ortamında Cloud Functions üzerinde antivirüs/CDR taraması entegre edilmelidir.
 */
export async function validateAndPrepareUpload(file, options = {}) {
  const maxBytes = options.maxBytes || 10 * 1024 * 1024; // Varsayılan 10 MB
  const allowedTypes = options.allowedTypes || ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
  const allowedExts = options.allowedExts || ['pdf', 'png', 'jpg', 'jpeg', 'webp'];

  if (!file || typeof file.size !== 'number') {
    throw new Error('Geçerli bir dosya seçilmedi.');
  }
  if (file.size <= 0) {
    throw new Error('Boş dosya yüklenemez.');
  }
  if (file.size > maxBytes) {
    throw new Error(`Dosya boyutu çok büyük. Maksimum izin verilen boyut: ${(maxBytes / (1024 * 1024)).toFixed(0)} MB.`);
  }

  // Dosya adından yalnızca güvenli uzantıyı al (Path traversal engeli)
  const rawName = String(file.name || 'belge').replace(/^.*[\\/]/, '');
  const extMatch = rawName.toLowerCase().match(/\.([a-z0-9]+)$/);
  const ext = extMatch ? extMatch[1] : '';

  if (!allowedExts.includes(ext) || !allowedTypes.includes(file.type)) {
    throw new Error(`İzin verilmeyen dosya türü. Yalnızca şu formatlar kabul edilir: ${allowedExts.join(', ').toUpperCase()}`);
  }

  // Magic Bytes kontrolü
  const headerBuffer = await file.slice(0, 12).arrayBuffer();
  const bytes = new Uint8Array(headerBuffer);

  const isPdf = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46; // %PDF
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47; // .PNG
  const isJpeg = bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF; // JPEG
  const isWebp =
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50; // RIFF....WEBP

  if (ext === 'pdf' && !isPdf) {
    throw new Error('Dosya içeriği geçerli bir PDF başlığı (%PDF) taşımıyor.');
  }
  if (ext === 'png' && !isPng) {
    throw new Error('Dosya içeriği geçerli bir PNG başlığı taşımıyor.');
  }
  if ((ext === 'jpg' || ext === 'jpeg') && !isJpeg) {
    throw new Error('Dosya içeriği geçerli bir JPEG başlığı taşımıyor.');
  }
  if (ext === 'webp' && !isWebp) {
    throw new Error('Dosya içeriği geçerli bir WebP başlığı taşımıyor.');
  }

  const randomId = generateSecureToken(16);
  const safeOriginalName = rawName.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);

  return {
    safeStorageFileName: `${randomId}.${ext}`,
    safeOriginalName,
    mimeType: file.type,
    size: file.size,
    extension: ext
  };
}

export function optStr(val) {
  if (val === null || val === undefined) return null;
  const trimmed = String(val).trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Müşteri portalına yazılacak veriden tüm iç maliyet, kâr marjı, alış fiyatı ve yönetici notlarını arındırır.
 */
export function buildSanitizedPortalShare({ proposal, orderSummary = null, serviceSummary = [] }) {
  const sanitizedItems = Array.isArray(proposal.items)
    ? proposal.items.map((item) => ({
        code: String(item.code || ''),
        description: String(item.description || ''),
        itemType: String(item.itemType || 'chemical'),
        quantity: Number(item.quantity) || 0,
        unit: String(item.unit || 'kg'),
        unitPrice: Number(item.unitPrice) || 0,
        discountPercent: Number(item.discountPercent) || 0,
        vatRate: Number(item.vatRate ?? 20),
        lineNetExclVat: Number(item.lineNetExclVat) || 0
      }))
    : [];

  return {
    active: true,
    proposalId: optStr(proposal.id),
    proposalNo: String(proposal.proposalNo || 'EK-TEKLIF'),
    revisionNo: Number(proposal.revisionNo || 1),
    status: String(proposal.status || 'sent'),
    customerId: optStr(proposal.customerId),
    customerUid: optStr(proposal.customerUid),
    companyName: String(proposal.customerName || proposal.companyName || 'Müşteri'),
    customerName: String(proposal.customerName || proposal.companyName || 'Müşteri'),
    contactName: optStr(proposal.contactName),
    customerEmail: optStr(proposal.customerEmail),
    currency: String(proposal.currency || 'TRY'),
    items: sanitizedItems,
    shippingPrice: Number(proposal.shippingPrice || 0),
    installationPrice: Number(proposal.installationPrice || 0),
    commissioningPrice: Number(proposal.commissioningPrice || 0),
    subtotalExclVat: Number(proposal.subtotalExclVat || 0),
    discountTotal: Number(proposal.discountTotal || 0),
    netExclVat: Number(proposal.netExclVat || 0),
    vatTotal: Number(proposal.vatTotal || 0),
    grandTotal: Number(proposal.grandTotal || 0),
    validityDays: Number(proposal.validityDays || 15),
    validUntil: optStr(proposal.validUntil),
    deliveryTerms: optStr(proposal.deliveryTerms),
    paymentTerms: optStr(proposal.paymentTerms),
    scopeAndExclusions: optStr(proposal.scopeAndExclusions),
    orderSummary: orderSummary
      ? {
          orderNo: String(orderSummary.orderNo || ''),
          fulfillmentStatus: String(orderSummary.fulfillmentStatus || ''),
          paymentStatus: String(orderSummary.paymentStatus || ''),
          grandTotal: Number(orderSummary.grandTotal || 0),
          paidAmount: Number(orderSummary.paidAmount || 0),
          currency: String(orderSummary.currency || 'TRY'),
          shippingInfo: orderSummary.shippingInfo || null,
          updatedAt: String(orderSummary.updatedAt || '')
        }
      : null,
    serviceSummary: Array.isArray(serviceSummary)
      ? serviceSummary.map((srv) => ({
          serviceNo: String(srv.serviceNo || ''),
          systemName: String(srv.systemName || ''),
          recordType: String(srv.recordType || ''),
          status: String(srv.status || ''),
          nextPlannedDate: String(srv.nextPlannedDate || ''),
          assignedTechnician: String(srv.assignedTechnician || '')
        }))
      : [],
    expiresAt: proposal.validUntil || new Date(Date.now() + 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  };
}
