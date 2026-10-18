import { TRANSLATION_OVERRIDES } from './translation-overrides.js';
import { TECHNICAL_TRANSLATION_OVERRIDES } from './technical-translation-overrides.js';

export const UI = {
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
export const INSTANT_PHRASES = {
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
    en: 'Base Chemicals (Hypochlorite, Caustic, HCl)', ar: 'الكيماويات الأساسية (هيبوكلوريت، صودا كاوية، HCl)', de: 'Basischemikalien (Hypochlorit, Natronlauge, HCl)', fr: 'Produits de base (Hypochlorite, Soude, HCl)', ru: 'Базовая химия (гипохлорит, каустик, HCl)', es: 'Químicos base (Hipoclorito, Sosa, HCl)', it: 'Chimici di base (Ipoclorito, Soda, HCl)', zh: '基础化学品（次氯酸盐、烧碱、盐酸 HCl）', fa: 'مواد شیمیایی پایه (هیپوکلریت، سود، اسید کلریدریک HCl)'
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


const UNIT_TRANSLATIONS = {
  'ile': { en: 'with', ar: 'مع', de: 'mit', fr: 'avec', ru: 'с', es: 'con', it: 'con', zh: '与', fa: 'با' },
  'yıl': { en: 'year', ar: 'سنة', de: 'Jahr', fr: 'an', ru: 'год', es: 'año', it: 'anno', zh: '年', fa: 'سال' },
  'ton/yıl': { en: 't/year', ar: 'طن/سنة', de: 't/Jahr', fr: 't/an', ru: 'т/год', es: 't/año', it: 't/anno', zh: '吨/年', fa: 'تن/سال' },
  'ton/gün': { en: 't/day', ar: 'طن/يوم', de: 't/Tag', fr: 't/jour', ru: 'т/день', es: 't/día', it: 't/giorno', zh: '吨/日', fa: 'تن/روز' },
  'kamyon/yıl': { en: 'trucks/year', ar: 'شاحنات/سنة', de: 'Lkw/Jahr', fr: 'camions/an', ru: 'грузовиков/год', es: 'camiones/año', it: 'camion/anno', zh: '车次/年', fa: 'کامیون/سال' },
  'Sm³/yıl': { en: 'Sm³/year', ar: 'Sm³/سنة', de: 'Sm³/Jahr', fr: 'Sm³/an', ru: 'Sm³/год', es: 'Sm³/año', it: 'Sm³/anno', zh: 'Sm³/年', fa: 'Sm³/سال' },
  'TL / yıl': { en: 'TL / year', ar: 'TL / سنة', de: 'TL / Jahr', fr: 'TL / an', ru: 'TL / год', es: 'TL / año', it: 'TL / anno', zh: 'TL / 年', fa: 'TL / سال' },
  'USD / yıl': { en: 'USD / year', ar: 'USD / سنة', de: 'USD / Jahr', fr: 'USD / an', ru: 'USD / год', es: 'USD / año', it: 'USD / anno', zh: 'USD / 年', fa: 'USD / سال' }
};

export const REVIEWED_TRANSLATIONS = Object.fromEntries([
  ...Object.values(UI).map(({ tr, ...translations }) => [tr, translations]),
  ...Object.entries(INSTANT_PHRASES),
  ...Object.entries(UNIT_TRANSLATIONS)
]);

for (const [source, translations] of Object.entries(TRANSLATION_OVERRIDES)) {
  REVIEWED_TRANSLATIONS[source] = { ...REVIEWED_TRANSLATIONS[source], ...translations };
}

for (const [source, translations] of Object.entries(TECHNICAL_TRANSLATION_OVERRIDES)) {
  REVIEWED_TRANSLATIONS[source] = { ...REVIEWED_TRANSLATIONS[source], ...translations };
}
