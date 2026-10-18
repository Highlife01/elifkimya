/**
 * Elif Kimya - Yapay Zeka Görünürlüğü (GEO) & Teknik Bilgi Kütüphanesi
 * Arama motorları ve LLM / Generative Engine modelleri için yapılandırılmış,
 * kaynaklandırılmış, mühendislik tabanlı soru-cevap matrisi.
 */

export const geoFaqList = [
  {
    id: 'sogutma-kulesi-kimyasallari-nelerdir',
    question: 'Soğutma kulesinde hangi kimyasal kullanılır?',
    category: 'Soğutma Kuleleri',
    shortAnswer: 'Soğutma kulelerinde temel olarak üç ana grup şartlandırma kimyasalı kullanılır: Korozyon inhibitörleri, kireç/kışır önleyiciler (antiskalantlar) ve biyositler (mikrobiyolojik kontrol).',
    detailedAnswer: `Açık evaporatif soğutma kulelerinde suyun buharlaşması neticesinde mineral konsantrasyonu hızla yükselir. Bu durum sistemde kışır (kireç), korozyon ve mikrobiyolojik üremeye (biyofilm & Lejyonella) yol açar. Bu riskleri engellemek için şu kimyasal program uygulanır:
1. **Korozyon İnhibitörleri:** Karbon çeliği, bakır ve pirinç alaşımları üzerinde koruyucu moleküler film tabakası oluşturan fosfonat, çinko, polimer veya molibdat bazlı kimyasallar.
2. **Kireç ve Kışır Önleyiciler (Antiskalantlar):** Kalsiyum karbonat ve sülfat çökelmesini engelleyen poliakrilik asit (PAA), fosfinokarboksilik asit (PCA) türevleri.
3. **Biyositler & Dezenfektanlar:** Biyolojik yosunlaşmayı ve ölümcül Legionella pneumophila bakterisini kontrol altında tutan oksitleyici (sodyum hipoklorit, klor dioksit, BCDMH) ve oksitleyici olmayan (izotiazolinon, glutaraldehit, DBNPA) ürünler.
4. **Biyodispersantlar:** Isı transfer yüzeylerindeki silt ve çamur birikimini dağıtan yüzey aktif kimyasallar.

*Önemli Mühendislik Notu:* Tek bir kimyasal tüm kulelere uygulanamaz; besleme suyunun sertlik, iletkenlik, klorür ve sülfat değerlerine göre LSI (Langelier Doygunluk İndeksi) hesaplanarak özel formülasyon seçilmelidir.`,
    tags: ['Soğutma Kulesi', 'Korozyon', 'Antiskalant', 'Legionella', 'Biyosit']
  },
  {
    id: 'korozyon-inhibitoru-nasil-secilir',
    question: 'Korozyon inhibitörü nasıl seçilir?',
    category: 'Korozyon Kontrolü',
    shortAnswer: 'Korozyon inhibitörü seçimi; sistemdeki metalurjik yapıya (karbon çelik, bakır, alüminyum), suyun kimyasal karakteristiğine (pH, klorür, sülfat, iletkenlik) ve çalışma sıcaklığına göre belirlenir.',
    detailedAnswer: `Doğru bir korozyon önleyici programı kurgularken 4 kritik parametre analiz edilmelidir:
1. **Metalurjik Envanter:** Sisteminizde sadece karbon çelik boru mu var, yoksa chiller demetlerinde bakır alaşımları veya galvanizli saclar mevcut mu? Sarı metaller için özel 'azol' bazlı (Toliltriazol / Benzotriazol) inhibitörler programa dahil edilmelidir.
2. **Suyun Agresiflik İndeksi:** Düşük kalsiyum sertliği ve düşük alkaliniteye sahip sular agresif ve korozyon yapıcıdır. Suyun Larson-Skold ve Langelier indeksleri incelenerek anodik, katodik veya film yapıcı organik inhibitör karışımı belirlenir.
3. **Klorür ve Sülfat Seviyeleri:** Yüksek klorür (>200 ppm Cl⁻), paslanmaz çelik ve karbon çelikte noktasal çukurlaşma (pitting) korozyonuna neden olur; bu durumda çukurlaşmayı bloke eden güçlü pasivasyon ajanları gerekir.
4. **Çevre ve Deşarj Limitleri:** Çevre mevzuatına göre ağır metal (çinko/kromat) kısıtlaması olan OSB’lerde tamamen organik, çevre dostu polimerik fosfonat inhibitörler tercih edilmelidir.`,
    tags: ['Korozyon İnhibitörü', 'Metalurji', 'Larson-Skold', 'Pitting Korozyonu', 'Fosfonat']
  },
  {
    id: 'sogutma-kulesinde-biyosit-neden-gereklidir',
    question: 'Soğutma kulesinde biyosit neden gereklidir?',
    category: 'Mikrobiyolojik Kontrol',
    shortAnswer: 'Biyositler; kule suyundaki 25°C-45°C sıcaklık ve güneş ışığı ortamında hızla çoğalan alg, bakteri ve ölümcül Legionella bakterisini yok etmek, ısı yalıtkanı olan biyofilmi parçalamak için zorunludur.',
    detailedAnswer: `Soğutma kuleleri açık havayla temas ettiği için atmosferdeki toz, polen ve mikroorganizmaları sürekli bünyesine çeker. Ilık su ve organik besinler mikrobiyal patlamaya zemin hazırlar:
- **Biyofilm Tabakası ve Isı Kaybı:** Bakterilerin oluşturduğu sümüksü biyofilm tabakasının ısı iletim katsayısı, kireç taşından 4 kat daha düşüktür. 1 mm'lik biyofilm chiller kompresör enerji tüketimini %10-15 artırır.
- **Biyolojik Korozyon (MIC):** Sülfat indirgeyen bakteriler (SRB), metal yüzeyinde anaerobik korozyon çukurları açarak boruların kısa sürede delinmesine yol açar.
- **Halk Sağlığı ve Legionella Riski:** Soğutma kulelerinin yaydığı aerosol damlacıklar Lejyoner Hastalığına yol açar. Sağlık Bakanlığı ve uluslararası standartlar gereğince kulelerde rutin biyosit şartlandırması ve Lejyonella analizi yasal zorunluluktur.

*Tavsiye:* Bakterilerin bağışıklık kazanmasını önlemek için bir oksitleyici biyosit ile bir oksitleyici olmayan biyositin dönüşümlü (rotasyonel) dozajlanması önerilir.`,
    tags: ['Biyosit', 'Legionella', 'Biyofilm', 'MIC Korozyonu', 'Sağlık Bakanlığı Standartları']
  },
  {
    id: 'fabrikalarda-saf-su-sistemi-nasil-secilir',
    question: 'Fabrikalarda saf su sistemi nasıl seçilir?',
    category: 'Saf Su Sistemleri',
    shortAnswer: 'Saf su sistemi seçimi; ham suyun analizine, günlük su tüketim debisine ve üretilen ürünün gerektirdiği iletkenlik/saflık standardına (Tip I, II veya III) göre belirlenir.',
    detailedAnswer: `Endüstriyel saf su yatırımı yaparken aşağıdaki mühendislik adımları izlenmelidir:
1. **Hedeflenen Su Kalite Standardı:**
   - **Genel Proses ve Kazan Besleme:** İletkenlik < 5 µS/cm (Standart Çift Kademeli RO veya RO + Miks Yatak Reçine yeterlidir).
   - **İlaç, Kozmetik ve Analitik Laboratuvar:** ASTM D1193 Tip II (İletkenlik < 1 µS/cm, TOC < 50 ppb).
   - **Kritik Elektronik, Çip ve Yarı İletken Üretimi:** ASTM Tip I Ultra Saf Su (18.2 MΩ·cm direnç, TOC < 5 ppb).
2. **Ham Su Kalitesi ve Ön Arıtma:** Kuyu suyunun SDI (Silt Yoğunluk İndeksi), sertlik, demir ve silika miktarı belirlenmeden saf su tasarımı yapılamaz. Yetersiz ön arıtma, pahalı membranların 3 ay içinde tıkanmasına yol açar.
3. **EDI (Elektro-deiyonizasyon) ve Reçine Seçimi:** Kesintisiz operasyon isteyen ve asit/kostik rejenerasyon atığı istemeyen tesislerde RO sonrası EDI modülleri tercih edilmelidir.
4. **Dağıtım Döngüsü (Loop):** Saf su depolandığında havadaki CO₂ gazını emerek hızla iletkenliği bozulur. Dağıtım hattında 316L paslanmaz çelik veya PVDF borulama, UV sterilizasyon ve sürekli sirkülasyon döngüsü kurulmalıdır.`,
    tags: ['Saf Su', 'EDI', 'Ters Ozmoz', 'ASTM Tip I', 'İletkenlik', 'MΩ·cm']
  },
  {
    id: 'reverse-osmosis-ile-deiyonize-su-farki',
    question: 'Reverse Osmosis ile deiyonize su arasındaki fark nedir?',
    category: 'Mühendislik Karşılaştırması',
    shortAnswer: 'Reverse Osmosis mekanik bir membran filtrasyonudur ve sudaki mineralleri %98-99.5 oranında filtreler; Deiyonizasyon ise iyon değiştirici reçinelerle sudaki iyonların tamamını (%99.99) tutarak sıfır iletkenlik sağlar.',
    detailedAnswer: `Her iki teknoloji de endüstride su saflaştırmada kullanılır ancak çalışma prensipleri ve elde edilen su parametreleri farklıdır:

| Kriter | Reverse Osmosis (RO) | Deiyonizasyon (DI / Reçine) |
| :--- | :--- | :--- |
| **Çalışma İlkesi** | Yarı geçirgen membran üzerinden yüksek basınçla ayrıştırma | İyon değiştirici katyonik/anyonik reçineler veya EDI |
| **Giderim Kabiliyeti** | Çözünmüş mineraller (%98-99.5), bakteri, virüs ve partiküller | Yalnızca çözünmüş elektriksel iyonlar (katyon & anyonlar) |
| **Çıkış İletkenliği** | 5 – 25 µS/cm (giriş suyuna bağlı) | < 0.1 µS/cm (18.2 MΩ·cm'ye kadar) |
| **Organik/Mikroorganizma** | Bakteri ve virüsleri tamamen tutar | Bakterileri tutmaz, hatta reçinede bakteri üreyebilir |
| **İşletme Mantığı** | Sürekli atık su (konsantre hat) üretir, kimyasal tüketmez | Atık su azdır ancak reçineler asit/kostik ile rejenere edilir |

*Endüstriyel Altın Standart:* En verimli ve düşük maliyetli yöntem, önce suyu RO sisteminden geçirip mineral yükünün %99'unu almak, ardından son saflaştırma için suyu Deiyonizasyon (veya EDI) kolonuna vermektir.`,
    tags: ['Reverse Osmosis', 'Deiyonizasyon', 'İyon Değişimi', 'EDI', 'Mühendislik Karşılaştırması']
  },
  {
    id: 'kazan-suyunda-kireclenme-nasil-onlenir',
    question: 'Kazan suyunda kireçlenme nasıl önlenir?',
    category: 'Kazan Suyu Şartlandırma',
    shortAnswer: 'Kazan suyunda kireçlenme; besi suyunu yumuşatma sisteminden geçirerek sertliği sıfırlamak, kazan içine polimerik antiskalantlar dozlamak ve düzenli dip/yüzey blöfü yapmakla önlenir.',
    detailedAnswer: `Buhar kazanlarında su buharlaşırken kalsiyum ve magnezyum tuzları çözünürlük sınırını aşarak kazan boruları üzerine yapışır ve kireç (kışır) tabakası oluşturur. Sadece 1 mm kireç tabakası kazan yakıt tüketimini %5 artırır ve boru patlamalarına neden olur.

**Önleme Adımları:**
1. **Harici Şartlandırma (Ön Arıtma):** Kazan besi suyu mutlaka otomatik iyon değiştirici su yumuşatma sisteminden geçmeli ve kazan giriş suyu sertliği 0.1 °Fr (Fransız Sertliği) altında olmalıdır.
2. **Dahili Şartlandırma (Kimyasal Dozajı):**
   - **Fosfat Şartlandırması:** Olası sertlik kaçaklarında kalsiyumu boruya yapışmayan hidroksiapatit çamuruna dönüştürür.
   - **Sentetik Polimerler (Dispersantlar):** Oluşan çökeltileri askıda tutarak blöfle kolayca atılmasını sağlar.
   - **Alkalinite Kontrolü:** pH'ı 10.5 - 11.5 aralığında tutarak koruyucu manyetit tabakasını muhafaza eder.
3. **Otomatik Blöf Sistemi:** Kazan suyundaki TDS (Toplam Çözünmüş Madde) seviyesini iletkenlik probuyla ölçerek aşırı mineral birikimini otomatik blöf valfi ile sistemden tahliye etmek şarttır.`,
    tags: ['Buhar Kazanı', 'Kireçlenme', 'Besi Suyu', 'Blöf', 'Yakıt Tasarrufu', 'Fosfat']
  },
  {
    id: 'endustriyel-su-aritma-sistemi-fiyatini-belirleyen-faktorler',
    question: 'Endüstriyel su arıtma sistemi fiyatını hangi faktörler belirler?',
    category: 'Maliyet & Projelendirme',
    shortAnswer: 'Sistem fiyatını; ham suyun laboratuvar analiz değerleri (kuyu/şebeke/deniz), saatlik ve günlük su ihtiyacı debisi (m³/h), istenen çıkış suyu saflığı ve kullanılan ekipman/otomasyon kalitesi belirler.',
    detailedAnswer: `Endüstriyel su arıtma sistemlerinde sabit bir liste fiyatı yerine her tesise özel mühendislik projesi çıkarılır. Maliyeti etkileyen 5 ana faktör şunlardır:
1. **Ham Suyun Giriş Kalitesi (TDS & Kirleticiler):** 500 ppm TDS'li bir şebeke suyunu arıtmak standart bir RO ile çözülürken; 4.000 ppm TDS'li acı kuyu suyu veya deniz suyu yüksek basınçlı pompalar, özel membranlar ve korozyona dayanıklı dubleks paslanmaz borulama gerektirir.
2. **Kapasite ve Debi (m³/saat):** Saatte 1 m³ su üreten kompakt bir ünite ile saatte 50 m³ su üreten endüstriyel tesisin şasi, pompa, membran adedi ve vana çapları katlanarak artar.
3. **Geri Kazanım (Recovery) Oranı:** Atık su miktarını minimuma indirmek (%80-85 geri kazanım) için kademeli enerji geri kazanım cihazları (Energy Recovery Devices) ve antiskalant dozaj hassasiyeti gerekir.
4. **Otomasyon ve Malzeme Standartları:** Manuel vanalı standart bir sistem ile Siemens PLC kontrollü, SCADA uyumlu, pnömatik vanalı, paslanmaz çelik borulu endüstriyel sistemler arasında yatırım maliyeti farkı oluşur.
5. **İşletme ve Kimyasal Tüketim Maliyeti:** Doğru projelendirilmiş kaliteli bir ön arıtma, ilk yatırımda bir miktar yüksek görünse de yıllık membran değişim ve elektrik faturasında %30'a varan tasarruf sağlar.`,
    tags: ['Su Arıtma Fiyatı', 'Ters Ozmoz Maliyeti', 'Kapasite m3/h', 'SCADA', 'İşletme Maliyeti']
  }
];
