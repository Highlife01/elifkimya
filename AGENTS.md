# AGENTS.md — Elif Kimya Geliştirici & Otonom Ajan Operasyon Kuralları

Bu proje üzerinde çalışan tüm yapay zeka ajanları ve geliştiriciler aşağıdaki kurallara kesin olarak uymalıdır:

1. **Çoklu Site Veri İzolasyonu (`elifkimya` Veritabanı):**
   - Firebase Projesi: `advera-c8dd0`
   - Firestore Veritabanı ID: `elifkimya` (`getFirestore(app, 'elifkimya')`)
   - Firebase Hosting Sitesi: `elifkimya` (`https://elifkimya.web.app`)
   - Cloud Storage Klasör Öneki: `elifkimya/`
   - Asla `(default)` Firestore veritabanına veri yazmayın veya diğer sitelerin koleksiyonlarına müdahale etmeyin.

2. **Veri Bütünlüğü ve Gerçeklik Kuralları:**
   - Sahte müşteri, talep, ürün stoğu, satış, referans veya grafik oluşturmayın.
   - `localStorage` veya `sessionStorage` içinde iş verisi saklamayın; tüm kalıcı verileri `elifkimya` Firestore veritabanında saklayın.
   - Başarı mesajlarını (`showNotification` / `showToast`) yalnızca sunucu işlemi doğrulandığında gösterin.
   - Bilinmeyen ürün özelliklerini, sertifikaları veya kimyasal güvenlik (SDS/GBF) bilgilerini tahmin ederek üretmeyin.
   - Doğrulanmış yoğunluk ($\text{g/cm}^3$) olmadan `kg` ile `litre` arasında dönüşüm yapmayın (`convertMassVolumeUnit`).
   - Su analizi doğrulanmadan su arıtma projelerinde kesin kapasite veya dozaj garantisi üretmeyin (`approveWaterProjectTechnical`).
   - Müşteriye gönderilen teklif kopyalarında (`portalShares`) ve A4 PDF çıktılarında iç maliyet (`unitCost`, `totalCost`, `grossProfit`, `profitMarginPercent`, `internalAdminNotes`) verilerini kesinlikle gizleyin.

3. **Güvenli Kodlama (Zero XSS):**
   - `.innerHTML`, `.outerHTML`, `insertAdjacentHTML`, `eval()` ve yerel `alert()` / `confirm()` / `prompt()` kullanmayın.
   - Tüm DOM güncellemelerinde `src/utils/security.js` içindeki `renderSafeHtml()`, `escapeHtml()` ve `escapeAttr()` fonksiyonlarını kullanın.

4. **Detaylı Strateji ve Mimari:**
   - Kurumsal B2B büyüme, Çukurova Mega Sanayi Satış Playbook'u ve SEO/GEO detayları için [AJANS.md](file:///d:/WEB%20S%C4%B0TELER%C4%B0/elifkimya/AJANS.md) ve [README.md](file:///d:/WEB%20S%C4%B0TELER%C4%B0/elifkimya/README.md) dosyalarını inceleyin.
