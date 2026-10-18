/**
 * Türkiye vergi mevzuatı parametreleri ve fatura uygunluk kontrolleri.
 *
 * Dayanaklar (kontrol tarihi: 2026-10-19): 3065 sayılı KDV Kanunu ve Cumhurbaşkanı Kararları (oranlar),
 * KDV Genel Uygulama Tebliği I/C-2.1.3 (kısmi tevkifat), 213 sayılı VUK m.232 ve VUK Genel Tebliği Sıra No 588
 * (2026 fatura düzenleme sınırı), GİB UBL-TR fatura kimliği biçimi.
 * Yıllık/dönemsel değerler (limitler, oranlar) değişebilir; her yıl başında GİB duyuruları ve mali müşavirle doğrulanmalıdır.
 */

export const TAX_RULES_REVIEWED_AT = '2026-10-19';

// 10.07.2023'te genel oran %18'den %20'ye, indirimli oran %8'den %10'a çıkarıldı; %1 ve %0 değişmedi.
export const VAT_RATE_CHANGE_DATE = '2023-07-10';
const CURRENT_VAT_RATES = [0, 1, 10, 20];
const LEGACY_VAT_RATES = [0, 1, 8, 18];

export function allowedVatRates(issueDate) {
  const date = String(issueDate || '').slice(0, 10);
  return date && date < VAT_RATE_CHANGE_DATE ? LEGACY_VAT_RATES : CURRENT_VAT_RATES;
}

// VUK m.232 fatura düzenleme sınırı (KDV dahil). KDV tevkifatında alt sınır bu tutara endekslidir.
export const INVOICE_ISSUANCE_LIMITS = { 2025: 9900, 2026: 12000 };

export function invoiceIssuanceLimit(year) {
  return INVOICE_ISSUANCE_LIMITS[Number(year)] ?? null;
}

// Kısmi tevkifat payları (X/10) ve tam tevkifat (10/10).
export const WITHHOLDING_NUMERATORS = [2, 3, 4, 5, 7, 9, 10];

// KDVGUT I/C-2.1.3 kapsamındaki bilinen kısmi tevkifat kodları ve payları. Liste tam değildir;
// listede olmayan 3 haneli kodlar uyarıyla kabul edilir.
export const KNOWN_WITHHOLDING_CODES = {
  601: { numerator: 4, label: 'Yapım işleri ile mühendislik-mimarlık, etüt-proje hizmetleri' },
  602: { numerator: 9, label: 'Etüt, plan-proje, danışmanlık, denetim hizmetleri' },
  603: { numerator: 7, label: 'Makine, teçhizat, demirbaş ve taşıt tadil, bakım, onarım' },
  604: { numerator: 5, label: 'Yemek servis hizmeti' },
  605: { numerator: 5, label: 'Organizasyon hizmetleri' },
  606: { numerator: 9, label: 'İşgücü temin hizmetleri' },
  607: { numerator: 9, label: 'Özel güvenlik hizmeti' },
  608: { numerator: 9, label: 'Yapı denetim hizmetleri' },
  609: { numerator: 7, label: 'Fason tekstil ve konfeksiyon işleri' },
  610: { numerator: 9, label: 'Turistik mağazalara müşteri bulma/götürme hizmetleri' },
  611: { numerator: 9, label: 'Spor kulüplerinin yayın, reklam ve isim hakkı işlemleri' },
  612: { numerator: 9, label: 'Temizlik hizmeti' },
  613: { numerator: 9, label: 'Çevre ve bahçe bakım hizmetleri' },
  614: { numerator: 5, label: 'Servis taşımacılığı hizmeti' },
  615: { numerator: 7, label: 'Baskı ve basım hizmetleri' },
  616: { numerator: 5, label: 'Diğer hizmetler' },
  617: { numerator: 7, label: 'Hurda metalden elde edilen külçe teslimi' },
  618: { numerator: 7, label: 'Hurda dışı külçe teslimi (bakır, çinko, alüminyum, kurşun, demir-çelik)' },
  619: { numerator: 7, label: 'Bakır, çinko, alüminyum ve kurşun ürünlerinin teslimi' },
  620: { numerator: 7, label: 'Hurda ve atık teslimi' },
  624: { numerator: 2, label: 'Karayoluyla yük taşımacılığı hizmeti' },
  625: { numerator: 3, label: 'Ticari reklam hizmetleri' }
};

export const E_DOCUMENT_CATEGORIES = ['E-FATURA', 'E-ARSIV', 'IHRACAT'];

// GİB fatura kimliği: 3 harf/rakam seri + 4 haneli yıl + 9 haneli sıra numarası (toplam 16 karakter).
const E_INVOICE_NO_RE = /^[A-Za-z0-9]{3}\d{4}\d{9}$/;

export function isValidEInvoiceNumber(invoiceNo, issueDate) {
  const value = String(invoiceNo || '').trim();
  if (!E_INVOICE_NO_RE.test(value)) return false;
  const year = String(issueDate || '').slice(0, 4);
  return !year || value.slice(3, 7) === year;
}

export function nextInvoiceNumber({ series = 'ELF', year, lastNumber = '' }) {
  const prefix = `${String(series).toUpperCase().slice(0, 3)}${year}`;
  const last = String(lastNumber || '');
  const lastSequence = last.startsWith(prefix) && /^\d{9}$/.test(last.slice(prefix.length)) ? Number(last.slice(prefix.length)) : 0;
  return `${prefix}${String(lastSequence + 1).padStart(9, '0')}`;
}

export function invoiceSeriesFor(docCategory) {
  return String(docCategory || '').toUpperCase() === 'PROFORMA' ? 'PRF' : 'ELF';
}

const money = (value) => Number(Number(value || 0).toFixed(2));

/**
 * @param {object} invoice  ham fatura girdisi (invoiceType, docCategory, invoiceNo, issueDate, lines, vatRate, withholdingCode, vatExemptionCode)
 * @param {object} totals   computeInvoiceTotals çıktısı
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function validateInvoiceCompliance(invoice, totals) {
  const errors = [];
  const warnings = [];
  const invoiceType = String(invoice.invoiceType || 'SATIS').toUpperCase();
  const docCategory = String(invoice.docCategory || invoice.eDocumentType || 'E-FATURA').toUpperCase();
  const issueDate = String(invoice.issueDate || '').slice(0, 10);
  const issuedByUs = invoiceType === 'SATIS' || invoiceType === 'IADE';

  if (docCategory === 'PROFORMA') {
    warnings.push('Proforma fatura vergi belgesi değildir; KDV, cari ve ciro toplamlarına dahil edilmez.');
    return { errors, warnings };
  }

  const rates = totals.lines.length > 0 ? [...new Set(totals.lines.map((l) => l.vatRate))] : [totals.vatRate];
  const allowed = allowedVatRates(issueDate);
  for (const rate of rates) {
    if (!allowed.includes(Number(rate))) {
      errors.push(`%${rate} KDV oranı ${issueDate || 'bu tarih'} için geçerli değildir (geçerli oranlar: ${allowed.map((r) => `%${r}`).join(', ')}).`);
    }
  }

  const hasZeroVat = rates.some((rate) => Number(rate) === 0);
  if (docCategory === 'IHRACAT' && rates.some((rate) => Number(rate) !== 0)) {
    errors.push('İhracat faturalarında KDV oranı %0 olmalıdır (KDVK m.11 istisnası).');
  }
  if (issuedByUs && hasZeroVat && !/^\d{3}$/.test(String(invoice.vatExemptionCode || '').trim())) {
    errors.push('%0 KDV (istisna/ihracat) için 3 haneli KDV istisna kodu girilmelidir.');
  }

  if (issuedByUs && E_DOCUMENT_CATEGORIES.includes(docCategory) && invoice.invoiceNo) {
    if (!isValidEInvoiceNumber(invoice.invoiceNo, issueDate)) {
      errors.push('Fatura numarası GİB biçiminde olmalıdır: 3 harf/rakam seri + 4 haneli yıl + 9 haneli sıra (örn. ELF2026000000001) ve yıl fatura tarihiyle aynı olmalıdır.');
    }
  }
  if (!issuedByUs && !String(invoice.invoiceNo || '').trim()) {
    errors.push('Alış faturalarında tedarikçinin fatura numarası zorunludur.');
  }

  if (totals.withholdingNumerator > 0) {
    const numerator = totals.withholdingNumerator;
    const code = String(invoice.withholdingCode || '').trim();
    if (!WITHHOLDING_NUMERATORS.includes(numerator)) errors.push('KDV tevkifat oranı 2/10, 3/10, 4/10, 5/10, 7/10, 9/10 veya 10/10 olabilir.');
    if (!/^\d{3}$/.test(code)) {
      errors.push('KDV tevkifatı için 3 haneli tevkifat kodu (örn. 603) girilmelidir.');
    } else if (KNOWN_WITHHOLDING_CODES[code] && KNOWN_WITHHOLDING_CODES[code].numerator !== numerator) {
      errors.push(`${code} kodlu işlemde tevkifat oranı ${KNOWN_WITHHOLDING_CODES[code].numerator}/10 olmalıdır.`);
    } else if (!KNOWN_WITHHOLDING_CODES[code]) {
      warnings.push(`${code} tevkifat kodu uygulama içindeki listede yok; kod ve oranı GİB listesinden doğrulayın.`);
    }
    if (totals.vatAmount <= 0) errors.push('KDV tutarı olmayan faturada tevkifat uygulanamaz.');

    const limit = invoiceIssuanceLimit(issueDate.slice(0, 4));
    const grossTry = money((totals.netExclVat + totals.vatAmount) * totals.exchangeRate);
    if (limit !== null && grossTry <= limit) {
      warnings.push(`KDV dahil tutar (${grossTry.toLocaleString('tr-TR')} TL) ${issueDate.slice(0, 4)} yılı alt sınırını (${limit.toLocaleString('tr-TR')} TL) aşmıyor; bu tutarda kısmi tevkifat uygulanmaz.`);
    }
    warnings.push('Kısmi tevkifat yalnızca tebliğde sayılan işlem ve alıcılar için uygulanır; işlem türünü ve alıcıyı mali müşavirinizle doğrulayın.');
  }

  return { errors, warnings };
}
