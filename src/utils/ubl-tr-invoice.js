/**
 * GİB UBL-TR 2.1 (CustomizationID: TR1.2) E-Fatura / E-Arşiv / İhracat XML Üreticisi.
 * Özel entegratörlere (Uyumsoft, QNB eFinans, Foriba/Sovos, EDM, İzibiz, Logo, Mikro, Paraşüt)
 * veya GİB portalına doğrudan XML olarak içe aktarılabilecek standart yapıyı üretir.
 * İç maliyet alanları hiçbir zaman XML'e dahil edilmez.
 */

import { isValidEInvoiceNumber } from './tax-rules.js';

function xmlEscape(val) {
  return String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const UNIT_CODE_MAP = {
  adet: 'C62',
  kg: 'KGM',
  lt: 'LTR',
  litre: 'LTR',
  ton: 'TNE',
  ibc: 'C62',
  bidon: 'C62',
  torba: 'C62',
  set: 'SET',
  saat: 'HUR',
  ay: 'MON'
};

export function resolveUblUnitCode(unit = 'Adet') {
  const key = String(unit || 'Adet').trim().toLowerCase();
  return UNIT_CODE_MAP[key] || 'C62';
}

export function resolveProfileId(docCategory = 'E-FATURA') {
  const cat = String(docCategory || 'E-FATURA').toUpperCase();
  if (cat.includes('ARSIV')) return 'EARSIVFATURA';
  if (cat.includes('IHRACAT')) return 'IHRACAT';
  return 'TICARIFATURA';
}

export function resolveInvoiceTypeCode(inv = {}) {
  if (inv.invoiceType === 'IADE') return 'IADE';
  if (inv.withholdingRate && inv.withholdingRate !== 'Yok' && Number(inv.withholdingAmount || 0) > 0) {
    return 'TEVKIFAT';
  }
  if (Number(inv.vatRate || 0) === 0 && Number(inv.vatAmount || 0) === 0) {
    return 'ISTISNA';
  }
  return 'SATIS';
}

export function buildUblTrInvoiceXml(inv = {}, generalSettings = {}) {
  const currency = String(inv.currency || 'TRY').toUpperCase();
  const exchangeRate = Number(inv.exchangeRate || 1);
  const issueDate = String(inv.issueDate || new Date().toISOString().slice(0, 10)).slice(0, 10);
  const issueTime = '10:00:00';
  const invoiceNo = String(inv.invoiceNo || '').trim();
  const profileId = resolveProfileId(inv.docCategory);
  const invoiceTypeCode = resolveInvoiceTypeCode(inv);

  if (String(inv.docCategory || '').toUpperCase() === 'PROFORMA') {
    throw new Error('Proforma fatura vergi belgesi değildir; GİB e-fatura XML dosyası üretilemez.');
  }
  if (inv.invoiceType === 'ALIS') {
    throw new Error('Alış faturaları tedarikçi tarafından düzenlenir; XML yalnızca kestiğimiz faturalar için üretilir.');
  }
  if (!isValidEInvoiceNumber(invoiceNo, issueDate)) {
    throw new Error('Fatura numarası GİB biçiminde değil (3 harf/rakam seri + yıl + 9 haneli sıra, örn. ELF2026000000001).');
  }

  // Satıcı bilgileri ayarlardan gelir; eksikse sahte değer üretilmez.
  const supplierVkn = String(generalSettings.taxNumber || '').replace(/\D/g, '');
  if (supplierVkn.length !== 10) {
    throw new Error('Satıcı VKN (10 hane) tanımlı değil. Sistem Ayarları > Kurumsal İletişim bölümünden vergi kimlik numarasını girin.');
  }
  const supplierTaxOffice = String(generalSettings.taxOffice || '').trim();
  if (!supplierTaxOffice) throw new Error('Satıcı vergi dairesi tanımlı değil. Sistem Ayarları bölümünden girin.');
  const supplierName = generalSettings.companyName || 'ELİF ÇEVRE KİMYA SANAYİ VE TİCARET';
  const supplierAddress = generalSettings.address || 'Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana';
  const supplierPhone = generalSettings.phone || '0546 499 23 42';
  const supplierEmail = generalSettings.email || 'info@elifcevrekimya.com.tr';

  const customerName = inv.companyName || inv.partyName || 'Muhtelif Müşteri';
  const customerVknRaw = String(inv.taxNumber || '').replace(/\D/g, '');
  const isEArsiv = profileId === 'EARSIVFATURA';
  if (!customerVknRaw && !isEArsiv) {
    throw new Error('Alıcının VKN/TCKN bilgisi zorunludur (e-arşiv dışındaki faturalarda).');
  }
  // Kimliği bilinmeyen e-arşiv alıcısı için GİB'in öngördüğü 11 haneli sabit değer kullanılır.
  const customerVkn = customerVknRaw || '11111111111';
  const customerSchemeId = customerVkn.length === 11 ? 'TCKN' : 'VKN';
  const customerTaxOffice = inv.taxOffice || '';
  const customerEmail = inv.contactEmail || '';

  const rawLines = Array.isArray(inv.lines) && inv.lines.length > 0
    ? inv.lines
    : [{
        description: inv.description || `${customerName} — Endüstriyel Kimyasal / Su Arıtma Sistemi`,
        unit: 'Adet',
        quantity: 1,
        unitPrice: Number(inv.subtotal || inv.netExclVat || 0),
        discountPercent: 0,
        discountAmount: Number(inv.discountTotal || 0),
        vatRate: Number(inv.vatRate ?? 20),
        net: Number(inv.netExclVat || 0),
        vatAmount: Number(inv.vatAmount || 0)
      }];

  const subtotal = Number(inv.subtotal || 0).toFixed(2);
  const discountTotal = Number(inv.discountTotal || 0).toFixed(2);
  const netExclVat = Number(inv.netExclVat || 0).toFixed(2);
  const vatAmount = Number(inv.vatAmount || 0).toFixed(2);
  const withholdingAmount = Number(inv.withholdingAmount || 0).toFixed(2);
  const payableVat = Number(inv.payableVat ?? (Number(inv.vatAmount || 0) - Number(inv.withholdingAmount || 0))).toFixed(2);
  const taxInclusiveAmount = (Number(inv.netExclVat || 0) + Number(inv.vatAmount || 0)).toFixed(2);
  const grandTotal = Number(inv.grandTotal || 0).toFixed(2);

  const linesXml = rawLines.map((line, idx) => {
    const qty = Number(line.quantity || 1);
    const unitCode = resolveUblUnitCode(line.unit);
    const unitPrice = Number(line.unitPrice || 0).toFixed(2);
    const lineNet = Number(line.net ?? (qty * Number(line.unitPrice || 0) - Number(line.discountAmount || 0))).toFixed(2);
    const lineDiscount = Number(line.discountAmount || 0).toFixed(2);
    const lineVatRate = Number(line.vatRate ?? inv.vatRate ?? 20);
    const lineVatAmount = Number(line.vatAmount ?? ((Number(lineNet) * lineVatRate) / 100)).toFixed(2);

    return `  <cac:InvoiceLine>
    <cbc:ID>${idx + 1}</cbc:ID>
    <cbc:InvoicedQuantity unitCode="${xmlEscape(unitCode)}">${qty}</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="${xmlEscape(currency)}">${lineNet}</cbc:LineExtensionAmount>${Number(lineDiscount) > 0 ? `
    <cac:AllowanceCharge>
      <cbc:ChargeIndicator>false</cbc:ChargeIndicator>
      <cbc:Amount currencyID="${xmlEscape(currency)}">${lineDiscount}</cbc:Amount>
    </cac:AllowanceCharge>` : ''}
    <cac:TaxTotal>
      <cbc:TaxAmount currencyID="${xmlEscape(currency)}">${lineVatAmount}</cbc:TaxAmount>
      <cac:TaxSubtotal>
        <cbc:TaxableAmount currencyID="${xmlEscape(currency)}">${lineNet}</cbc:TaxableAmount>
        <cbc:TaxAmount currencyID="${xmlEscape(currency)}">${lineVatAmount}</cbc:TaxAmount>
        <cbc:Percent>${lineVatRate}</cbc:Percent>
        <cac:TaxCategory>${lineVatRate === 0 && String(inv.vatExemptionCode || '').trim() ? `
          <cbc:TaxExemptionReasonCode>${xmlEscape(String(inv.vatExemptionCode).trim())}</cbc:TaxExemptionReasonCode>` : ''}
          <cac:TaxScheme>
            <cbc:Name>KDV</cbc:Name>
            <cbc:TaxTypeCode>0015</cbc:TaxTypeCode>
          </cac:TaxScheme>
        </cac:TaxCategory>
      </cac:TaxSubtotal>
    </cac:TaxTotal>
    <cac:Item>
      <cbc:Name>${xmlEscape(line.description)}</cbc:Name>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="${xmlEscape(currency)}">${unitPrice}</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>`;
  }).join('\n');

  const exemptionCode = String(inv.vatExemptionCode || '').trim();
  const exemptionXml = (rate) => (Number(rate) === 0 && exemptionCode ? `
          <cbc:TaxExemptionReasonCode>${xmlEscape(exemptionCode)}</cbc:TaxExemptionReasonCode>` : '');

  // KDV oranı bazında ayrı TaxSubtotal (karışık oranlı faturalar için)
  const vatGroups = new Map();
  rawLines.forEach((line) => {
    const qty = Number(line.quantity || 1);
    const lineNet = Number(line.net ?? (qty * Number(line.unitPrice || 0) - Number(line.discountAmount || 0)));
    const rate = Number(line.vatRate ?? inv.vatRate ?? 20);
    const lineVat = Number(line.vatAmount ?? ((lineNet * rate) / 100));
    const group = vatGroups.get(rate) || { taxable: 0, tax: 0 };
    group.taxable += lineNet;
    group.tax += lineVat;
    vatGroups.set(rate, group);
  });
  const vatSubtotalsXml = Array.from(vatGroups.entries()).map(([rate, group]) => `
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="${xmlEscape(currency)}">${group.taxable.toFixed(2)}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="${xmlEscape(currency)}">${group.tax.toFixed(2)}</cbc:TaxAmount>
      <cbc:Percent>${rate}</cbc:Percent>
      <cac:TaxCategory>${exemptionXml(rate)}
        <cac:TaxScheme>
          <cbc:Name>KDV</cbc:Name>
          <cbc:TaxTypeCode>0015</cbc:TaxTypeCode>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>`).join('');

  const withholdingCode = String(inv.withholdingCode || '').trim();
  const withholdingXml = Number(withholdingAmount) > 0 ? `
  <cac:WithholdingTaxTotal>
    <cbc:TaxAmount currencyID="${xmlEscape(currency)}">${withholdingAmount}</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="${xmlEscape(currency)}">${vatAmount}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="${xmlEscape(currency)}">${withholdingAmount}</cbc:TaxAmount>
      <cbc:Percent>${Number(inv.withholdingNumerator || 0) * 10}</cbc:Percent>
      <cac:TaxCategory>
        <cac:TaxScheme>
          <cbc:Name>KDV TEVKIFATI (${xmlEscape(inv.withholdingRate || '')})</cbc:Name>
          <cbc:TaxTypeCode>${xmlEscape(withholdingCode)}</cbc:TaxTypeCode>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:WithholdingTaxTotal>` : '';

  const exchangeRateXml = currency !== 'TRY' ? `
  <cac:PricingExchangeRate>
    <cbc:SourceCurrencyCode>${xmlEscape(currency)}</cbc:SourceCurrencyCode>
    <cbc:TargetCurrencyCode>TRY</cbc:TargetCurrencyCode>
    <cbc:CalculationRate>${exchangeRate.toFixed(4)}</cbc:CalculationRate>
    <cbc:Date>${xmlEscape(issueDate)}</cbc:Date>
  </cac:PricingExchangeRate>` : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>TR1.2</cbc:CustomizationID>
  <cbc:ProfileID>${xmlEscape(profileId)}</cbc:ProfileID>
  <cbc:ID>${xmlEscape(invoiceNo)}</cbc:ID>
  <cbc:CopyIndicator>false</cbc:CopyIndicator>
  <cbc:IssueDate>${xmlEscape(issueDate)}</cbc:IssueDate>
  <cbc:IssueTime>${issueTime}</cbc:IssueTime>
  <cbc:InvoiceTypeCode>${xmlEscape(invoiceTypeCode)}</cbc:InvoiceTypeCode>
  <cbc:Note>${xmlEscape(inv.description || `${customerName} Faturası`)}</cbc:Note>
  <cbc:Note>Ödeme Durumu: ${xmlEscape(inv.paymentStatus || 'Ödeme Bekliyor')} | Vade: ${xmlEscape(inv.dueDate || issueDate)} | Net Ödenecek KDV: ${payableVat} ${xmlEscape(currency)}</cbc:Note>
  <cbc:DocumentCurrencyCode>${xmlEscape(currency)}</cbc:DocumentCurrencyCode>
  <cbc:LineCountNumeric>${rawLines.length}</cbc:LineCountNumeric>${exchangeRateXml}
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cbc:WebsiteURI>https://www.elifcevrekimya.com.tr</cbc:WebsiteURI>
      <cac:PartyIdentification>
        <cbc:ID schemeID="VKN">${xmlEscape(supplierVkn)}</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName>
        <cbc:Name>${xmlEscape(supplierName)}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${xmlEscape(supplierAddress)}</cbc:StreetName>
        <cbc:CitySubdivisionName>Seyhan</cbc:CitySubdivisionName>
        <cbc:CityName>Adana</cbc:CityName>
        <cac:Country>
          <cbc:Name>Türkiye</cbc:Name>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cac:TaxScheme>
          <cbc:Name>${xmlEscape(supplierTaxOffice)}</cbc:Name>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:Contact>
        <cbc:Telephone>${xmlEscape(supplierPhone)}</cbc:Telephone>
        <cbc:ElectronicMail>${xmlEscape(supplierEmail)}</cbc:ElectronicMail>
      </cac:Contact>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyIdentification>
        <cbc:ID schemeID="${customerSchemeId}">${xmlEscape(customerVkn)}</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName>
        <cbc:Name>${xmlEscape(customerName)}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:CityName>Türkiye</cbc:CityName>
        <cac:Country>
          <cbc:Name>Türkiye</cbc:Name>
        </cac:Country>
      </cac:PostalAddress>${customerTaxOffice ? `
      <cac:PartyTaxScheme>
        <cac:TaxScheme>
          <cbc:Name>${xmlEscape(customerTaxOffice)}</cbc:Name>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>` : ''}${customerEmail ? `
      <cac:Contact>
        <cbc:ElectronicMail>${xmlEscape(customerEmail)}</cbc:ElectronicMail>
      </cac:Contact>` : ''}
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="${xmlEscape(currency)}">${vatAmount}</cbc:TaxAmount>${vatSubtotalsXml}
  </cac:TaxTotal>${withholdingXml}
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="${xmlEscape(currency)}">${subtotal}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="${xmlEscape(currency)}">${netExclVat}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="${xmlEscape(currency)}">${taxInclusiveAmount}</cbc:TaxInclusiveAmount>
    <cbc:AllowanceTotalAmount currencyID="${xmlEscape(currency)}">${discountTotal}</cbc:AllowanceTotalAmount>
    <cbc:PayableAmount currencyID="${xmlEscape(currency)}">${grandTotal}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
${linesXml}
</Invoice>
`;
}

export function downloadUblTrInvoiceXml(inv = {}, generalSettings = {}) {
  const xml = buildUblTrInvoiceXml(inv, generalSettings);
  const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeNo = String(inv.invoiceNo || 'EFATURA').replace(/[^A-Za-z0-9_-]/g, '_');
  a.href = url;
  a.download = `${safeNo}_UBL_TR21.xml`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
