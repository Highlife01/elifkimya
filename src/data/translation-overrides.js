/** Reviewed public terminology. Brand names, addresses and catalog facts stay intact. */
export const TRANSLATION_OVERRIDES = {};

const codes = ['en', 'ar', 'de', 'fr', 'ru', 'es', 'it', 'zh', 'fa'];
function core(source, values, { title = true } = {}) {
  const translations = Object.fromEntries(codes.map((code, index) => [code, values[index]]));
  TRANSLATION_OVERRIDES[source] = translations;
  if (title) TRANSLATION_OVERRIDES[`${source} | Elif Çevre Kimya`] = Object.fromEntries(
    Object.entries(translations).map(([code, value]) => [code, `${value} | Elif Çevre Kimya`])
  );
}
function technical(source, en, ar) {
  TRANSLATION_OVERRIDES[source] = { ...TRANSLATION_OVERRIDES[source], en, ar };
  if (!source.endsWith('.') && !/^\d/.test(source)) {
    TRANSLATION_OVERRIDES[`${source} | Elif Çevre Kimya`] = { en: `${en} | Elif Çevre Kimya`, ar: `${ar} | Elif Çevre Kimya` };
  }
}

core('Elif Çevre Kimya', codes.map(() => 'Elif Çevre Kimya'), { title: false });
core('Elif Kimya', codes.map(() => 'Elif Kimya'), { title: false });
core('Elif Çevre Kimya | Endüstriyel Kimya, Çevre Arıtma, Su Şartlandırma & Saf Su Cihazları', [
  'Elif Çevre Kimya | Industrial Chemicals, Wastewater Treatment, Water Treatment & Pure Water Systems',
  'Elif Çevre Kimya | كيماويات صناعية ومعالجة مياه الصرف والمياه وأنظمة المياه النقية',
  'Elif Çevre Kimya | Industriechemikalien, Abwasserbehandlung, Wasseraufbereitung und Reinwassersysteme',
  'Elif Çevre Kimya | Chimie industrielle, traitement des eaux usées, traitement de l’eau et systèmes d’eau pure',
  'Elif Çevre Kimya | Промышленная химия, очистка сточных вод, водоподготовка и системы чистой воды',
  'Elif Çevre Kimya | Química industrial, tratamiento de aguas residuales, tratamiento de agua y sistemas de agua pura',
  'Elif Çevre Kimya | Chimica industriale, trattamento delle acque reflue, trattamento acque e sistemi di acqua pura',
  'Elif Çevre Kimya | 工业化学品、废水处理、水处理与纯水设备',
  'Elif Çevre Kimya | مواد شیمیایی صنعتی، تصفیه فاضلاب، تصفیه آب و دستگاه‌های آب خالص'
], { title: false });

core('Endüstriyel & Çevre Kimyasalları', [
  'Industrial & Environmental Chemicals', 'المواد الكيميائية الصناعية والبيئية',
  'Industrie- und Umweltchemikalien', 'Produits chimiques industriels et environnementaux',
  'Промышленные и природоохранные химические реагенты', 'Productos químicos industriales y ambientales',
  'Prodotti chimici industriali e per l’ambiente', '工业与环境化学品', 'مواد شیمیایی صنعتی و محیط‌زیست'
]);
core('Endüstriyel & Çevre Kimyasalları | Soğutma Kulesi, Kazan, Jeotermal, PAC | Elif Çevre Kimya', [
  'Industrial & Environmental Chemicals | Cooling Towers, Boilers, Geothermal, PAC | Elif Çevre Kimya',
  'المواد الكيميائية الصناعية والبيئية | أبراج التبريد والغلايات والطاقة الحرارية الأرضية وPAC | Elif Çevre Kimya',
  'Industrie- und Umweltchemikalien | Kühltürme, Kessel, Geothermie, PAC | Elif Çevre Kimya',
  'Produits chimiques industriels et environnementaux | Tours de refroidissement, chaudières, géothermie, PAC | Elif Çevre Kimya',
  'Промышленные и природоохранные реагенты | Градирни, котлы, геотермальные системы, PAC | Elif Çevre Kimya',
  'Productos químicos industriales y ambientales | Torres de refrigeración, calderas, geotermia, PAC | Elif Çevre Kimya',
  'Prodotti chimici industriali e per l’ambiente | Torri di raffreddamento, caldaie, geotermia, PAC | Elif Çevre Kimya',
  '工业与环境化学品 | 冷却塔、锅炉、地热、PAC | Elif Çevre Kimya',
  'مواد شیمیایی صنعتی و محیط‌زیست | برج خنک‌کننده، دیگ بخار، زمین‌گرمایی، PAC | Elif Çevre Kimya'
], { title: false });

core('RO, EDI Su Arıtma Sistemleri ve Medipure Saf Su Cihazları', [
  'RO & EDI Water Treatment Systems and Medipure Pure Water Systems',
  'أنظمة معالجة المياه RO وEDI وأجهزة المياه النقية Medipure',
  'RO- und EDI-Wasseraufbereitung und Medipure Reinwassersysteme',
  'Systèmes de traitement de l’eau RO et EDI et systèmes d’eau pure Medipure',
  'Системы водоподготовки RO, EDI и системы чистой воды Medipure',
  'Sistemas de tratamiento de agua RO y EDI y equipos de agua pura Medipure',
  'Sistemi di trattamento acque RO ed EDI e sistemi di acqua pura Medipure',
  'RO、EDI水处理系统与Medipure纯水设备',
  'سیستم‌های تصفیه آب RO و EDI و دستگاه‌های آب خالص Medipure'
]);
core('Haddehane, Kağıt, Cam, Kalsit, Tekstil ve Jeotermal Kimyasalları', [
  'Chemicals for Rolling Mills, Paper, Glass, Calcite, Textiles & Geothermal Processes',
  'مواد كيميائية للدرفلة والورق والزجاج والكالسيت والمنسوجات والعمليات الحرارية الأرضية',
  'Chemikalien für Walzwerke, Papier, Glas, Calcit, Textilien und Geothermie',
  'Produits chimiques pour le laminage, le papier, le verre, la calcite, le textile et la géothermie',
  'Реагенты для прокатных станов, бумаги, стекла, кальцита, текстиля и геотермальных систем',
  'Productos químicos para laminación, papel, vidrio, calcita, textiles y geotermia',
  'Prodotti chimici per laminazione, carta, vetro, calcite, tessili e geotermia',
  '轧钢、造纸、玻璃、方解石、纺织与地热工艺化学品',
  'مواد شیمیایی نورد، کاغذ، شیشه، کلسیت، نساجی و فرآیندهای زمین‌گرمایی'
]);
core('Adana, Mersin, İskenderun, Gaziantep, Kayseri OSB Kimyasal Sevkiyat', [
  'Chemical Delivery to Industrial Zones in Adana, Mersin, İskenderun, Gaziantep & Kayseri',
  'توريد المواد الكيميائية إلى المناطق الصناعية في Adana وMersin وİskenderun وGaziantep وKayseri',
  'Chemikalienlieferung an Industriegebiete in Adana, Mersin, İskenderun, Gaziantep und Kayseri',
  'Livraison de produits chimiques aux zones industrielles d’Adana, Mersin, İskenderun, Gaziantep et Kayseri',
  'Доставка химикатов в промышленные зоны Adana, Mersin, İskenderun, Gaziantep и Kayseri',
  'Suministro de productos químicos a zonas industriales de Adana, Mersin, İskenderun, Gaziantep y Kayseri',
  'Fornitura di prodotti chimici alle zone industriali di Adana, Mersin, İskenderun, Gaziantep e Kayseri',
  '向Adana、Mersin、İskenderun、Gaziantep和Kayseri工业区配送化学品',
  'ارسال مواد شیمیایی به مناطق صنعتی Adana، Mersin، İskenderun، Gaziantep و Kayseri'
]);
core('Teknik Belge Merkezi (SDS / GBF, TDS, COA) ve Mühendislik Rehberi', [
  'Technical Document Center (SDS / GBF, TDS, COA) & Engineering Guides',
  'مركز الوثائق الفنية (SDS / GBF، TDS، COA) والأدلة الهندسية',
  'Technisches Dokumentenzentrum (SDS / GBF, TDS, COA) und Ingenieurleitfäden',
  'Centre de documentation technique (SDS / GBF, TDS, COA) et guides d’ingénierie',
  'Центр технической документации (SDS / GBF, TDS, COA) и инженерные руководства',
  'Centro de documentación técnica (SDS / GBF, TDS, COA) y guías de ingeniería',
  'Centro di documentazione tecnica (SDS / GBF, TDS, COA) e guide di ingegneria',
  '技术文档中心（SDS / GBF、TDS、COA）与工程指南',
  'مرکز اسناد فنی (SDS / GBF، TDS، COA) و راهنماهای مهندسی'
]);
core('Kurumsal Teklif, Canlı Jar-Test ve Su Analizi Başvurusu', [
  'Business Quotes, Live Jar Tests & Water Analysis Requests',
  'عروض الأسعار للشركات واختبارات Jar-Test المباشرة وطلبات تحليل المياه',
  'Firmenangebote, Live-Jar-Tests und Anfragen zur Wasseranalyse',
  'Devis professionnels, démonstrations Jar-Test et demandes d’analyse d’eau',
  'Коммерческие предложения, демонстрационные Jar-Test и заявки на анализ воды',
  'Presupuestos para empresas, demostraciones Jar-Test y solicitudes de análisis de agua',
  'Preventivi aziendali, dimostrazioni Jar-Test e richieste di analisi dell’acqua',
  '企业报价、现场Jar-Test演示与水质分析申请',
  'استعلام قیمت سازمانی، نمایش زنده Jar-Test و درخواست آنالیز آب'
]);
core('İletişim & Adana Merkez Depo (Ova Mah. Şakirpaşa Cd. No:269)', [
  'Contact & Adana Central Warehouse (Ova Mah. Şakirpaşa Cd. No:269)',
  'التواصل والمستودع المركزي في Adana (Ova Mah. Şakirpaşa Cd. No:269)',
  'Kontakt und Zentrallager Adana (Ova Mah. Şakirpaşa Cd. No:269)',
  'Contact et entrepôt central d’Adana (Ova Mah. Şakirpaşa Cd. No:269)',
  'Контакты и центральный склад в Adana (Ova Mah. Şakirpaşa Cd. No:269)',
  'Contacto y almacén central de Adana (Ova Mah. Şakirpaşa Cd. No:269)',
  'Contatti e magazzino centrale di Adana (Ova Mah. Şakirpaşa Cd. No:269)',
  '联系方式与Adana中央仓库（Ova Mah. Şakirpaşa Cd. No:269）',
  'تماس و انبار مرکزی Adana (Ova Mah. Şakirpaşa Cd. No:269)'
]);

technical('Seyhan/Adana merkezli Elif Çevre Kimya (www.elifcevrekimya.com.tr): endüstriyel kimyasal tedariki, çevre ve atıksu arıtma kimyasalları (PAC, Polielektrolit), soğutma kulesi ve kazan kimyasalları, jeotermal inhibitör, RO/EDI ve 163 model Medipure saf su cihazı.',
  'Elif Çevre Kimya (www.elifcevrekimya.com.tr), based in Seyhan/Adana: industrial chemicals, environmental and wastewater treatment chemicals (PAC, polyelectrolytes), cooling tower and boiler chemicals, geothermal inhibitors, RO/EDI and 163 Medipure pure water models.',
  'Elif Çevre Kimya (www.elifcevrekimya.com.tr)، ومقرها Seyhan/Adana: توريد المواد الكيميائية الصناعية والبيئية ومعالجة مياه الصرف (PAC والبولي إلكتروليت)، وكيماويات أبراج التبريد والغلايات، ومثبطات الأنظمة الحرارية الأرضية، وRO/EDI و163 طرازًا من أجهزة المياه النقية Medipure.');
technical('Soğutma kulesi, kapalı devre, kazan, jeotermal kireç inhibitörü, RO antiskalant, PAC, polielektrolit, sodyum hipoklorit, kostik soda, emülsiyon kırıcı ve köpük kesici kataloğu.',
  'Catalog of chemicals for cooling towers, closed loops and boilers, geothermal scale inhibitors, RO antiscalants, PAC, polyelectrolytes, sodium hypochlorite, caustic soda, emulsion breakers and antifoams.',
  'كتالوج كيماويات أبراج التبريد والدوائر المغلقة والغلايات، ومثبطات الترسبات الكلسية للأنظمة الحرارية الأرضية، ومضادات ترسبات RO، وPAC والبولي إلكتروليت وهيبوكلوريت الصوديوم والصودا الكاوية وكواسر المستحلبات ومضادات الرغوة.');
technical('Endüstriyel ters ozmoz (RO), EDI, ultrafiltrasyon ve 163 model Medipure laboratuvar, medikal, mobil ve endüstriyel saf su cihaz kataloğu. Kapasite su analizi ve teklifle netleşir.',
  'Industrial reverse osmosis (RO), EDI, ultrafiltration and 163 Medipure laboratory, medical, mobile and industrial pure water models. Capacity is confirmed through water analysis and the quotation.',
  'كتالوج التناضح العكسي الصناعي (RO) وEDI والترشيح الفائق و163 طرازًا من أجهزة المياه النقية Medipure للمختبرات والاستخدامات الطبية والمتنقلة والصناعية. تُحدد السعة بعد تحليل المياه وإعداد العرض.');
technical('İskenderun haddehane, Adana deterjan ve kağıt, Niğde kalsit, Kayseri galvaniz, Gaziantep tekstil ve jeotermal sera hatları için proses ve çevre kimyasal programları.',
  'Process and environmental chemical programs for rolling mills in İskenderun, detergent and paper plants in Adana, calcite in Niğde, galvanizing in Kayseri, textiles in Gaziantep and geothermal greenhouses.',
  'برامج كيماويات العمليات والبيئة لمصانع الدرفلة في İskenderun، والمنظفات والورق في Adana، والكالسيت في Niğde، والجلفنة في Kayseri، والمنسوجات في Gaziantep وخطوط البيوت المحمية الحرارية الأرضية.');
technical('Ova Mah. Şakirpaşa Cd. No:269 Seyhan/Adana merkezinden Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri ve Niğde sanayi hatlarına ADR standartlarında kimyasal sevkiyat.',
  'Chemical deliveries to industrial facilities in Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri and Niğde in accordance with ADR standards, from Ova Mah. Şakirpaşa Cd. No:269, Seyhan/Adana.',
  'شحن المواد الكيميائية وفق معايير ADR من المركز في Ova Mah. Şakirpaşa Cd. No:269، Seyhan/Adana إلى المنشآت الصناعية في Mersin وİskenderun وOsmaniye وGaziantep وKayseri وNiğde.');
technical('Kimyasal ürünlerimize ait doğrulanmış Güvenlik Bilgi Formları (SDS/GBF), Teknik Bilgi Formları (TDS), Analiz Sertifikaları (COA) ve çevre/su mühendisliği makaleleri.',
  'Verified Safety Data Sheets (SDS/GBF), Technical Data Sheets (TDS), Certificates of Analysis (COA) for our chemical products, and articles on environmental and water engineering.',
  'نشرات بيانات السلامة المعتمدة (SDS/GBF)، ونشرات البيانات الفنية (TDS)، وشهادات التحليل (COA) لمنتجاتنا الكيميائية، ومقالات في هندسة البيئة والمياه.');
technical('Fabrikanız için endüstriyel ve çevre kimyasalları fiyat teklifi, yerinde 6’lı Jar-Test, ücretsiz korozyon/LSI risk etüdü ve su arıtma sistemi projelendirme talebi oluşturun.',
  'Request an industrial and environmental chemicals quotation for your factory, an on-site six-position Jar-Test, a free corrosion/LSI risk assessment or water treatment system design.',
  'اطلب عرض أسعار للمواد الكيميائية الصناعية والبيئية لمصنعك، أو اختبار Jar-Test بستة أوعية في الموقع، أو دراسة مجانية لمخاطر التآكل وLSI، أو تصميم نظام معالجة المياه.');
technical('Elif Çevre Kimya Adana merkez ofis ve depo (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). İletişim: info@elifkimya.com.tr ve satis@elifkimya.com.tr.',
  'Elif Çevre Kimya headquarters and warehouse in Adana (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). Contact: info@elifkimya.com.tr and satis@elifkimya.com.tr.',
  'المكتب الرئيسي والمستودع لشركة Elif Çevre Kimya في Adana (Ova Mah. Şakirpaşa Cd. No:269، 01080 Seyhan/Adana). للتواصل: info@elifkimya.com.tr وsatis@elifkimya.com.tr.');

technical('Endüstriyel Su Arıtma Sistemleri', 'Industrial Water Treatment Systems', 'أنظمة معالجة المياه الصناعية');
technical('Saf Su ve Ultra Saf Su Sistemleri', 'Pure and Ultrapure Water Systems', 'أنظمة المياه النقية وفائقة النقاء');
technical('Fabrika ve Proses Kimyasalları', 'Factory and Process Chemicals', 'المواد الكيميائية للمصانع والعمليات الصناعية');
technical('Endüstriyel Ters Ozmoz (Reverse Osmosis) Sistemleri', 'Industrial Reverse Osmosis Systems', 'أنظمة التناضح العكسي الصناعية');
technical('EDI (Elektrodeiyonizasyon) & Çift Kademe Ultra Saf Su Sistemleri', 'EDI (Electrodeionization) & Two-Stage Ultrapure Water Systems', 'أنظمة EDI لنزع الأيونات كهربائيًا والمياه فائقة النقاء بمرحلتين');
technical('Ultrafiltrasyon (UF) ve İleri Ön Arıtma Sistemleri', 'Ultrafiltration (UF) & Advanced Pretreatment Systems', 'أنظمة الترشيح الفائق (UF) والمعالجة المسبقة المتقدمة');
technical('Otomatik Su Yumuşatma ve Demineralizasyon Sistemleri', 'Automatic Water Softening & Demineralization Systems', 'أنظمة تليين المياه وإزالة المعادن الأوتوماتيكية');
technical('Multimedya Kum, Aktif Karbon ve Demir-Mangan Filtrasyonu', 'Multimedia Sand, Activated Carbon & Iron-Manganese Filtration', 'الترشيح الرملي متعدد الطبقات والكربون المنشط وإزالة الحديد والمنغنيز');
technical('Otomatik Kimyasal Dozaj, Blöf ve Kule/Kazan Kontrol Üniteleri', 'Automatic Chemical Dosing, Blowdown & Cooling Tower/Boiler Control Units', 'وحدات الجرعات الكيميائية الأوتوماتيكية والتصريف والتحكم في أبراج التبريد والغلايات');
technical('Mikronize Kalsit, Maden ve Çimento Tesisleri', 'Micronized Calcite, Mining & Cement Plants', 'منشآت الكالسيت الميكروني والتعدين والأسمنت');

technical('Soğutma Kulesinde Kireç, Korozyon ve Biyolojik Kontrol', 'Scale, Corrosion & Biological Control in Cooling Towers', 'التحكم في الترسبات الكلسية والتآكل والنمو البيولوجي في أبراج التبريد');
technical('Soğutma Kulesinde Kireç, Korozyon ve Biyolojik Kontrolü Tek Programda Değerlendirmek', 'Evaluating Scale, Corrosion & Biological Control in One Cooling Tower Treatment Program', 'تقييم الترسبات الكلسية والتآكل والتحكم البيولوجي ضمن برنامج موحد لأبراج التبريد');
technical('Buhar Kazanında Çözünmüş Oksijen ve Pitting Korozyonu', 'Dissolved Oxygen & Pitting Corrosion in Steam Boilers', 'الأكسجين المذاب والتآكل النقري في الغلايات البخارية');
technical('Buhar Kazanında Çözünmüş Oksijen ve Pitting Korozyonu: Şartlandırma Yaklaşımı', 'Dissolved Oxygen & Pitting Corrosion in Steam Boilers: A Water Treatment Approach', 'الأكسجين المذاب والتآكل النقري في الغلايات البخارية: نهج معالجة المياه');
technical('Eşanjör ve Hat Temizliğinde Birikinti ile Metal Uyumu', 'Deposit Identification & Metal Compatibility in Heat Exchanger and Pipe Cleaning', 'تحديد الترسبات وتوافق المعادن عند تنظيف المبادلات الحرارية والأنابيب');
technical('Eşanjör ve Hat Temizliğinde Birikinti Türü, Metal Uyumu ve Kontrollü Plan', 'Deposit Type, Metal Compatibility & Controlled Planning for Heat Exchanger and Pipe Cleaning', 'نوع الترسبات وتوافق المعادن والتخطيط المنضبط لتنظيف المبادلات الحرارية والأنابيب');
technical('Kapalı Devre Chiller ve Kalıp Soğutma Suyunda Korozyon Yönetimi', 'Corrosion Management in Closed-Loop Chiller and Mold Cooling Water', 'إدارة التآكل في مياه تبريد المبردات والقوالب ذات الدائرة المغلقة');
technical('Kapalı Devre Chiller ve Kalıp Soğutma Suyunda Farklı Metaller İçin Korozyon Yönetimi', 'Corrosion Management for Different Metals in Closed-Loop Chiller and Mold Cooling Water', 'إدارة تآكل المعادن المختلفة في مياه تبريد المبردات والقوالب ذات الدائرة المغلقة');
technical('Endüstriyel RO Ön Arıtması: Ham Su Analizinden İşletmeye', 'Industrial RO Pretreatment: From Raw Water Analysis to Operation', 'المعالجة المسبقة لأنظمة RO الصناعية: من تحليل المياه الخام إلى التشغيل');
technical('Endüstriyel Ters Ozmoz Ön Arıtması: Ham Su Analizinden İşletmeye', 'Industrial Reverse Osmosis Pretreatment: From Raw Water Analysis to Operation', 'المعالجة المسبقة للتناضح العكسي الصناعي: من تحليل المياه الخام إلى التشغيل');
technical('RO Membran CIP Temizliği: Belirtiler, Kayıt ve Uyumluluk', 'RO Membrane CIP Cleaning: Indicators, Records & Compatibility', 'التنظيف المكاني CIP لأغشية RO: المؤشرات والسجلات والتوافق');
technical('Endüstriyel Atıksuda Koagülant Seçimi: PAC, Demir III Klorür, Alüminyum Sülfat ve Jar-Test', 'Coagulant Selection for Industrial Wastewater: PAC, Ferric Chloride, Aluminum Sulfate & Jar Tests', 'اختيار مواد التخثير لمياه الصرف الصناعي: PAC وكلوريد الحديد الثلاثي وكبريتات الألومنيوم واختبارات Jar-Test');
technical('A-PAM ile Çöktürme ve Berraklaştırma Nasıl Değerlendirilir?', 'How to Evaluate Sedimentation & Clarification with A-PAM', 'كيف يُقيّم الترسيب والترويق باستخدام A-PAM؟');
technical('A-PAM ile Çöktürme ve Berraklaştırma: Polimer, Su Karakteri ve Karıştırma', 'Sedimentation & Clarification with A-PAM: Polymer, Water Characteristics & Mixing', 'الترسيب والترويق باستخدام A-PAM: البوليمر وخصائص المياه والخلط');
technical('C-PAM ile Çamur Susuzlaştırma: Pres ve Dekantör Seçimi', 'Sludge Dewatering with C-PAM: Press & Decanter Centrifuge Selection', 'نزح مياه الحمأة باستخدام C-PAM: اختيار المكابس وأجهزة الطرد المركزي');
technical('C-PAM ile Çamur Susuzlaştırma: Filtre Pres, Belt Pres ve Dekantör Seçimi', 'Sludge Dewatering with C-PAM: Filter Press, Belt Press & Decanter Centrifuge Selection', 'نزح مياه الحمأة باستخدام C-PAM: اختيار مكابس الترشيح والمكابس الحزامية وأجهزة الطرد المركزي');
technical('Haddehane Tufal Çukuru Suyunda Çöktürme ve Geri Kazanım', 'Sedimentation & Water Recovery in Rolling Mill Scale Pits', 'الترسيب واسترجاع المياه في أحواض قشور الدرفلة');
technical('Haddehane Tufal Çukuru Suyunda Katı Madde Çöktürme ve Geri Kazanım Yaklaşımı', 'Solids Sedimentation & Water Recovery in Rolling Mill Scale Pits', 'نهج ترسيب المواد الصلبة واسترجاع المياه في أحواض قشور الدرفلة');
technical('Jeotermal Hatta Kireç, Silika ve Korozyon Riskleri', 'Scale, Silica & Corrosion Risks in Geothermal Lines', 'مخاطر الترسبات الكلسية والسيليكا والتآكل في خطوط المياه الحرارية الأرضية');
technical('Jeotermal Hatta Kireç, Silika ve Korozyon Riskleri Nasıl Değerlendirilir?', 'How to Evaluate Scale, Silica & Corrosion Risks in Geothermal Lines', 'كيف تُقيّم مخاطر الترسبات الكلسية والسيليكا والتآكل في خطوط المياه الحرارية الأرضية؟');
technical('Mikronize Kalsit Yaş Öğütmede Dispersant ve Proses Suyu', 'Dispersants & Process Water in Micronized Calcite Wet Grinding', 'المشتتات ومياه العمليات في الطحن الرطب للكالسيت الميكروني');
technical('Mikronize Kalsit Yaş Öğütmede Dispersant ve Proses Suyunun Rolü', 'The Role of Dispersants & Process Water in Micronized Calcite Wet Grinding', 'دور المشتتات ومياه العمليات في الطحن الرطب للكالسيت الميكروني');
technical('Kağıt Üretiminde Köpük ve Slime Kontrolü', 'Foam & Biological Slime Control in Paper Production', 'التحكم في الرغوة والرواسب الحيوية في إنتاج الورق');
technical('Kağıt ve Oluklu Mukavva Üretiminde Köpük ve Slime Kontrolü', 'Foam & Biological Slime Control in Paper and Corrugated Board Production', 'التحكم في الرغوة والرواسب الحيوية في إنتاج الورق والكرتون المموج');

// Keep physical quantities and chemical formulae in their original SI notation.
technical('18.2 MΩ·cm Ultra Saf Su', '18.2 MΩ·cm Ultrapure Water', 'مياه فائقة النقاء 18.2 MΩ·cm');
technical('18.2 MΩ·cm (0.055 µS/cm) Ultra Saf Su', '18.2 MΩ·cm (0.055 µS/cm) Ultrapure Water', 'مياه فائقة النقاء 18.2 MΩ·cm (0.055 µS/cm)');

const descriptionCodes = ['de', 'fr', 'ru', 'es', 'it', 'zh', 'fa'];
const descriptions = [
  ['Seyhan/Adana merkezli Elif Çevre Kimya (www.elifcevrekimya.com.tr): endüstriyel kimyasal tedariki, çevre ve atıksu arıtma kimyasalları (PAC, Polielektrolit), soğutma kulesi ve kazan kimyasalları, jeotermal inhibitör, RO/EDI ve 163 model Medipure saf su cihazı.', [
    'Elif Çevre Kimya (www.elifcevrekimya.com.tr) mit Sitz in Seyhan/Adana: Industriechemikalien, Umwelt- und Abwasserbehandlungschemikalien (PAC, Polyelektrolyte), Kühlturm- und Kesselchemikalien, Geothermie-Inhibitoren, RO/EDI und 163 Medipure Reinwassermodelle.',
    'Elif Çevre Kimya (www.elifcevrekimya.com.tr), à Seyhan/Adana : produits chimiques industriels, produits pour l’environnement et le traitement des eaux usées (PAC, polyélectrolytes), tours de refroidissement et chaudières, inhibiteurs géothermiques, RO/EDI et 163 modèles d’eau pure Medipure.',
    'Elif Çevre Kimya (www.elifcevrekimya.com.tr), Seyhan/Adana: промышленные реагенты, химия для охраны окружающей среды и очистки сточных вод (PAC, полиэлектролиты), реагенты для градирен и котлов, геотермальные ингибиторы, RO/EDI и 163 модели систем чистой воды Medipure.',
    'Elif Çevre Kimya (www.elifcevrekimya.com.tr), en Seyhan/Adana: productos químicos industriales y ambientales, tratamiento de aguas residuales (PAC, polielectrolitos), torres de refrigeración y calderas, inhibidores geotérmicos, RO/EDI y 163 modelos de agua pura Medipure.',
    'Elif Çevre Kimya (www.elifcevrekimya.com.tr), con sede a Seyhan/Adana: prodotti chimici industriali e ambientali, trattamento delle acque reflue (PAC, polielettroliti), torri di raffreddamento e caldaie, inibitori geotermici, RO/EDI e 163 modelli di acqua pura Medipure.',
    'Elif Çevre Kimya（www.elifcevrekimya.com.tr）位于Seyhan/Adana，供应工业化学品、环境与废水处理化学品（PAC、聚电解质）、冷却塔和锅炉化学品、地热阻垢缓蚀剂、RO/EDI系统及163款Medipure纯水设备。',
    'Elif Çevre Kimya (www.elifcevrekimya.com.tr) در Seyhan/Adana: تأمین مواد شیمیایی صنعتی، محیط‌زیست و تصفیه فاضلاب (PAC و پلی‌الکترولیت)، مواد شیمیایی برج خنک‌کننده و دیگ بخار، بازدارنده‌های زمین‌گرمایی، RO/EDI و 163 مدل دستگاه آب خالص Medipure.'
  ]],
  ['Soğutma kulesi, kapalı devre, kazan, jeotermal kireç inhibitörü, RO antiskalant, PAC, polielektrolit, sodyum hipoklorit, kostik soda, emülsiyon kırıcı ve köpük kesici kataloğu.', [
    'Katalog für Kühlturm-, Kreislauf- und Kesselchemikalien, geothermische Kalkinhibitoren, RO-Antiscalants, PAC, Polyelektrolyte, Natriumhypochlorit, Natronlauge, Emulsionsspalter und Entschäumer.',
    'Catalogue de produits pour tours de refroidissement, circuits fermés et chaudières, inhibiteurs de tartre géothermique, antitartres RO, PAC, polyélectrolytes, hypochlorite de sodium, soude caustique, casseurs d’émulsion et antimousses.',
    'Каталог реагентов для градирен, закрытых контуров и котлов, геотермальных ингибиторов накипи, антискалантов RO, PAC, полиэлектролитов, гипохлорита натрия, каустической соды, деэмульгаторов и пеногасителей.',
    'Catálogo de productos para torres de refrigeración, circuitos cerrados y calderas, inhibidores de incrustaciones geotérmicas, antiincrustantes RO, PAC, polielectrolitos, hipoclorito de sodio, sosa cáustica, desemulsionantes y antiespumantes.',
    'Catalogo per torri di raffreddamento, circuiti chiusi e caldaie, inibitori delle incrostazioni geotermiche, antincrostanti RO, PAC, polielettroliti, ipoclorito di sodio, soda caustica, demulsionanti e antischiuma.',
    '冷却塔、闭路系统及锅炉化学品目录，包括地热阻垢剂、RO阻垢剂、PAC、聚电解质、次氯酸钠、烧碱、破乳剂和消泡剂。',
    'کاتالوگ مواد شیمیایی برج خنک‌کننده، مدار بسته و دیگ بخار، بازدارنده رسوب زمین‌گرمایی، ضد رسوب RO، PAC، پلی‌الکترولیت، هیپوکلریت سدیم، سود سوزآور، امولسیون‌شکن و ضد کف.'
  ]],
  ['Endüstriyel ters ozmoz (RO), EDI, ultrafiltrasyon ve 163 model Medipure laboratuvar, medikal, mobil ve endüstriyel saf su cihaz kataloğu. Kapasite su analizi ve teklifle netleşir.', [
    'Industrielle Umkehrosmose (RO), EDI, Ultrafiltration und 163 Medipure Reinwassermodelle für Labor, Medizin, mobile und industrielle Anwendungen. Die Kapazität wird anhand der Wasseranalyse und im Angebot bestätigt.',
    'Osmose inverse industrielle (RO), EDI, ultrafiltration et 163 modèles d’eau pure Medipure pour laboratoires, usages médicaux, mobiles et industriels. La capacité est confirmée par l’analyse d’eau et le devis.',
    'Промышленный обратный осмос (RO), EDI, ультрафильтрация и 163 модели систем чистой воды Medipure для лабораторий, медицинского, мобильного и промышленного применения. Производительность уточняется по анализу воды и в предложении.',
    'Ósmosis inversa industrial (RO), EDI, ultrafiltración y 163 modelos de agua pura Medipure para laboratorio, uso médico, móvil e industrial. La capacidad se confirma mediante el análisis del agua y el presupuesto.',
    'Osmosi inversa industriale (RO), EDI, ultrafiltrazione e 163 modelli di acqua pura Medipure per laboratorio, uso medico, mobile e industriale. La capacità viene confermata con l’analisi dell’acqua e il preventivo.',
    '工业反渗透（RO）、EDI、超滤及163款Medipure实验室、医疗、移动和工业纯水设备目录。产水能力根据水质分析和报价确认。',
    'کاتالوگ اسمز معکوس صنعتی (RO)، EDI، اولترافیلتراسیون و 163 مدل دستگاه آب خالص آزمایشگاهی، پزشکی، سیار و صنعتی Medipure. ظرفیت با آنالیز آب و پیشنهاد قیمت مشخص می‌شود.'
  ]],
  ['İskenderun haddehane, Adana deterjan ve kağıt, Niğde kalsit, Kayseri galvaniz, Gaziantep tekstil ve jeotermal sera hatları için proses ve çevre kimyasal programları.', [
    'Prozess- und Umweltchemieprogramme für Walzwerke in İskenderun, Waschmittel- und Papierwerke in Adana, Calcit in Niğde, Verzinkung in Kayseri, Textilien in Gaziantep und geothermische Gewächshausanlagen.',
    'Programmes de chimie de procédé et de l’environnement pour le laminage à İskenderun, les détergents et le papier à Adana, la calcite à Niğde, la galvanisation à Kayseri, le textile à Gaziantep et les serres géothermiques.',
    'Программы технологической и природоохранной химии для прокатных станов İskenderun, моющих средств и бумаги в Adana, кальцита в Niğde, оцинковки в Kayseri, текстиля в Gaziantep и геотермальных теплиц.',
    'Programas de química de proceso y ambiental para laminación en İskenderun, detergentes y papel en Adana, calcita en Niğde, galvanización en Kayseri, textiles en Gaziantep e invernaderos geotérmicos.',
    'Programmi di chimica di processo e ambientale per laminazione a İskenderun, detergenti e carta ad Adana, calcite a Niğde, zincatura a Kayseri, tessili a Gaziantep e serre geotermiche.',
    '为İskenderun轧钢、Adana洗涤剂与造纸、Niğde方解石、Kayseri镀锌、Gaziantep纺织及地热温室生产线提供工艺与环境化学处理方案。',
    'برنامه‌های شیمی فرآیند و محیط‌زیست برای خطوط نورد İskenderun، شوینده و کاغذ Adana، کلسیت Niğde، گالوانیزه Kayseri، نساجی Gaziantep و گلخانه‌های زمین‌گرمایی.'
  ]],
  ['Ova Mah. Şakirpaşa Cd. No:269 Seyhan/Adana merkezinden Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri ve Niğde sanayi hatlarına ADR standartlarında kimyasal sevkiyat.', [
    'Chemikalienlieferungen gemäß ADR-Standards von Ova Mah. Şakirpaşa Cd. No:269, Seyhan/Adana an Industrieanlagen in Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri und Niğde.',
    'Livraison de produits chimiques selon les normes ADR, depuis Ova Mah. Şakirpaşa Cd. No:269, Seyhan/Adana vers les installations industrielles de Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri et Niğde.',
    'Поставка химикатов по стандартам ADR из Ova Mah. Şakirpaşa Cd. No:269, Seyhan/Adana на промышленные предприятия Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri и Niğde.',
    'Envíos de productos químicos conforme a las normas ADR desde Ova Mah. Şakirpaşa Cd. No:269, Seyhan/Adana a instalaciones industriales de Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri y Niğde.',
    'Spedizioni di prodotti chimici secondo le norme ADR da Ova Mah. Şakirpaşa Cd. No:269, Seyhan/Adana agli impianti industriali di Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri e Niğde.',
    '从Ova Mah. Şakirpaşa Cd. No:269，Seyhan/Adana向Mersin、İskenderun、Osmaniye、Gaziantep、Kayseri和Niğde工业设施按ADR标准配送化学品。',
    'ارسال مواد شیمیایی طبق استانداردهای ADR از Ova Mah. Şakirpaşa Cd. No:269، Seyhan/Adana به تأسیسات صنعتی Mersin، İskenderun، Osmaniye، Gaziantep، Kayseri و Niğde.'
  ]],
  ['Kimyasal ürünlerimize ait doğrulanmış Güvenlik Bilgi Formları (SDS/GBF), Teknik Bilgi Formları (TDS), Analiz Sertifikaları (COA) ve çevre/su mühendisliği makaleleri.', [
    'Verifizierte Sicherheitsdatenblätter (SDS/GBF), technische Datenblätter (TDS), Analysezertifikate (COA) für unsere chemischen Produkte sowie Fachartikel zur Umwelt- und Wassertechnik.',
    'Fiches de données de sécurité vérifiées (SDS/GBF), fiches techniques (TDS), certificats d’analyse (COA) de nos produits chimiques et articles d’ingénierie de l’environnement et de l’eau.',
    'Проверенные паспорта безопасности (SDS/GBF), технические листы (TDS), сертификаты анализа (COA) наших химических продуктов и статьи по экологической и водной инженерии.',
    'Fichas de datos de seguridad verificadas (SDS/GBF), fichas técnicas (TDS), certificados de análisis (COA) de nuestros productos químicos y artículos de ingeniería ambiental y del agua.',
    'Schede di sicurezza verificate (SDS/GBF), schede tecniche (TDS), certificati di analisi (COA) dei nostri prodotti chimici e articoli di ingegneria ambientale e idrica.',
    '提供化学产品经核实的安全数据表（SDS/GBF）、技术数据表（TDS）、分析证书（COA）及环境与水处理工程文章。',
    'برگه‌های اطلاعات ایمنی تأییدشده (SDS/GBF)، برگه‌های اطلاعات فنی (TDS)، گواهی‌های آنالیز (COA) محصولات شیمیایی و مقالات مهندسی محیط‌زیست و آب.'
  ]],
  ['Fabrikanız için endüstriyel ve çevre kimyasalları fiyat teklifi, yerinde 6’lı Jar-Test, ücretsiz korozyon/LSI risk etüdü ve su arıtma sistemi projelendirme talebi oluşturun.', [
    'Fordern Sie für Ihr Werk ein Angebot für Industrie- und Umweltchemikalien, einen Jar-Test mit sechs Rührstellen vor Ort, eine kostenlose Korrosions-/LSI-Risikoanalyse oder die Planung einer Wasseraufbereitungsanlage an.',
    'Demandez pour votre usine un devis de produits chimiques industriels et environnementaux, un Jar-Test à six postes sur site, une étude gratuite des risques de corrosion/LSI ou la conception d’un système de traitement de l’eau.',
    'Запросите предложение на промышленные и природоохранные реагенты для вашего предприятия, Jar-Test на шести позициях на объекте, бесплатную оценку рисков коррозии/LSI или проектирование системы водоподготовки.',
    'Solicite un presupuesto de productos químicos industriales y ambientales para su fábrica, un Jar-Test de seis posiciones in situ, un estudio gratuito del riesgo de corrosión/LSI o el diseño de un sistema de tratamiento de agua.',
    'Richiedi per il tuo stabilimento un preventivo di prodotti chimici industriali e ambientali, un Jar-Test a sei postazioni in loco, una valutazione gratuita del rischio di corrosione/LSI o la progettazione di un sistema di trattamento acque.',
    '为工厂申请工业与环境化学品报价、现场六联Jar-Test、免费腐蚀/LSI风险评估或水处理系统设计。',
    'برای کارخانه خود درخواست قیمت مواد شیمیایی صنعتی و محیط‌زیست، Jar-Test شش‌ظرفی در محل، بررسی رایگان ریسک خوردگی/LSI یا طراحی سیستم تصفیه آب ثبت کنید.'
  ]],
  ['Elif Çevre Kimya Adana merkez ofis ve depo (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). İletişim: info@elifkimya.com.tr ve satis@elifkimya.com.tr.', [
    'Hauptsitz und Lager von Elif Çevre Kimya in Adana (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). Kontakt: info@elifkimya.com.tr und satis@elifkimya.com.tr.',
    'Siège et entrepôt d’Elif Çevre Kimya à Adana (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). Contact : info@elifkimya.com.tr et satis@elifkimya.com.tr.',
    'Главный офис и склад Elif Çevre Kimya в Adana (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). Контакты: info@elifkimya.com.tr и satis@elifkimya.com.tr.',
    'Oficina central y almacén de Elif Çevre Kimya en Adana (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). Contacto: info@elifkimya.com.tr y satis@elifkimya.com.tr.',
    'Sede centrale e magazzino di Elif Çevre Kimya ad Adana (Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana). Contatti: info@elifkimya.com.tr e satis@elifkimya.com.tr.',
    'Elif Çevre Kimya在Adana的总部与仓库（Ova Mah. Şakirpaşa Cd. No:269，01080 Seyhan/Adana）。联系邮箱：info@elifkimya.com.tr、satis@elifkimya.com.tr。',
    'دفتر مرکزی و انبار Elif Çevre Kimya در Adana (Ova Mah. Şakirpaşa Cd. No:269، 01080 Seyhan/Adana). تماس: info@elifkimya.com.tr و satis@elifkimya.com.tr.'
  ]]
];
for (const [source, values] of descriptions) {
  TRANSLATION_OVERRIDES[source] = {
    ...TRANSLATION_OVERRIDES[source],
    ...Object.fromEntries(descriptionCodes.map((code, index) => [code, values[index]]))
  };
}
