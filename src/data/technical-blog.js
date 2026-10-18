/**
 * Elif Çevre Kimya — 20 Endüstriyel Su Şartlandırma, Arıtma, Proses ve Tedarik Mühendisliği Blog & Rehber Yazısı
 * Tüm içerikler AGENTS.md kurallarına uygundur:
 * - Su/brine/atıksu analizi ve saha doğrulaması olmadan sabit dozaj veya kapasite garantisi verilmez.
 * - Doğrulanmamış sertifika veya SDS tehlike sınıfı uydurulmaz.
 */

export const TECHNICAL_BLOG_CATEGORIES = [
  { id: 'all', label: 'Tüm Rehberler (20)' },
  { id: 'cooling_boiler', label: 'Soğutma, Kazan & Kapalı Devre (5)' },
  { id: 'ro_edi_pretreatment', label: 'RO, EDI & Ön Arıtma Sistemleri (5)' },
  { id: 'wastewater_polymers', label: 'Atıksu, Koagülant & Polimerler (5)' },
  { id: 'sector_geothermal_supply', label: 'Jeotermal, Sektörel Proses & Tedarik (5)' }
];

export const TECHNICAL_BLOG_POSTS = [
  {
    number: 1,
    slug: 'sogutma-kulesi-kirec-korozyon-biyolojik-kontrol',
    category: 'cooling_boiler',
    categoryLabel: 'Soğutma & Kazan Şartlandırma',
    title: 'Soğutma Kulesinde Kireç, Korozyon ve Biyolojik Kontrolü Tek Programda Değerlendirmek',
    seoTitle: 'Soğutma Kulesinde Kireç, Korozyon ve Biyolojik Kontrol | Elif Çevre Kimya',
    metaDescription: 'Soğutma kulesinde kireç, korozyon ve biyolojik oluşumları tek şartlandırma programında nasıl değerlendirebileceğinizi öğrenin.',
    keyword: 'soğutma kulesi kimyasal şartlandırma',
    keywords: [
      'soğutma kulesi kimyasal şartlandırma',
      'kule kireç ve korozyon inhibitörü',
      'PBTC polikarboksilat antiskalant',
      'soğutma kulesi biyosit programı',
      'LSI su analizi ve blöf kontrolü'
    ],
    readingTime: '6 dk okuma',
    summary: 'Açık devir daim soğutma kulelerinde kışır (kireç), metal kaybı ve biyofilm oluşumu birbirini tetikler. Analizden izlemeye bütüncül şartlandırma yaklaşımı.',
    sections: [
      {
        heading: 'Üç Risk Neden Birlikte Ele Alınmalı?',
        paragraphs: [
          'Açık devir daim soğutma kulesi devrelerinde kireçlenme (kışır), metal korozyonu ve mikrobiyolojik büyüme çoğu zaman birbirinden bağımsız ilerlemez. Isı transfer yüzeylerinde oluşan kalsiyum karbonat veya silikat tabakası yalnızca enerji tüketimini artırmakla kalmaz; aynı zamanda altında oksijensiz bölgeler oluşturarak lokal korozyonu (under-deposit corrosion) hızlandırabilir.',
          'Benzer şekilde, korozyon ürünleri suya demir oksit partikülleri taşıyarak çökelti yükünü artırır; biyofilm tabakası ise eşanjör borularını ve kule dolgularını kaplayarak hem ısı geçişini düşürür hem de inhibitörlerin metal yüzeyine ulaşmasını zorlaştırır. Bu nedenle yalnızca tek bir belirtiye göre ürün seçmek, sistemin gerçek çalışma koşullarını gözden kaçırabilir.'
        ]
      },
      {
        heading: 'Analizden İzlemeye Kontrollü Şartlandırma Programı',
        paragraphs: [
          'İlk mühendislik değerlendirmesinde besi (makyaj) suyunun ve kule havuz suyunun pH, iletkenlik, toplam sertlik, kalsiyum sertliği, M-alkalinite, klorür ve silis değerleri; ayrıca kule metalurjisi (karbon çelik, bakır, paslanmaz, galvaniz), konsantrasyon çevrim sayısı (CoC), blöf düzeni ve eşanjör cilt sıcaklıkları birlikte incelenmelidir.',
          'Elif Çevre Kimya’nın soğutma kulesi ürün grubunda korozyon inhibitörleri, PBTC ve polikarboksilat/terpolimer bazlı kireç önleyiciler, oksitleyici veya oksitleyici olmayan biyositler, biyodispersantlar ve pH düzenleyiciler ayrı işlevler için yapılandırılmıştır. Ancak bu çeşitlilik, her tesiste aynı reçetenin kullanılacağı anlamına gelmez. Program; analiz sonuçları, ekipman geçmişi ve saha ölçümleriyle doğrulanmalıdır. Su analizi görülmeden sabit dozaj veya kapasite garantisi verilmez.'
        ]
      },
      {
        heading: 'Blöf Otomasyonu ve Trend Takibinin Önemi',
        paragraphs: [
          'En doğru kimyasal seçilse bile kontrolsüz iletkenlik artışı veya düzensiz blöf, programın koruma sınırlarını aşabilir. İletkenlik kontrollü otomatik blöf vanası, oransal dozaj pompaları ve düzenli saha kayıtları sayesinde su kimyasındaki sapmalar eşanjör tıkanmadan önce tespit edilir.'
        ]
      }
    ],
    fieldChecklist: [
      'Besi suyu ve kule blöf suyunda pH, iletkenlik (µS/cm), sertlik ve M-alkalinite karşılaştırması',
      'Konsantrasyon çevrim sayısı (CoC) ve Langelier / Ryznar doygunluk eğiliminin takibi',
      'Sistemdeki metal türlerinin (karbon çelik, bakır alaşımı, galvaniz) doğrulanması',
      'Oksitleyici ve oksitleyici olmayan biyositlerin dönüşümlü uygulama ve temas süresi kaydı',
      'Korozyon kuponu veya demir/bakır taşınım trendlerinin periyodik kontrolü'
    ],
    ctaLabel: 'Soğutma Kulesi Kimyasalları Sayfasını İnceleyin',
    ctaLink: '/urunler/sogutma-kulesi-kimyasallari',
    secondaryLabel: 'Kule Su Analizi & Teklif Talep Edin',
    secondaryLink: '/teklif-al?type=water_audit&product=So%C4%9Futma%20Kulesi%20%C5%9Eartland%C4%B1rma%20Program%C4%B1',
    quoteProduct: 'Soğutma Kulesi Kimyasalları ve Şartlandırma Programı',
    imageAlt: 'Endüstriyel soğutma kulesinde su şartlandırma ve güvenli saha kontrolü.',
    imagePromptTr: '16:9 yatay, fotogerçekçi endüstriyel fotoğraf; modern bir soğutma kulesi su devresini kontrol eden, baretli ve koruyucu gözlüklü iki teknisyen, temiz ekipman ve düzenli boru hatları, güvenli çalışma koşulları, doğal endüstriyel aydınlatma, yazı veya logo olmasın.'
  },
  {
    number: 2,
    slug: 'buhar-kazaninda-cozulmus-oksijen-pitting-korozyonu',
    category: 'cooling_boiler',
    categoryLabel: 'Soğutma & Kazan Şartlandırma',
    title: 'Buhar Kazanında Çözünmüş Oksijen ve Pitting Korozyonu: Şartlandırma Yaklaşımı',
    seoTitle: 'Buhar Kazanında Çözünmüş Oksijen ve Pitting Korozyonu | Elif Çevre Kimya',
    metaDescription: 'Kazan besi suyundaki çözünmüş oksijenin pitting korozyonuyla ilişkisini ve kontrollü şartlandırma adımlarını keşfedin.',
    keyword: 'kazan suyu oksijen tutucu',
    keywords: [
      'kazan suyu oksijen tutucu',
      'buhar kazanı pitting korozyonu',
      'DEHA uçucu oksijen tutucu',
      'karbonhidrazid ve katalizli sodyum sülfit',
      'degazör besi suyu şartlandırma'
    ],
    readingTime: '6 dk okuma',
    summary: 'Besi suyunda taşınan çözünmüş oksijen, kazan borularında küçük fakat derin oyuklar (pitting) oluşturur. Mekanik deaerasyon ve kimyasal oksijen tutucu seçimi.',
    sections: [
      {
        heading: 'Çözünmüş Oksijen Neden Kritik Bir Delinme Riskidir?',
        paragraphs: [
          'Buhar kazanı besi suyunda taşınan çözünmüş oksijen, özellikle sıcak metal yüzeylerde küçük çaplı fakat derin çukurlar oluşturan oyuklanma (pitting) korozyonunun temel nedenlerinden biridir. Bu hasar, metal yüzeyinin tamamında homojen ilerlemek yerine dar bölgelerde yoğunlaşır; bu yüzden kazanın genel metal kalınlığı iyi görünse bile duman borularında, ekonomizerde veya besleme hattında ani delinmeler yaşanabilir.',
          'Sıcaklık yükseldikçe oksijenin korozif reaksiyon hızı artar. Sistemdeki hava sızıntıları, degazör sıcaklığının düşmesi, sık soğuk makyaj suyu girişi ve duruş-kalkış (standby) dönemlerinde ıslak/kuru koruma eksikliği riski büyüten başlıca işletme faktörleridir.'
        ]
      },
      {
        heading: 'Mekanik Deaerasyon ve Kimyasal Oksijen Tutucu Uyumu',
        paragraphs: [
          'Doğru şartlandırma yaklaşımının ilk adımı, degazör (termik deaeratör) çalışma sıcaklığını ve basıncını besi suyu analizleriyle birlikte okumaktır. Mekanik deaerasyon sonrası kalan eser miktardaki çözünmüş oksijeni bağlamak ve metal yüzeyinde koruyucu pasif magnetit (Fe₃O₄) tabakasını desteklemek için kimyasal oksijen tutucular devreye girer.',
          'Elif Çevre Kimya’nın kazan kimyasalları sayfasında DEHA (Dietilhidroksilamin), karbonhidrazid ve katalizli sodyum sülfit gibi oksijen tutucular yer alır. Uçucu organik oksijen tutucular (DEHA gibi) kazan suyuna ek iletkenlik yüklemeden buhar hattına da taşınabilirken; sülfit bazlı ürünler kazan basıncı, blöf rejimi ve buharın kullanım noktasına göre değerlendirilir.'
        ]
      },
      {
        heading: 'Şartlandırma Tek Başına Değil, Düzenli İzlemeyle Yürür',
        paragraphs: [
          'Uygun ürün; kazan çalışma basıncı, besi suyu sıcaklığı, kondens dönüş oranı, buharın prosesle doğrudan teması ve malzeme yapısına göre belirlenmelidir. pH, iletkenlik, toplam demir taşınımı ve oksijen tutucu bakiye ölçümleri düzenli kayıt altına alınmalıdır. Su analizi ve tesis işletme verileri incelenmeden sabit dozaj veya performans taahhüt edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Degazör kubbe sıcaklığı, çalışma basıncı ve havalık (vent) vanasının kontrolü',
      'Besi suyu tankı ve pompa emiş hatlarında hava sızıntısı / kavitasyon kontrolü',
      'Kazan çalışma basıncına ve buhar kullanım amacına göre uçucu (DEHA) veya inorganik oksijen tutucu seçimi',
      'Besi suyu ve kazan blöf suyunda pH, iletkenlik ve çözünmüş/toplam demir takibi',
      'Duruşta bekleyen kazanlar için ıslak veya kuru koruma prosedürünün tanımlanması'
    ],
    ctaLabel: 'Kazan Suyu Kimyasalları Sayfasını İnceleyin',
    ctaLink: '/urunler/kazan-suyu-kimyasallari',
    secondaryLabel: 'Kazan Besi Suyu Analizi & Teklif İste',
    secondaryLink: '/teklif-al?type=water_audit&product=Buhar%20Kazan%C4%B1%20Oksijen%20Tutucu%20ve%20%C5%9Eartland%C4%B1rma',
    quoteProduct: 'Buhar Kazanı Oksijen Tutucu ve Şartlandırma Kimyasalları',
    imageAlt: 'Buhar kazanı besi suyu hattında çözünmüş oksijen kontrolü yapan teknisyen.',
    imagePromptTr: '16:9 yatay, fotogerçekçi endüstriyel fotoğraf; paslanmaz borular ve buhar kazanı çevresinde taşınabilir su analiz cihazını inceleyen, baretli ve gözlüklü teknisyen, düzenli ve kuru kazan dairesi, güvenli çalışma koşulları, yazı veya logo olmasın.'
  },
  {
    number: 3,
    slug: 'kondens-donus-hatti-korozyon-geri-kazanim-suyu',
    category: 'cooling_boiler',
    categoryLabel: 'Soğutma & Kazan Şartlandırma',
    title: 'Kondens Dönüş Hattında Korozyon Nedenleri ve Geri Kazanım Suyunun Takibi',
    seoTitle: 'Kondens Dönüş Hattında Korozyon ve Geri Kazanım Suyu Kalitesi | Elif Çevre Kimya',
    metaDescription: 'Kondens hatlarında karbonik asit korozyonunun nedenlerini ve geri kazanım suyunun güvenilir takibi için temel ölçümleri öğrenin.',
    keyword: 'kondens hattı korozyon kontrolü',
    keywords: [
      'kondens hattı korozyon kontrolü',
      'karbonik asit korozyonu',
      'nötralize edici uçucu amin',
      'film yapıcı amin oktadesilamin',
      'kondens geri kazanım suyu analizi'
    ],
    readingTime: '6 dk okuma',
    summary: 'Buhar kazanına geri dönen kondens suyunda düşük pH ve demir taşınımı, hem boru hatlarını aşındırır hem de kazanda ikincil kışır/korozyon yaratır.',
    sections: [
      {
        heading: 'Karbonik Asit Korozyonu Nasıl Gelişir?',
        paragraphs: [
          'Kondens dönüş hattında gelişen korozyon yalnızca kazanın içinden değil, besi suyundaki bikarbonat/karbonat alkalinitesinin yüksek sıcaklıkta parçalanarak buharla birlikte karbondioksit (CO₂) taşımasından kaynaklanır. Buhar yoğuştuğunda CO₂ tekrar su fazına geçerek karbonik asit oluşturur ve kondens pH değerini hızla düşürür.',
          'Bu asidik ortam özellikle boru tabanında oluklanma (grooving), dişli bağlantı noktalarında incelme ve düşük akışlı ceplerde metal kaybı oluşturur. Hattaki korozyon sonucu suya karışan demir oksit (pas) partikülleri ise geri dönüş suyuyla kazana taşınarak sıcak kazan boruları üzerinde tehlikeli demir kışırı oluşturabilir.'
        ]
      },
      {
        heading: 'Geri Kazanım Suyunu Yalnızca Miktarıyla Değerlendirmeyin',
        paragraphs: [
          'Yüksek oranda kondens geri kazanımı enerji ve su tasarrufu açısından çok değerlidir; ancak dönen her suyun kazana doğrudan uygun olduğu varsayılmamalıdır. Proses eşanjörlerinden gelebilecek sertlik, yağ veya proses kimyasalı kaçakları ile hat korozyonundan kaynaklanan demir taşınımı düzenli izlenmelidir.',
          'Elif Çevre Kimya’nın kazan kimyasalları sayfasında kondens hatlarında karbonik asit korozyonuna yönelik nötralize edici uçucu aminler ve metal yüzeyinde hidrofobik bariyer oluşturan film yapıcı aminler (oktadesilamin bazlı) yer alır. Hangi yaklaşımın veya amin dağılım oranının (distribution ratio) seçileceği; hat uzunluğu, buhar basınç kademeleri, geri dönüş oranı ve analiz sonuçlarına bağlıdır.'
        ]
      },
      {
        heading: 'Sapma Anında Kök Neden İncelemesi',
        paragraphs: [
          'Kondens pH’ında veya iletkenliğinde ani bir değişim görüldüğünde, kaynağı bulmadan yalnızca kimyasal dozajını artırmak doğru değildir. Ön arıtmadaki alkalinite yükü, eşanjör sızdırmazlığı, kondenstop arızaları ve hava emiş noktaları birlikte kontrol edilmelidir. Kesin dozaj, su ve kondens analizi görülmeden garanti edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Farklı uzaklıktaki kondens dönüş kollektörlerinden soğutulmuş numune alınarak pH ve iletkenlik ölçümü',
      'Kondens suyunda toplam demir (Fe), sertlik kaçağı ve yağ/bulanıklık takibi',
      'Besi suyu M-alkalinitesinin kontrol edilerek buhara taşınan CO₂ potansiyelinin azaltılması',
      'Kısa ve uzun mesafeli hatlara uygun buhar-sıvı dağılım oranına sahip amin seçimi',
      'Kondenstopların ve vakum kırıcıların hava sızıntısına karşı periyodik bakımı'
    ],
    ctaLabel: 'Kazan & Kondens Kimyasallarını İnceleyin',
    ctaLink: '/urunler/kazan-suyu-kimyasallari',
    secondaryLabel: 'Kondens Hattı Etüdü & Teklif Alın',
    secondaryLink: '/teklif-al?type=water_audit&product=Kondens%20Hatt%C4%B1%20Koruyucu%20Amin%20Program%C4%B1',
    quoteProduct: 'Kondens Hattı Korozyon Önleyici Amin Programı',
    imageAlt: 'Kondens dönüş hattından alınan su numunesini analiz eden endüstriyel bakım teknisyeni.',
    imagePromptTr: '16:9 yatay, fotogerçekçi endüstriyel fotoğraf; buhar tesisindeki kondens dönüş borusundan güvenli biçimde numune alan, eldiven ve koruyucu gözlük kullanan teknisyen, paslanmaz numune kabı ve düzenli boru hattı, güvenli çalışma koşulları, yazı veya logo olmasın.'
  },
  {
    number: 4,
    slug: 'esanjor-hat-temizligi-birikinti-metal-uyumu',
    category: 'cooling_boiler',
    categoryLabel: 'Soğutma & Kazan Şartlandırma',
    title: 'Eşanjör ve Hat Temizliğinde Birikinti Türü, Metal Uyumu ve Kontrollü Plan',
    seoTitle: 'Eşanjör ve Hat Temizliğinde Birikinti ile Metal Uyumu | Elif Çevre Kimya',
    metaDescription: 'Eşanjör ve proses hatlarında temizlik öncesi birikinti türü, metal uyumu ve kontrollü uygulama planı neden önemlidir?',
    keyword: 'eşanjör kimyasal temizliği',
    keywords: [
      'eşanjör kimyasal temizliği',
      'inhibitörlü kireç ve kışır sökücü',
      'plakalı eşanjör temizlik kimyasalı',
      'demir oksit ve silika temizliği',
      'kimyasal sirkülasyon ve pasivasyon'
    ],
    readingTime: '6 dk okuma',
    summary: 'Eşanjörlerde ısı transferi düştüğünde körlemesine asit sirkülasyonu yapmak plakalara ve contalara zarar verebilir. Birikinti analizi ve metal uyumlu temizlik.',
    sections: [
      {
        heading: 'Birikintiyi Tanımadan Kimyasal Seçmeyin',
        paragraphs: [
          'Plakalı veya borulu eşanjörlerde basınç kaybı arttığında ya da ısı transfer yaklaşım sıcaklığı bozulduğunda sorun yalnızca kalsiyum karbonat kireci olmayabilir. Kalsiyum sülfat, silika/silikat tabakası, korozyon kaynaklı demir oksit (pas/magnetit), organik film, proses yağı ve biyolojik çamur birbirinden tamamen farklı çözünme mekanizmalarına sahiptir.',
          'Temizlik öncesinde birikintinin rengi, katman yapısı, asit/baz tepkisi ve proses geçmişi birlikte değerlendirilmelidir. Yanlış kimyasal seçimi, hedef tabakayı çözemediği gibi ana metal yüzeye veya EPDM/NBR contalara gereksiz kimyasal ve termal yük bindirebilir.'
        ]
      },
      {
        heading: 'Metal Uyumu ve İnhibitör Koruması',
        paragraphs: [
          'Aynı soğutma veya ısıtma devresinde karbon çelik, bakır, pirinç, paslanmaz çelik (AISI 304/316), alüminyum veya galvanizli yüzeyler bir arada bulunabilir. Örneğin paslanmaz çelik plakalı eşanjörlerde klorür içeren standart asitlerin kullanılması stres korozyonu çatlaması (SCC) ve oyuklanma riskini ciddi biçimde artırır.',
          'Elif Çevre Kimya’nın soğutma kulesi ve bakım kimyasalları sayfasında kireç, demir oksit ve organik birikimler için metal koruyucu inhibitörlü asidik kışır sökücüler ile alkali organik çözücüler ayrı ayrı tanımlanır. Uygulama derişimi, sıcaklık ve sirkülasyon süresi; kışır tipine ve sistemdeki en hassas metal cinsine göre sahada belirlenmelidir.'
        ]
      },
      {
        heading: 'İzolasyon, Kontrollü Sirkülasyon ve Nötralizasyon',
        paragraphs: [
          'Uygulama öncesinde eşanjör hattı ana devreden vanalarla izole edilmeli, gaz çıkış (havalandırma) hattı güvenli biçimde açık tutulmalı ve operatörler tam kişisel koruyucu donanım (KKD) kullanmalıdır. Sirkülasyon boyunca pH, çözünmüş demir/kalsiyum doygunluğu ve köpürme izlenmeli; işlem sonunda nötralizasyon, durulama ve yüzey pasivasyonu eksiksiz tamamlanmalıdır. Analiz olmadan sabit derişim veya süre garanti edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Temizlik öncesi birikinti numunesinden karbonat, demir oksit, silika veya organik/yağ karakterinin tespiti',
      'Eşanjör plaka/boru malzemesi (AISI 316, bakır, karbon çelik, alüminyum) ve conta tipinin doğrulanması',
      'Sirkülasyon tankında pH, sıcaklık ve asit tükenme hızının periyodik ölçümü',
      'Yıkama sonrası bol suyla durulama, nötralizasyon ve temiz metal yüzeyin pasivasyonu',
      'Atık yıkama çözeltisinin tesis arıtma prosedürüne uygun kontrollü bertarafı'
    ],
    ctaLabel: 'Kışır Sökücü & Temizlik Kimyasallarını İnceleyin',
    ctaLink: '/urunler/sogutma-kulesi-kimyasallari',
    secondaryLabel: 'Eşanjör Temizliği İçin Teknik Değerlendirme İste',
    secondaryLink: '/teklif-al?type=service_maintenance&product=E%C5%9Fanj%C3%B6r%20ve%20Hat%20Kimyasal%20Temizlik%20Program%C4%B1',
    quoteProduct: 'İnhibitörlü Eşanjör ve Hat Temizlik Kimyasalları',
    imageAlt: 'Eşanjör temizliği öncesinde boru hattı ve birikinti numunesini inceleyen güvenli bakım ekibi.',
    imagePromptTr: '16:9 yatay, fotogerçekçi endüstriyel fotoğraf; plakalı eşanjör ve izole edilmiş proses hattı yanında birikinti numunesini inceleyen, kimyasal dayanımlı eldiven ve yüz siperi kullanan iki teknisyen, düzenli çalışma alanı, güvenli çalışma koşulları, yazı veya logo olmasın.'
  },
  {
    number: 5,
    slug: 'kapali-devre-chiller-kalip-sogutma-korozyon-yonetimi',
    category: 'cooling_boiler',
    categoryLabel: 'Soğutma & Kazan Şartlandırma',
    title: 'Kapalı Devre Chiller ve Kalıp Soğutma Suyunda Farklı Metaller İçin Korozyon Yönetimi',
    seoTitle: 'Kapalı Devre Chiller ve Kalıp Soğutma Suyunda Korozyon Yönetimi | Elif Çevre Kimya',
    metaDescription: 'Chiller ve kalıp soğutma devrelerinde karbon çelik, bakır ve alüminyumun birlikte çalıştığı sistemler için korozyon yaklaşımını okuyun.',
    keyword: 'kapalı devre korozyon inhibitörü',
    keywords: [
      'kapalı devre korozyon inhibitörü',
      'chiller soğutma suyu şartlandırma',
      'kalıp soğutma devresi inhibitörü',
      'molibdat ve azol TTA BTA inhibitörü',
      'çoklu metal multi-metal korozyon koruması'
    ],
    readingTime: '6 dk okuma',
    summary: 'Chiller, plastik enjeksiyon kalıp soğutma ve indüksiyon devrelerinde çelik, bakır ve alüminyum bir arada çalışır. Çoklu metal uyumu ve mikrobiyolojik kontrol.',
    sections: [
      {
        heading: 'Farklı Metaller Aynı Devrede Neden Risk Oluşturur?',
        paragraphs: [
          'Kapalı devre chiller, plastik/metal enjeksiyon kalıp soğutma ve indüksiyon ısıtma-soğutma hatlarında su hacmi sabit görünse de korozyon riski kendiliğinden ortadan kalkmaz. Karbon çelik borular, bakır/pirinç kolektörler, paslanmaz plakalı eşanjörler ve alüminyum kalıp kanallarının aynı su devresinde bulunması galvanik çift etkisi yaratır.',
          'Özellikle bakır yüzeylerden suya çözünen eser miktardaki bakır iyonları, alüminyum veya çelik yüzeylere taşındığında lokal oyuklanma korozyonunu tetikleyebilir. Ayrıca alüminyum amfoterik bir metal olduğundan yüksek pH değerlerinde (>8.5) hızla korozyona uğrayabilir. Suyun yalnızca ilk doldurmada berrak görünmesi güvenli işletme için yeterli değildir.'
        ]
      },
      {
        heading: 'Çoklu Metal (Multi-Metal) Uyumlu İnhibitör Seçimi',
        paragraphs: [
          'Program tasarımında sistemdeki tüm metallerin listesi, çalışma sıcaklığı, doldurma (makyaj) suyu kalitesi, glikol varlığı ve sızdırmazlık durumu birlikte incelenmelidir. Elif Çevre Kimya’nın soğutma kulesi ve kapalı devre sayfasında chiller, kalıp soğutma ve kapalı ısıtma devreleri için nitritsiz molibdat, sarı metaller için TTA/BTA azoller ve organik film yapıcı polikarboksilat kombinasyonları listelenir.',
          'Nitrit bazlı klasik ürünler bakteriyel bozunmaya (nitrit tüketen bakteriler) veya alüminyum uyumsuzluğuna açık olabildiği yerlerde, molibdat-azol-organik hibrit formülasyonlar çoklu metal devrelerinde daha geniş bir pH ve sıcaklık penceresi sunabilir.'
        ]
      },
      {
        heading: 'Makyaj Suyu Kaçakları ve Trend Takibi',
        paragraphs: [
          'Kapalı bir devrede inhibitör bakiye seviyesi hızla düşüyorsa, kimyasal eklemeye devam etmek yerine sistemdeki su kaçağı ve kontrolsüz ham su girişi tespit edilmelidir. Periyodik olarak pH, iletkenlik, bulanıklık, demir/bakır/alüminyum taşınımı, mikrobiyolojik yük ve aktif inhibitör seviyesi kaydedilmelidir. Su analizi ve devre verileri incelenmeden sabit dozaj garanti edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Devredeki tüm metal ve alaşımların (özellikle alüminyum ve bakır varlığının) envanteri',
      'Alüminyum içeren kalıp devrelerinde pH sınırının (genellikle nötr/hafif alkali bant) korunması',
      'Su sayacı ile kapalı devreye giren haftalık/aylık makyaj suyu miktarının izlenmesi',
      'Aktif inhibitör (molibdat/azol), çözünmüş demir ve bakır konsantrasyonlarının periyodik analizi',
      'Nitrit/glikol bulunan devrelerde anaerobik ve aerobik bakteri üremesine karşı kontrol'
    ],
    ctaLabel: 'Kapalı Devre Korozyon İnhibitörlerini İnceleyin',
    ctaLink: '/urunler/sogutma-kulesi-kimyasallari',
    secondaryLabel: 'Chiller / Kalıp Devresi İçin Teklif İste',
    secondaryLink: '/teklif-al?type=water_audit&product=Kapal%C4%B1%20Devre%20Korozyon%20%C4%B0nhibit%C3%B6r%C3%BC',
    quoteProduct: 'Kapalı Devre (Chiller & Kalıp Soğutma) Korozyon İnhibitörü',
    imageAlt: 'Kapalı devre chiller borularında farklı metal yüzeyleri ve su kalite kontrolünü inceleyen teknisyen.',
    imagePromptTr: '16:9 yatay, fotogerçekçi endüstriyel fotoğraf; chiller ve kalıp soğutma devresinin karbon çelik, bakır ve alüminyum bağlantılarını kontrol eden, baretli ve koruyucu gözlüklü teknisyen, temiz makine dairesi, güvenli çalışma koşulları, yazı veya logo olmasın.'
  },
  {
    number: 6,
    slug: 'endustriyel-ro-on-aritma-ham-su-analizi',
    category: 'ro_edi_pretreatment',
    categoryLabel: 'RO, EDI & Ön Arıtma',
    title: 'Endüstriyel Ters Ozmoz Ön Arıtması: Ham Su Analizinden İşletmeye',
    seoTitle: 'Endüstriyel RO Ön Arıtması: Ham Su Analizinden İşletmeye | Elif Çevre Kimya',
    metaDescription: 'Kuyu, nehir veya şebeke suyunda endüstriyel RO ön arıtmasını ham su analizi, filtreleme, izleme ve güvenli işletmeye alma adımlarıyla öğrenin.',
    keyword: 'endüstriyel RO ön arıtması',
    keywords: [
      'endüstriyel RO ön arıtması',
      'ters ozmoz ham su analizi',
      'SDI bulanıklık ve demir giderimi',
      'multimedya ve aktif karbon ön arıtma',
      'endüstriyel su arıtma projelendirme'
    ],
    readingTime: '7 dk okuma',
    summary: 'Ters ozmoz membranlarının ömrü ve işletme kararlılığı, doğrudan ön arıtmanın başarısına bağlıdır. Ham su analizinden devreye almaya mühendislik adımları.',
    sections: [
      {
        heading: 'Ham Suyu Okumadan Ön Arıtma Tasarımı Yapılmaz',
        paragraphs: [
          'Endüstriyel ters ozmoz (RO) hattında membranlara ulaşan besleme suyunun fiziksel, kimyasal ve biyolojik niteliği, tüm sistemin sürdürülebilir çalışmasında belirleyicidir. Kuyu suyu, yüzey/nehir suyu ve OSB şebeke suları aynı ön arıtma şemasıyla ele alınmamalıdır.',
          'Tasarım öncesinde bulanıklık (NTU), Silt Yoğunluk İndeksi (SDI₁₅), askıda katı madde (AKM), toplam sertlik, demir, mangan, silis, organik yük (KOİ/TOC), serbest klor ve iletkenlik parametreleri birlikte değerlendirilir. Ayrıca üretilecek saf suyun yüksek basınçlı buhar kazanı, tekstil boyahane, gıda veya cam yıkama hattında kullanılacak olması da hedef akış şemasını değiştirir.'
        ]
      },
      {
        heading: 'Doğru Filtrasyon Kademelerinin Seçimi',
        paragraphs: [
          'Analiz verileri; multimedya kum filtresi, demir-mangan giderme ünitesi, aktif karbon filtre, reçineli yumuşatma, ultrafiltrasyon (UF), 5 mikron kartuş filtre veya SBS/antiskalant dozaj sistemlerinden hangilerinin gerekli olduğunu ortaya koyar. Temel amaç, ince film kompozit (TFC) poliamid membranlara ulaşan partikül tıkanmasını, serbest klor oksidasyonunu ve mineral çökelme riskini kaynağında kontrol etmektir.',
          'Her ön arıtma kademesi için filtrasyon hızı (m/saat), fark basıncı (ΔP), ters yıkama (backwash) su debisi ve drenaj hattı kapasitesi de mühendislik hesabının parçası olmalıdır. Böylece ön arıtma yalnızca bir ekipman listesi değil, ölçülebilir bir işletme planı hâline gelir.'
        ]
      },
      {
        heading: 'Devreye Alma (Commissioning) ve Referans Kayıtları',
        paragraphs: [
          'Devreye alma aşamasında ilk günkü referans (baseline) değerler kaydedilir; besleme, ürün (permeat) ve konsantre (atık) debileri, kademe basınçları ve iletkenlik değerleri izlenir. Elif Çevre Kimya’nın Endüstriyel RO sayfasında PLC/SCADA otomasyon panosu, çevrim içi iletkenlik/ORP izleme ve entegre CIP yıkama istasyonu seçenekleri yer alır. Katalogda 1–250 m³/saat kapasite aralığı bulunsa da kesin proje kapasitesi ham su analizi ve kullanım amacı doğrulanmadan taahhüt edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Ham su kaynağında mevsimsel bulanıklık, SDI₁₅, demir/mangan ve silis değişimlerinin analizi',
      'Poliamid membranlar öncesinde serbest klorun sıfırlanması (aktif karbon ve/veya SBS ile ORP takibi)',
      'Multimedya filtre ve 5 µm kartuş filtre giriş-çıkış fark basınçlarının (ΔP) günlük kaydı',
      'Devreye alma günü ilk referans (baseline) debi, basınç ve iletkenlik formunun arşivlenmesi',
      'Ters yıkama (backwash) debisi ve su basıncının medya kabarması için yeterli olduğunun doğrulanması'
    ],
    ctaLabel: 'Endüstriyel RO Sistemlerini İnceleyin',
    ctaLink: '/sistemler/endustriyel-ro',
    secondaryLabel: 'Ham Su Analizinizle RO Proje Teklifi Alın',
    secondaryLink: '/teklif-al?type=water_project&product=End%C3%BCstriyel%20Ters%20Ozmoz%20(RO)%20ve%20%C3%96n%20Ar%C4%B1tma%20Sistemi',
    quoteProduct: 'Endüstriyel Ters Ozmoz (RO) ve Ön Arıtma Sistemi',
    imageAlt: 'Endüstriyel ters ozmoz ön arıtma hattında filtre tankları ve kontrol panosu.',
    imagePromptTr: 'Yatay 16:9, fotogerçekçi endüstriyel su arıtma tesisi; multimedya filtre tankları, kartuş filtre gövdeleri ve paslanmaz RO skid’i, boru hattını kontrol eden iki teknisyen; baret, koruyucu gözlük, eldiven ve reflektif yelek, temiz ve düzenli saha, güvenli çalışma, doğal endüstriyel ışık, metin yok, logo yok.'
  },
  {
    number: 7,
    slug: 'ro-antiskalant-secimi-su-analizi-membran-koruma',
    category: 'ro_edi_pretreatment',
    categoryLabel: 'RO, EDI & Ön Arıtma',
    title: 'RO Antiskalant Seçimi: Su Analizi ve Membran Koruması',
    seoTitle: 'RO Antiskalant Seçimi: Su Analizi ve Membran Koruması | Elif Çevre Kimya',
    metaDescription: 'RO antiskalant seçimini su analizi, membran uyumluluğu, çökelme riski ve işletme takibiyle birlikte değerlendirin; sabit doz varsayımlarından kaçının.',
    keyword: 'RO antiskalant seçimi',
    keywords: [
      'RO antiskalant seçimi',
      'ters ozmoz membran koruyucu',
      'yüksek silis antiskalantı',
      'kalsiyum karbonat ve sülfat önleyici',
      'RO dozaj pompası otomasyonu'
    ],
    readingTime: '6 dk okuma',
    summary: 'Ters ozmoz sistemlerinde son kademe membran yüzeyinde silis, karbonat ve sülfat çökelmesini önlemek için su analizine dayalı antiskalant seçimi.',
    sections: [
      {
        heading: 'Antiskalantı “Her Suya Tek Ürün” Mantığıyla Seçmeyin',
        paragraphs: [
          'Ters ozmoz (RO) sistemlerinde suyun %70–82’si saf su (permeat) olarak ayrılırken, geriye kalan çözünmüş iyonlar konsantre (reject) fazında 3 ila 6 kat yoğunlaşır. Bu yoğunlaşma, özellikle son kademe membran yüzeyinde doygunluk sınırlarının aşılmasına yol açar.',
          'Bu nedenle RO antiskalantı ezbere seçilmemelidir. Ham su analizinde kalsiyum, magnezyum, baryum, stronsiyum, sülfat, bikarbonat alkalinitesi, reaktif silis (SiO₂), demir, pH, su sıcaklığı ve iletkenlik verileri; sistemin hedef geri kazanım (recovery) oranı ve membran dizilimiyle birlikte değerlendirilir. Su analizi görülmeden sabit dozaj uygulanmamalıdır.'
        ]
      },
      {
        heading: 'Silis, Karbonat ve Sülfat Çökelmesine Karşı Doğru Kimya',
        paragraphs: [
          'Standart sodyum hekzametafosfat (SHMP) gibi eski nesil ürünler çözelti tankında hidrolize olarak kalsiyum fosfat çökelmesi yaratabilir ve yüksek silisli kuyu sularında yetersiz kalır. Elif Çevre Kimya’nın ürün grubunda kalsiyum karbonat, kalsiyum sülfat, baryum/stronsiyum sülfat ve yüksek silis yüklerine yönelik fosfonat, polikarboksilat ve dendrimerik polimer bazlı RO antiskalant seçenekleri yer alır.',
          'Ayrıca ön arıtmadan kaçabilecek alüminyum veya demir katyonlarının antiskalant ile etkileşimi ve membran üreticisinin (poliamid TFC membran) kimyasal uyumluluk kriterleri mutlaka dikkate alınmalıdır.'
        ]
      },
      {
        heading: 'Dozaj Otomasyonu ve Konsantre Hattı Takibi',
        paragraphs: [
          'En doğru antiskalant seçilse bile dozaj pompasının hava yapması, RO sistemi durduğunda pompanın çalışmaya devam etmesi veya aşırı dozaj (over-dosing) membran yüzeyinde organik/polimerik kirlenmeye yol açabilir. Pompa besleme hattıyla elektriksel olarak kilitlenmeli (interlock), günlük kimyasal tüketimi besleme suyu sayacıyla doğrulanmalı ve normalize edilmiş fark basıncı/debi trendleri kayıt altına alınmalıdır.'
        ]
      }
    ],
    fieldChecklist: [
      'Güncel ham su analizinde kalsiyum, sülfat, alkalinite, silis (SiO₂), demir ve pH değerlerinin kontrolü',
      'Hedeflenen RO geri kazanım oranında (% recovery) konsantre akımındaki doygunluk sınırlarının hesabı',
      'Ön arıtmada kullanılan koagülant (PAC/Alüminyum/Demir) kalıntısıyla antiskalant uyumluluğunun doğrulanması',
      'Antiskalant dozaj pompasının RO besleme pompası ile otomatik start/stop (interlock) bağlantısı',
      'Son kademe basınç farkı ve konsantre/ürün iletkenlik trendlerinin haftalık kaydı'
    ],
    ctaLabel: 'RO Antiskalant & Sistem Çözümlerini İnceleyin',
    ctaLink: '/sistemler/endustriyel-ro',
    secondaryLabel: 'Su Analizinizle RO Antiskalant Teklifi Alın',
    secondaryLink: '/teklif-al?type=product_quote&product=Ters%20Ozmoz%20(RO)%20Antiskalant',
    quoteProduct: 'Ters Ozmoz (RO) Membran Antiskalantı',
    imageAlt: 'RO antiskalant dozaj pompası ve membran sisteminin endüstriyel kontrol paneli.',
    imagePromptTr: 'Yatay 16:9, fotogerçekçi endüstriyel RO odası; antiskalant dozaj pompası, kimyasal besleme hattı, membran basınç kapları ve kontrol ekranı, ekipmanı inceleyen PPE’li mühendis; sızıntısız ve düzenli çalışma alanı, güvenli çalışma, metin yok, logo yok.'
  },
  {
    number: 8,
    slug: 'ro-membran-cip-temizligi-belirtiler-kayit-uyumluluk',
    category: 'ro_edi_pretreatment',
    categoryLabel: 'RO, EDI & Ön Arıtma',
    title: 'RO Membran CIP Temizliği: Belirtiler, Kayıt ve Uyumluluk',
    seoTitle: 'RO Membran CIP Temizliği: Belirtiler, Kayıt ve Uyumluluk | Elif Çevre Kimya',
    metaDescription: 'RO membran CIP temizliğini performans trendleri, kirlenme belirtileri, kayıt disiplini ve kimyasal uyumlulukla güvenli biçimde planlayın.',
    keyword: 'RO membran CIP temizliği',
    keywords: [
      'RO membran CIP temizliği',
      'ters ozmoz membran yıkama kimyasalı',
      'asidik ve alkali membran CIP',
      'normalize permeat debisi takibi',
      'RO membran tıkanması çözümü'
    ],
    readingTime: '7 dk okuma',
    summary: 'Membranlarda kimyasal yıkama (CIP) için çok geç kalmak geri dönüşsüz tıkanmaya, gereksiz ve sert yıkama ise tuz geçişinin artmasına neden olur.',
    sections: [
      {
        heading: 'Temizlik Zamanını Tek Ölçümle Değil, Normalize Trendle Doğrulayın',
        paragraphs: [
          'CIP (Clean-In-Place / Yerinde Kimyasal Temizlik), RO membran yüzeyinde biriken mineral kışırı, kolloidal tortuyu veya biyofilmi kontrollü biçimde uzaklaştırmak için uygulanır. Ancak su sıcaklığı düştüğünde viskozite arttığı için ürün suyu debisi doğal olarak azalır; bu durum tek başına membran tıkanması (fouling/scaling) anlamına gelmez.',
          'Bu nedenle CIP kararı, sıcaklık ve basınca göre normalize edilmiş verilerle verilir: normalize ürün debisinde belirgin düşüş, kademeler arası basınç farkında (ΔP) artış veya normalize tuz geçişinde (iletkenlikte) yükselme görüldüğünde önce enstrüman kalibrasyonu, O-ring sızdırmazlığı ve ön arıtma performansı kontrol edilmelidir.'
        ]
      },
      {
        heading: 'Kirlenme Tipi (Birinci Kademe vs. Son Kademe) ve Kimyasal Sıralaması',
        paragraphs: [
          'Birinci kademede başlayan basınç farkı artışı çoğunlukla partikül, kolloidal kil/silis veya biyolojik kirlenmeye (fouling) işaret ederken; son kademede başlayan debi düşüşü ve iletkenlik artışı genellikle mineral çökelmesini (kalsiyum karbonat, sülfat veya silis scaling) gösterir.',
          'Elif Çevre Kimya ürün grubunda membranlara özel düşük pH (asidik) inorganik kışır temizleyiciler ve yüksek pH (alkali) organik/biyofilm temizleyiciler yer alır. Hangi adımın önce uygulanacağı kirlenme tipine göre belirlenir; örneğin biyolojik veya organik film varsa önce alkali temizlik yapılmadan asit verilmesi organik tabakayı sabitleyebilir.'
        ]
      },
      {
        heading: 'pH, Sıcaklık Sınırları ve Kayıt Disiplini',
        paragraphs: [
          'Poliamid membranların dayanabileceği pH aralığı ve maksimum çözelti sıcaklığı membran üreticisinin teknik bülteninde kesin sınırlarla tanımlıdır. Yüksek pH’ta yüksek sıcaklık uygulanması membran aktif tabakasına kalıcı hasar verebilir. Temizlik öncesi ve sonrası basınç, debi ve iletkenlik değerleri aynı koşullarda kaydedilmeli; iyileşme görülmezse körlemesine tekrar yıkama yapmak yerine kök neden araştırılmalıdır.'
        ]
      }
    ],
    fieldChecklist: [
      'Sıcaklık düzeltmeli (normalize) permeat debisi, tuz geçişi ve kademe ΔP grafiklerinin incelenmesi',
      '1. kademe ve 2. kademe basınç kaplarının ayrı ayrı sirküle edilerek kirliliğin diğer kademeye taşınmaması',
      'CIP tankında hazırlanan çözeltinin pH ve sıcaklığının membran üreticisi limitlerinde tutulması',
      'Düşük basınçlı sirkülasyon, ıslatma (soaking) ve RO ürün suyuyla tam durulama adımlarının uygulanması',
      'Yıkama öncesi ve sonrası referans performans değerlerinin bakım defterine işlenmesi'
    ],
    ctaLabel: 'Endüstriyel RO & CIP Sistemlerini İnceleyin',
    ctaLink: '/sistemler/endustriyel-ro',
    secondaryLabel: 'Membran CIP Kimyasalı veya Bakım Teklifi Alın',
    secondaryLink: '/teklif-al?type=service_maintenance&product=RO%20Membran%20CIP%20Y%C4%B1kama%20Kimyasal%C4%B1%20ve%20Servisi',
    quoteProduct: 'RO Membran CIP Yıkama Kimyasalları ve Teknik Bakım',
    imageAlt: 'Endüstriyel RO membran CIP istasyonunda güvenli bakım hazırlığı yapan teknisyen.',
    imagePromptTr: 'Yatay 16:9, fotogerçekçi endüstriyel RO bakım alanı; CIP tankı, sirkülasyon pompası, membran basınç kapları ve izole borulama, kimyasal güvenlik prosedürünü kontrol eden PPE’li teknisyen; güvenli çalışma, temiz zemin, dökülme kontrolü, metin yok, logo yok.'
  },
  {
    number: 9,
    slug: 'edi-ultra-saf-su-ro-sonrasi-deiyonizasyon',
    category: 'ro_edi_pretreatment',
    categoryLabel: 'RO, EDI & Ön Arıtma',
    title: 'EDI ile Ultra Saf Su: RO Sonrası Deiyonizasyonun Rolü',
    seoTitle: 'EDI ile Ultra Saf Su: RO Sonrası Deiyonizasyonun Rolü | Elif Çevre Kimya',
    metaDescription: 'EDI’nin RO sonrası rolünü, çift geçişli RO ve degazör konfigürasyonunu, kullanım alanlarını ve kapasitenin neden projeye bağlı olduğunu öğrenin.',
    keyword: 'EDI ultra saf su sistemi',
    keywords: [
      'EDI ultra saf su sistemi',
      'elektrodeiyonizasyon sistemi',
      'çift geçişli RO ve membran degazör',
      'asitsiz kostiksiz saf su üretimi',
      'yüksek basınçlı kazan ve düzcam saf su'
    ],
    readingTime: '6 dk okuma',
    summary: 'Asit ve kostik rejenerasyonuna ihtiyaç duymadan kesintisiz ultra saf su üreten Elektrodeiyonizasyon (EDI) modüllerinin RO ve degazör ile uyumu.',
    sections: [
      {
        heading: 'EDI, Ters Ozmoz Sonrası Ne Yapar?',
        paragraphs: [
          'Elektrodeiyonizasyon (EDI), ters ozmoz (RO) kademesinden çıkan permeat suyunda kalan eser miktardaki iyonik yükü, doğru akım (DC) elektrik alanı ve seçici geçirgen iyon değiştirici membran/reçine yatakları yardımıyla kesintisiz olarak uzaklaştıran ileri bir saflaştırma teknolojisidir.',
          'Klasik karışık yataklı (mixed-bed) deiyonize kolonlarının aksine, EDI modüllerinde reçineler suyun elektriksel ayrışmasıyla oluşan H⁺ ve OH⁻ iyonlarıyla çalışma esnasında sürekli rejenere edilir. Böylece tehlikeli asit (HCl/H₂SO₄) ve kostik (NaOH) depolama, nötralizasyon ve rejenerasyon duruşlarına ihtiyaç duyulmadan sürekli üretim sağlanır.'
        ]
      },
      {
        heading: 'Çift Geçişli RO ve Membran Degazör Neden Kritiktir?',
        paragraphs: [
          'EDI modülü tek başına bir “son filtre” gibi düşünülmemelidir; performansı ve ömrü doğrudan besleme suyunun kalitesine bağlıdır. Sertlik, serbest klor, organik madde, demir ve özellikle çözünmüş karbondioksit (CO₂) EDI kapasitesini doğrudan etkiler.',
          'Elif Çevre Kimya’nın EDI ve Ultra Saf Su sayfasında çift geçişli (Double-Pass) RO, membran degazör (CO₂ giderimi için) ve EDI modüllerinden oluşan entegre konfigürasyon yer alır. CO₂ gazının EDI öncesinde uzaklaştırılması hem elektrik tüketimini azaltır hem de çıkış suyunda silis (SiO₂) ve bor giderim verimini yükseltir.'
        ]
      },
      {
        heading: 'Uygulamayı ve Kapasiteyi Projeyle Eşleştirin',
        paragraphs: [
          'Düzcam ve ayna yıkama hatları, yüksek basınçlı buhar kazanları, enerji santralleri, ilaç, kozmetik ve laboratuvar uygulamalarının iletkenlik (<0.06 µS/cm / >16–18 MΩ·cm), TOC ve silis beklentileri farklıdır. Katalogda 0.5–100 m³/saat kapasite aralığı yer alsa da kesin sistem tasarımı ham su analizi ve kullanım noktası kriterleri görülmeden taahhüt edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'EDI giriş suyunda toplam sertlik (<1.0 ppm CaCO₃), serbest klor (<0.02 ppm) ve SDI sınırlarının doğrulanması',
      'Çözünmüş CO₂ yükünün membran degazör ve/veya ara kademe pH ayarıyla kontrol altına alınması',
      'Besleme suyu iletkenliği, silis (SiO₂) ve organik karbon (TOC) değerlerinin modül limitleriyle eşleştirilmesi',
      'DC doğrultucu akım/voltaj değerleri ile EDI ürün suyu direncinin (MΩ·cm) çevrim içi izlenmesi',
      'Paslanmaz çelik (AISI 316L) veya PVDF/PP saf su dağıtım hattı tasarımının kullanım noktasına uygunluğu'
    ],
    ctaLabel: 'EDI & Ultra Saf Su Sistemlerini İnceleyin',
    ctaLink: '/sistemler/edi-ultra-saf-su',
    secondaryLabel: 'Ultra Saf Su Projesi İçin Teklif İste',
    secondaryLink: '/teklif-al?type=water_project&product=EDI%20Ultra%20Saf%20Su%20Sistemi',
    quoteProduct: 'Çift Geçişli RO + EDI Ultra Saf Su Sistemi',
    imageAlt: 'Çift geçişli RO, degazör ve EDI ünitelerinden oluşan ultra saf su sistemi.',
    imagePromptTr: 'Yatay 16:9, fotogerçekçi endüstriyel ultra saf su tesisi; çift geçişli RO skid’i, membran degazör, EDI modülleri ve paslanmaz borulama, kontrol yapan PPE’li mühendisler; steril ve düzenli teknik alan, güvenli çalışma, metin yok, logo yok.'
  },
  {
    number: 10,
    slug: 'uf-yumusatma-multimedya-filtre-ham-su-secimi',
    category: 'ro_edi_pretreatment',
    categoryLabel: 'RO, EDI & Ön Arıtma',
    title: 'UF, Yumuşatma ve Multimedya Filtre: Ham Suya Göre Seçim',
    seoTitle: 'UF, Yumuşatma ve Multimedya Filtre: Ham Suya Göre Seçim | Elif Çevre Kimya',
    metaDescription: 'Ultrafiltrasyon, yumuşatma ve multimedya filtreyi görevlerine göre karşılaştırın; doğru ön arıtma seçimini ham su analizi ve kullanım hedefiyle yapın.',
    keyword: 'ham suya göre ön arıtma seçimi',
    keywords: [
      'ham suya göre ön arıtma seçimi',
      'ultrafiltrasyon UF sistemi',
      'endüstriyel su yumuşatma sistemi',
      'multimedya kum filtresi',
      'kuyu ve yüzey suyu arıtma seçimi'
    ],
    readingTime: '6 dk okuma',
    summary: 'Multimedya filtrasyon, iyon değiştirici yumuşatma ve ultrafiltrasyon (UF) farklı kirleticileri hedefler. Hangi teknolojinin hangi ham suda seçileceği.',
    sections: [
      {
        heading: 'Üç Teknolojinin Görevi ve Ayırma Mekanizması Farklıdır',
        paragraphs: [
          'Endüstriyel su arıtma projelerinde ön arıtma ekipmanlarını standart bir şablon olarak seçmek yerine, ham suyun hangi kirletici yükünü taşıdığı sorulmalıdır. Çok katmanlı multimedya (antrasit/kuvars kum/garnet) filtre, suda kaba partikülleri ve askıda katı maddeyi (AKM) tutmaya yönelik derinlik filtrasyonu kademesidir.',
          'İyon değiştirici reçineli su yumuşatma ünitesi ise partikül tutmaz; suda çözünmüş halde bulunan kalsiyum (Ca²⁺) ve magnezyum (Mg²⁺) sertlik iyonlarını sodyum (Na⁺) iyonlarıyla değiştirerek kireç taşını önler. Ultrafiltrasyon (UF) ise ~0.02 mikron gözenek çaplı içi boş fiber (hollow-fiber) membranlarıyla kolloidal bulanıklığı, ince partikülleri ve yüksek molekül ağırlıklı askıda yükleri bloke eder; ancak çözünmüş tuzları ve sertliği gidermek için RO veya yumuşatmanın yerine geçmez.'
        ]
      },
      {
        heading: 'Seçimi Ham Su Kaynağı ve Hedef Kullanım Belirler',
        paragraphs: [
          'Seçim sürecinde su kaynağının yağış/mevsim kaynaklı bulanıklık dalgalanmaları, tam su analizi, saatlik pik debi profili ve atık/ters yıkama suyu altyapısı birlikte incelenir. Örneğin mevsimsel bulanıklığı ve SDI değeri değişken olan yüzey sularında veya geri kazanım sularında UF modülleri RO öncesinde çok kararlı bir SDI (<2–3) bariyeri sağlar.',
          'Buna karşılık berrak fakat yüksek sertlikli kuyu sularında düşük basınçlı buhar kazanı, boyahane veya soğutma kulesi beslemesi için tandem su yumuşatma veya RO + antiskalant kurgusu değerlendirilir. Elif Çevre Kimya, tüm UF, yumuşatma, filtrasyon ve RO ünitelerini ham su analizine göre projelendirir.'
        ]
      },
      {
        heading: 'İşletme Maliyeti ve Saha Takibi',
        paragraphs: [
          'Doğru ön arıtma kombinasyonu, hem gereksiz ilk yatırım maliyetini hem de tuz, su ve kimyasal sarfiyatını azaltır. Devreye alma sonrasında filtre giriş-çıkış fark basınçları, çıkış sertliği, SDI/bulanıklık trendleri ve ters yıkama sıklıkları düzenli kaydedilmelidir. Su analizi görülmeden sistem kapasitesi veya reçete sabitlenmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Ham suda AKM, bulanıklık (NTU), SDI₁₅, toplam sertlik (°Fr) ve demir/mangan değerlerinin ayrıştırılması',
      'Multimedya filtre veya UF seçimi için partikül boyut dağılımı ve mevsimsel bulanıklık piklerinin incelenmesi',
      'Yumuşatma sistemlerinde reçine hacmi, tuz tüketimi ve kesintisiz su için tandem (ikiz) valf gereksinimi',
      'UF sistemlerinde otomatik hava destekli ters yıkama ve kimyasal destekli geri yıkama (CEB) altyapısı',
      'Üretilecek suyun hedef proses (kazan, tekstil, RO besleme, soğutma) kalite standartlarıyla karşılaştırılması'
    ],
    ctaLabel: 'Su Arıtma Sistemlerini Karşılaştırın',
    ctaLink: '/sistemler',
    secondaryLabel: 'Analiz Raporunuzla Ön Arıtma Teklifi Alın',
    secondaryLink: '/teklif-al?type=water_project&product=UF%2C%20Yumu%C5%9Fatma%20ve%20Filtrasyon%20%C3%96n%20Ar%C4%B1tma%20Sistemi',
    quoteProduct: 'UF, Su Yumuşatma ve Multimedya Filtrasyon Sistemleri',
    imageAlt: 'Multimedya filtre, yumuşatma ve ultrafiltrasyon ünitelerinin bulunduğu endüstriyel ön arıtma alanı.',
    imagePromptTr: 'Yatay 16:9, fotogerçekçi endüstriyel su arıtma tesisi; multimedya filtre tankları, otomatik yumuşatma kolonları ve ultrafiltrasyon modülleri aynı teknik alanda, ölçüm yapan PPE’li mühendis; düzenli borulama, güvenli çalışma, metin yok, logo yok.'
  },
  {
    number: 11,
    slug: 'endustriyel-atiksuda-koagulant-secimi-jar-test',
    category: 'wastewater_polymers',
    categoryLabel: 'Atıksu, Koagülant & Polimerler',
    title: 'Endüstriyel Atıksuda Koagülant Seçimi: PAC, Demir III Klorür, Alüminyum Sülfat ve Jar-Test',
    seoTitle: 'Endüstriyel Atıksuda Koagülant Seçimi ve Jar-Test Rehberi | Elif Çevre Kimya',
    metaDescription: 'PAC, demir III klorür ve alüminyum sülfat arasındaki seçimi; su karakteri, flok oluşumu ve jar-test verileriyle nasıl değerlendireceğinizi öğrenin.',
    keyword: 'endüstriyel atıksu koagülantı',
    keywords: [
      'endüstriyel atıksu koagülantı',
      'polialüminyum klorür PAC',
      'demir III klorür koagülant',
      'alüminyum sülfat',
      'atıksu jar-test ve flok oluşumu'
    ],
    readingTime: '7 dk okuma',
    summary: 'Kimyasal arıtma tesislerinde PAC, Demir III Klorür ve Alüminyum Sülfat seçimi; pH penceresi, çamur hacmi ve 6’lı Jar-Test doğrulaması.',
    sections: [
      {
        heading: 'Koagülant Seçimi Neden Tek Bir Ürüne İndirgenemez?',
        paragraphs: [
          'Endüstriyel atıksularda bulunan kolloidal parçacıklar, emülsifiye yağlar, boyarmaddeler ve askıda katı maddeler çoğunlukla negatif yüzey yükü (zeta potansiyeli) taşıdıkları için birbirlerini iter ve kendi kendine çökelmezler. Koagülantlar bu elektriksel itme kuvvetini nötralize ederek mikro-flokların oluşmasını sağlar.',
          'Elif Çevre Kimya’nın çevre ve atıksu kimyasalları grubunda Polialüminyum Klorür (PAC %17 sıvı / %30 toz), Demir III Klorür (FeCl₃ %40) ve Alüminyum Sülfat (Alum) yer alır. Ancak “en iyi koagülant” yalnızca ürün adına bakılarak seçilmez; atıksuyun pH’ı, alkalinitesi, sıcaklığı, renk/fosfor yükü ve sonraki ayırma ekipmanı (lamelli çökeltici veya DAF) birlikte değerlendirilmelidir.'
        ]
      },
      {
        heading: 'PAC, Demir III Klorür ve Alüminyum Sülfat Arasındaki Teknik Farklar',
        paragraphs: [
          'Polialüminyum Klorür (PAC), ön-polimerize yapısı sayesinde daha geniş bir pH bandında çalışabilir, alkaliniteyi alüminyum sülfata göre daha az tüketir ve düşük su sıcaklıklarında hızlı mikro-flok oluşturabilir. Demir III Klorür ise daha yoğun ve ağır flok yapısıyla özellikle yüksek KOİ, sülfür/koku kontrolü, fosfor çöktürme ve bazı renkli endüstriyel atıksularda güçlü bir alternatif sunar; ancak korozif yapısı ve suya bırakabileceği sarı/kahverengi demir rengi pH kontrolüyle yönetilmelidir.',
          'Alüminyum Sülfat ise uygun alkalinite ve dar pH penceresinde (genellikle 6.0–7.2) ekonomik bir koagülasyon sağlayabilir fakat sülfat yükünü ve çamur hacmini farklı etkileyebilir. Bu karşılaştırma bir dozaj reçetesi değildir; aynı ürün farklı fabrikalarda farklı sonuç verebilir.'
        ]
      },
      {
        heading: '6’lı Jar-Test Neyi Karşılaştırır?',
        paragraphs: [
          'Yerinde yapılan 6’lı Jar-Test çalışmasında aynı atıksu numunesi üzerinde koagülant türü, optimum pH noktası, hızlı karıştırma süresi ve yardımcı flokülant (polielektrolit) uyumu yan yana karşılaştırılır. Yalnızca üst suyun berraklığı değil; oluşan çamurun hacmi (% V/V), çökme hızı ve susuzlaştırma adımı da kaydedilir. Analiz ve saha doğrulaması olmadan sabit dozaj veya arıtma garantisi verilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Ham atıksu numunesinde pH, M-alkalinite, iletkenlik, AKM ve KOİ değerlerinin tespiti',
      'Koagülant ilavesi sonrası düşen pH’ın optimum çöktürme bandına (kireç veya kostik ile) ayarlanması',
      '6’lı Jar-Test düzeneğinde mikro-flok oluşum süresi, çökme hızı ve çamur hacminin karşılaştırılması',
      'Üst faz suyunda berraklık, renk ve kalıntı metal (Al/Fe) kontrolü',
      'Oluşan kimyasal çamurun filtre pres veya dekantördeki susuzlaşma davranışının izlenmesi'
    ],
    ctaLabel: 'Atıksu Arıtma Kimyasallarını İnceleyin',
    ctaLink: '/urunler/atik-su-aritma-kimyasallari',
    secondaryLabel: 'Yerinde Jar-Test & Koagülant Teklifi Alın',
    secondaryLink: '/teklif-al?type=jar_test_trial&product=At%C4%B1ksu%20Koag%C3%BClant%20(PAC%20%2F%20FeCl3)%20ve%20Jar-Test',
    quoteProduct: 'Atıksu Koagülantları (PAC, Demir III Klorür, Alüminyum Sülfat)',
    imageAlt: 'Laboratuvarda dört beherde farklı koagülantlarla yapılan jar-test ve oluşan flokların karşılaştırılması.',
    imagePromptTr: '16:9 yatay, fotogerçekçi endüstriyel su arıtma laboratuvarı, güvenli çalışma alanı, laboratuvar önlüğü ve gözlük kullanan teknisyen, dört şeffaf beherde farklı koagülantlarla jar-test, kontrollü karıştırıcı, temiz tezgâh, nötr arka plan, hiçbir logo ve yazı olmadan.'
  },
  {
    number: 12,
    slug: 'a-pam-cokturtme-berraklastirma-polimer-secimi',
    category: 'wastewater_polymers',
    categoryLabel: 'Atıksu, Koagülant & Polimerler',
    title: 'A-PAM ile Çöktürme ve Berraklaştırma: Polimer, Su Karakteri ve Karıştırma',
    seoTitle: 'A-PAM ile Çöktürme ve Berraklaştırma Nasıl Değerlendirilir? | Elif Çevre Kimya',
    metaDescription: 'Anyonik polielektrolit A-PAM seçiminde su karakteri, flok yapısı ve karıştırma etkilerini teknik ama uygulanabilir bir çerçevede inceleyin.',
    keyword: 'anyonik polielektrolit A-PAM',
    keywords: [
      'anyonik polielektrolit A-PAM',
      'flokülant polimer seçimi',
      'lamelli çökeltici polimeri',
      'maden ve tufal suyu çöktürme',
      'poliakrilamid çözelti hazırlama'
    ],
    readingTime: '6 dk okuma',
    summary: 'Anyonik poliakrilamid (A-PAM) ile mikro-flokların köprülenerek hızla çöktürülmesi; anyonik yük yoğunluğu, molekül ağırlığı ve karıştırma enerjisinin etkisi.',
    sections: [
      {
        heading: 'A-PAM Seçimi Suyu ve Katıyı Tanımakla Başlar',
        paragraphs: [
          'Anyonik polielektrolitler (A-PAM), koagülasyon adımıyla yükü nötralize edilmiş mikro-flokları veya doğal olarak pozitif/mineral yüzey özelliği taşıyan inorganik tanecikleri uzun polimer zincirleri boyunca birbirine köprüleyerek (bridging) hızla çöken iri makrobileşenlere dönüştürür.',
          'Elif Çevre Kimya; maden cevher hazırlama, mermer/kum yıkama, demir-çelik haddehane tufal çukurları ve kimyasal arıtma lamelli çökelticilerinde kullanılan farklı anyonik şarj (%10–%40) ve yüksek/ultra yüksek molekül ağırlıklı toz ve emülsiyon A-PAM seçenekleri sunar.'
        ]
      },
      {
        heading: 'Su Karakteri ve Vardiyalar Arası Değişkenlik Neden Belirleyicidir?',
        paragraphs: [
          'Aynı A-PAM ürünü; farklı askıda katı madde (AKM) konsantrasyonu, tanecik boyutu, pH, su sıcaklığı, tuzluluk (iletkenlik) veya serbest yağ varlığında aynı flok davranışını göstermeyebilir. Örneğin 60°C üzerindeki sıcak proses sularında veya yüksek kesmeli pompalarda standart molekül ağırlıklı polimerlerin zincir yapısı zayıflayabilir.',
          'Bu yüzden seçim yalnızca katalogdaki molekül ağırlığına bakılarak yapılmamalıdır. Debi ve kirletici yükü gün içinde değişiyorsa farklı vardiyalardan alınan temsili numuneler üzerinde karşılaştırmalı test yapılmalı; çökeltici yüzey yükü ve bekleme süresi dikkate alınmalıdır.'
        ]
      },
      {
        heading: 'Çözelti Olgunlaşma Süresi ve Karıştırma Enerjisi Flokun Kaderini Değiştirir',
        paragraphs: [
          'Toz A-PAM ürünlerinin topaklanmadan (“balık gözü” oluşmadan) uygun konsantrasyonda (%0.1–%0.25) çözündürülmesi ve dozaj öncesi yeterli olgunlaşma (aging) süresinin tanınması kritiktir. Flokülasyon tankında ise polimerin suya homojen dağılması için yeterli temas sağlanmalı, ancak yeni oluşan flokları kıracak aşırı türbülans ve yüksek devirli karıştırmadan kaçınılmalıdır. Kesin dozaj ve çökelme performansı su analizi ve saha doğrulaması olmadan garanti edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Numunenin pH, sıcaklık, iletkenlik ve inorganik/organik katı oranının incelenmesi',
      'Farklı anyonik şarj yüzdelerine sahip A-PAM adaylarının Jar-Test ile çökme hızı karşılaştırması',
      'Polimer hazırlama ünitesinde çözelti konsantrasyonu (%0.1–0.2) ve olgunlaşma süresinin kontrolü',
      'Flokülasyon tankı karıştırıcı devrinin (düşük kesmeli yavaş karıştırma) flok kırmayacak şekilde ayarlanması',
      'Lamelli çökeltici veya tikiner çıkış suyunda AKM ve bulanıklık takibi'
    ],
    ctaLabel: 'A-PAM & Flokülant Ürünlerini İnceleyin',
    ctaLink: '/urunler/atik-su-aritma-kimyasallari',
    secondaryLabel: 'A-PAM Seçimi & Jar-Test İçin Teklif Alın',
    secondaryLink: '/teklif-al?type=jar_test_trial&product=Anyonik%20Polielektrolit%20(A-PAM)%20ve%20Jar-Test',
    quoteProduct: 'Anyonik Polielektrolit (A-PAM) Flokülant',
    imageAlt: 'Çöktürme kolonunda A-PAM ile büyüyen flokların ve berraklaşan üst suyun laboratuvar görüntüsü.',
    imagePromptTr: '16:9 yatay, fotogerçekçi atıksu arıtma pilot alanı, güvenli çalışma alanı, baret, gözlük ve eldiven kullanan operatör, şeffaf çöktürme kolonunda flokların dibe ilerlemesi, yanında temiz numune kapları, yumuşak endüstriyel ışık, logo ve yazı olmadan.'
  },
  {
    number: 13,
    slug: 'c-pam-camur-susuzlastirma-filtre-pres-belt-pres-dekantor',
    category: 'wastewater_polymers',
    categoryLabel: 'Atıksu, Koagülant & Polimerler',
    title: 'C-PAM ile Çamur Susuzlaştırma: Filtre Pres, Belt Pres ve Dekantör Seçimi',
    seoTitle: 'C-PAM ile Çamur Susuzlaştırma: Pres ve Dekantör Seçimi | Elif Çevre Kimya',
    metaDescription: 'Katyonik polimer C-PAM seçiminde filtre pres, belt pres ve dekantörün proses koşullarıyla nasıl karşılaştırılacağını öğrenin.',
    keyword: 'katyonik polimer çamur susuzlaştırma',
    keywords: [
      'katyonik polimer çamur susuzlaştırma',
      'C-PAM katyonik polielektrolit',
      'dekantör santrifüj polimeri',
      'belt pres ve filtre pres polimeri',
      'çamur keki kuruluk oranı artırma'
    ],
    readingTime: '7 dk okuma',
    summary: 'Arıtma çamurlarının susuzlaştırılmasında filtre pres, belt pres ve dekantör santrifüjün mekanik kesme kuvvetlerine uygun katyonik polimer (C-PAM) seçimi.',
    sections: [
      {
        heading: 'C-PAM Çamur Susuzlaştırmada Neyi İyileştirmeye Çalışır?',
        paragraphs: [
          'Biyolojik (aktif çamur) veya kimyasal-biyolojik karışık arıtma çamurları yüksek oranda bağlı su ve negatif yüzey yükü içerir. Katyonik polielektrolitler (C-PAM), çamur floklarını nötralize edip bir araya getirerek serbest suyun hızlıca drene olmasını (free-drainage) ve mekanik basınç/santrifüj altında dağılmayan sağlam floklar oluşmasını hedefler.',
          'Elif Çevre Kimya’nın ürün sayfasında C-PAM; filtre pres, belt pres ve dekantör santrifüjlerde kullanılan, düşükten çok yükseğe (%10–%80+) farklı katyonik yük yoğunluklarına ve doğrusal/çapraz bağlı (cross-linked) zincir yapılarına sahip toz ve emülsiyon polimerler olarak tanımlanır. Amaç yalnızca daha kuru kek elde etmek değil; aynı zamanda berrak süzüntü suyu (filtrat/sentrat) ve temiz bez/bant işletmesidir.'
        ]
      },
      {
        heading: 'Filtre Pres, Belt Pres ve Dekantörün Flok Beklentisi Farklıdır',
        paragraphs: [
          'Her susuzlaştırma makinesi çamur flokuna farklı bir mekanik kuvvet uygular. Belt preslerde yerçekimi drenaj bölgesinde suyun hızla süzülmesi ve merdaneler arasında flokun bezden taşmadan sıkışması gerekir. Plakalı filtre preslerde ise yüksek basınç altında plaka bezlerini tıkamayan, geçirgen bir kek yapısı aranır.',
          'Dekantör santrifüjlerde ise yüksek G kuvveti ve helezon kesme (shear) etkisi bulunduğundan, kesmeye dayanıklı, yüksek molekül ağırlıklı veya dallanmış/emülsiyon katyonik polimerler ön plana çıkabilir. Ayrıca polimerin çamur hattına enjekte edildiği nokta (pompa öncesi vs. dekantör girişi) flok kalitesini doğrudan belirler.'
        ]
      },
      {
        heading: 'Seçim Yalnızca Polimere Bağlı Değildir',
        paragraphs: [
          'Çamurun uçucu katı madde (organik/inorganik) oranı, giriş kuru madde yüzdesi, pH’ı, septikleşme durumu ve önceki kademede kullanılan koagülant miktarı C-PAM davranışını değiştirir. Bu nedenle polimer seçimi mutlaka tesisin kendi çamuruyla yapılacak susuzlaştırma/elek drenaj testi ve makine denemesiyle doğrulanmalıdır. Saha denemesi olmadan sabit dozaj, kek kuruluğu veya bertaraf tasarrufu garantisi verilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Giriş çamurunun kuru madde oranı (% KM), organik/inorganik oranı ve pH değerinin ölçümü',
      'Makine tipine (dekantör yüksek kesme vs. belt pres yerçekimi drenajı) uygun flok dayanım testi',
      'Polimer dozaj noktasının ve statik mikser/flokülasyon süresinin saha kontrolü',
      'Çıkış çamur keki kuruluğu (% KM) ile filtrat/sentrat suyundaki askıda katı madde (AKM) takibi',
      'Filtre bezi veya belt yıkama suyu basıncının ve nozullarının düzenli kontrolü'
    ],
    ctaLabel: 'C-PAM & Çamur Susuzlaştırma Ürünlerini İnceleyin',
    ctaLink: '/urunler/atik-su-aritma-kimyasallari',
    secondaryLabel: 'Çamur Numunenizde C-PAM Denemesi Talep Edin',
    secondaryLink: '/teklif-al?type=jar_test_trial&product=Katyonik%20Polielektrolit%20(C-PAM)%20%C3%87amur%20Susuzla%C5%9Ft%C4%B1rma',
    quoteProduct: 'Katyonik Polielektrolit (C-PAM) Çamur Susuzlaştırma Polimeri',
    imageAlt: 'Filtre pres, belt pres ve dekantör proseslerini temsil eden güvenli çamur susuzlaştırma tesisi.',
    imagePromptTr: '16:9 yatay, fotogerçekçi endüstriyel çamur susuzlaştırma tesisi, güvenli çalışma alanı, bariyerli ve düzenli ekipman bölgesi, filtre pres ve belt pres hattı ile paslanmaz dekantör, PPE kullanan operatör, temiz zemin, logo ve yazı olmadan.'
  },
  {
    number: 14,
    slug: 'haddehane-tufal-cukuru-suyu-cokturtme-geri-kazanim',
    category: 'wastewater_polymers',
    categoryLabel: 'Atıksu, Koagülant & Polimerler',
    title: 'Haddehane Tufal Çukuru Suyunda Katı Madde Çöktürme ve Geri Kazanım Yaklaşımı',
    seoTitle: 'Haddehane Tufal Çukuru Suyunda Çöktürme ve Geri Kazanım | Elif Çevre Kimya',
    metaDescription: 'Tufal çukuru suyunda katı maddeyi tanımlama, A-PAM ile çöktürme ve geri kazanım kararını doğrulama adımlarını inceleyin.',
    keyword: 'haddehane tufal çukuru suyu',
    keywords: [
      'haddehane tufal çukuru suyu',
      'demir çelik tufal polimeri A-PAM',
      'tufal suyu katı madde çöktürme',
      'haddehane su geri kazanımı',
      'yüksek basınçlı descaling nozul koruması'
    ],
    readingTime: '6 dk okuma',
    summary: 'Demir-çelik sıcak haddeleme hatlarında tufal çukuru suyundaki ince demir oksit partiküllerinin ve yağın ayrıştırılarak devir daim pompalarının korunması.',
    sections: [
      {
        heading: 'Tufal Çukuru Suyunu Yalnızca Bulanıklık Olarak Görmeyin',
        paragraphs: [
          'Demir-çelik sıcak haddeleme ve sürekli döküm hatlarında kullanılan yüksek debili soğutma ve tufal kırma (descaling) suları; farklı tane boyutlarında demir oksit (FeO, Fe₃O₄, Fe₂O₃) tufali, mikron altı metalik partiküller ve rulman/hidrolik sistemlerden sızan gres ve emülsifiye yağları taşır.',
          'İri tufal parçaları birincil tufal çukurunda mekanik olarak çökse bile, ince tufal partikülleri yüksek yüzey hızlarında askıda kalarak devir daim pompalarına, kum filtrelerine ve yüksek basınçlı descaling nozullarına ulaşarak aşınma (erozyon) yaratabilir. Elif Çevre Kimya’nın demir-çelik sektör çözümlerinde sıcak tufal suları için yüksek intrinsik viskoziteli A-PAM polimerleri ve yağ emülsiyon kırıcılar yer alır.'
        ]
      },
      {
        heading: 'Sıcaklık, Yağ Varlığı ve Çöktürme Yaklaşımı',
        paragraphs: [
          'Tufal çukuru ve lamelli çökeltici tasarımında ilk adım, yüzeydeki serbest yağ ve gresin sıyırıcılarla (skimmer) ayrılmasıdır. Yağ oranı yüksek bir suda doğrudan polimer dozlamak, yağla kaplı çamur topakları oluşturarak hem kum filtrelerini tıkayabilir hem de kepçeyle çekilen tufalin kalitesini bozabilir.',
          'Uygun ön ayırma sonrasında sıcaklığa dayanıklı anyonik polielektrolit (A-PAM) ve gerektiğinde inorganik koagülant/emülsiyon kırıcı kombinasyonu numune üzerinde Jar-Test ile karşılaştırılır. Polimerin dozaj noktası, kanal türbülansı ve çökeltici yüzey yükü birlikte optimize edilir.'
        ]
      },
      {
        heading: 'Su ve Tufal Geri Kazanım Kararı Hangi Veriye Dayanır?',
        paragraphs: [
          'Arıtılan suyun tekrar hadde soğutma/descaling devresine verilmesi için çıkış AKM, yağ-gres ve iletkenlik değerleri izlenmeli; çöken tufal çamurunun ise nem ve yağ içeriği analiz edilmeden doğrudan sinter veya ergitme geri kazanımına uygun olduğu varsayılmamalıdır. Analiz ve saha denemesi olmadan dozaj veya geri kazanım performansı garanti edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Tufal çukuru giriş ve çıkış suyunda sıcaklık (°C), AKM (mg/L) ve serbest/emülsifiye yağ ölçümü',
      'Birincil çukurda yağ sıyırıcı (skimmer) ve kaba tufal kepçe alma periyodunun kontrolü',
      '60°C+ sıcak hadde sularında hidrolize dayanıklı yüksek molekül ağırlıklı A-PAM seçimi',
      'Kum filtreleri ve yüksek basınçlı descaling nozulları öncesinde çıkış AKM trendinin takibi',
      'Toplanan tufal çamurunda yağ ve nem yüzdesinin geri kazanım kriterleriyle doğrulanması'
    ],
    ctaLabel: 'Demir-Çelik Sektör Çözümlerini İnceleyin',
    ctaLink: '/sektorler/demir-celik',
    secondaryLabel: 'Tufal Çukuru Jar-Test & Teklif İste',
    secondaryLink: '/teklif-al?type=jar_test_trial&product=Haddehane%20Tufal%20%C3%87ukuru%20Polimeri%20(A-PAM)',
    quoteProduct: 'Haddehane Tufal Çukuru A-PAM Polimeri ve Emülsiyon Kırıcı',
    imageAlt: 'Haddehane tufal çukuru suyunda çöken katıların güvenli numune alma ve ayırma çalışması.',
    imagePromptTr: '16:9 yatay, fotogerçekçi demir-çelik haddehane su yönetimi alanı, güvenli çalışma alanı, korkuluklu tufal çukuru ve çöktürme tankı, baretli ve yüz siperi kullanan ekip, su yüzeyinde katı madde ayrışması, düzenli zemin, logo ve yazı olmadan.'
  },
  {
    number: 15,
    slug: 'tekstil-proses-atiksuyunda-renk-emulsiyon-kopuk-test',
    category: 'wastewater_polymers',
    categoryLabel: 'Atıksu, Koagülant & Polimerler',
    title: 'Tekstil ve Proses Atıksuyunda Renk, Emülsiyon ve Köpük: Ayrı Problem, Ayrı Test',
    seoTitle: 'Tekstil Atıksuyunda Renk, Emülsiyon ve Köpük Yönetimi | Elif Çevre Kimya',
    metaDescription: 'Renk, yağ emülsiyonu ve köpüğü aynı sorun gibi ele almak yerine, her biri için uygun test yaklaşımını ve kimyasal seçenekleri değerlendirin.',
    keyword: 'tekstil atıksuyu renk giderici',
    keywords: [
      'tekstil atıksuyu renk giderici',
      'boyahane atıksu arıtma kimyasalları',
      'yağ emülsiyon kırıcı kimyasal',
      'silikonsuz ve silikonlu köpük kesici',
      'tekstil arıtma jar-test'
    ],
    readingTime: '6 dk okuma',
    summary: 'Tekstil boyahane ve endüstriyel yıkama atıksularında çözünmüş reaktif boya rengi, kararlı yağ emülsiyonu ve yüzey aktif madde köpüğü için ayrı test protokolleri.',
    sections: [
      {
        heading: 'Renk, Emülsiyon ve Köpük Aynı Mekanizma Değildir',
        paragraphs: [
          'Tekstil boyahane, terbiye ve endüstriyel proses atıksularında görülen koyu renk, bulanık yağ emülsiyonu ve yoğun köpük aynı havuzda buluşsa da kimyasal yapıları tamamen farklıdır. Renk çoğunlukla suda yüksek çözünürlüğe sahip reaktif, dispers veya asit boyarmaddelerden kaynaklanır.',
          'Emülsiyon, kesme/yıkama yağlarının veya proses apreleme sıvılarının yüzey aktif maddeler yardımıyla su içinde kararlı mikro-damlacıklar hâlinde asılı kalmasıdır. Köpük ise ıslatıcılar, deterjanlar, yüksek alkalinite ve havalandırma türbülansıyla ortaya çıkar. Bu üç sorunu tek bir kimyasalın çözeceği varsayılmamalıdır.'
        ]
      },
      {
        heading: 'Her Problem İçin Ayrı Laboratuvar Test Sorusu',
        paragraphs: [
          'Elif Çevre Kimya’nın atıksu ürün grubunda tekstil boyahane suları için katyonik reçine/poliamin bazlı renk giderici polimerler, yağlı atıksular için emülsiyon kırıcılar ve havalandırma/deşarj hatları için silikonlu veya silikonsuz köpük kesiciler (antifoam) yer alır.',
          'Renk giderimi testinde pH ayarı, koagülant (PAC/FeCl₃) ile renk giderici polimerin dozaj sırası, Pt-Co/spektrofotometrik renk düşüşü ve oluşan çamur hacmi birlikte izlenir. Emülsiyon kırma testinde faz ayrım süresi ve ara yüzey netliği değerlendirilirken; köpük kesici testinde hem anlık köpük sönme hızı (knock-down) hem de kalıcı köpük bastırma süresi ve biyolojik çamur üzerindeki etkisi gözlenir.'
        ]
      },
      {
        heading: 'Dozaj Sıralaması ve Kimyasal Uyumluluk',
        paragraphs: [
          'Örneğin katyonik renk giderici polimer ile anyonik flokülantın (A-PAM) aynı noktadan veya yeterli karışım süresi bırakılmadan verilmesi, iki kimyasalın birbirini bağlayarak etkisizleşmesine yol açar. Dengeleme havuzunun homojenliği ve vardiya bazlı boya reçetesi değişimleri dikkate alınarak saha doğrulaması yapılmalıdır. Su analizi ve jar-test olmadan sabit dozaj garanti edilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Dengeleme havuzundan farklı boyama vardiyalarını temsil eden kompozit numune alınması',
      'Renk giderici polimer ve inorganik koagülant (PAC/Demir III) dozaj sırasının Jar-Test ile belirlenmesi',
      'Katyonik renk giderici ile anyonik flokülant arasında yeterli karıştırma/reaksiyon süresi bırakılması',
      'Köpük kesici seçiminde membran (MBR/RO) veya tekstil leke riski varsa silikonsuz formülasyon tercih edilmesi',
      'Çıkış suyunda renk, KOİ, AKM ve çamur susuzlaştırma performansının birlikte doğrulanması'
    ],
    ctaLabel: 'Atıksu & Renk Giderici Kimyasalları İnceleyin',
    ctaLink: '/urunler/atik-su-aritma-kimyasallari',
    secondaryLabel: 'Renk / Emülsiyon / Köpük Testi İçin Teklif İste',
    secondaryLink: '/teklif-al?type=jar_test_trial&product=Tekstil%20Renk%20Giderici%2C%20Em%C3%BClsiyon%20K%C4%B1r%C4%B1c%C4%B1%20ve%20Antifoam',
    quoteProduct: 'Tekstil Renk Giderici Polimer, Emülsiyon Kırıcı ve Köpük Kesici',
    imageAlt: 'Tekstil proses atıksuyunda renk, emülsiyon ve köpük numunelerinin güvenli laboratuvar testleri.',
    imagePromptTr: '16:9 yatay, fotogerçekçi tekstil atıksu laboratuvarı, güvenli çalışma alanı, gözlük, eldiven ve laboratuvar önlüğü kullanan teknisyen, farklı renkli su numuneleri, yağ emülsiyonu şişesi ve kontrollü köpük testi, temiz tezgâh, logo ve yazı olmadan.'
  },
  {
    number: 16,
    slug: 'jeotermal-hatta-kirec-silika-korozyon-riskleri',
    category: 'sector_geothermal_supply',
    categoryLabel: 'Jeotermal, Sektörel & Tedarik',
    title: 'Jeotermal Hatta Kireç, Silika ve Korozyon Riskleri Nasıl Değerlendirilir?',
    seoTitle: 'Jeotermal Hatta Kireç, Silika ve Korozyon Riskleri | Elif Çevre Kimya',
    metaDescription: 'Jeotermal hatta kuyudan eşanjöre kadar kireç, silika ve korozyon risklerini; brine analizi, kupon ve saha takibiyle değerlendirin.',
    keyword: 'jeotermal kireç silika korozyon kontrolü',
    keywords: [
      'jeotermal kireç silika korozyon kontrolü',
      'jeotermal antiskalant',
      'jeotermal silika dispersantı',
      'jeotermal kuyu ve eşanjör şartlandırma',
      'brine analizi ve korozyon kuponu'
    ],
    readingTime: '7 dk okuma',
    summary: 'Jeotermal enerji, bölgesel ısıtma ve sera hatlarında kuyu başından reenjekte kuyusuna kadar kalsiyum karbonat, amorf silika ve korozyon yönetimi.',
    sections: [
      {
        heading: 'Kuyu Çıkışında Başlayan Hat Boyu Değerlendirme',
        paragraphs: [
          'Jeotermal akışkan (brine) yönetiminde risk analizi yalnızca yerüstü plakalı eşanjörlere bakılarak yapılmaz. Akışkan kuyudan yükselirken basıncın düşmesiyle çözünmüş karbondioksit (CO₂) gaz fazına geçer (flashing); bu durum pH’ı hızla yükselterek kalsiyum karbonat (CaCO₃) çökelmesini daha kuyu içinde veya kuyu başı vanalarında başlatabilir.',
          'Hat boyunca eşanjörlerde sıcaklık düştükçe bu kez silika (SiO₂) doygunluk sınırı aşılır ve amorf silika/metal silikat birikimi devreye girer. Bu nedenle Elif Çevre Kimya’nın jeotermal şartlandırma yaklaşımı; kuyu içi/kuyu başı, separatör, eşanjör ve reenjeksiyon hattını ayrı kontrol noktaları olarak ele alır.'
        ]
      },
      {
        heading: 'Eşanjör Performansını Tek Belirtiyle Okumamak',
        paragraphs: [
          'Plakalı eşanjörlerde ısı geçişinin zayıflaması ve fark basıncının artması kışır veya silika şüphesini güçlendirir; ancak hangi mekanizmanın baskın olduğunu tek başına kanıtlamaz. Kalsiyum karbonat asitle kolay tepkime verirken, polimerize olmuş silika veya demir sülfür birikintileri standart asidik yıkamayla çözünmez.',
          'Ayrıca jeotermal akışkandaki yüksek klorür, çözünmüş CO₂ ve hidrojen sülfür (H₂S) gazları metal boru ve ekipmanlarda ciddi korozyon riski oluşturur. Uygulanacak termal stabilitesi yüksek antiskalant, silika dispersantı veya film yapıcı korozyon inhibitörü saha verisi üzerinden seçilmelidir.'
        ]
      },
      {
        heading: 'Dozajı Brine Analizi ve Korozyon Kuponuyla Doğrulamak',
        paragraphs: [
          'Jeotermal kuyuların akışkan kimyası, sıcaklığı ve gaz oranı sahadan sahaya hatta aynı sahadaki kuyular arasında bile farklılık gösterir. Sitemizde açıkça belirtildiği üzere, brine analizi ve korozyon kuponu verileri olmadan sabit dozaj önerilmez. Enjeksiyon derinliği, dozaj lansının konumu, kupon ağırlık kaybı ölçümleri ve eşanjör temizlik periyotları birlikte kayıt altına alınmalıdır.'
        ]
      }
    ],
    fieldChecklist: [
      'Kuyu başı ve eşanjör çıkışında brine sıcaklığı, basınç, pH, kalsiyum, bikarbonat ve silis (SiO₂) analizi',
      'CO₂ gaz ayrışma (flashing) noktasının altında kuyu içi veya kuyu başı dozaj lans konumunun kontrolü',
      'Eşanjör çıkış sıcaklığında amorf silika doygunluk indeksinin (SSI) izlenmesi',
      'Hat üzerindeki korozyon kuponları ile metal kaybı hızının (mpy) ve birikinti karakterinin takibi',
      'Yüksek kuyu sıcaklığına (termal stabiliteye) uygun inhibitör formülasyonunun doğrulanması'
    ],
    ctaLabel: 'Jeotermal Şartlandırma Kimyasallarını İnceleyin',
    ctaLink: '/urunler/jeotermal-su-sartlandirma-kimyasallari',
    secondaryLabel: 'Jeotermal Brine Analizi & Teklif İste',
    secondaryLink: '/teklif-al?type=water_audit&product=Jeotermal%20Kire%C3%A7%2C%20Silika%20ve%20Korozyon%20%C4%B0nhibit%C3%B6r%C3%BC',
    quoteProduct: 'Jeotermal Kireç, Silika ve Korozyon İnhibitörü Programı',
    imageAlt: 'Kuyudan eşanjöre uzanan jeotermal hatta PPE kullanan teknisyenlerin kireç, silika ve korozyon kontrolü yapması.',
    imagePromptTr: '16:9 yatay, fotogerçekçi jeotermal enerji tesisinde kuyu başından separatöre ve plakalı eşanjöre uzanan yalıtımlı boru hattı, ölçüm cihazlarını kontrol eden iki mühendis, baret, koruyucu gözlük, kimyasala dayanıklı eldiven ve alev geciktirici iş kıyafeti, düzenli bariyerler ve temiz zemin, açıkta kimyasal dökülmesi veya güvensiz işlem yok, logo ve okunabilir yazı içermesin, tabela ve marka olmasın.'
  },
  {
    number: 17,
    slug: 'mikronize-kalsit-yas-ogutme-dispersant-proses-suyu',
    category: 'sector_geothermal_supply',
    categoryLabel: 'Jeotermal, Sektörel & Tedarik',
    title: 'Mikronize Kalsit Yaş Öğütmede Dispersant ve Proses Suyunun Rolü',
    seoTitle: 'Mikronize Kalsit Yaş Öğütmede Dispersant ve Proses Suyu | Elif Çevre Kimya',
    metaDescription: 'Mikronize kalsit yaş öğütmede dispersant seçimini proses suyu, katı oranı ve jar-test sonuçlarıyla birlikte değerlendirin.',
    keyword: 'mikronize kalsit yaş öğütme dispersantı',
    keywords: [
      'mikronize kalsit yaş öğütme dispersantı',
      'sodyum poliakrilat dispersant',
      'kalsit çamuru viskozite düşürücü',
      'maden proses suyu şartlandırma',
      'niğde mikronize kalsit kimyasalları'
    ],
    readingTime: '6 dk okuma',
    summary: 'Mikronize kalsit (CaCO₃) yaş öğütme değirmenlerinde yüksek katı oranında düşük viskozite sağlamak için poliakrilat dispersant ve proses suyu uyumu.',
    sections: [
      {
        heading: 'Dispersant Neden Yaş Öğütmede Kritik Bir Girdidir?',
        paragraphs: [
          'Mikronize kalsit (kalsiyum karbonat) yaş öğütme devrelerinde cevher tane boyutu mikron ve mikron altı seviyelere (örneğin d₅₀ / d₉₇ hedeflerine) indikçe toplam yüzey alanı katlanarak artar. İnce kalsit tanecikleri arasındaki çekim kuvvetleri nedeniyle süspansiyonun (slurry) viskozitesi hızla yükselir, akışkanlık düşer ve bilyalı/karıştırmalı değirmenlerde öğütme verimi azalır.',
          'Dispersant, kalsit parçacıklarının yüzeyine tutunarak elektrostatik ve sterik itme kuvveti oluşturur; böylece yüksek katı oranlarında dahi akışkan bir süspansiyon elde edilmesine yardımcı olur. Elif Çevre Kimya, maden ve kalsit sektör sayfasında düşük molekül ağırlıklı sodyum/amonyum poliakrilat dispersantları ürün grupları arasında sunar.'
        ]
      },
      {
        heading: 'Proses Suyu Kimyasal Seçimin Doğrudan Parçasıdır',
        paragraphs: [
          'Aynı dispersant farklı proses sularında aynı viskozite eğrisini vermeyebilir. Yaş öğütmede kullanılan suyun sertliği (kalsiyum ve magnezyum iyonları), iletkenliği, pH’ı ve tikinerden geri dönen suyun içerdiği bakiye flokülant miktarı parçacık yüzeyindeki yük dengesini doğrudan değiştirir.',
          'Bu nedenle proses suyunu yalnızca bir taşıyıcı sıvı olarak görmek yerine öğütme reçetesinin aktif bir bileşeni olarak izlemek gerekir. Ayrıca sitede yer alan stearik asit yüzey kaplama ajanları ve tikiner su geri kazanım flokülantları (A-PAM) farklı proses adımlarına aittir; her birinin görev yeri ayrı değerlendirilmelidir.'
        ]
      },
      {
        heading: 'Laboratuvar Reoloji Testi ve Saha Doğrulaması',
        paragraphs: [
          'Ürün seçimi öncesinde tesisin kendi kalsit cevheri ve kendi proses suyuyla laboratuvarda farklı katı oranlarında Brookfield viskozite, çökelme kararlılığı ve tane boyutu dağılımı denemeleri yapılmalıdır. Değirmen sıcaklığı ve kademeli dozaj noktaları sahada doğrulanmadan sabit dozaj veya enerji tasarrufu garantisi verilmez.'
        ]
      }
    ],
    fieldChecklist: [
      'Yaş öğütme besleme suyunun sertlik, iletkenlik ve tikiner geri dönüş suyu oranının analizi',
      'Tesisin kendi kalsit numunesiyle hedef katı oranında (%65–78) viskozite-dozaj eğrisinin çıkarılması',
      'Dispersantın değirmen girişi ve kademeleri arasındaki besleme dağılımının kontrolü',
      'Öğütme sonrası süspansiyonun depolama tanklarındaki çökelme (sedimentasyon) kararlılığının izlenmesi',
      'Nihai ürünün kullanılacağı sektör (boya, kağıt, plastik) için sararma/köpük uyumluluğunun doğrulanması'
    ],
    ctaLabel: 'Maden & Mikronize Kalsit Çözümlerini İnceleyin',
    ctaLink: '/sektorler/maden-kalsit',
    secondaryLabel: 'Kalsit Yaş Öğütme Dispersantı İçin Teklif İste',
    secondaryLink: '/teklif-al?type=product_quote&product=Mikronize%20Kalsit%20Ya%C5%9F%20%C3%96%C4%9F%C3%BCtme%20Dispersant%C4%B1',
    quoteProduct: 'Mikronize Kalsit Yaş Öğütme Dispersantı (Sodyum Poliakrilat)',
    imageAlt: 'Mikronize kalsit yaş öğütme tesisinde koruyucu ekipman kullanan operatörün proses suyu ve öğütme hattını kontrol etmesi.',
    imagePromptTr: '16:9 yatay, fotogerçekçi mikronize kalsit tesisinde kapalı yaş öğütme değirmeni, boru hattında beyaz mineral süspansiyonu, numune kabını güvenli biçimde inceleyen operatör, baret, gözlük, toz maskesi, eldiven ve iş kıyafeti, ekipman koruyucuları kapalı, temiz ve düzenli zemin, logo veya okunabilir yazı içermesin, marka ve etiket olmasın.'
  },
  {
    number: 18,
    slug: 'demir-celik-asitleme-hattinda-inhibitor-kullanimi',
    category: 'sector_geothermal_supply',
    categoryLabel: 'Jeotermal, Sektörel & Tedarik',
    title: 'Demir-Çelik Asitleme Hattında İnhibitör Kullanımı Nasıl Kontrol Edilir?',
    seoTitle: 'Demir-Çelik Asitleme Hattında İnhibitör Kullanımı | Elif Çevre Kimya',
    metaDescription: 'HCl asitleme inhibitörünü yüzey kalitesi, metal uyumu, banyo analizi ve kontrollü saha denemesiyle değerlendirin.',
    keyword: 'demir çelik HCl asitleme inhibitörü',
    keywords: [
      'demir çelik HCl asitleme inhibitörü',
      'pickling inhibitörü',
      'asitleme banyosu metal kaybı önleme',
      'aşırı asitleme over-pickling kontrolü',
      'galvaniz ve boru asitleme kimyasalı'
    ],
    readingTime: '6 dk okuma',
    summary: 'Sıcak haddelenmiş çelik sac, boru ve tel asitleme (pickling) banyolarında HCl asidinin tufali çözerken ana metali aşındırmasını önleyen inhibitör kontrolü.',
    sections: [
      {
        heading: 'Asitleme (Pickling) İnhibitörü Neyi Korumaya Çalışır?',
        paragraphs: [
          'Demir-çelik sac, boru, profil ve sıcak daldırma galvaniz tesislerinin asitleme (pickling) hatlarında hidroklorik asit (HCl), çelik yüzeyindeki tufal (demir oksit) tabakasını çözmek için kullanılır. Ancak tufal temizlendikten sonra asit, alttaki sağlam ana metalle (Fe) reaksiyona girerek hem metal kaybına hem de taze asit israfına ve hidrojen gazı çıkışına yol açar.',
          'Asitleme inhibitörünün amacı, oksit çözme (descaling) hızını engellemeden çıplak metal yüzeyinde koruyucu bir adsorpsiyon filmi oluşturarak aşırı asitlemeyi (over-pickling), yüzey kararmasını ve hidrojen kırılganlığı riskini sınırlamaktır. Elif Çevre Kimya’nın demir-çelik sektör sayfasında HCl asitleme inhibitörleri temel proses ürün grupları arasında yer alır.'
        ]
      },
      {
        heading: 'Yüzey Kalitesi, Sıcaklık ve Demir Birikimi Birlikte İzlenir',
        paragraphs: [
          'Banyodan çıkan çeliğin yalnızca parlak görünmesi prosesin tam kontrol altında olduğu anlamına gelmez. Banyo sıcaklığı, serbest HCl derişimi, banyoda biriken çözünmüş demir (Fe²⁺ / Fe³⁺) konsantrasyonu, daldırma veya hat geçiş süresi ve çelik kalitesi birlikte değerlendirilmelidir.',
          'Ayrıca asitleme sonrasında çeliğin soğuk haddeleme, galvanizleme veya boyama adımına girecek olması, yüzeyde istenmeyen inhibitör kalıntısı veya leke kalmaması açısından önem taşır. Ürün uygunluğu teklif ve laboratuvar aşamasında doğrulanmalıdır.'
        ]
      },
      {
        heading: 'Banyo Analizi ve Kontrollü Saha Planı',
        paragraphs: [
          'İşletme ekibi her vardiyada banyo asitliğini (% HCl), demir konsantrasyonunu (g/L Fe), sıcaklığı ve taze asit ilavelerini kayıt altına almalıdır. İnhibitör dozajı taze asit beslemesiyle orantılı ve kontrollü yürütülmeli; tesis banyo verisi ve kupon ağırlık kaybı testi yapılmadan sabit dozaj veya performans garantisi verilmemelidir.'
        ]
      }
    ],
    fieldChecklist: [
      'Asitleme banyolarında serbest HCl (%), çözünmüş demir (g/L Fe) ve banyo sıcaklığının (°C) vardiya takibi',
      'Çelik kuponlarla laboratuvarda inhibisyon verimi ve tufal çözme süresinin karşılaştırılması',
      'Taze HCl asit ilavesiyle inhibitör beslemesinin oransal olarak eşleştirilmesi',
      'Durulama banyolarında pH, klorür taşınımı ve yüzeyde leke/kalıntı kontrolü',
      'Asit rejenerasyon (ARP) ünitesi varsa inhibitörün rejenerasyon prosesiyle uyumluluğunun teyidi'
    ],
    ctaLabel: 'Demir-Çelik Proses Çözümlerini İnceleyin',
    ctaLink: '/sektorler/demir-celik',
    secondaryLabel: 'HCl Asitleme İnhibitörü İçin Teklif İste',
    secondaryLink: '/teklif-al?type=jar_test_trial&product=HCl%20Asitleme%20(Pickling)%20%C4%B0nhibit%C3%B6r%C3%BC',
    quoteProduct: 'Demir-Çelik HCl Asitleme (Pickling) İnhibitörü',
    imageAlt: 'Demir-çelik asitleme hattında kapalı tankları ve çelik şeridi kontrol eden tam koruyucu ekipmanlı proses operatörü.',
    imagePromptTr: '16:9 yatay, fotogerçekçi demir-çelik fabrikasında kapalı asitleme tankları ve hareket eden çelik şerit, kontrol panelini güvenli mesafeden izleyen operatör, baret, yüz siperi, kimyasala dayanıklı eldiven, önlük ve iş botları, tank kapakları kapalı, sıçrama veya açık asit kabı yok, logo ve okunabilir yazı içermesin, marka veya tabela olmasın.'
  },
  {
    number: 19,
    slug: 'kagit-oluklu-mukavva-kopuk-slime-kontrolu',
    category: 'sector_geothermal_supply',
    categoryLabel: 'Jeotermal, Sektörel & Tedarik',
    title: 'Kağıt ve Oluklu Mukavva Üretiminde Köpük ve Slime Kontrolü',
    seoTitle: 'Kağıt Üretiminde Köpük ve Slime Kontrolü | Elif Çevre Kimya',
    metaDescription: 'Kağıt ve oluklu mukavva üretiminde köpük ile slime riskini; antifoam, biyosit, proses takibi ve jar-test yaklaşımıyla ele alın.',
    keyword: 'kağıt üretiminde köpük ve slime kontrolü',
    keywords: [
      'kağıt üretiminde köpük ve slime kontrolü',
      'kağıt makinesi biyosit DBNPA',
      'silikonsuz köpük kesici kağıt sanayi',
      'yaş kısım kimyasalları',
      'oluklu mukavva proses kimyasalları'
    ],
    readingTime: '6 dk okuma',
    summary: 'Kağıt ve oluklu mukavva makinelerinin yaş kısmında hava sürüklenmesi, köpük ve mikrobiyolojik slime kopuşlarına karşı silikonsuz antifoam ve biyosit programı.',
    sections: [
      {
        heading: 'Köpük Neden Yalnızca Bir Yüzey Görüntüsü Değildir?',
        paragraphs: [
          'Kağıt, karton ve oluklu mukavva (fluting/testliner) üretiminde hamur hazırlama ve yaş kısım (wet-end) devrelerinde oluşan köpük; yalnızca beyaz su havuzlarında taşma yaratmaz, aynı zamanda elyaf süspansiyonu içinde mikro-hava kabarcıkları taşıyarak elek üzerinde drenajı yavaşlatır, vakum verimini düşürür ve kağıt yüzeyinde iğne deliği (pinhole) veya homojenlik bozukluklarına neden olur.',
          'Bu yüzden köpük kesici seçimi, yalnızca yüzeydeki kaba köpüğü bastırmaya değil, hamur içindeki bağlı havayı uzaklaştırmaya (deaeration) ve makine hızını korumaya dayanmalıdır. Elif Çevre Kimya, kağıt sektöründe leke ve tutkal/kaplama kusuru bırakmayan silikonsuz (non-silicone) köpük kesicileri ürün grupları arasında sunar.'
        ]
      },
      {
        heading: 'Slime Kontrolü ve Kâğıt Kopuşlarının Önlenmesi',
        paragraphs: [
          'Geri dönüşüm (atık kağıt) kullanan tesislerde kapalı devre proses suyu; nişasta, selüloz lifleri ve ılık su sıcaklığı (35–50°C) nedeniyle bakteri ve mantar üremesi için çok elverişli bir ortamdır. Boru cidarlarında ve hamur kasasında oluşan yapışkan biyofilm (slime) kütleleri belli bir kalınlığa ulaştığında koparak kağıt hamuruna karışır; bu durum yaş kısımda veya kurutma silindirlerinde ani kağıt kopuşlarına ve delik/leke hatalarına yol açar.',
          'Sitede kağıt ve ambalaj uygulamaları için hızlı etkili DBNPA biyositleri ve izotiyazolin/glutaraldehit/oksidan programları yer alır. Biyosit seçimi; suyun pH’ı, redoks potansiyeli, organik kirliliği ve temas noktalarına göre planlanmalıdır.'
        ]
      },
      {
        heading: 'Yaş Kısım Kimyasallarıyla Uyumluluk',
        paragraphs: [
          'Köpük kesici ve biyosit kararları; retansiyon polimeri, kuru/yaş mukavemet reçinesi (PAE), AKD/reçine haşıl ve nişasta gibi diğer yaş kısım kimyasallarıyla uyumlu olmalıdır. Laboratuvar denemesi ve saha mikrobiyolojik takibi yapılmadan sabit dozaj veya besleme noktası belirlenmemelidir.'
        ]
      }
    ],
    fieldChecklist: [
      'Elek altı beyaz su devresinde pH, sıcaklık, iletkenlik, ORP ve ATP/bakteri yükünün izlenmesi',
      'Kaplama ve yapıştırma uyumu için yaş kısımda silikonsuz (yağ alkolü/polimer emülsiyon) antifoam kullanımı',
      'Hamur hazırlama, temizlik duşları ve kırpıntı (broke) kulelerinde biyosit dozaj noktalarının ayrıştırılması',
      'Retansiyon polimeri ve mukavemet reçineleriyle kimyasal uyumluluk kontrolü',
      'Kağıt kopuş kayıtlarının ve elek/keçe kirliliklerinin kimyasal program trendleriyle birlikte incelenmesi'
    ],
    ctaLabel: 'Kağıt & Oluklu Mukavva Çözümlerini İnceleyin',
    ctaLink: '/sektorler/kagit-ambalaj',
    secondaryLabel: 'Köpük ve Slime Kontrolü İçin Teklif İste',
    secondaryLink: '/teklif-al?type=jar_test_trial&product=Ka%C4%9F%C4%B1t%20Sanayi%20Silikonsuz%20Antifoam%20ve%20Slime%20Biyositi',
    quoteProduct: 'Kağıt Sanayi Silikonsuz Köpük Kesici ve Slime Biyositi',
    imageAlt: 'Kağıt makinesinin yaş kısmında köpük ve proses suyu göstergelerini kontrol eden PPE’li operatör.',
    imagePromptTr: '16:9 yatay, fotogerçekçi kağıt fabrikasının yaş kısmında çalışan modern kağıt makinesi, köpük seviyesini ve proses suyu numunesini gözlemleyen operatör, baret, koruyucu gözlük, eldiven, iş ayakkabısı ve temiz koruyucu kıyafet, makine korkulukları güvenli, dökülme veya açık kimyasal transferi yok, logo ve okunabilir yazı içermesin, marka ve tabela olmasın.'
  },
  {
    number: 20,
    slug: 'sanayi-tesisinde-kimyasal-tedarik-plani-coa-sds-adr',
    category: 'sector_geothermal_supply',
    categoryLabel: 'Jeotermal, Sektörel & Tedarik',
    title: 'Sanayi Tesisinde Kimyasal Tedarik Planı Nasıl Kurulur?',
    seoTitle: 'Sanayi Tesisinde Kimyasal Tedarik Planı: COA, SDS ve ADR | Elif Çevre Kimya',
    metaDescription: 'Sanayi tesisinde kimyasal tedarik planını COA/SDS, ambalaj, stok ve ADR sevkiyat koordinasyonuyla güvenli biçimde yapılandırın.',
    keyword: 'sanayi kimyasal tedarik planı',
    keywords: [
      'sanayi kimyasal tedarik planı',
      'COA analiz sertifikası ve SDS GBF',
      'ADR belgeli kimyasal sevkiyat',
      '1000 kg IBC ve dökme tanker kimyasal',
      'Adana Çukurova endüstriyel kimyasal tedarikçisi'
    ],
    readingTime: '6 dk okuma',
    summary: 'Endüstriyel tesislerde kimyasal satınalma ve kabul süreçlerinin parti bazlı COA, güncel SDS/GBF, yoğunluk doğrulaması ve ADR sevkiyat disipliniyle kurulması.',
    sections: [
      {
        heading: 'Tedarik Planı Sipariş Miktarından Önce Teknik Dosyayla Başlar',
        paragraphs: [
          'Bir sanayi tesisinde kimyasal tedarik planı yalnızca birim fiyattan ve sipariş tonajından ibaret değildir. Ürünün aktif madde konsantrasyonu, saflık sınıfı (teknik, demir içermeyen, membran/gıda uyumlu vb.), kullanım noktası, ambalaj biçimi ve kabul kriterleri satınalma şartnamesinde açıkça tanımlanmalıdır.',
          'Parti Analiz Sertifikası (COA), teslim edilen üretim partisine (lot/batch) ait gerçek laboratuvar analiz sonuçlarını gösterirken; Güvenlik Bilgi Formu (SDS/GBF) depolama uyumluluğu, kişisel koruyucu donanım ve acil durum müdahale esaslarını belirler. Elif Çevre Kimya, teslim edilen partilerle eşleşen doğrulanmış COA ve güncel SDS/GBF paylaşımını temel operasyon standardı olarak uygular.'
        ]
      },
      {
        heading: 'Ambalaj, Yoğunluk Doğrulaması ve Emniyet Stoğu',
        paragraphs: [
          'Katalogda 25 kg torba, 30–60 kg bidon, 1.000 kg IBC tank ve dökme ADR tanker seçenekleri yer alır. Tesis, ambalaj seçimini tüketim hızı, forklift/transpalet manevra alanı, ikincil sızdırmazlık tavası (dökülme havuzu) ve dolum pompası altyapısına göre yapmalıdır. Ayrıca sıvı kimyasallarda TDS/COA üzerinde doğrulanmış özgül ağırlık (yoğunluk, g/cm³) olmadan kg ile litre arasında dönüşüm yapılmamalıdır.',
          'Emniyet stoğu seviyesi; üretim temposu, kimyasalın raf ömrü (örneğin sodyum hipokloritin sıcaklık ve güneş ışığına duyarlılığı) ve tedarik süresi dikkate alınarak belirlenmelidir. Adana Seyhan merkez depomuzdan Çukurova ve komşu OSB hatlarına sağlanan yakın lojistik erişim, fabrikaların yüksek stok tutma yükünü azaltmaya yardımcı olur.'
        ]
      },
      {
        heading: 'ADR ve Saha Kabul Koordinasyonu',
        paragraphs: [
          'Tehlikeli kimyasalların sevkiyatında UN numarası, ADR taşıma sınıfı, ambalaj etiketi, birbirini etkileyen kimyasalların (örneğin asitlerle hipoklorit veya sülfitlerin) ayrı depolanması ve dökme tanker tahliyesinde doğru dolum ağzı kilitlemesi hayati önem taşır. Teslim süresi ve sevkiyat planı sipariş öncesinde ürün, ambalaj ve varış noktasına göre teyit edilmelidir.'
        ]
      }
    ],
    fieldChecklist: [
      'Her teslimatta irsaliye/fatura üzerindeki parti (lot) numarası ile COA belgesinin eşleştirilmesi',
      'Sıvı kimyasallarda kg ↔ litre hesaplamalarının yalnızca TDS/COA üzerindeki doğrulanmış yoğunlukla (g/cm³) yapılması',
      'Asit, alkali ve oksitleyici kimyasalların birbirinden izole ikincil sızdırmazlık havuzlarında depolanması',
      'Güncel Türkçe SDS/GBF formlarının kimyasal depolama ve dozaj noktalarında erişilebilir tutulması',
      'IBC, bidon veya ADR tanker boşaltımı öncesinde vana, kaplin ve etiket doğrulama prosedürünün uygulanması'
    ],
    ctaLabel: 'Hizmet Bölgeleri & Lojistik Ağımızı İnceleyin',
    ctaLink: '/hizmet-bolgeleri',
    secondaryLabel: 'COA/SDS Güvenceli Kimyasal Tedarik Teklifi Alın',
    secondaryLink: '/teklif-al?type=order_request&product=End%C3%BCstriyel%20Kimyasal%20Tedarik%20Plan%C4%B1%20(IBC%20%2F%20Tanker)',
    quoteProduct: 'Kurumsal Kimyasal Tedarik Planı (Bidon / IBC / ADR Tanker)',
    imageAlt: 'Sanayi tesisinin kimyasal kabul alanında IBC ambalajlarını ve sevkiyat evrakını kontrol eden PPE’li görevli.',
    imagePromptTr: '16:9 yatay, fotogerçekçi sanayi tesisinde ikincil sızdırmazlık havuzlu kimyasal kabul alanı, markasız IBC konteynerleri ve güvenli mesafede paletli ambalajlar, tablet ve boş kontrol klasörüyle teslimatı denetleyen görevli, baret, koruyucu gözlük, kimyasala dayanıklı eldiven, reflektif yelek ve iş botları, forklift yolu ayrılmış, dökülme ve güvensiz taşıma yok, logo veya okunabilir yazı içermesin, marka ve tabela olmasın.'
  }
];
