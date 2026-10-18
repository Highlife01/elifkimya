# Muhasebe programı köprüsü (Cloud Functions)

Panel ile firmanın muhasebe programı arasında iki yönlü senkron. Tüm çağrılar sunucudan yapılır; API anahtarı tarayıcıya veya Firestore'a hiçbir zaman yazılmaz.

- Veritabanı: yalnızca `elifkimya` (Firebase projesi `advera-c8dd0`).
- `accountingSync` (callable, `europe-west1`): `status`, `test`, `pushInvoice`, `pullInvoices`, `pullCustomers`.
- `accountingAutoSync` (saat başı): ayarda `enabled` ve `autoSync` açıksa fatura ve carileri çeker.
- Yetki: `superadmin` ve `sales` işlem yapar, `viewer` yalnızca durum görür.

## Kurulum

```powershell
cd functions; npm install; cd ..
firebase functions:secrets:set ACCOUNTING_API_KEY
firebase functions:secrets:set ACCOUNTING_API_SECRET   # yalnızca Basic kimlik doğrulamada; aksi halde boş değer girin
firebase deploy --only functions,firestore:rules       # Blaze planı gerekir
```

Ardından Yönetim Paneli → Muhasebe → **6. Muhasebe API Entegrasyonu** sekmesinden (Süperadmin) API adresini, uç noktaları ve alan eşlemelerini girin; **Bağlantıyı Test Et** ile doğrulayın.

## Ayar belgesi (`siteSettings/accountingIntegration`)

Gizli bilgi içermez. Örnek:

```json
{
  "enabled": true,
  "baseUrl": "https://api.ornek-muhasebe.com/v1",
  "authType": "bearer",
  "endpoints": {
    "test": { "method": "GET", "path": "/ping" },
    "invoicePush": { "method": "POST", "path": "/invoices", "externalIdPath": "data.id", "updatePath": "/invoices/{id}" },
    "invoicePull": { "method": "GET", "path": "/invoices", "listPath": "data.items", "sinceParam": "updated_since", "pageParam": "page", "pageSizeParam": "limit", "pageSize": 100 },
    "customerPull": { "method": "GET", "path": "/customers", "listPath": "data" }
  },
  "outboundInvoiceMap": { "number": "invoiceNo", "customer.name": "partyName", "total": "grandTotal", "currency": "currency" },
  "outboundLinesPath": "items",
  "outboundLineMap": { "name": "description", "qty": "quantity", "price": "unitPrice" },
  "inboundInvoiceMap": { "externalId": "id", "invoiceNo": "number", "invoiceType": "type", "partyName": "customer.name", "grandTotal": "total", "vatAmount": "vat", "paidAmount": "paid", "currency": "currency", "dueDate": "due" },
  "inboundCustomerMap": { "externalId": "id", "companyName": "title", "taxNumber": "vkn" },
  "invoiceTypeValues": { "sales": "SATIS", "purchase": "ALIS" }
}
```

Bu örnek yalnızca biçimi gösterir; gerçek uç noktalar ve alan adları programın API dokümanına göre doldurulmalıdır.

## Güvenlik ve veri kuralları

- Yalnızca `https` adreslerine bağlanılır; özel ağ/yerel adresler, yönlendirmeler ve 2 MB üstü yanıtlar engellenir.
- Giden eşlemede iç maliyet alanları (`unitCost`, `totalCost`, `grossProfit`, `profitMarginPercent`, `internalAdminNotes`) tanımlanamaz.
- Başarı yalnızca karşı sistem 2xx döndürüp kayıt kimliği verdiğinde kaydedilir. Durum `accountingSyncState` koleksiyonunda tutulur; yalnızca Cloud Functions yazabilir.
- Çekilen faturalarda içerik yerelde kalır; mevcut faturalar için yalnızca ödeme/tahsilat durumu güncellenir. Çekilen cariler mevcut yerel alanları ezmez.
- `functions/lib/invoice-calc.js`, `src/utils/invoice-calc.js` ile aynı kalmalıdır (testle doğrulanır).

## Test

```powershell
npm test   # kök testler + functions/test
```

Testler sahte bir yerel HTTP sunucusuyla çalışır; gerçek bir muhasebe API'siyle uçtan uca doğrulama, program belirlenip anahtar tanımlandıktan sonra yapılmalıdır.
