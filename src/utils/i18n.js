/**
 * Arayüz dili. Yalnızca seçilen dil kodu saklanır; müşteri, teklif veya stok verisi yazılmaz.
 */

const UI_LANG_KEY = 'elifkimya-ui-lang';

export const LANGUAGES = [
  { code: 'tr', native: 'Türkçe', english: 'Turkish', dir: 'ltr' },
  { code: 'en', native: 'English', english: 'English', dir: 'ltr' },
  { code: 'ar', native: 'العربية', english: 'Arabic', dir: 'rtl' },
  { code: 'de', native: 'Deutsch', english: 'German', dir: 'ltr' },
  { code: 'fr', native: 'Français', english: 'French', dir: 'ltr' },
  { code: 'ru', native: 'Русский', english: 'Russian', dir: 'ltr' },
  { code: 'es', native: 'Español', english: 'Spanish', dir: 'ltr' },
  { code: 'it', native: 'Italiano', english: 'Italian', dir: 'ltr' },
  { code: 'zh', native: '中文', english: 'Chinese', dir: 'ltr' },
  { code: 'fa', native: 'فارسی', english: 'Persian', dir: 'rtl' }
];

const UI = {
  nav_home: { tr: 'Ana Sayfa', en: 'Home', ar: 'الرئيسية', de: 'Start', fr: 'Accueil', ru: 'Главная', es: 'Inicio', it: 'Home', zh: '首页', fa: 'خانه' },
  nav_products: { tr: 'Ürünler', en: 'Products', ar: 'المنتجات', de: 'Produkte', fr: 'Produits', ru: 'Продукты', es: 'Productos', it: 'Prodotti', zh: '产品', fa: 'محصولات' },
  nav_systems: { tr: '360° Su Arıtma', en: 'Water Systems', ar: 'أنظمة المياه', de: 'Wassertechnik', fr: 'Traitement d’eau', ru: 'Водоподготовка', es: 'Sistemas de agua', it: 'Sistemi idrici', zh: '水处理', fa: 'تصفیه آب' },
  nav_sectors: { tr: 'Sektörler', en: 'Sectors', ar: 'القطاعات', de: 'Branchen', fr: 'Secteurs', ru: 'Отрасли', es: 'Sectores', it: 'Settori', zh: '行业', fa: 'صنایع' },
  nav_regions: { tr: 'Bölgeler', en: 'Regions', ar: 'المناطق', de: 'Regionen', fr: 'Régions', ru: 'Регионы', es: 'Regiones', it: 'Regioni', zh: '地区', fa: 'مناطق' },
  nav_contact: { tr: 'İletişim', en: 'Contact', ar: 'اتصل', de: 'Kontakt', fr: 'Contact', ru: 'Контакты', es: 'Contacto', it: 'Contatto', zh: '联系', fa: 'تماس' },
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
