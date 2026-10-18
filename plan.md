# Elif Kimya Premium B2B — Uygulama Planı

## Kapsam

Büyük hero alanına sahip, premium ve responsive Elif Kimya web sitesi tasarımı ile bunun eşleşen yönetim dashboard konsepti hazırlanacak. Bu teslimat bir tasarım/prototip paketidir; gerçek Firebase verisi için entegrasyon sınırları açık bırakılacak ve localStorage kullanılmayacaktır.

## Tasarım yönü

- **Design Movement:** Swiss International Style ile editorial industrial luxury birleşimi.
- **Core Principles:** Teknik güven, kontrollü boşluk, yüksek kontrastlı çağrı hiyerarşisi, veri odaklı operasyon.
- **Color Philosophy:** Lacivert derinlik ve güveni, kırık beyaz mühendislik dokümantasyonu hissini, turkuaz su/teknoloji akışını, amber ise ölçülü aksiyon ve uyarı vurgusunu taşır.
- **Layout Paradigm:** Sol hizalı editorial akış; hero içinde büyük tipografik blok ve sağda karanlık tesis görseli, devamında yatay kaydırmalı çözüm şeridi ve asimetrik içerik bölümleri.
- **Signature Elements:** İnce grid çizgileri, su akışını çağrıştıran turkuaz çizgisel motif, numaralı proses etiketleri.
- **Interaction Philosophy:** Ziyaretçi önce problemi seçer, sonra uygun çözüm ve teklif akışına girer. Admin kullanıcı önce iş yükünü ve öncelikli kayıtları görür.
- **Animation:** Hero görselinde yavaş ışık hareketi, kartlarda kısa yükselme, ekranlar arasında yumuşak fade; gösterişli ve dikkat dağıtan animasyon yok.
- **Typography System:** Başlıklarda Space Grotesk; gövde ve veri tablolarında Inter. Kısa, teknik, kanıtlanabilir metinler.
- **Brand Essence:** Fabrikaların su ve proses güvenilirliği için kimyasal ve sistem çözümlerini tek teknik partnerde birleştiren B2B çözüm sağlayıcı. Kişilik: güvenilir, mühendislik odaklı, rafine.
- **Brand Voice:** “Suyun kalitesi, prosesin güvenilirliğidir.” / “Sisteminizi analiz edelim, doğru çözümü birlikte kuralım.”
- **Wordmark & Logo:** E ve K harflerinin birleştiği, damla değil proses döngüsü hissi veren monogram; wordmark açık ve geniş harf aralıklı.
- **Signature Brand Color:** `#2DD4BF` — teknik turkuaz.

## Sayfa ve ekranlar

1. `/` — büyük hero, çözüm seçici, uygulama alanları, teknik güven, teklif CTA.
2. `/cozumler` — proses bazlı çözüm grupları.
3. `/uygulama-alanlari` — soğutma kuleleri, kazan suyu, RO/membran, atık su, saf su, proses kimyasalları.
4. `/teklif-al` — gerçek entegrasyona hazır teklif formu tasarımı.
5. `/iletisim` — iletişim formu ve WhatsApp.
6. `/admin` — dashboard özeti.
7. `/admin/teklifler`, `/admin/mesajlar`, `/admin/muhasebe`, `/admin/icerik`, `/admin/ayarlar` — yönetim ekranı örnekleri.

## Veri ve güvenlik sınırı

- localStorage, sahte KPI ve demo veriyi gerçek kayıt gibi gösteren akışlar yok.
- Tasarım ekranlarındaki tablolar “Gerçek Firestore bağlantısı bekleniyor” durumunu açık biçimde gösterebilir; bu paket veri yazmaz.
- Firebase Authentication, Firestore, Storage ve Security Rules gerçek uygulama entegrasyonunda bağlanacak.
- İletişim ve teklif kayıtları; KVKK onayı, zaman damgası, kaynak sayfa ve durum alanlarıyla saklanacak.
- WhatsApp tüm sayfalarda `https://wa.me/905464992342` bağlantısıyla görünür olacak.

## Uygulama ve build akışı

- Vite tabanlı tek sayfa frontend; sayfa durumları istemci tarafında yalnızca görünüm amacıyla değişir.
- `public/manus-routes.json` tüm görünür route’ları listeler.
- CSS ve komponentler ayrı dosyalarda tutulur; hero görseli `public/assets/` altında saklanır.
- Build komutu `npm run build`, çıktı `dist` olur.
- ZIP; kaynak kodu, asset’ler, README ve entegrasyon notlarıyla birlikte verilir.
- Yayına alma veya Firebase deploy işlemi bu teslimatta yapılmaz; mevcut Firebase hesabı oturum istediği için hedef projeye yazma işlemi kullanıcı erişimi sonrasında yapılır.
