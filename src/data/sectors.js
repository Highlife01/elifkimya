/**
 * Elif Kimya - Sektörel Çözümler ve Endüstriyel Fabrika Uygulama Alanları Verisi
 * Bölgesel ve Ulusal Ağır Sanayi Tesislerine Yönelik Spesifik Kimyasal Çözümler
 */

export const industrialSectors = [
  {
    id: 'kagit-karton-fabrikalari',
    category: 'paper-packaging',
    name: 'Kağıt, Karton ve Oluklu Mukavva Fabrikaları',
    badge: 'Retansiyon & Mukavemet',
    targetPlants: 'Adana AOSB (Ankutsan, Mondi Tire Kutsan), Çukurova Kağıt Tesisleri',
    desc: 'Oluklu mukavva, testliner, fluting ve temizlik kağıdı üretiminde su döngüsü şartlandırması, elyaf tutuculuğu (retansiyon), mikrobiyolojik slime kontrolü ve silikonsuz köpük kesici programları.',
    challenges: [
      'Geri dönüşümlü kağıt hamurundaki yüksek anyonik çöp yükü ve zift/yapışkan (stickies) birikintileri',
      'Hamur teknesi ve eleklerde mikro-köpüklenme kaynaklı vakum düşüşü ve kağıt gramaj dalgalanmaları',
      'Nemli ve sıcak ortamda hızla üreyen anaerobik bakterilerin yol açtığı levha kopmaları ve H₂S çürük yumurta kokusu',
      'Keçe ve şekillendirme eleklerinin reçine ve kalsiyum karbonatla tıkanarak susuzlaştırma verimini düşürmesi'
    ],
    solutions: [
      'Katyonik Poliakrilamid (C-PAM 8-12M Da) ile beyaz su elyaf kaçaklarını %60 azaltan retansiyon programı',
      'Kağıt yüzeyinde göz ve hidrofobik leke bırakmayan C16-C22 yağ alkolü bazlı silikonsuz köpük kesiciler',
      'Hızlı penetrasyon sağlayan DBNPA ve izotiyazolin bazlı slime önleyici şok mikrobiyosit dozu',
      'Keçe gözeneklerini lif yapısına zarar vermeden açan özel solvent katkılı asidik/alkali keçe kondisyonerleri',
      'Poliamidoamin-epiklorohidrin (PAE) ile neme dayanıklı kartonlarda yüksek yaş çekme mukavemeti sağlama'
    ],
    recommendedProducts: [
      'C-PAM Retansiyon Polimeri (ELIF-PAP RET-812)',
      'Silikonsuz Yağ Alkolü Köpük Kesici (ELIF-DEFOAM NF-22)',
      'Hızlı Etkili Biyosit & Slime Önleyici (ELIF-BIO DBNPA-20)',
      'Keçe & Elek Asidik/Alkali Yıkayıcı (ELIF-CLEAN FELT-PRO)',
      'PAE Yaş Mukavemet Reçinesi (ELIF-STR WET-PAE)'
    ],
    keyChemicals: ['Katyonik Poliakrilamid (C-PAM)', 'C16-C22 Yağ Alkolü Emülsiyonu', '2,2-Dibromo-3-nitrilopropionamid (DBNPA)', 'Poliamidoamin-Epiklorohidrin (PAE)']
  },
  {
    id: 'deterjan-sulfonasyon-tesisleri',
    category: 'detergent-chemical',
    name: 'Deterjan ve Sülfonasyon Üretim Tesisleri',
    badge: 'Ekzotermik Soğutma & Dispersiyon',
    targetPlants: 'Adana AOSB (Beyaz Kağıt/Peros ve Kimya Tesisleri)',
    desc: 'Lineer Alkil Benzen Sülfonik Asit (LABSA) sülfonasyon reaktör ceketleri, sprey kurutma kuleleri gaz yıkama (scrubber) hatları ve toz/sıvı deterjan proses kimyasalları.',
    challenges: [
      'Sülfonasyon reaktör ceketlerindeki yüksek ekzotermik ısı salınımı (-180 kJ/mol) nedeniyle su tarafında lokal aşırı ısınma ve şiddetli kışırlaşma',
      'Sprey kurutma kulesi siklon ve scrubber gaz yıkama devrelerinde deterjan tozuyla temas eden suyun aşırı köpürüp taşması',
      'Deterjan bulamacında inorganik tuzların (zeolit, karbonat) çökelip boru hatlarında tıkanıklık yaratması',
      'Kostik (NaOH %48-50) ve asit stok hatlarında kristalleşme ve vana kilitlenmeleri'
    ],
    solutions: [
      '120°C sıcaklıkta dahi kristal yapıyı parçalamayan PBTC ve HEDP bazlı termal kararlı kireç ve korozyon inhibitörleri',
      'Yüksek sıcaklık ve aşırı türbülans altında köpüğü milisaniyeler içinde bastıran silikonsuz yüksek debi köpük kesicileri',
      'Sodyum Poliakrilat homopolimeri ve Akrilik/Maleik kopolimerleri ile yüksek anti-redepozisyon ve homojen süspansiyon sağlama',
      'Reaktör ve transfer hatları için EDTA/GLDA şelatlayıcı takviyeli konsantre CIP kostik temizleyicileri'
    ],
    recommendedProducts: [
      'Termal Kararlı Fosfonat Soğutma İnhibitörü (ELIF-COOL PBTC-30)',
      'Scrubber Gaz Yıkama Köpük Önleyici (ELIF-SCRUB FOAM-X)',
      'Sodyum Poliakrilat Dispersant (ELIF-DISP POLY-45)',
      'Konsantre CIP Kostik Şelatlayıcı (ELIF-CLEAN NAOH-PLUS)'
    ],
    keyChemicals: ['2-Fosfonobütan-1,2,4-trikarboksilik asit (PBTC)', 'Sodyum Poliakrilat (MW 4500 Da)', 'Akrilik/Maleik Kopolimer', 'HEDP & Çinko Fosfonat']
  },
  {
    id: 'cam-sanayi-sisecam',
    category: 'glass-mining',
    name: 'Cam Sanayi ve Düzcam Üretim Tesisleri',
    badge: 'Float Banyo & Yüksek Saflık',
    targetPlants: 'Mersin MTOSB (Şişecam Düzcam, Cam Ambalaj), Tarsus Düzcam Fabrikası',
    desc: 'Float cam eritme fırınları, kalay banyosu elektrot ceketleri, CNC cam rodaj/delme soğutma sıvıları ve lekesiz cam yıkama demineralize su kimyasalları.',
    challenges: [
      'Float banyosu erimiş kalay üzerindeki elektrotların soğutma ceketlerinde galvanik korozyon ve ark riski (<0.1 µS/cm saf su zorunluluğu)',
      'Cam yıkama hatlarında suyun buharlaşmasıyla oluşan mineral lekeleri, harelenme ve kaplama öncesi film kalıntıları',
      'Cam kesme, kenar rodaj ve delme istasyonlarında aşırı sürtünme ısısı, takım aşınması ve cam tozu çamurunun recirculate suya karışması',
      'Cam şekillendirme kalıplarında yüksek sıcaklıkta kömürleşen kalıp yağları'
    ],
    solutions: [
      'Nitritsiz, saf suyla tam uyumlu Sodyum Molibdat (Na₂MoO₄) bazlı kapalı devre elektrot korozyon şartlandırması',
      'Ters Ozmoz (RO) sonrası son durulama banyolarında sıfır leke bırakan non-iyonik yüzey gerilimi düşürücü durulama ajanları',
      'Cam tozunu hızlıca pıhtılaştırıp çöktüren, elmas taş ömrünü %35 uzatan biostabil sentetik rodaj soğutma kimyasalları',
      'Yüksek sıcaklığa dayanıklı, kalıpta tortu bırakmayan sentetik grafit/ester emülsiyonlu kalıp ayırıcı lubrikantlar'
    ],
    recommendedProducts: [
      'Nitritsiz Kapalı Devre Molibdat İnhibitörü (ELIF-MOLY INHIB-50)',
      'Cam Yıkama Leke Önleyici Son Durulama (ELIF-RINSE GLASS-PRO)',
      'Sentetik Cam Rodaj & Delme Soğutma Sıvısı (ELIF-COOL GRIND-SYN)',
      'Sentetik Cam Kalıp Ayırıcı Emülsiyon (ELIF-LUBE MOLD-HT)'
    ],
    keyChemicals: ['Sodyum Molibdat (Na₂MoO₄)', 'Sentetik Polimerik Rodaj Lubrikantı', 'Florosürfaktan / Non-iyonik Durulama Ajanı', 'Yüksek Saflıkta RO Antiskalantı']
  },
  {
    id: 'demir-celik-haddehane',
    category: 'heavy-industry',
    name: 'Demir-Çelik Haddaneleri ve Ağır Metalurji',
    badge: 'Pickling & Tufal Flokülasyonu',
    targetPlants: 'Osmaniye OSB (Tosyalı Holding), Hatay İskenderun (İSDEMİR, MMK Metalurji, Koç Metalurji, Payas Haddehaneleri)',
    desc: 'Sıcak ve soğuk haddehaneler, %20 HCl asitleme (pickling) hatları, tufal çukuru (scale pit) su arıtımı ve sürekli döküm kalıp soğutma devreleri şartlandırması.',
    challenges: [
      'Pickling hatlarında %15-20 sıcak HCl asit banyosunun pas yerine ana metale saldırarak aşırı çelik kaybına ve yıllık on milyonlarca liralık asit israfına yol açması',
      'Haddehane tufal çukurlarında (scale pit) ağır demir tufalı ve serbest yağın çökmeyerek pompa çarklarını aşındırması ve nozulları tıkaması',
      'Sürekli döküm makinelerinde bakır kristalizatör kalıpların termal şok korozyonuna uğraması ve demir oksit birikintisiyle delinmesi',
      'Hadde soğutma suyuna karışan kaçak yağların emülsiyon yaparak soğutma verimini düşürmesi'
    ],
    solutions: [
      'Mannich bazı ve propargil alkol içeren, %20 HCl\'de %98 metal koruma verimi sağlayan ve asit sarfiyatını %25 azaltan pickling inhibitörü',
      'Ultra yüksek molekül ağırlıklı (24 Milyon Dalton) Anyonik Poliakrilamid (A-PAM) ile demir tufalını 30 saniyede floküle eden çöktürme programı',
      'AA/AMPS akrilik terpolimer ve yüksek sıcaklık fosfonatlarıyla kalıp nozullarını tıkanmasız tutan sürekli döküm şartlandırması',
      'Hadde suyundan hidrolik ve yağlama yağlarını hızla ayıran katyonik de-emülgatör kimyasalları'
    ],
    recommendedProducts: [
      'HCl Asitleme Korozyon İnhibitörü (ELIF-PICKLE INHIB-HCl)',
      'Tufal Çukuru Ultra Anyonik Flokülant (ELIF-FLOC APAM-24M)',
      'Sürekli Döküm Kalıp Şartlandırıcı (ELIF-CAST MOLD-COOL)',
      'Hadde Yağ Ayrıştırıcı Katyonik Polimer (ELIF-DEGREASE OIL-SEP)'
    ],
    keyChemicals: ['Mannich Bazı Türevleri', 'Propargil Alkol', 'Ultra Anyonik PAM (MW 24M Da, IV > 16 dl/g)', 'AA/AMPS Akrilik Terpolimer']
  },
  {
    id: 'kalsit-maden-mikronizasyon',
    category: 'glass-mining',
    name: 'Maden Zenginleştirme ve Mikronize Kalsit Tesisleri',
    badge: 'Islak Öğütme & Reoloji',
    targetPlants: 'Niğde Maden Bölgesi (Omya Madencilik, Niğtaş, Mikron’S), Çukurova Agrega Tesisleri',
    desc: 'Mikronize kalsit (CaCO₃) yaş öğütme bilyalı değirmenleri, yüksek katı maddeli süspansiyon dispersiyonu, çökme önleyici reoloji ve filtre pres susuzlaştırma kimyasalları.',
    challenges: [
      'Yaş kalsit öğütme değirmenlerinde %65 katı madde aşıldığında süspansiyonun aşırı viskoz hale gelip değirmeni tıkaması ve motorları zorlaması',
      'Yüksek viskozite nedeniyle öğütme enerjisinin (kWh/ton) fırlaması ve bilya aşınma maliyetlerinin artması',
      'Üretilen kalsit bulamacının nakliye ve depolama tanklarında dibe çökerek katılaşması (sedimentasyon)',
      'Maden atık suyu arıtımında kalsit çamurunun filtre pres bezlerine yapışarak kek bırakmaması'
    ],
    solutions: [
      'Düşük molekül ağırlıklı (MW: 3.500 - 4.500 Da) ultra saf Sodyum Poliakrilat homopolimeri ile süspansiyonu akışkanlaştırarak katı maddeyi %75\'e çıkarma',
      'Değirmen viskozite direncini kırarak ton başına elektrik tüketimini %18-25 oranında net düşürme',
      'Tiksotropik kararlılık sağlayan reoloji modifiyerleriyle bulamacın 6 ay boyunca homojen kalmasını sağlama',
      'Maden filtre presleri için yüksek moleküllü katyonik/anyonik polimerlerle kuru kek ve berrak filtrat eldesi'
    ],
    recommendedProducts: [
      'Islak Öğütme Sodyum Poliakrilat Dispersantı (ELIF-DISP CALC-4500)',
      'Kalsit Süspansiyon Reoloji Modifiyeri (ELIF-RHEO FLOW-PLUS)',
      'Maden Filtre Pres Çamur Flokülantı (ELIF-FLOC MINE-DRY)',
      'Bilyalı Değirmen Korozyon Önleyici (ELIF-MILL INHIB-PRO)'
    ],
    keyChemicals: ['Düşük MW Sodyum Poliakrilat (MW 3500-4500 Da)', 'Karboksimetil Selüloz Reoloji Modifiyeri', 'Yüksek Moleküllü Maden Polielektrolitleri']
  },
  {
    id: 'metal-yuzey-islem',
    category: 'heavy-industry',
    name: 'Metal, Çelik ve Yüzey İşlem Tesisleri',
    badge: 'Fosfatlama & Boya Kabini',
    targetPlants: 'Kayseri OSB (Metal Mobilya & Çelik Kapı), Adana & Osmaniye Sanayi Siteleri',
    desc: 'Elektrostatik toz boya öncesi daldırma/püskürtme yağ alma, demir ve çinko fosfatlama banyoları, pasivasyon ve sulu boya kabinleri boya çürütücü kimyasalları.',
    challenges: [
      'Ağır gres, korozyon önleyici yağlar ve tufal tabakalarının boyanın metale yapışmasını engelleyip kabarmaya yol açması',
      'Fosfatlama banyolarında sıcaklık dalgalanmasıyla homojen olmayan kaplama ağırlığı ve düşük tuz sisi direnci',
      'Sulu boya kabini sirkülasyon suyunun aşırı boya tutarak nozulları tıkaması ve yapışkan çamurun kabini kaplaması',
      'Kaplama banyoları yıkama sularındaki çinko, nikel ve demir iyonlarının çevre deşarj limitlerini aşması'
    ],
    solutions: [
      'Alkali ve asidik daldırma/püskürtme ağır yağ sökücüler ve silikat katkılı temizleyiciler',
      '500+ saat tuz sisi dayanımı sağlayan nano-seramik ve mikrokristalin çinko/demir fosfatlama banyoları',
      'Boya partiküllerinin yapışkanlığını sıfırlayarak su yüzeyinde kek halinde toplayan melamin/koagülant bazlı boya çürütücü ikilisi',
      'Ağır metalleri şelatlayıp 0.1 mg/L altına indiren organik ditiyokarbamat metal çöktürücüleri'
    ],
    recommendedProducts: [
      'Ağır Yağ Sökücü ve Pasivasyon (ELIF-DEGREASE PRO)',
      'Mikrokristalin Demir Fosfatlama (ELIF-PHOS IRON)',
      'Sulu Boya Kabini Boya Çürütücü (ELIF-DETACK PAINT-KAB)',
      'Ağır Metal Bağlayıcı Çöktürücü (ELIF-MET-PRECIP)'
    ],
    keyChemicals: ['Demir/Çinko Fosfatlama Bileşikleri', 'Melamin-Formaldehit Boya Çürütücü Reçine', 'Sodyum Dimetilditiyokarbamat (DTC)', 'Zirkonyum Esaslı Nano-Kaplama']
  },
  {
    id: 'gida-uretim-tesisleri',
    category: 'food-textile',
    name: 'Gıda ve İçecek Üretim Tesisleri',
    badge: 'HACCP & Gıda Uygunluğu',
    targetPlants: 'Çukurova Narenciye Tesisleri, Mersin Bakliyat İşleme, Adana Gıda OSB',
    desc: 'CIP hatları, buhar kazanları, pasteurizasyon tünelleri ve evaporatif soğutma kuleleri için gıda kodeksine (FDA / USDA / Helal) uygun şartlandırma kimyasalları.',
    challenges: [
      'Gıda temaslı buhar hatlarında toksik amin kullanımının yasak olması ve korozyon riski',
      'CIP yıkama hatlarında süt taşı, protein ve mineral birikintilerinin bakteri üremesine zemin hazırlaması',
      'Pastörizasyon ve otoklav soğutma sularında kutu/şişe üzerinde kireç ve pas lekesi kalması',
      'Yüksek organik yük içeren (yüksek KOİ/BOİ) yıkama atık sularının biyolojik arıtmada köpürmesi'
    ],
    solutions: [
      'FDA 21 CFR 173.310 gıda onaylı buhar kazanı şartlandırıcıları ve uçucu olmayan oksijen tutucular',
      'Düşük köpüklü, enzimatik takviyeli konsantre kostik ve fosforik/nitrik asitli CIP yıkama solüsyonları',
      'Ambalaj üzerinde su lekesi bırakmayan gıda kalitesinde antiskalant ve yüzey parlatıcı katkılar',
      'Biyolojik deşarjı dengeleyen gıda uyumlu silikonsuz köpük kesiciler ve koagülantlar'
    ],
    recommendedProducts: [
      'Gıda Onaylı Buhar Şartlandırıcı (ELIF-BOIL FOOD-FDA)',
      'Enzimatik CIP Alkali Yıkayıcı (ELIF-CLEAN CIP-ALK)',
      'Gıda Sınıfı Kireç ve Tortu Önleyici (ELIF-SCALE FOOD-SAFE)',
      'Gıda Tipi Silikonsuz Köpük Kesici (ELIF-DEFOAM FOOD-OIL)'
    ],
    keyChemicals: ['Sodyum Sülfit (Gıda Sınıfı)', 'Poliakrilat (Gıda Uygun)', 'Nitrik & Fosforik Asit CIP Formülü', 'Organik Yağ Asidi Köpük Kesiciler']
  },
  {
    id: 'tekstil-fabrikalari',
    category: 'food-textile',
    name: 'Tekstil Fabrikaları ve Boyahaneler',
    badge: 'Renk Giderme & RO Geri Kazanım',
    targetPlants: 'Kahramanmaraş Tekstil İhtisas, Gaziantep OSB, Adana Tekstil Üreticileri',
    desc: 'Boyahane proses suyu hazırlığı, kumaş yıkama suları geri kazanımı, reaktif azo boyaları renk giderme ve RO membran koruma kimyasalları.',
    challenges: [
      'Kumaş boyama banyolarında su sertliğine ve demir izlerine bağlı renk abrajı, ton farkı ve lekelenme',
      'Tekstil deşarj suyundaki inatçı reaktif azo boyalarının biyolojik arıtmada parçalanmayıp çevre cezasını tetiklemesi',
      'Aşırı su tüketim maliyeti ve atık suyu prosese geri döndürmek için gereken RO membranlarının silika ve boyayla tıkanması',
      'Yüksek iletkenlik ve sülfat yükünün biyolojik aktif çamuru zehirlemesi'
    ],
    solutions: [
      'Sertlik ve ağır metalleri maskeleyen yüksek kapasiteli organik şelatlayıcı ve iyon bağlayıcılar',
      'Dicyandiamide bazlı yüksek verimli polimerik renk gidericiler (%98 renk berraklaştırma garantisi)',
      'Atık su geri kazanım RO sistemleri için yüksek silika ve organik kirlilik toleranslı antiskalantlar',
      'Membranlarda biriken boya ve organik yükü çözen pH 11 enzimatik CIP yıkama kimyasalları'
    ],
    recommendedProducts: [
      'Polimerik Renk Giderici (ELIF-COLOR DECOLOR-99)',
      'RO Yüksek Silika Antiskalantı (ELIF-SCALE RO-HI)',
      'İyon Bağlayıcı & Şelatlayıcı (ELIF-CHELAT TEXTILE)',
      'Katyonik Çamur Susuzlaştırma Polimeri (ELIF-FLOC CPAM-TEXT)'
    ],
    keyChemicals: ['Dicyandiamide-Formaldehit Polimeri', 'Fosfonobütan Trikarboksilik Asit', 'Poli Alüminyum Klorür (PAC)', 'EDTA/GLDA Organik Şelatlar']
  },
  {
    id: 'kimya-sanayi',
    category: 'detergent-chemical',
    name: 'Kimya ve Petrokimya Tesisleri',
    badge: 'Reaktör Güvenliği & Termal Kararlılık',
    targetPlants: 'Ceyhan Enerji İhtisas Bölgesi, Mersin Serbest Bölge Kimya Tesisleri',
    desc: 'Reaktör soğutma ceketleri, kapalı devre ısı transfer sistemleri, agresif kimyasal hatları ve patlama/yangın emniyeti şartlandırması.',
    challenges: [
      'Paslanmaz çelik, karbon çelik ve bakır alaşımlarının bir arada kullanıldığı reaktörlerde şiddetli galvanik korozyon',
      'Yüksek sıcaklık ve ağır kimyasal buharları altında soğutma kulelerinde organik film ve aşırı kışırlaşma',
      'Reaktör verimini ve ısı transfer katsayısını düşüren silt ve polimerik kalıntı birikintileri',
      'Atık su arıtma tesisinde toksik kimyasal şokları nedeniyle biyolojik bakterilerin ölmesi'
    ],
    solutions: [
      'Geniş pH toleranslı molibdat/azol bazlı kapalı devre korozyon inhibitörleri (sıfır kavitasyon ve metal kaybı)',
      '120°C üzeri reaktör sıcaklıklarına dayanıklı sentetik kopolimer dispersantlar',
      'Biyolojik tesisi zehirlenmeye karşı koruyan koagülasyon ve adsorpsiyon kimyasal ön arıtması',
      'Tesis ihtiyacına özel laboratuvarımızda AR-GE edilip sentezlenen fabrika spesifik reçeteler'
    ],
    recommendedProducts: [
      'Kapalı Devre Korozyon İnhibitörü (ELIF-CLOSE-CIRCUIT)',
      'Yüksek Sıcaklık Dispersantı (ELIF-DISP THERMO-120)',
      'Petrokimya Koagülantı (ELIF-COAG PETRO-PLUS)',
      'Özel Formülasyon Reçeteleri'
    ],
    keyChemicals: ['Sodyum Molibdat & Toliltriazol', 'Polikarboksilat Kopolimeri', 'Organik Katyonik Koagülant', 'Katalizli Oksijen Süpürücüler']
  },
  {
    id: 'enerji-tesisleri',
    category: 'energy',
    name: 'Enerji Tesisleri ve Termik Santraller',
    badge: 'Yüksek Basınç & Buhar Saflığı',
    targetPlants: 'İskenderun & Çukurova Termik Santralleri, Kojenerasyon Tesisleri',
    desc: '60+ bar yüksek basınçlı buhar kazanları, türbin kondens hatları, mega soğutma kuleleri ve saf su demineralizasyon (EDI) tesisleri yönetimi.',
    challenges: [
      'Yüksek basınçta buhar fazına taşınan silikanın türbin kanatlarında camlaşarak megavat kaybına yol açması',
      'Kondens hatlarındaki karbonik asit kaynaklı boru çürümeleri ve kazana demir oksit çamuru dönüşü',
      'Mega soğutma kulelerinde buharlaşmayla mineral birikmesi ve Legionella bakterisi riski',
      'Demineralize su ünitesindeki iletkenlik kaçaklarının kazanda anında tüp patlamasına neden olması'
    ],
    solutions: [
      'Kazan suyunda sıfır katı bırakan uçucu oksijen tutucular (DEHA) ve film yapıcı poliaminler',
      'Kondens hattı pH değerini 9.0 seviyesinde sabit tutan çok bileşenli nötralize edici amin karışımları',
      'Elektro-deiyonizasyon (EDI) ve çift kademe RO ile iletkenliği <0.08 µS/cm seviyesinde tutan arıtma programı',
      'Otomatik kule blöf ve biyosit dozaj otomasyonu ile sıfır kimyasal israfı ve tam Lejyonella güvenliği'
    ],
    recommendedProducts: [
      'Uçucu Oksijen Tutucu (ELIF-OXY DEHA-VOLATILE)',
      'Kondens Koruma Çoklu Amin (ELIF-COND MULTI-AMINE)',
      'Elektro-deiyonizasyon (EDI) Saf Su Sistemleri',
      'Yüksek Basınç Dispersantı (ELIF-DISP HP-BOIL)'
    ],
    keyChemicals: ['Dietilhidroksilamin (DEHA)', 'Morfolin & Sikloheksilamin', 'Oktadesilamin (Film Yapıcı)', 'Akrilik Asit Terpolimeri']
  }
];

export const sectorCategories = [
  { id: 'all', name: 'Tüm Sektörler (10)' },
  { id: 'heavy-industry', name: 'Ağır Sanayi & Metalurji' },
  { id: 'paper-packaging', name: 'Kağıt & Ambalaj' },
  { id: 'detergent-chemical', name: 'Deterjan & Kimya' },
  { id: 'glass-mining', name: 'Cam & Madencilik' },
  { id: 'food-textile', name: 'Gıda & Tekstil' },
  { id: 'energy', name: 'Enerji & Buhar' }
];
