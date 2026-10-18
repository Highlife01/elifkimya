/**
 * Çok Dilli Arayüz ve Tam Sayfa Otomatik Çeviri Motoru (10 Dil: TR, EN, AR, DE, FR, RU, ES, IT, ZH, FA).
 * Yalnızca seçilen dil kodu saklanır; müşteri, teklif veya stok verisi yazılmaz.
 */

const UI_LANG_KEY = 'elifkimya-ui-lang';

export const LANGUAGES = [
  { code: 'tr', apiCode: 'tr', native: 'Türkçe', english: 'Turkish', dir: 'ltr' },
  { code: 'en', apiCode: 'en', native: 'English', english: 'English', dir: 'ltr' },
  { code: 'ar', apiCode: 'ar', native: 'العربية', english: 'Arabic', dir: 'rtl' },
  { code: 'de', apiCode: 'de', native: 'Deutsch', english: 'German', dir: 'ltr' },
  { code: 'fr', apiCode: 'fr', native: 'Français', english: 'French', dir: 'ltr' },
  { code: 'ru', apiCode: 'ru', native: 'Русский', english: 'Russian', dir: 'ltr' },
  { code: 'es', apiCode: 'es', native: 'Español', english: 'Spanish', dir: 'ltr' },
  { code: 'it', apiCode: 'it', native: 'Italiano', english: 'Italian', dir: 'ltr' },
  { code: 'zh', apiCode: 'zh-CN', native: '中文', english: 'Chinese', dir: 'ltr' },
  { code: 'fa', apiCode: 'fa', native: 'فارسی', english: 'Persian', dir: 'rtl' }
];

const UI = {
  nav_home: { tr: 'Ana Sayfa', en: 'Home', ar: 'الرئيسية', de: 'Start', fr: 'Accueil', ru: 'Главная', es: 'Inicio', it: 'Home', zh: '首页', fa: 'خانه' },
  nav_products: { tr: 'Ürünler', en: 'Products', ar: 'المنتجات', de: 'Produkte', fr: 'Produits', ru: 'Продукты', es: 'Productos', it: 'Prodotti', zh: '产品', fa: 'محصولات' },
  nav_systems: { tr: '360° Su Arıtma', en: '360° Water Systems', ar: 'أنظمة معالجة المياه 360°', de: '360° Wassertechnik', fr: 'Traitement d’eau 360°', ru: '360° Водоподготовка', es: 'Sistemas de Agua 360°', it: 'Sistemi Idrici 360°', zh: '360° 水处理系统', fa: 'تصفیه آب ۳۶۰ درجه' },
  nav_sectors: { tr: 'Sektörler', en: 'Sectors', ar: 'القطاعات', de: 'Branchen', fr: 'Secteurs', ru: 'Отрасли', es: 'Sectores', it: 'Settori', zh: '行业', fa: 'صنایع' },
  nav_regions: { tr: 'Bölgeler', en: 'Regions', ar: 'المناطق', de: 'Regionen', fr: 'Régions', ru: 'Регионы', es: 'Regiones', it: 'Regioni', zh: '地区', fa: 'مناطق' },
  nav_contact: { tr: 'İletişim', en: 'Contact', ar: 'اتصل بنا', de: 'Kontakt', fr: 'Contact', ru: 'Контакты', es: 'Contacto', it: 'Contatto', zh: '联系我们', fa: 'تماس با ما' },
  cta_quote: { tr: 'Teklif İsteyin', en: 'Request a Quote', ar: 'اطلب عرض سعر', de: 'Angebot anfragen', fr: 'Demander un devis', ru: 'Запросить цену', es: 'Pedir oferta', it: 'Richiedi offerta', zh: '索取报价', fa: 'درخواست قیمت' },
  portal: { tr: 'Portal', en: 'Portal', ar: 'البوابة', de: 'Portal', fr: 'Portail', ru: 'Портал', es: 'Portal', it: 'Portale', zh: '门户', fa: 'پورتال' },
  portal_long: { tr: 'Müşteri Portalı', en: 'Client Portal', ar: 'بوابة العملاء', de: 'Kundenportal', fr: 'Portail client', ru: 'Портал клиента', es: 'Portal de clientes', it: 'Portale clienti', zh: '客户门户', fa: 'پورتال مشتری' },
  lang_search: { tr: 'Dil ara', en: 'Search languages', ar: 'ابحث عن لغة', de: 'Sprache suchen', fr: 'Chercher une langue', ru: 'Поиск языка', es: 'Buscar idioma', it: 'Cerca lingua', zh: '搜索语言', fa: 'جستجوی زبان' },
  lang_empty: { tr: 'Bu aramaya uyan dil yok.', en: 'No language matches.', ar: 'لا توجد لغة مطابقة.', de: 'Keine Sprache gefunden.', fr: 'Aucune langue trouvée.', ru: 'Язык не найден.', es: 'Ningún idioma coincide.', it: 'Nessuna lingua trovata.', zh: '没有匹配的语言。', fa: 'زبانی پیدا نشد.' },
  lang_menu: { tr: 'Dil seçin', en: 'Choose language', ar: 'اختر اللغة', de: 'Sprache wählen', fr: 'Choisir la langue', ru: 'Выбрать язык', es: 'Elegir idioma', it: 'Scegli lingua', zh: '选择语言', fa: 'انتخاب زبان' },
  search_products: { tr: 'Ticari ad, kimyasal ad, CAS no veya kullanım alanı ara...', en: 'Search trade name, chemical name, CAS or use...', ar: 'ابحث بالاسم التجاري أو الكيميائي أو CAS...', de: 'Handelsname, Chemie, CAS oder Einsatz suchen...', fr: 'Nom commercial, nom chimique, CAS ou usage...', ru: 'Торговое имя, химия, CAS или применение...', es: 'Nombre comercial, químico, CAS o uso...', it: 'Nome commerciale, chimico, CAS o uso...', zh: '搜索商品名、化学名、CAS 或用途...', fa: 'جستجوی نام تجاری، شیمیایی، CAS یا کاربرد...' },
  search_medipure: { tr: 'Model kodu, cihaz adı veya kapasite ara. Örn: DT-5012, pure water', en: 'Search model, device or capacity. e.g. DT-5012, pure water', ar: 'ابحث عن الطراز أو الجهاز. مثال: DT-5012', de: 'Modell, Gerät oder Leistung suchen. z. B. DT-5012', fr: 'Modèle, appareil ou débit. Ex. DT-5012', ru: 'Модель, прибор или производительность. DT-5012', es: 'Modelo, equipo o caudal. Ej. DT-5012', it: 'Modello, apparecchio o portata. Es. DT-5012', zh: '搜索型号、设备或产水。例如 DT-5012', fa: 'جستجوی مدل، دستگاه یا ظرفیت. نمونه DT-5012' },
  all_groups: { tr: 'Tüm gruplar', en: 'All groups', ar: 'كل المجموعات', de: 'Alle Gruppen', fr: 'Tous les groupes', ru: 'Все группы', es: 'Todos los grupos', it: 'Tutti i gruppi', zh: '全部分组', fa: 'همه گروه‌ها' },
  all_product_groups: { tr: 'Tüm Ürün Grupları', en: 'All product groups', ar: 'كل مجموعات المنتجات', de: 'Alle Produktgruppen', fr: 'Tous les groupes', ru: 'Все группы', es: 'Todos los grupos', it: 'Tutti i gruppi', zh: '全部产品组', fa: 'همه گروه‌های محصول' },
  footer_tagline: {
    tr: 'Endüstriyel proses kimyasalları, su şartlandırma ve saf su cihazları',
    en: 'Industrial process chemicals, water treatment and pure-water systems',
    ar: 'كيماويات العمليات الصناعية وأنظمة المياه النقية',
    de: 'Prozesschemikalien, Wasseraufbereitung und Reinstwasser',
    fr: 'Chimie de procédé, traitement d’eau et eau pure',
    ru: 'Промышленная химия, водоподготовка и чистая вода',
    es: 'Química de proceso, tratamiento de agua y agua pura',
    it: 'Chimica di processo, trattamento acque e acqua pura',
    zh: '工业过程化学品、水处理与纯水设备',
    fa: 'شیمی فرآیند، تصفیه آب و دستگاه آب خالص'
  },
  footer_groups: { tr: 'Ürün ve sistemler', en: 'Products and systems', ar: 'المنتجات والأنظمة', de: 'Produkte und Systeme', fr: 'Produits et systèmes', ru: 'Продукты и системы', es: 'Productos y sistemas', it: 'Prodotti e sistemi', zh: '产品与系统', fa: 'محصولات و سیستم‌ها' },
  footer_corporate: { tr: 'Kurumsal', en: 'Company', ar: 'الشركة', de: 'Unternehmen', fr: 'Société', ru: 'Компания', es: 'Empresa', it: 'Azienda', zh: '公司', fa: 'شرکت' },
  footer_regions: { tr: 'Bölge ve portal', en: 'Regions and portal', ar: 'المناطق والبوابة', de: 'Regionen und Portal', fr: 'Régions et portail', ru: 'Регионы и портал', es: 'Regiones y portal', it: 'Regioni e portale', zh: '地区与门户', fa: 'مناطق و پورتال' }
};

/**
 * Sık kullanılan arayüz ifadeleri için 0ms anlık çeviri sözlüğü
 */
const INSTANT_PHRASES = {
  'Soğutma Kulesi Kimyasalları': {
    en: 'Cooling Tower Chemicals', ar: 'كيماويات أبراج التبريد', de: 'Kühlturmchemikalien', fr: 'Produits pour tours de refroidissement', ru: 'Химия для градирен', es: 'Químicos para torres de enfriamiento', it: 'Prodotti per torri di raffreddamento', zh: '冷却塔化学品', fa: 'مواد شیمیایی برج خنک‌کننده'
  },
  'Buhar Kazanı & Kondens Kimyasalları': {
    en: 'Steam Boiler & Condensate Chemicals', ar: 'كيماويات الغلايات البخارية والمكثفات', de: 'Dampfkessel- & Kondensatchemikalien', fr: 'Produits chaudières à vapeur & condensats', ru: 'Химия для паровых котлов и конденсата', es: 'Químicos para calderas y condensados', it: 'Prodotti per caldaie a vapore e condensa', zh: '蒸汽锅炉与冷凝水化学品', fa: 'مواد شیمیایی دیگ بخار و کندانس'
  },
  'Jeotermal Su Şartlandırma': {
    en: 'Geothermal Water Treatment', ar: 'معالجة المياه الحرارية الأرضية', de: 'Geothermische Wasseraufbereitung', fr: 'Traitement des eaux géothermiques', ru: 'Геотермальная водоподготовка', es: 'Tratamiento de agua geotérmica', it: 'Trattamento acque geotermiche', zh: '地热水处理', fa: 'تصفیه آب زمین‌گرمایی'
  },
  'Medipure Saf Su Cihazları': {
    en: 'Medipure Pure Water Systems', ar: 'أجهزة المياه النقية Medipure', de: 'Medipure Reinstwassersysteme', fr: 'Systèmes d’eau pure Medipure', ru: 'Системы чистой воды Medipure', es: 'Sistemas de agua pura Medipure', it: 'Sistemi acqua pura Medipure', zh: 'Medipure 纯水设备', fa: 'دستگاه‌های آب خالص Medipure'
  },
  'Ters Ozmoz (RO), UF & EDI Sistemleri': {
    en: 'Reverse Osmosis (RO), UF & EDI Systems', ar: 'أنظمة التناضح العكسي (RO) و UF و EDI', de: 'Umkehrosmose (RO), UF & EDI Systeme', fr: 'Systèmes Osmose Inverse (RO), UF & EDI', ru: 'Системы обратного осмоса (RO), UF и EDI', es: 'Sistemas de Ósmosis Inversa (RO), UF y EDI', it: 'Sistemi Osmosi Inversa (RO), UF & EDI', zh: '反渗透 (RO)、UF 与 EDI 系统', fa: 'سیستم‌های اسمز معکوس (RO)، UF و EDI'
  },
  'Atıksu Polimerleri (PAC, A-PAM, C-PAM)': {
    en: 'Wastewater Polymers (PAC, A-PAM, C-PAM)', ar: 'بوليمرات مياه الصرف (PAC, A-PAM, C-PAM)', de: 'Abwasserpolymere (PAC, A-PAM, C-PAM)', fr: 'Polymères eaux usées (PAC, A-PAM, C-PAM)', ru: 'Полимеры для сточных вод (PAC, A-PAM, C-PAM)', es: 'Polímeros de aguas residuales (PAC, A-PAM, C-PAM)', it: 'Polimeri acque reflue (PAC, A-PAM, C-PAM)', zh: '废水聚合物 (PAC, A-PAM, C-PAM)', fa: 'پلیمرهای فاضلاب (PAC, A-PAM, C-PAM)'
  },
  'Baz Kimyasallar (Hipoklorit, Kostik, HCl)': {
    en: 'Base Chemicals (Hypochlorite, Caustic, HCl)', ar: 'الكيماويات الأساسية (هيبوكلوريت، صودا كاوية، HCl)', de: 'Basischemikalien (Hypochlorit, Natronlauge, HCl)', fr: 'Produits de base (Hypochlorite, Soude, HCl)', ru: 'Базовая химия (гипохлорит, каустик, HCl)', es: 'Químicos base (Hipoclorito, Sosa, HCl)', it: 'Chimici di base (Ipoclorito, Soda, HCl)', zh: '基础化学品（次氯酸盐、烧碱、盐酸）', fa: 'مواد شیمیایی پایه (هیپوکلریت، سود، اسید کلریدریک)'
  },
  'Teknik Bilgi Merkezi': {
    en: 'Technical Knowledge Center', ar: 'مركز المعلومات التقنية', de: 'Technisches Informationszentrum', fr: 'Centre d’information technique', ru: 'Технический информационный центр', es: 'Centro de información técnica', it: 'Centro informazioni tecniche', zh: '技术知识中心', fa: 'مرکز اطلاعات فنی'
  },
  'Müşteri Portalı': {
    en: 'Client Portal', ar: 'بوابة العملاء', de: 'Kundenportal', fr: 'Portail client', ru: 'Клиентский портал', es: 'Portal de clientes', it: 'Portale clienti', zh: '客户门户', fa: 'پورتال مشتریان'
  },
  'Yönetim Paneli (ERP)': {
    en: 'Admin Panel (ERP)', ar: 'لوحة الإدارة (ERP)', de: 'Verwaltungspanel (ERP)', fr: 'Panneau d’administration (ERP)', ru: 'Панель управления (ERP)', es: 'Panel de administración (ERP)', it: 'Pannello di controllo (ERP)', zh: '管理后台 (ERP)', fa: 'پنل مدیریت (ERP)'
  },
  'Site Haritası': {
    en: 'Sitemap', ar: 'خريطة الموقع', de: 'Sitemap', fr: 'Plan du site', ru: 'Карта сайта', es: 'Mapa del sitio', it: 'Mappa del sito', zh: '网站地图', fa: 'نقشه سایت'
  },
  'WhatsApp B2B Masa': {
    en: 'WhatsApp B2B Desk', ar: 'مكتب واتساب للأعمال B2B', de: 'WhatsApp B2B-Schalter', fr: 'Bureau WhatsApp B2B', ru: 'B2B стол WhatsApp', es: 'Mesa B2B de WhatsApp', it: 'Desk B2B WhatsApp', zh: 'WhatsApp B2B 专线', fa: 'میز B2B واتساپ'
  },
  'Toptan & Teknik • Hızlı yanıt': {
    en: 'Wholesale & Technical • Fast response', ar: 'الجملة والتقنية • استجابة سريعة', de: 'Großhandel & Technik • Schnelle Antwort', fr: 'Gros & Technique • Réponse rapide', ru: 'Опт и техника • Быстрый ответ', es: 'Mayorista y Técnico • Respuesta rápida', it: 'Ingrosso e Tecnico • Risposta rapida', zh: '批发与技术支持 • 快速响应', fa: 'عمده‌فروشی و فنی • پاسخ سریع'
  }
};

const SEARCH_CLUSTERS = [
  ['soğutma kulesi', 'sogutma kulesi', 'cooling tower', 'kühlturm', 'kuehlturm', 'tour de refroidissement', 'градирня', 'torre de enfriamiento', 'torre di raffreddamento', '冷却塔', 'برج التبريد', 'برج خنک'],
  ['kazan', 'boiler', 'kessel', 'chaudiere', 'chaudière', 'котел', 'котёл', 'caldera', 'caldaia', '锅炉', 'غلاية', 'دیگ بخار'],
  ['ters ozmoz', 'reverse osmosis', 'umkehrosmose', 'osmose inverse', 'обратный осмос', 'osmosis inversa', 'osmosi inversa', '反渗透', 'التناضح العكسي', 'اسمز معکوس'],
  ['antiskalant', 'antiscalant', 'kireç önleyici', 'kirec onleyici', 'scale inhibitor', 'antitartre', 'антискалант', 'antiincrustante', 'antincrostante', '阻垢剂', 'مضاد الترسب', 'ضد رسوب'],
  ['korozyon', 'corrosion', 'korrosion', 'corrosion', 'коррозия', 'corrosion', 'corrosione', '腐蚀', 'تآكل', 'خوردگی', 'inhibitör', 'inhibitor'],
  ['laboratuvar', 'laboratory', 'labor', 'laboratoire', 'лаборатория', 'laboratorio', 'laboratorio', '实验室', 'مختبر', 'آزمایشگاه'],
  ['saf su', 'pure water', 'reines wasser', 'eau pure', 'чистая вода', 'agua pura', 'acqua pura', '纯水', 'مياه نقية', 'آب خالص'],
  ['ultra saf', 'ultrapure', 'ultrareines wasser', 'eau ultrapure', 'ультрачистая', 'agua ultrapura', 'acqua ultrapura', '超纯水', 'فائقة النقاء', 'فوق خالص'],
  ['deiyonize', 'deionized', 'deionisiert', 'deionisee', 'déionisée', 'деиониз', 'desionizada', 'deionizzata', '去离子', 'منزوعة الأيونات', 'دیونیزه'],
  ['distile', 'distilled', 'destilliert', 'distillee', 'distillée', 'дистилл', 'destilada', 'distillata', '蒸馏', 'مقطرة', 'تقطیر'],
  ['elektrodeiyonizasyon', 'electrodeionization', 'elektrodeionisation', 'électrodéionisation', 'электродеиониз', 'electrodesionizacion', 'elettrodeionizzazione', '电去离子', 'التأين الكهربائي', 'الکترودیونیزاسیون'],
  ['mobil', 'mobile', 'mobil', 'mobile', 'мобильн', 'movil', 'móvil', '移动', 'متنقل', 'سیار'],
  ['endüstri', 'endustri', 'industrial', 'industriell', 'industriel', 'промышлен', 'industrial', 'industriale', '工业', 'صناعي', 'صنعتی'],
  ['metal kaplama', 'metal plating', 'metallbeschichtung', 'revetement metallique', 'гальваник', 'recubrimiento metalico', 'rivestimento metallico', '金属电镀', 'طلاء المعادن', 'آبکاری'],
  ['kozmetik', 'cosmetic', 'kosmetik', 'cosmetique', 'косметик', 'cosmetica', 'cosmetico', '化妆品', 'مستحضرات', 'آرایشی'],
  ['sterilizasyon', 'sterilization', 'sterilisation', 'sterilisation', 'стерилиз', 'esterilizacion', 'sterilizzazione', '灭菌', 'تعقيم', 'استریلیزاسیون'],
  ['medikal', 'medical', 'medizinisch', 'medical', 'медицин', 'medico', 'medicale', '医疗', 'طبي', 'پزشکی'],
  ['biyokimya', 'biochemistry', 'biochemie', 'biochimie', 'биохим', 'bioquimica', 'biochimica', '生物化学', 'كيمياء حيوية', 'بیوشیمی'],
  ['mikrobiyoloji', 'microbiology', 'mikrobiologie', 'microbiologie', 'микробиолог', 'microbiologia', 'microbiologia', '微生物学', 'الأحياء الدقيقة', 'میکروبیولوژی'],
  ['jeotermal', 'geothermal', 'geothermie', 'geothermie', 'геотерм', 'geoterm', 'geoterm', '地热', 'حراري أرضي', 'زمین‌گرمایی'],
  ['emülsiyon', 'emulsion', 'emulsion', 'emulsion', 'эмульс', 'emulsion', 'emulsione', '乳液', 'مستحلب', 'امولسیون'],
  ['koku', 'odor', 'geruch', 'odeur', 'запах', 'olor', 'odore', '气味', 'رائحة', 'بو'],
  ['polimer', 'polymer', 'polymer', 'polymere', 'полимер', 'polimero', 'polimero', '聚合物', 'بوليمر', 'پلیمر'],
  ['hipoklorit', 'hypochlorite', 'hypochlorit', 'hypochlorite', 'гипохлорит', 'hipoclorito', 'ipoclorito', '次氯酸盐', 'هيبوكلوريت', 'هیپوکلریت'],
  ['kostik', 'caustic', 'natronlauge', 'soude caustique', 'каустическ', 'sosa caustica', 'soda caustica', '烧碱', 'صودا كاوية', 'سود سوزآور'],
  ['atıksu', 'atiksu', 'wastewater', 'abwasser', 'eaux usees', 'сточн', 'aguas residuales', 'acque reflue', '废水', 'مياه الصرف', 'فاضلاب'],
  ['kapalı devre', 'kapali devre', 'closed loop', 'geschlossener kreislauf', 'circuit ferme', 'замкнутый контур', 'circuito cerrado', 'circuito chiuso', '闭路', 'دائرة مغلقة', 'مدار بسته']
];

let currentCode = '';
const listeners = new Set();
const translationMemory = new Map(); // key: `${lang}::${sourceTr}` -> translated string
const pendingRequests = new Map(); // key: `${lang}::${sourceTr}` -> Promise<string>
let isMutatingDom = false;
let observerInitialized = false;
let debounceTimer = null;

export function fold(value) {
  return String(value || '')
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i');
}

export function getLanguage() {
  if (currentCode && LANGUAGES.some((lang) => lang.code === currentCode)) return currentCode;
  let stored = 'tr';
  try {
    stored = localStorage.getItem(UI_LANG_KEY) || 'tr';
  } catch {
    stored = 'tr';
  }
  currentCode = LANGUAGES.some((lang) => lang.code === stored) ? stored : 'tr';
  return currentCode;
}

export function getLanguageMeta(code = getLanguage()) {
  return LANGUAGES.find((lang) => lang.code === code) || LANGUAGES[0];
}

export function t(key) {
  const pack = UI[key];
  if (!pack) return key;
  const code = getLanguage();
  return pack[code] || pack.en || pack.tr || key;
}

export function applyDocumentLanguage() {
  const meta = getLanguageMeta();
  document.documentElement.lang = meta.code;
  document.documentElement.dir = meta.dir;
}

export function setLanguage(code) {
  if (!LANGUAGES.some((lang) => lang.code === code) || code === getLanguage()) return false;
  currentCode = code;
  try {
    localStorage.setItem(UI_LANG_KEY, code);
  } catch {
    /* Dil seçimi kaydedilemezse oturum boyunca bellekte kalır. */
  }
  applyDocumentLanguage();
  listeners.forEach((listener) => listener(code));
  return true;
}

export function subscribeLanguage(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function languageHaystack(lang) {
  return fold(`${lang.code} ${lang.native} ${lang.english}`);
}

export function withLanguageSearch(text) {
  const source = fold(text);
  const extra = [];
  SEARCH_CLUSTERS.forEach((cluster) => {
    const folded = cluster.map((term) => fold(term));
    if (folded.some((term) => term && source.includes(term))) extra.push(...folded);
  });
  return fold(`${source} ${extra.join(' ')}`);
}

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'SVG', 'MATH', 'TEXTAREA']);

function shouldSkipText(str) {
  if (!str || str.length < 2) return true;
  // En az 2 harf içermeli (saf rakam, telefon, sembol, kimyasal kod vb. atlanır)
  if (!/[a-zA-ZğüşöçıİĞÜŞÖÇ]{2,}/.test(str)) return true;
  // URL veya e-posta adreslerini çevirme
  if (/^(https?:\/\/|www\.|\S+@\S+\.\S+)/i.test(str)) return true;
  // Model kodları (örn. DT-5012, XL-9310)
  if (/^[A-Z]{2,3}-\d{3,5}$/.test(str)) return true;
  return false;
}

function getCachedTranslation(lang, sourceTr) {
  if (lang === 'tr') return sourceTr;
  if (INSTANT_PHRASES[sourceTr]?.[lang]) {
    return INSTANT_PHRASES[sourceTr][lang];
  }
  for (const pack of Object.values(UI)) {
    if (pack.tr === sourceTr && pack[lang]) {
      return pack[lang];
    }
  }
  return translationMemory.get(`${lang}::${sourceTr}`) || null;
}

async function fetchSingleTranslation(apiTargetLang, lang, text) {
  const cacheKey = `${lang}::${text}`;
  if (translationMemory.has(cacheKey)) return translationMemory.get(cacheKey);
  if (pendingRequests.has(cacheKey)) return pendingRequests.get(cacheKey);

  const promise = (async () => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${encodeURIComponent(apiTargetLang)}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      if (!res.ok) return text;
      const data = await res.json();
      const translated = Array.isArray(data?.[0])
        ? data[0].map((part) => part?.[0] || '').join('').trim()
        : text;
      if (translated) {
        translationMemory.set(cacheKey, translated);
        return translated;
      }
    } catch {
      // Ağ hatasında orijinal metni koru
    } finally {
      pendingRequests.delete(cacheKey);
    }
    return text;
  })();

  pendingRequests.set(cacheKey, promise);
  return promise;
}

async function fetchBatchTranslations(lang, texts) {
  const meta = getLanguageMeta(lang);
  const apiTargetLang = meta.apiCode || lang;
  const unique = [...new Set(texts.filter((item) => !getCachedTranslation(lang, item)))];
  if (!unique.length) return;

  // 1400 karakterlik güvenli yığınlara (chunks) böl
  const chunks = [];
  let currentChunk = [];
  let currentLen = 0;

  unique.forEach((txt) => {
    if (currentChunk.length >= 20 || (currentLen + txt.length > 1400 && currentChunk.length > 0)) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentLen = 0;
    }
    currentChunk.push(txt);
    currentLen += txt.length + 3;
  });
  if (currentChunk.length) chunks.push(currentChunk);

  await Promise.all(
    chunks.map(async (chunk) => {
      if (chunk.length === 1) {
        await fetchSingleTranslation(apiTargetLang, lang, chunk[0]);
        return;
      }
      try {
        const joined = chunk.join('\n');
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${encodeURIComponent(apiTargetLang)}&dt=t&q=${encodeURIComponent(joined)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Batch status error');
        const data = await res.json();
        const combined = Array.isArray(data?.[0])
          ? data[0].map((part) => part?.[0] || '').join('')
          : '';
        const lines = combined.split('\n').map((line) => line.trim());
        if (lines.length === chunk.length) {
          chunk.forEach((srcText, idx) => {
            if (lines[idx]) {
              translationMemory.set(`${lang}::${srcText}`, lines[idx]);
            }
          });
          return;
        }
      } catch {
        // Yığın eşleşmezse tekil paralel çeviriye düş
      }
      await Promise.all(chunk.map((item) => fetchSingleTranslation(apiTargetLang, lang, item)));
    })
  );
}

/**
 * Verilen kök DOM ağacındaki tüm metin düğümlerini ve placeholder/title/aria-label niteliklerini
 * aktif dile çevirir. Türkçe ('tr') seçildiğinde orijinal Türkçe metinleri geri yükler.
 */
export async function translatePageDom(root = document.getElementById('app')) {
  if (!root || typeof document === 'undefined') return;
  const lang = getLanguage();

  const textTargets = [];
  const attrTargets = [];

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest('[data-lang-menu], [data-no-translate], .notranslate')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let currentNode = walker.nextNode();
  while (currentNode) {
    const raw = currentNode.nodeValue || '';
    const trimmed = raw.replace(/\s+/g, ' ').trim();

    if (trimmed) {
      // Eğer düğümün metni JS tarafından dinamik olarak değiştirildiyse (örn. Hero Slider), yeni Türkçe metni kaydet
      if (!currentNode.__origTr || (currentNode.__lastRendered && currentNode.__lastRendered !== trimmed && trimmed !== currentNode.__origTr)) {
        currentNode.__origTr = trimmed;
      }
      const sourceTr = currentNode.__origTr;
      if (!shouldSkipText(sourceTr)) {
        textTargets.push({ node: currentNode, sourceTr });
      }
    }
    currentNode = walker.nextNode();
  }

  root.querySelectorAll('[placeholder], [title], [aria-label]').forEach((el) => {
    if (el.closest('[data-lang-menu], [data-no-translate], .notranslate')) return;
    if (!el.__origAttrs) el.__origAttrs = {};
    ['placeholder', 'title', 'aria-label'].forEach((attr) => {
      const val = el.getAttribute(attr);
      if (!val) return;
      const trimmed = val.replace(/\s+/g, ' ').trim();
      if (!el.__origAttrs[attr]) {
        el.__origAttrs[attr] = trimmed;
      }
      const sourceTr = el.__origAttrs[attr];
      if (!shouldSkipText(sourceTr)) {
        attrTargets.push({ el, attr, sourceTr });
      }
    });
  });

  // 1) Türkçe ise orijinal metinleri geri yükle
  if (lang === 'tr') {
    isMutatingDom = true;
    try {
      textTargets.forEach(({ node, sourceTr }) => {
        const raw = node.nodeValue || '';
        const lead = (raw.match(/^\s*/) || [''])[0];
        const trail = (raw.match(/\s*$/) || [''])[0];
        const restored = `${lead}${sourceTr}${trail}`;
        if (node.nodeValue !== restored) {
          node.nodeValue = restored;
        }
        node.__lastRendered = sourceTr;
      });
      attrTargets.forEach(({ el, attr, sourceTr }) => {
        if (el.getAttribute(attr) !== sourceTr) {
          el.setAttribute(attr, sourceTr);
        }
      });
    } finally {
      isMutatingDom = false;
    }
    return;
  }

  // 2) Önbellekte veya anlık sözlükte olanları 0ms içinde uygula
  const missingTexts = [];
  isMutatingDom = true;
  try {
    textTargets.forEach(({ node, sourceTr }) => {
      const cached = getCachedTranslation(lang, sourceTr);
      if (cached) {
        const raw = node.nodeValue || '';
        const lead = (raw.match(/^\s*/) || [''])[0];
        const trail = (raw.match(/\s*$/) || [''])[0];
        node.nodeValue = `${lead}${cached}${trail}`;
        node.__lastRendered = cached;
      } else {
        missingTexts.push(sourceTr);
      }
    });
    attrTargets.forEach(({ el, attr, sourceTr }) => {
      const cached = getCachedTranslation(lang, sourceTr);
      if (cached) {
        el.setAttribute(attr, cached);
      } else {
        missingTexts.push(sourceTr);
      }
    });
  } finally {
    isMutatingDom = false;
  }

  if (!missingTexts.length) return;

  // 3) Eksik metinleri toplu olarak çevir ve DOM'a uygula
  await fetchBatchTranslations(lang, missingTexts);

  // Dil bu sırada değiştiyse çık
  if (getLanguage() !== lang) return;

  isMutatingDom = true;
  try {
    textTargets.forEach(({ node, sourceTr }) => {
      const translated = getCachedTranslation(lang, sourceTr);
      if (translated && node.isConnected) {
        const raw = node.nodeValue || '';
        const lead = (raw.match(/^\s*/) || [''])[0];
        const trail = (raw.match(/\s*$/) || [''])[0];
        node.nodeValue = `${lead}${translated}${trail}`;
        node.__lastRendered = translated;
      }
    });
    attrTargets.forEach(({ el, attr, sourceTr }) => {
      const translated = getCachedTranslation(lang, sourceTr);
      if (translated && el.isConnected) {
        el.setAttribute(attr, translated);
      }
    });
  } finally {
    isMutatingDom = false;
  }
}

/**
 * Sayfa içi dinamik DOM değişimlerini (slider geçişleri, sekme değişimleri, filtreler, modallar)
 * otomatik algılayıp seçili dile çeviren gözlemciyi başlatır.
 */
export function initDomTranslator(root = document.getElementById('app')) {
  if (!root || observerInitialized || typeof MutationObserver === 'undefined') return;
  observerInitialized = true;

  const observer = new MutationObserver(() => {
    if (isMutatingDom || getLanguage() === 'tr') return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      translatePageDom(root);
    }, 45);
  });

  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true
  });
}
