import {
  companyInfo,
  faqItems,
  fieldServices,
  solutionLines
} from '../data/products.js';
import { fetchPublicProducts, submitPublicCrmForm } from '../firebase.js';
import { showNotification } from '../components/notification.js';
import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';
import {
  WATER_CHEMICAL_LIFECYCLE,
  ENGINEERING_360_TABS,
  SEO_KEYWORD_CLUSTERS
} from '../utils/seo-geo.js';
import { bindMedipureCatalog, renderMedipureShowcase } from '../components/medipure-catalog.js';

const HERO_SLIDES = [
  {
    id: '01',
    image: '/assets/hero-chemical.jpg',
    tag: 'ENDÜSTRİYEL PROSES KİMYASALLARI & ÜRETİM',
    shortNav: 'ENDÜSTRİYEL PROSES KİMYASALLARI & ÜRETİM',
    title: 'Ağır Sanayi ve Üretim Hatları İçin Spesifikasyon Odaklı Kimyasallar',
    subtitle:
      'Demir-çelik haddehaneleri, deterjan sülfonasyon, kağıt, cam ve mikronize kalsit tesisleri için parti bazlı COA ve SDS/GBF güvenceli toptan kimyasal tedariki.',
    highlights: [
      'Parti Bazlı COA & SDS/GBF',
      '30 kg Bidon / 1000 kg IBC / Tanker',
      'Adana & Çukurova 2–6 Saat Sevk'
    ]
  },
  {
    id: '02',
    image: '/assets/hero-cooling-towers.jpg',
    tag: 'SOĞUTMA KULESİ & KAZAN SUYU ŞARTLANDIRMA',
    shortNav: 'AĞIR HİZMET SOĞUTMA & KAZAN ŞARTLANDIRMA',
    title: 'Korozyon, Kışır ve Biyofilm Önleyici Su Şartlandırma Programları',
    subtitle:
      'Açık/kapalı devre soğutma kuleleri ve yüksek basınçlı buhar kazanlarında enerji kaybını önleyen yüksek termal kararlılıklı PBTC/HEDP antiskalant, inhibitör ve biyositler.',
    highlights: [
      'PBTC / HEDP / Azol İnhibitörleri',
      'DBNPA & İzotiyazolin Biyositler',
      'DEHA Oksijen Tutucu & Nötralize Amin'
    ]
  },
  {
    id: '03',
    image: '/assets/hero-water-ro.jpg',
    tag: '360° TERS OZMOZ (RO), UF & SAF SU SİSTEMLERİ',
    shortNav: 'TERS OZMOZ (RO) & ARITMA SİSTEMLERİ',
    title: 'Endüstriyel Su Arıtma, Ters Ozmoz (RO) ve SCADA Otomasyon Sistemleri',
    subtitle:
      'Ham su analizine göre terzi işi projelendirilen 1–250 m³/saat kapasiteli Ters Ozmoz (RO), Ultrafiltrasyon (UF), EDI ultra saf su ve PLC/SCADA otomasyon panoları.',
    highlights: [
      '%99.5 Tuz & İletkenlik Giderimi',
      'PLC / SCADA Otomasyon Panosu',
      '240 ppm Silis Toleranslı Antiskalant'
    ]
  },
  {
    id: '04',
    image: '/assets/hero-wastewater.jpg',
    tag: 'ATIK SU ARITMA, GERİ KAZANIM & KOAGÜLANTLAR',
    shortNav: 'ATIK SU ARITMA & FLOKÜLANT POLİMERLER',
    title: 'Yüksek Molekül Ağırlıklı Polielektrolitler, Koagülantlar & Sıfır Atık',
    subtitle:
      'Haddehane tufal çukurları, tekstil arıtmaları ve çamur susuzlaştırma dekantörleri için PAC (%17–%30), Demir III Klorür ve Anyonik/Katyonik Poliakrilamid çözümleri.',
    highlights: [
      '< 30 sn Hızlı Flok Çökme Süresi',
      'Yerinde 6’lı Jar-Test Optimizasyonu',
      '25 kg Torba / 1000 kg IBC / Dökme'
    ]
  },
  {
    id: '05',
    image: '/assets/hero-logistics.jpg',
    tag: 'ADR LİSANSLI LOJİSTİK, 81 İL & İHRACAT AĞI',
    shortNav: 'ADR LOJİSTİK & 81 İL / İHRACAT SEVKİYAT',
    title: 'Çukurova Merkez Depodan Türkiye Geneli ve İhracata Kesintisiz Tedarik',
    subtitle:
      'Adana Hacı Sabancı OSB, Mersin, İskenderun, Osmaniye, Gaziantep, Kayseri ve Niğde sanayi bölgelerine aynı gün sevkiyat; Mersin Limanı üzerinden FOB/CIF ihracat.',
    highlights: [
      'Adana Merkez Depo Stok Güvencesi',
      'ADR Sertifikalı Tanker & Filo',
      'TR / EN İhracat Dokümantasyonu'
    ]
  }
];

const HOME_CATEGORY_CARDS = [
  {
    id: 'sodyum-hipoklorit-ve-baz-kimyasallar',
    title: 'Sodyum Hipoklorit & Klor',
    emoji: '🧪',
    specPill: '%15–16 Aktif Klor • Dökme / IBC',
    desc: 'Su dezenfeksiyonu, tekstil ağartma ve endüstriyel arıtma için yüksek stabiliteli sıvı sodyum hipoklorit (NaOCl).',
    image: '/assets/cat-hypochlorite.jpg',
    href: '/urunler#sogutma-kulesi-kimyasallari'
  },
  {
    id: 'kostik-soda-ve-alkaliler',
    title: 'Kostik Soda & Alkaliler',
    emoji: '⚗️',
    specPill: 'NaOH %48 Sıvı & %99 Payet',
    desc: 'Nötralizasyon, CIP yıkama, sabun/deterjan ve proses pH kontrolü için membran kalitesinde sıvı ve payet kostik.',
    image: '/assets/cat-caustic.jpg',
    href: '/urunler#endustriyel-bakim-ve-proses-kimyasallari'
  },
  {
    id: 'endustriyel-asitler-ve-pickling',
    title: 'Endüstriyel Asitler & İnhibitör',
    emoji: '🔥',
    specPill: 'HCl %32 • H₂SO₄ %98 • Pickling',
    desc: 'Demir-çelik asitleme (pickling) hatları, reçine rejenerasyonu ve pH dengeleme için teknik asitler ve asit inhibitörleri.',
    image: '/assets/cat-acids.jpg',
    href: '/urunler#endustriyel-bakim-ve-proses-kimyasallari'
  },
  {
    id: 'koagulant-ve-flokulantlar',
    title: 'Koagülant & Polielektrolitler',
    emoji: '💧',
    specPill: 'PAC %17/%30 • A-PAM / C-PAM',
    desc: 'Atıksu arıtma, tufal çukuru ve çamur susuzlaştırma için PAC, Demir III Klorür ve Anyonik/Katyonik Poliakrilamid.',
    image: '/assets/cat-coagulants.jpg',
    href: '/urunler#atik-su-aritma-kimyasallari'
  },
  {
    id: 'sogutma-kulesi-sartlandirma',
    title: 'Soğutma Kulesi Kimyasalları',
    emoji: '❄️',
    specPill: 'PBTC / HEDP / Azol • DBNPA Biyosit',
    desc: 'Açık ve kapalı soğutma devrelerinde kireç, korozyon, yosun ve Legionella oluşumunu engelleyen şartlandırma ürünleri.',
    image: '/assets/cat-cooling.jpg',
    href: '/urunler#sogutma-kulesi-kimyasallari'
  },
  {
    id: 'buhar-kazani-ve-kondens',
    title: 'Kazan Suyu Kimyasalları',
    emoji: '⚡',
    specPill: 'DEHA Oksijen Tutucu • Kondens Amin',
    desc: 'Buhar kazanlarında oksijen çukurlaşmasını (pitting) ve kışır kaynaklı yakıt kaybını önleyen şartlandırıcılar.',
    image: '/assets/cat-boiler.jpg',
    href: '/urunler#kazan-suyu-kimyasallari'
  },
  {
    id: 'ro-membran-ve-antiskalant',
    title: 'RO Antiskalant & CIP Kimyasalları',
    emoji: '🛡️',
    specPill: '240 ppm Silis Toleransı • Asit/Baz CIP',
    desc: 'Ters Ozmoz (RO) membranlarında silis, kalsiyum karbonat ve sülfat tıkanmasını önleyen konsantre antiskalantlar.',
    image: '/assets/cat-ro-membrane.jpg',
    href: '/urunler#endustriyel-su-aritma-sistemleri'
  },
  {
    id: 'endustriyel-su-aritma-ve-edi',
    title: 'RO, UF & EDI Su Arıtma Sistemleri',
    emoji: '⚙️',
    specPill: '1–250 m³/h RO • 18.2 MΩ·cm EDI',
    desc: 'Ham su analizine göre projelendirilen endüstriyel Ters Ozmoz (RO), Ultrafiltrasyon (UF), Yumuşatma ve EDI üniteleri.',
    image: '/assets/cat-water-systems.jpg',
    href: '/sistemler'
  }
];

const FEATURED_PRODUCTS = [
  {
    title: 'Sodyum Hipoklorit (%15–16 Aktif Klor)',
    badgeEmoji: '🧪',
    badgeText: 'Dezenfeksiyon & Ağartma',
    materialSpec: 'NaOCl %15-16 • Yoğunluk: 1.22–1.25 g/cm³',
    desc: 'İçme ve proses suyu klorlaması, soğutma kulesi şok dezenfeksiyonu, tekstil ağartma ve atıksu oksidasyonu için taze üretim sıvı klor.',
    moq: '60 kg Bidon / 1200 kg IBC / Tanker',
    image: '/assets/cat-hypochlorite.jpg'
  },
  {
    title: 'Polialüminyum Klorür (PAC %17 Sıvı / %30 Toz)',
    badgeEmoji: '💧',
    badgeText: 'Atıksu & Ham Su Koagülantı',
    materialSpec: 'Al₂O₃ %17 / %30 • Yüksek Baziklik',
    desc: 'Endüstriyel atıksu arıtma, kağıt üretimi ve nehir/kuyu suyu ön arıtmasında düşük çamur hacmi ve hızlı flokülasyon sağlayan koagülant.',
    moq: '25 kg Torba / 1200 kg IBC / Tanker',
    image: '/assets/cat-coagulants.jpg'
  },
  {
    title: 'Yüksek Silis RO Antiskalant (Dendrimer / Fosfonat)',
    badgeEmoji: '🛡️',
    badgeText: 'Ters Ozmoz Membran Koruyucu',
    materialSpec: '240 ppm SiO₂ Toleransı • 2–4 ppm Dozaj',
    desc: 'Kuyu sularında yüksek silis, kalsiyum karbonat, baryum ve stronsiyum sülfat çökmesini önleyerek RO membran ömrünü uzatan antiskalant.',
    moq: '30 kg UN Bidon / 1000 kg IBC',
    image: '/assets/cat-ro-membrane.jpg'
  },
  {
    title: 'Soğutma Kulesi Korozyon & Kışır İnhibitörü (PBTC/HEDP)',
    badgeEmoji: '❄️',
    badgeText: 'Soğutma Kulesi Şartlandırma',
    materialSpec: 'PBTC + HEDP + TTA/BTA Azol Kombinasyonu',
    desc: 'Yüksek ısı yükü altındaki eşanjör ve soğutma kulelerinde karbon çelik ve bakır alaşımları korozyondan ve kireçten koruyan program.',
    moq: '30 kg Bidon / 1000 kg IBC',
    image: '/assets/cat-cooling.jpg'
  },
  {
    title: 'Buhar Kazanı Oksijen Tutucu & Kondens Koruyucu (DEHA)',
    badgeEmoji: '⚡',
    badgeText: 'Buhar Kazanı & Termik Koruma',
    materialSpec: 'DEHA / Sodyum Sülfit + Nötralize Edici Amin',
    desc: 'Kazan besi suyundaki çözünmüş oksijeni <5 ppb altına indirerek çukurlaşma (pitting) korozyonunu ve kondens hattı delinmelerini önler.',
    moq: '30 kg Bidon / 1000 kg IBC',
    image: '/assets/cat-boiler.jpg'
  },
  {
    title: 'Anyonik & Katyonik Polielektrolit (Flokülant Polimer)',
    badgeEmoji: '🔬',
    badgeText: 'Flokülant & Çamur Susuzlaştırma',
    materialSpec: 'MW: 16–24 Milyon Dalton • Toz & Emülsiyon',
    desc: 'Haddehane tufal çukurları, maden/kalsit tikinerleri ve dekantör/belt-pres çamur susuzlaştırma üniteleri için yüksek molekül ağırlıklı polimer.',
    moq: '25 kg Kraft Torba / Palet',
    image: '/assets/hero-wastewater.jpg'
  }
];

const SECTORS_LIST = [
  {
    title: 'Demir-Çelik, Haddehane & Boru/Galvaniz',
    desc: 'Tufal çukuru yüksek sıcaklığa dayanıklı A-PAM polimerleri, HCl asitleme (pickling) inhibitörleri ve kapalı devre soğutma şartlandırması.',
    badge: 'İskenderun • Payas • Osmaniye • Kayseri'
  },
  {
    title: 'Deterjan, Sülfonasyon & Kimya Sanayi',
    desc: 'Kostik soda (%48/%99), LABSA, SLES, sodyum hipoklorit ve ekzotermik reaktör ceketleri için yüksek termal stabiliteli antiskalantlar.',
    badge: 'Adana AOSB • Mersin • Gaziantep'
  },
  {
    title: 'Kağıt, Oluklu Mukavva & Selüloz',
    desc: 'Yaş kısım retansiyon polimerleri, silikonsuz köpük kesiciler (antifoam), PAE yaş mukavemet reçineleri ve DBNPA slime biyositleri.',
    badge: 'Adana • Kahramanmaraş • Tarsus'
  },
  {
    title: 'Düzcam, Cam Ambalaj & Soda Sanayi',
    desc: 'Float kalay banyosu nitritsiz molibdat inhibitörleri, çift geçişli RO + EDI ultra saf cam yıkama sistemleri ve lehr şartlandırıcıları.',
    badge: 'Mersin • Tarsus • Eskişehir'
  },
  {
    title: 'Mikronize Kalsit, Maden & Çimento',
    desc: 'Yaş öğütme değirmenleri için sodyum poliakrilat dispersantlar, stearik asit kaplama ajanları ve tikiner çökeltme flokülantları.',
    badge: 'Niğde OSB • Adana • Karaman'
  },
  {
    title: 'Tekstil Boyahane, Gıda & Enerji Santralleri',
    desc: 'Sıfır sertlikte yumuşatma ve RO proses suyu tesisleri, yüksek basınçlı buhar kazanı kimyasalları ve tekstil renk giderici koagülantlar.',
    badge: 'Gaziantep • Kahramanmaraş • Adana'
  },
  {
    title: 'Jeotermal Enerji, Sera ve Bölgesel Isıtma',
    desc: 'Kuyu çıkışı ve eşanjör hatlarında kireç, silika ve korozyon programı. Dozaj, brine analizi ve kupon ölçümü olmadan yazılmaz.',
    badge: 'Denizli • Aydın • Manisa • Afyon'
  }
];

const MARQUEE_ITEMS = [
  'Sodyum Hipoklorit (%15–16)',
  'Kostik Soda (NaOH %48 / %99)',
  'Hidroklorik & Sülfürik Asit',
  'Polialüminyum Klorür (PAC %17 / %30)',
  'Anyonik & Katyonik Polielektrolit',
  'Soğutma Kulesi PBTC/HEDP İnhibitörü',
  'DBNPA & İzotiyazolin Biyosit',
  'Buhar Kazanı DEHA Oksijen Tutucu',
  'Ters Ozmoz (RO) Antiskalant & CIP',
  '1–250 m³/h RO & EDI Saf Su Sistemleri',
  'Jeotermal Kireç, Silika ve Korozyon',
  'PLC / SCADA Otomasyon & Dozaj Panoları',
  'Adana AOSB • Mersin • İskenderun • Gaziantep • Kayseri • 81 İl Sevkiyat'
];

export async function renderHomePage(container, navigate) {
  let activeSlide = 0;
  let isPaused = false;
  let activeCycleIdx = 0;
  let activeEngTab = 'total_water';

  const whatsappClean = (companyInfo.whatsappNumber || '905425903626').replace(/[^0-9]/g, '');
  const initialSlide = HERO_SLIDES[0];
  const initialWaText = `Merhaba ELİF KİMYA, web sitenizden ulaşıyorum. "${initialSlide.title}" hakkında toptan teklif almak istiyorum.`;
  const initialWaUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(initialWaText)}`;

  const repeatedMarquee = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const initialCycle = WATER_CHEMICAL_LIFECYCLE[0];
  const initialTabObj = ENGINEERING_360_TABS.total_water;

  const html = `
    <!-- 1. YÜKSEK KONTRASTLI TAM EKRAN HERO SLIDER -->
    <section id="home-hero-section" class="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-slate-950 text-white border-b-4 border-brand-green">
      <!-- Arka Plan Görsel Slaytları (Yüksek Kontrastlı Koyu Endüstriyel Katman) -->
      <div class="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        ${HERO_SLIDES.map((s, idx) => `
          <div
            data-bg-slide="${idx}"
            class="absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === 0 ? 'opacity-100' : 'opacity-0'}"
            aria-hidden="${idx === 0 ? 'false' : 'true'}">
            <img
              src="${escapeAttr(s.image)}"
              alt="${escapeAttr(s.title)}"
              width="1920"
              height="1080"
              decoding="async"
              ${idx === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
              class="hero-slide-img absolute inset-0 w-full h-full object-cover object-center opacity-50 transform transition-transform duration-[8000ms] ${idx === 0 ? 'scale-105' : 'scale-100'}"
            />
          </div>
        `).join('')}
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 via-55% to-slate-950/40"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
      </div>

      <!-- Orta İçerik Alanı -->
      <div class="container-x relative z-10 flex-1 flex flex-col justify-center py-12 lg:py-16">
        <div class="max-w-3xl space-y-6">
          <!-- Üst Aktif Kategori Etiketi -->
          <div class="inline-flex items-center gap-2.5 rounded-full border-2 border-emerald-400/50 bg-emerald-950/90 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-300 shadow-lg backdrop-blur-md">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-5"></span>
            <span id="hero-active-tag">${escapeHtml(initialSlide.tag)}</span>
          </div>

          <!-- Ana Başlık (H1) - Yüksek Kontrast Beyaz -->
          <div class="min-h-[140px] sm:min-h-[160px] flex flex-col justify-center">
            <h1 id="hero-active-title" class="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] drop-shadow-sm transition-all duration-500">
              ${escapeHtml(initialSlide.title)}
            </h1>
            <p id="hero-active-subtitle" class="mt-4 max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed font-medium transition-all duration-500">
              ${escapeHtml(initialSlide.subtitle)}
            </p>
          </div>

          <!-- 3'lü Onay Rozetleri -->
          <div id="hero-active-highlights" class="flex flex-wrap gap-2.5 pt-2">
            ${initialSlide.highlights.map((h) => `
              <span class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-emerald-400/40 text-xs font-extrabold text-white shadow-md backdrop-blur-md flex items-center gap-2 transition">
                <span class="text-emerald-400 font-black">✓</span>${escapeHtml(h)}
              </span>
            `).join('')}
          </div>

          <!-- 3'lü Aksiyon Butonları -->
          <div class="pt-4 flex flex-wrap items-center gap-3.5">
            <a class="btn-primary !px-8 !py-4 !text-sm shadow-cta flex items-center gap-2" href="/teklif-al" data-nav="/teklif-al">
              <span>📦</span>
              <span>Hemen Teklif İsteyin</span>
            </a>

            <a id="hero-wa-link" href="${escapeAttr(initialWaUrl)}" target="_blank" rel="noopener noreferrer" class="px-6 py-4 rounded-xl bg-[#25D366] hover:bg-emerald-500 !text-white font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              <span>WhatsApp: ${escapeHtml(companyInfo.phoneDisplay)}</span>
            </a>

            <a class="px-6 py-4 rounded-xl bg-white/15 hover:bg-white/25 border-2 border-white/30 !text-white font-extrabold text-sm shadow-md backdrop-blur-md transition" href="/urunler" data-nav="/urunler">
              Ürünleri İnceleyin →
            </a>
          </div>
        </div>

        <!-- Sağ Orta Slayt Okları -->
        <div class="hidden sm:flex items-center gap-3 absolute top-1/2 -translate-y-1/2 right-6">
          <button type="button" id="hero-prev-btn" aria-label="Önceki Slayt" class="w-12 h-12 rounded-full bg-slate-900/90 hover:bg-brand-green border-2 border-emerald-400/50 text-white grid place-items-center shadow-xl backdrop-blur-md transition hover:scale-110 active:scale-90">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button type="button" id="hero-next-btn" aria-label="Sonraki Slayt" class="w-12 h-12 rounded-full bg-slate-900/90 hover:bg-brand-green border-2 border-emerald-400/50 text-white grid place-items-center shadow-xl backdrop-blur-md transition hover:scale-110 active:scale-90">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Alt 5'li Slayt Seçici Kart Şeridi (Yüksek Kontrast Koyu Cam) -->
      <div class="relative z-10 border-t border-white/15 bg-slate-900/90 backdrop-blur-xl py-4">
        <div class="container-x">
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3" id="hero-selector-grid">
            ${HERO_SLIDES.map((s, idx) => `
              <button
                type="button"
                data-slide-idx="${idx}"
                class="${idx === 0
                  ? 'relative text-left p-3.5 rounded-2xl transition border-2 bg-emerald-950/90 border-emerald-400 shadow-lg ring-2 ring-emerald-400/30'
                  : 'relative text-left p-3.5 rounded-2xl transition border border-white/15 bg-white/5 hover:bg-white/10 hover:border-emerald-400/40'}">
                <div class="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                  <span class="${idx === 0 ? 'text-emerald-300 font-extrabold' : 'text-slate-400'}">${escapeHtml(s.id)}</span>
                  ${idx === 0 ? '<span class="text-emerald-400 font-sans text-[9px] uppercase tracking-wider font-extrabold">Aktif</span>' : ''}
                </div>
                <p class="text-xs font-extrabold line-clamp-1 leading-snug ${idx === 0 ? 'text-white' : 'text-slate-300'}">
                  ${escapeHtml(s.shortNav)}
                </p>
                ${idx === 0 ? '<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-b-2xl animate-pulse"></div>' : ''}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Kayan Teknik Marquee Bandı (Canlı Zümrüt Kontrastı) -->
      <div class="relative z-10 border-t border-emerald-500/30 bg-emerald-950 py-3 overflow-hidden" aria-hidden="true">
        <div class="marquee flex w-max gap-8 font-mono text-xs uppercase tracking-[.22em] text-emerald-200 font-bold">
          ${repeatedMarquee.map((item) => `
            <span class="whitespace-nowrap flex items-center gap-4">
              <span class="text-emerald-400 font-black">◆</span>${escapeHtml(item)}
            </span>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 2. ÜRÜN YELPAZESİ KATEGORİ KARTLARI (#categories - 8 Yüksek Kontrastlı Görsel Kart) -->
    <section class="section bg-white" id="categories">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-2xl">
            <p class="chip mb-3">Endüstriyel Katalog</p>
            <h2 class="h2-title">Ürün ve Çözüm Yelpazesi</h2>
            <p class="mt-3 text-base leading-relaxed text-slate-700 font-medium">
              Toptan, kurumsal ve ağır sanayi tesisleri için proses spesifikasyonuna göre üretilir ve tedarik edilir — her grupta UN bidon, 1000 kg IBC ve dökme tanker seçeneği.
            </p>
          </div>
          <a class="btn-primary !py-3 !px-6 text-xs" href="/teklif-al" data-nav="/teklif-al">
            📋 Toptan Fiyat Listesi İste →
          </a>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          ${HOME_CATEGORY_CARDS.map((card) => `
            <a
              id="${escapeAttr(card.id)}"
              href="${escapeAttr(card.href)}"
              data-nav="${escapeAttr(card.href)}"
              class="group relative rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-card hover:shadow-card-hover hover:border-brand-green hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div>
                <div class="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900">
                  <img
                    src="${escapeAttr(card.image)}"
                    alt="${escapeAttr(card.title)}"
                    width="1200"
                    height="896"
                    decoding="async"
                    loading="lazy"
                    class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent"></div>
                  <span class="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 shadow-md grid place-items-center text-xl">${escapeHtml(card.emoji)}</span>
                  <span class="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md text-[11px] font-mono font-extrabold text-emerald-300 border border-emerald-400/40 shadow-md">
                    ${escapeHtml(card.specPill)}
                  </span>
                </div>
                <div class="pt-4 px-1">
                  <h3 class="font-display text-lg font-extrabold text-slate-900 group-hover:text-brand-green transition">
                    ${escapeHtml(card.title)}
                  </h3>
                  <p class="mt-1.5 text-xs leading-relaxed text-slate-700 font-medium line-clamp-2">
                    ${escapeHtml(card.desc)}
                  </p>
                </div>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200 px-1 flex items-center justify-between text-xs font-extrabold text-brand-green-dark">
                <span>Teknik Spesifikasyonlar</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section bg-slate-50 border-y border-slate-200" id="cozum-hatlari">
      <div class="container-x">
        <div class="max-w-2xl">
          <p class="chip mb-3">Çözüm hatları</p>
          <h2 class="h2-title">Tesise göre kimya ve su programı</h2>
          <p class="mt-3 text-base leading-relaxed text-slate-700">
            Su şartlandırma, jeotermal, metal yüzey, maden, atıksu ve saf su aynı teklif masasından yürür. Dozaj ve kapasite su analizi görülmeden sabitlenmez.
          </p>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          ${solutionLines.map((line) => `
            <a href="${escapeAttr(line.href)}" data-nav="${escapeAttr(line.href)}" class="flex flex-col rounded-3xl border-2 border-slate-200 bg-white p-5 hover:border-emerald-500 hover:-translate-y-1 transition">
              <h3 class="font-display text-base font-extrabold text-slate-900">${escapeHtml(line.title)}</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-600">${escapeHtml(line.summary)}</p>
              <ul class="mt-3 space-y-1 text-xs font-semibold text-slate-800">
                ${line.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
              </ul>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-2xl">
            <p class="chip mb-3">Saha mühendisliği</p>
            <h2 class="h2-title">Proje, jar-test ve işletme takibi</h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-700">
              Ham su tesisi, atıksu kimyasal programı, çamur, koku ve periyodik takip. Belediye paket arıtma, biyogaz tesisi veya akredite laboratuvar hizmeti kapsam dışıdır.
            </p>
          </div>
          <a class="btn-outline-dark !border-2 !border-slate-800 font-extrabold" href="/sistemler" data-nav="/sistemler">Sistem sayfası →</a>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          ${fieldServices.map((service) => `
            <a href="${escapeAttr(service.href)}" data-nav="${escapeAttr(service.href)}" class="rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-500">
              <h3 class="font-display text-base font-extrabold text-slate-900">${escapeHtml(service.title)}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">${escapeHtml(service.summary)}</p>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 3. ARCWATER İLHAMLI: SUYUN VE KİMYANIN DÖNGÜSÜNDE NERELERDEYİZ? (İnteraktif 5 Aşamalı Döngü) -->
    <section class="section text-white border-y-4 border-brand-green" style="background: linear-gradient(135deg, #061326 0%, #0b2545 50%, #042f2e 100%);">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl">
            <span class="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-3">
              🔄 360° Su &amp; Proses Yaşam Döngüsü
            </span>
            <h2 class="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Suyun ve Kimyanın Döngüsünde Nerelerdeyiz?
            </h2>
            <p class="mt-3 text-base text-slate-200 leading-relaxed">
              Doğal su kaynağından fabrika prosesine, buhar kazanı ve soğutma kulesinden atıksu geri kazanımına kadar tüm su döngüsünü ölçülebilir mühendislik ile yönetiyoruz.
            </p>
          </div>
          <a href="/sistemler" data-nav="/sistemler" class="btn-primary !px-6 !py-3.5 text-xs font-extrabold shadow-cta">
            Tüm 360° Sistemleri Keşfet →
          </a>
        </div>

        <!-- 5 Aşamalı Döngü Seçici Bar -->
        <div class="mt-10 grid gap-3 sm:grid-cols-5" id="water-cycle-steps">
          ${WATER_CHEMICAL_LIFECYCLE.map((st, idx) => `
            <button
              type="button"
              data-cycle-idx="${idx}"
              class="${idx === 0
                ? 'text-left p-4 rounded-2xl border-2 border-emerald-400 bg-emerald-950/90 shadow-xl transition-all'
                : 'text-left p-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 transition-all'}">
              <div class="flex items-center justify-between mb-2">
                <span class="font-mono text-xs font-black px-2.5 py-0.5 rounded-md ${idx === 0 ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-emerald-300'}">${escapeHtml(st.step)}</span>
                <span class="text-[10px] font-bold uppercase tracking-wider ${idx === 0 ? 'text-emerald-300' : 'text-slate-400'}">${idx === 0 ? 'Seçili Aşama' : 'İncele'}</span>
              </div>
              <h3 class="font-display text-sm font-extrabold text-white leading-snug">${escapeHtml(st.title)}</h3>
            </button>
          `).join('')}
        </div>

        <!-- Seçili Aşama Detay Paneli -->
        <div id="water-cycle-detail" class="mt-6 rounded-3xl border-2 border-emerald-400/40 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div class="grid gap-8 lg:grid-cols-[1.2fr_.8fr] items-center">
            <div>
              <div class="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <span>AŞAMA ${escapeHtml(initialCycle.step)}</span>
                <span>•</span>
                <span>${escapeHtml(initialCycle.subtitle)}</span>
              </div>
              <h3 class="font-display text-2xl sm:text-3xl font-black text-white">${escapeHtml(initialCycle.title)}</h3>
              <p class="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">${escapeHtml(initialCycle.summary)}</p>

              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <div class="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2">🧪 Aktif Kimyasallar &amp; Medya</div>
                  <ul class="space-y-1.5 text-xs text-slate-200 font-semibold">
                    ${initialCycle.activeChemicals.map((c) => `<li class="flex items-center gap-2"><span class="text-emerald-400">✓</span>${escapeHtml(c)}</li>`).join('')}
                  </ul>
                </div>
                <div class="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2">⚙️ Mühendislik Ekipmanları</div>
                  <ul class="space-y-1.5 text-xs text-slate-200 font-semibold">
                    ${initialCycle.systems.map((s) => `<li class="flex items-center gap-2"><span class="text-emerald-400">✓</span>${escapeHtml(s)}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/60 p-6 flex flex-col justify-between gap-5">
              <div>
                <div class="text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-300">Ölçülebilir Performans Kriterleri</div>
                <div class="mt-4 space-y-3">
                  ${initialCycle.metrics.map((m) => `
                    <div class="flex items-center gap-3 rounded-xl bg-slate-900/90 border border-emerald-400/30 px-4 py-3 text-sm font-extrabold text-white">
                      <span class="text-emerald-400 text-base">⚡</span>
                      <span>${escapeHtml(m)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="flex flex-wrap gap-3 pt-2">
                <a href="${escapeAttr(initialCycle.ctaHref)}" data-nav="${escapeAttr(initialCycle.ctaHref)}" class="btn-primary w-full text-center text-xs font-extrabold">
                  Bu Aşama İçin Çözüm &amp; Teklif Al →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. ARCWATER İLHAMLI: TOPLAM SU YÖNETİMİ & 360° OTOMASYON SİSTEMLERİ + PROJE KARTLARI -->
    <section class="section bg-slate-100 border-b border-slate-200">
      <div class="container-x">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="chip mb-2">360° Mühendislik &amp; Saha Gücü</p>
            <h2 class="h2-title">Toplam Su Yönetimi &amp; Otomasyon Çözümlerimiz</h2>
          </div>
          <!-- Sekme Butonları -->
          <div class="inline-flex rounded-2xl border-2 border-slate-300 bg-white p-1.5 shadow-sm" id="eng-360-tabs">
            <button type="button" data-eng-tab="total_water" class="px-5 py-2.5 rounded-xl text-xs font-extrabold transition bg-gradient-to-r from-brand-green to-brand-teal text-white shadow-sm">
              💧 Toplam Su &amp; Kimya Yönetimi
            </button>
            <button type="button" data-eng-tab="automation_engineering" class="px-5 py-2.5 rounded-xl text-xs font-extrabold transition text-slate-800 hover:bg-slate-100">
              🎛️ Pano, PLC/SCADA &amp; Otomasyon
            </button>
          </div>
        </div>

        <div id="eng-360-grid" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          ${initialTabObj.items.map((item) => `
            <a href="${escapeAttr(item.href)}" data-nav="${escapeAttr(item.href)}" class="card p-6 border-2 border-slate-200 hover:border-brand-green hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="font-mono text-xs font-black px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300">${escapeHtml(item.code)}</span>
                  <span class="text-[11px] font-mono font-bold text-brand-green-dark">360° Çözüm</span>
                </div>
                <h3 class="font-display text-lg font-extrabold text-slate-900">${escapeHtml(item.title)}</h3>
                <p class="mt-2 text-xs leading-relaxed text-slate-700 font-medium">${escapeHtml(item.desc)}</p>
              </div>
              <div class="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-800">
                <span>${escapeHtml(item.specs)}</span>
                <span class="text-brand-green text-sm font-black">→</span>
              </div>
            </a>
          `).join('')}
        </div>

        <!-- Arcwater Tarzı Numaralı Anahtar Teslim Proje Kartları (01 / 02 / 03) -->
        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <a href="/teklif-al?type=project" data-nav="/teklif-al?type=project" class="group rounded-3xl border-2 border-slate-300 bg-slate-900 p-7 text-white shadow-xl hover:border-emerald-400 transition-all flex items-center justify-between">
            <div>
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">PROJE PAKETİ 01</span>
              <h3 class="mt-1 font-display text-xl font-black text-white group-hover:text-emerald-300 transition">Anahtar Teslim Su Arıtma Tesisi</h3>
              <p class="mt-1.5 text-xs text-slate-300">Kuyu/Şebeke Ön Arıtma + RO + EDI + Otomasyon Panosu</p>
            </div>
            <span class="font-display text-3xl font-black text-emerald-400 group-hover:translate-x-1 transition-transform">01 →</span>
          </a>

          <a href="/teklif-al?type=water" data-nav="/teklif-al?type=water" class="group rounded-3xl border-2 border-slate-300 bg-slate-900 p-7 text-white shadow-xl hover:border-emerald-400 transition-all flex items-center justify-between">
            <div>
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">PROJE PAKETİ 02</span>
              <h3 class="mt-1 font-display text-xl font-black text-white group-hover:text-emerald-300 transition">Kule &amp; Kazan Şartlandırma Sözleşmesi</h3>
              <p class="mt-1.5 text-xs text-slate-300">Aylık Su Analizi + Otomatik Dozaj + Yakıt &amp; Korozyon Koruması</p>
            </div>
            <span class="font-display text-3xl font-black text-emerald-400 group-hover:translate-x-1 transition-transform">02 →</span>
          </a>

          <a href="/teklif-al?type=project" data-nav="/teklif-al?type=project" class="group rounded-3xl border-2 border-slate-300 bg-slate-900 p-7 text-white shadow-xl hover:border-emerald-400 transition-all flex items-center justify-between">
            <div>
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">PROJE PAKETİ 03</span>
              <h3 class="mt-1 font-display text-xl font-black text-white group-hover:text-emerald-300 transition">Sıfır Atık &amp; Su Geri Kazanım Projesi</h3>
              <p class="mt-1.5 text-xs text-slate-300">Atıksu Kimyasal Flokülasyon + UF/RO Geri Kazanım Mühendisliği</p>
            </div>
            <span class="font-display text-3xl font-black text-emerald-400 group-hover:translate-x-1 transition-transform">03 →</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 5. ÖNE ÇIKAN ÜRÜNLER (#featured - 6 Yüksek Kontrastlı Ürün Kartı) -->
    <section class="section bg-white" id="featured">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-2xl">
            <p class="chip mb-3">En Çok Talep Edilenler</p>
            <h2 class="h2-title">Öne Çıkan Endüstriyel Ürünler</h2>
            <p class="mt-3 text-base leading-relaxed text-slate-700 font-medium">
              Ağır sanayi, su şartlandırma ve arıtma tesisleri için yüksek saflıkta üretilir — her üründe teknik veri formu (TDS) ve güvenlik bilgi formu (SDS) standarttır.
            </p>
          </div>
          <a class="btn-outline-dark !border-2 !border-slate-800 !text-slate-900 font-extrabold" href="/urunler" data-nav="/urunler">Tüm ürünleri gör →</a>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${FEATURED_PRODUCTS.map((item) => `
            <article class="group relative rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-card hover:shadow-card-hover hover:border-brand-green hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div>
                <div class="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900">
                  <img
                    src="${escapeAttr(item.image)}"
                    alt="${escapeAttr(item.title)}"
                    width="1200"
                    height="896"
                    decoding="async"
                    loading="lazy"
                    class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>
                  <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-white text-[10px] font-extrabold uppercase tracking-wider text-slate-900 border border-slate-300 shadow-md">
                    ${escapeHtml(item.badgeEmoji)} ${escapeHtml(item.badgeText)}
                  </span>
                  <span class="absolute bottom-3 left-3 max-w-[92%] truncate px-3 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md text-[11px] font-mono font-extrabold text-emerald-300 border border-emerald-400/40 shadow-md">
                    ${escapeHtml(item.materialSpec)}
                  </span>
                </div>
                <div class="pt-4 px-1">
                  <h3 class="font-display text-lg font-extrabold text-slate-900 group-hover:text-brand-green transition">
                    <a href="/teklif-al?product=${encodeURIComponent(item.title)}" data-nav="/teklif-al?product=${encodeURIComponent(item.title)}">
                      ${escapeHtml(item.title)}
                    </a>
                  </h3>
                  <p class="mt-1.5 text-xs leading-relaxed text-slate-700 font-medium line-clamp-2">
                    ${escapeHtml(item.desc)}
                  </p>
                </div>
              </div>
              <div class="mt-5 pt-3.5 border-t border-slate-200 px-1 flex items-center justify-between">
                <span class="text-[11px] font-mono text-slate-700 font-bold">
                  Ambalaj: <strong class="text-slate-950">${escapeHtml(item.moq)}</strong>
                </span>
                <a class="inline-flex items-center gap-1 text-xs font-extrabold text-brand-green-dark hover:text-brand-green group-hover:translate-x-0.5 transition-transform" href="/teklif-al?product=${encodeURIComponent(item.title)}" data-nav="/teklif-al?product=${encodeURIComponent(item.title)}">
                  <span>Toplu fiyat isteyin</span>
                  <span>→</span>
                </a>
              </div>
            </article>
          `).join('')}
        </div>

        <!-- Canlı Firestore'dan Eklenen Ek Ürünler (Varsa) -->
        <div id="home-live-products" class="mt-8"></div>
      </div>
    </section>

    ${renderMedipureShowcase()}

    <!-- 6. HİZMET VERDİĞİMİZ SEKTÖRLER -->
    <section class="section bg-slate-100 border-y border-slate-200">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <p class="chip mb-3">Ağır Sanayi &amp; OSB Uzmanlığı</p>
          <h2 class="font-display text-3xl font-black text-slate-900 sm:text-4xl">Hizmet verdiğimiz sanayi sektörleri</h2>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          ${SECTORS_LIST.map((sec) => `
            <a href="/sektorler" data-nav="/sektorler" class="card p-6 border-2 border-slate-200 hover:border-brand-green hover:-translate-y-1 transition-all duration-200 block">
              <div class="text-[11px] font-mono font-extrabold text-brand-green-dark uppercase tracking-wider mb-1.5">${escapeHtml(sec.badge)}</div>
              <h3 class="font-display text-lg font-extrabold text-slate-900">${escapeHtml(sec.title)}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-700 font-medium">${escapeHtml(sec.desc)}</p>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 7. SIKÇA SORULAN SORULAR (FAQ) & 30 DAKİKADA GERİ ARAMA -->
    <section class="section bg-white" id="sizi-arayalim">
      <div class="container-x grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <div class="max-w-2xl space-y-6">
          <div>
            <p class="chip mb-3">SSS &amp; Teknik Destek</p>
            <h2 class="h2-title">Sıkça sorulan sorular</h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-700 font-medium">
              Minimum sipariş miktarları, su analizi doğrulaması, yoğunluk dönüşümü ve ADR sevkiyat süreçlerimiz hakkında temel mühendislik cevapları.
            </p>
          </div>

          <!-- Yüksek Kontrastlı Hızlı Geri Arama Kartı (CRM Entegre) -->
          <div class="rounded-3xl p-6 border-2 border-brand-green bg-slate-900 text-white shadow-xl">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-400">30 Dakikada Mühendislik Geri Arama</span>
            </div>
            <h3 class="font-display text-lg font-extrabold text-white">Hızlı Teklif &amp; Saha Analizi Talebi</h3>
            <p class="mt-1 text-xs text-slate-300 mb-4">
              Telefon numaranızı bırakın, nöbetçi kimya/su arıtma mühendisimiz 30 dakika içinde sizi arasın.
            </p>
            <form id="home-callback-form" class="space-y-3">
              <div>
                <input type="text" id="cb-company" name="companyName" class="input !bg-white !text-slate-900 font-semibold" required placeholder="Firma Adı & Yetkili Ad Soyad *" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="tel" id="cb-phone" name="phone" class="input !bg-white !text-slate-900 font-semibold" required placeholder="Telefon (05XX XXX XX XX) *" />
                <select id="cb-topic" name="relatedProductOrSystem" class="input !bg-white !text-slate-900 font-semibold">
                  <option value="Endüstriyel Kimyasal Fiyat Teklifi">Kimyasal Fiyat Teklifi</option>
                  <option value="Kule / Kazan Su Şartlandırma">Kule / Kazan Şartlandırma</option>
                  <option value="Ters Ozmoz (RO) / EDI Su Arıtma">Ters Ozmoz (RO) &amp; EDI</option>
                  <option value="Medipure Saf Su Cihazı">Medipure Saf Su Cihazı</option>
                  <option value="Jeotermal Kireç ve Korozyon">Jeotermal Kireç ve Korozyon</option>
                  <option value="Ücretsiz Saha Su Analizi & Jar-Test">Saha Su Analizi &amp; Jar-Test</option>
                </select>
              </div>
              <button type="submit" id="cb-submit-btn" class="btn-primary w-full !py-3.5 text-sm font-extrabold">
                <span>📞</span>
                <span>Beni 30 Dakikada Arayın</span>
              </button>
            </form>
          </div>
        </div>

        <div class="space-y-4">
          ${faqItems.map((f, i) => `
            <details class="card p-5 group border-2 border-slate-200 open:border-brand-green" ${i === 0 ? 'open' : ''}>
              <summary class="cursor-pointer list-none font-display text-sm font-extrabold text-slate-900 flex items-center justify-between">
                <span>${escapeHtml(f.question)}</span>
                <span class="text-brand-green font-black transition-transform duration-200 group-open:rotate-90">▸</span>
              </summary>
              <p class="mt-3 text-sm leading-relaxed text-slate-700 font-medium pt-2 border-t border-slate-200">
                ${escapeHtml(f.answer)}
              </p>
            </details>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section bg-white border-t border-slate-200" id="geo-ozet">
      <div class="container-x max-w-3xl">
        <p class="chip mb-3">Kısa cevap</p>
        <h2 class="h2-title">Elif Kimya ne tedarik eder, nereden sevk eder?</h2>
        <p class="mt-3 text-base leading-relaxed text-slate-700">
          Elif Kimya, Adana Hacı Sabancı OSB merkezli bir endüstriyel kimya ve su arıtma firmasıdır. Sodyum hipoklorit, kostik soda, hidroklorik asit, soğutma kulesi ve buhar kazanı kimyasalları, PAC ve polielektrolit, jeotermal kireç inhibitörü, RO/EDI sistemleri ve 163 model Medipure saf su cihazı için teklif verir.
        </p>
        <p class="mt-3 text-base leading-relaxed text-slate-700">
          Sevkiyat hattı Adana, Mersin-Tarsus, İskenderun-Payas, Osmaniye, Gaziantep, Kahramanmaraş, Kayseri ve Niğde OSB’dir. Jeotermal programlar Denizli, Aydın, Manisa ve Afyon sahaları için de kurulur. Dozaj ve cihaz kapasitesi su veya brine analizi görülmeden garanti edilmez.
        </p>
      </div>
    </section>

    <!-- 8. SEO & GEO ENDÜSTRİYEL ANAHTAR KELİME VE OSB OTORİTE MATRİSİ -->
    <section class="section bg-slate-100 border-t border-slate-200" id="seo-geo-matrix">
      <div class="container-x">
        <div class="max-w-3xl">
          <p class="chip mb-3">Teknik Dizin &amp; Bölgesel OSB Otoritesi</p>
          <h2 class="h2-title">Endüstriyel Kimya &amp; Su Arıtma Hızlı Tedarik Matrisi</h2>
          <p class="mt-3 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Fabrikanızın aradığı spesifik kimyasal hammadde, su şartlandırma formülü veya arıtma ekipmanına tıklayarak doğrudan teknik şartnameli teklif ekranına geçebilirsiniz.
          </p>
        </div>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          ${SEO_KEYWORD_CLUSTERS.map((cluster) => `
            <div class="card p-6 border-2 border-slate-200 bg-white">
              <div class="text-[11px] font-mono font-extrabold text-brand-green-dark uppercase tracking-wider mb-1">
                ${escapeHtml(cluster.intent)}
              </div>
              <h3 class="font-display text-base font-extrabold text-slate-900">${escapeHtml(cluster.title)}</h3>
              <p class="mt-1 text-xs text-slate-500 font-semibold">Bölge: ${escapeHtml(cluster.targetRegions)}</p>
              <div class="mt-4 flex flex-wrap gap-1.5">
                ${cluster.keywords.map((kw) => `
                  <a
                    href="/teklif-al?product=${encodeURIComponent(kw)}"
                    data-nav="/teklif-al?product=${encodeURIComponent(kw)}"
                    class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-950 border border-slate-200 hover:border-emerald-400 transition">
                    ${escapeHtml(kw)}
                  </a>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 9. ALT KURUMSAL TEKLİF BANNER'I -->
    <section class="hero-bg section border-t-2 border-emerald-500/30 text-slate-900">
      <div class="container-x text-center max-w-3xl mx-auto">
        <p class="chip mb-3">Toptan Tedarik &amp; İhracat</p>
        <h2 class="font-display text-3xl font-black text-slate-900 sm:text-4xl">
          Toplu teklif veya yerinde su analizi için hazır mısınız?
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-slate-700 font-medium text-base sm:text-lg">
          Spesifikasyonlarınızı, teslimat şehrinizi/OSB'nizi ve miktarınızı gönderin — TDS/SDS belgeleri ve ambalaj detaylarıyla aynı iş günü içinde teklif alın.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a class="btn-primary !px-8 !py-4 !text-base shadow-cta" href="/teklif-al" data-nav="/teklif-al">
            📋 Hemen Teklif İsteyin
          </a>
          <a class="btn-outline-dark !px-8 !py-4 !text-base !border-2 !border-slate-800 !text-slate-900 font-extrabold" href="/iletisim" data-nav="/iletisim">
            İletişim &amp; Merkez Depo
          </a>
        </div>
      </div>
    </section>
  `;

  renderSafeHtml(container, html);

  function bindNavLinks(root) {
    root.querySelectorAll('a[data-nav]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || link.getAttribute('data-nav');
        if (href && href.startsWith('/')) {
          e.preventDefault();
          navigate(href);
        }
      });
    });
  }
  bindNavLinks(container);
  bindMedipureCatalog(container);

  // Hero Slider Etkileşimi
  const heroSection = container.querySelector('#home-hero-section');
  const tagEl = container.querySelector('#hero-active-tag');
  const titleEl = container.querySelector('#hero-active-title');
  const subtitleEl = container.querySelector('#hero-active-subtitle');
  const highlightsEl = container.querySelector('#hero-active-highlights');
  const waLinkEl = container.querySelector('#hero-wa-link');
  const bgSlides = container.querySelectorAll('[data-bg-slide]');
  const selectorGrid = container.querySelector('#hero-selector-grid');

  function setSlide(index) {
    activeSlide = (index + HERO_SLIDES.length) % HERO_SLIDES.length;
    const slide = HERO_SLIDES[activeSlide];

    bgSlides.forEach((el, idx) => {
      const isCurrent = idx === activeSlide;
      el.setAttribute('aria-hidden', isCurrent ? 'false' : 'true');
      el.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${isCurrent ? 'opacity-100' : 'opacity-0'}`;
      const img = el.querySelector('.hero-slide-img');
      if (img) {
        img.className = `hero-slide-img absolute inset-0 w-full h-full object-cover object-center opacity-50 transform transition-transform duration-[8000ms] ${isCurrent ? 'scale-105' : 'scale-100'}`;
      }
    });

    if (tagEl) tagEl.textContent = slide.tag;
    if (titleEl) titleEl.textContent = slide.title;
    if (subtitleEl) subtitleEl.textContent = slide.subtitle;
    if (waLinkEl) {
      const msg = `Merhaba ELİF KİMYA, web sitenizden ulaşıyorum. "${slide.title}" hakkında toptan teklif almak istiyorum.`;
      waLinkEl.setAttribute('href', `https://wa.me/${whatsappClean}?text=${encodeURIComponent(msg)}`);
    }

    if (highlightsEl) {
      const hlHtml = slide.highlights
        .map(
          (h) => `
          <span class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-emerald-400/40 text-xs font-extrabold text-white shadow-md backdrop-blur-md flex items-center gap-2 transition">
            <span class="text-emerald-400 font-black">✓</span>${escapeHtml(h)}
          </span>
        `
        )
        .join('');
      renderSafeHtml(highlightsEl, hlHtml);
    }

    if (selectorGrid) {
      const buttonsHtml = HERO_SLIDES.map((s, idx) => {
        const isCurrent = idx === activeSlide;
        return `
          <button
            type="button"
            data-slide-idx="${idx}"
            class="${isCurrent
              ? 'relative text-left p-3.5 rounded-2xl transition border-2 bg-emerald-950/90 border-emerald-400 shadow-lg ring-2 ring-emerald-400/30'
              : 'relative text-left p-3.5 rounded-2xl transition border border-white/15 bg-white/5 hover:bg-white/10 hover:border-emerald-400/40'}">
            <div class="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
              <span class="${isCurrent ? 'text-emerald-300 font-extrabold' : 'text-slate-400'}">${escapeHtml(s.id)}</span>
              ${isCurrent ? '<span class="text-emerald-400 font-sans text-[9px] uppercase tracking-wider font-extrabold">Aktif</span>' : ''}
            </div>
            <p class="text-xs font-extrabold line-clamp-1 leading-snug ${isCurrent ? 'text-white' : 'text-slate-300'}">
              ${escapeHtml(s.shortNav)}
            </p>
            ${isCurrent ? '<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-b-2xl animate-pulse"></div>' : ''}
          </button>
        `;
      }).join('');
      renderSafeHtml(selectorGrid, buttonsHtml);
      selectorGrid.querySelectorAll('[data-slide-idx]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetIdx = Number(btn.getAttribute('data-slide-idx') || 0);
          setSlide(targetIdx);
        });
      });
    }
  }

  container.querySelector('#hero-prev-btn')?.addEventListener('click', () => setSlide(activeSlide - 1));
  container.querySelector('#hero-next-btn')?.addEventListener('click', () => setSlide(activeSlide + 1));
  selectorGrid?.querySelectorAll('[data-slide-idx]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetIdx = Number(btn.getAttribute('data-slide-idx') || 0);
      setSlide(targetIdx);
    });
  });

  heroSection?.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  heroSection?.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  const slideTimer = setInterval(() => {
    if (!document.body.contains(heroSection)) {
      clearInterval(slideTimer);
      return;
    }
    if (!isPaused) {
      setSlide(activeSlide + 1);
    }
  }, 7000);

  // Arcwater İlhamlı Su & Kimya Döngüsü Etkileşimi
  const cycleStepsBox = container.querySelector('#water-cycle-steps');
  const cycleDetailBox = container.querySelector('#water-cycle-detail');
  function renderCycleStage(idx) {
    activeCycleIdx = idx;
    const st = WATER_CHEMICAL_LIFECYCLE[activeCycleIdx] || WATER_CHEMICAL_LIFECYCLE[0];
    if (cycleStepsBox) {
      const stepsHtml = WATER_CHEMICAL_LIFECYCLE.map((item, i) => {
        const isCur = i === activeCycleIdx;
        return `
          <button
            type="button"
            data-cycle-idx="${i}"
            class="${isCur
              ? 'text-left p-4 rounded-2xl border-2 border-emerald-400 bg-emerald-950/90 shadow-xl transition-all'
              : 'text-left p-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 transition-all'}">
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono text-xs font-black px-2.5 py-0.5 rounded-md ${isCur ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-emerald-300'}">${escapeHtml(item.step)}</span>
              <span class="text-[10px] font-bold uppercase tracking-wider ${isCur ? 'text-emerald-300' : 'text-slate-400'}">${isCur ? 'Seçili Aşama' : 'İncele'}</span>
            </div>
            <h3 class="font-display text-sm font-extrabold text-white leading-snug">${escapeHtml(item.title)}</h3>
          </button>
        `;
      }).join('');
      renderSafeHtml(cycleStepsBox, stepsHtml);
      cycleStepsBox.querySelectorAll('[data-cycle-idx]').forEach((b) => {
        b.addEventListener('click', () => renderCycleStage(Number(b.getAttribute('data-cycle-idx') || 0)));
      });
    }

    if (cycleDetailBox) {
      const detailHtml = `
        <div class="grid gap-8 lg:grid-cols-[1.2fr_.8fr] items-center">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <span>AŞAMA ${escapeHtml(st.step)}</span>
              <span>•</span>
              <span>${escapeHtml(st.subtitle)}</span>
            </div>
            <h3 class="font-display text-2xl sm:text-3xl font-black text-white">${escapeHtml(st.title)}</h3>
            <p class="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">${escapeHtml(st.summary)}</p>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <div class="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2">🧪 Aktif Kimyasallar &amp; Medya</div>
                <ul class="space-y-1.5 text-xs text-slate-200 font-semibold">
                  ${st.activeChemicals.map((c) => `<li class="flex items-center gap-2"><span class="text-emerald-400">✓</span>${escapeHtml(c)}</li>`).join('')}
                </ul>
              </div>
              <div class="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-2">⚙️ Mühendislik Ekipmanları</div>
                <ul class="space-y-1.5 text-xs text-slate-200 font-semibold">
                  ${st.systems.map((s) => `<li class="flex items-center gap-2"><span class="text-emerald-400">✓</span>${escapeHtml(s)}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/60 p-6 flex flex-col justify-between gap-5">
            <div>
              <div class="text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-300">Ölçülebilir Performans Kriterleri</div>
              <div class="mt-4 space-y-3">
                ${st.metrics.map((m) => `
                  <div class="flex items-center gap-3 rounded-xl bg-slate-900/90 border border-emerald-400/30 px-4 py-3 text-sm font-extrabold text-white">
                    <span class="text-emerald-400 text-base">⚡</span>
                    <span>${escapeHtml(m)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="flex flex-wrap gap-3 pt-2">
              <a href="${escapeAttr(st.ctaHref)}" data-nav="${escapeAttr(st.ctaHref)}" class="btn-primary w-full text-center text-xs font-extrabold">
                Bu Aşama İçin Çözüm &amp; Teklif Al →
              </a>
            </div>
          </div>
        </div>
      `;
      renderSafeHtml(cycleDetailBox, detailHtml);
      bindNavLinks(cycleDetailBox);
    }
  }

  cycleStepsBox?.querySelectorAll('[data-cycle-idx]').forEach((b) => {
    b.addEventListener('click', () => renderCycleStage(Number(b.getAttribute('data-cycle-idx') || 0)));
  });

  // 360° Mühendislik & Otomasyon Sekmeleri Etkileşimi
  const engTabsBox = container.querySelector('#eng-360-tabs');
  const engGridBox = container.querySelector('#eng-360-grid');
  engTabsBox?.querySelectorAll('[data-eng-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeEngTab = btn.getAttribute('data-eng-tab') || 'total_water';
      const tabObj = ENGINEERING_360_TABS[activeEngTab] || ENGINEERING_360_TABS.total_water;
      engTabsBox.querySelectorAll('[data-eng-tab]').forEach((b) => {
        const isAct = b.getAttribute('data-eng-tab') === activeEngTab;
        b.className = isAct
          ? 'px-5 py-2.5 rounded-xl text-xs font-extrabold transition bg-gradient-to-r from-brand-green to-brand-teal text-white shadow-sm'
          : 'px-5 py-2.5 rounded-xl text-xs font-extrabold transition text-slate-800 hover:bg-slate-100';
      });
      if (engGridBox) {
        const cardsHtml = tabObj.items.map((item) => `
          <a href="${escapeAttr(item.href)}" data-nav="${escapeAttr(item.href)}" class="card p-6 border-2 border-slate-200 hover:border-brand-green hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="font-mono text-xs font-black px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300">${escapeHtml(item.code)}</span>
                <span class="text-[11px] font-mono font-bold text-brand-green-dark">${escapeHtml(tabObj.badge)}</span>
              </div>
              <h3 class="font-display text-lg font-extrabold text-slate-900">${escapeHtml(item.title)}</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-700 font-medium">${escapeHtml(item.desc)}</p>
            </div>
            <div class="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-800">
              <span>${escapeHtml(item.specs)}</span>
              <span class="text-brand-green text-sm font-black">→</span>
            </div>
          </a>
        `).join('');
        renderSafeHtml(engGridBox, cardsHtml);
        bindNavLinks(engGridBox);
      }
    });
  });

  // Hızlı Geri Arama Formu -> Firestore CRM
  const callbackForm = container.querySelector('#home-callback-form');
  if (callbackForm) {
    callbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = container.querySelector('#cb-submit-btn');
      const fd = new FormData(callbackForm);
      const companyName = String(fd.get('companyName') || '').trim();
      const phone = String(fd.get('phone') || '').trim();
      const topic = String(fd.get('relatedProductOrSystem') || '').trim();

      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'İletiliyor...';
        }
        await submitPublicCrmForm({
          companyName,
          contactName: companyName,
          phone,
          email: 'geri-arama@elifkimya.com.tr',
          cityCountry: 'Adana / Çukurova',
          requestType: 'callback_30min',
          relatedProductOrSystem: topic,
          description: `Ana sayfa 30 Dakikada Mühendislik Geri Arama talebi. Konu: ${topic}`,
          kvkkConsent: true,
          sourcePage: '/'
        });
        callbackForm.reset();
        showNotification('Talebiniz alındı! Mühendisimiz 30 dakika içinde sizi arayacaktır.', 'success');
      } catch (err) {
        showNotification(err.message || 'Talep gönderilirken bir hata oluştu.', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          renderSafeHtml(btn, '<span>📞</span><span>Beni 30 Dakikada Arayın</span>');
        }
      }
    });
  }

  // Canlı Firestore ürünlerini varsa yükle
  const liveContainer = container.querySelector('#home-live-products');
  if (liveContainer) {
    try {
      const liveItems = await fetchPublicProducts();
      if (liveItems && liveItems.length > 0) {
        const liveHtml = `
          <div class="mt-8 pt-8 border-t border-slate-200">
            <p class="chip mb-3">Canlı Stok &amp; Katalog</p>
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              ${liveItems.slice(0, 6).map((p) => {
                const priceLabel =
                  p.unitPrice !== null && p.unitPrice !== undefined && Number(p.unitPrice) > 0
                    ? `${Number(p.unitPrice).toLocaleString('tr-TR')} ${escapeHtml(p.currency || 'TRY')} / ${escapeHtml(p.salesUnit || 'kg')}`
                    : 'Toplu fiyat isteyin';
                return `
                  <article class="group relative rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-card hover:shadow-card-hover hover:border-brand-green hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                    <div class="pt-2 px-1">
                      <div class="flex items-center justify-between gap-2 mb-2">
                        <span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-[10px] font-mono font-extrabold text-emerald-900 border border-emerald-300">
                          ${escapeHtml(p.productCode || 'STOK ÜRÜNÜ')}
                        </span>
                        ${p.casNumber ? `<span class="text-[11px] font-mono font-bold text-slate-600">CAS: ${escapeHtml(p.casNumber)}</span>` : ''}
                      </div>
                      <h3 class="font-display text-lg font-extrabold text-slate-900 group-hover:text-brand-green transition">
                        ${escapeHtml(p.tradeName || p.name)}
                      </h3>
                      <p class="mt-1.5 text-xs leading-relaxed text-slate-700 font-medium line-clamp-2">
                        ${escapeHtml(p.applicationArea || p.technicalSpecs || '')}
                      </p>
                    </div>
                    <div class="mt-5 pt-3.5 border-t border-slate-200 px-1 flex items-center justify-between">
                      <span class="text-[11px] font-mono text-slate-700 font-bold">
                        Ambalaj: <strong class="text-slate-950">${escapeHtml(p.packagingType || 'Endüstriyel')}</strong>
                      </span>
                      <a class="inline-flex items-center gap-1 text-xs font-extrabold text-brand-green-dark hover:text-brand-green group-hover:translate-x-0.5 transition-transform" href="/teklif-al?product=${encodeURIComponent(p.tradeName || p.name)}" data-nav="/teklif-al?product=${encodeURIComponent(p.tradeName || p.name)}">
                        <span>${escapeHtml(priceLabel)}</span>
                        <span>→</span>
                      </a>
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </div>
        `;
        renderSafeHtml(liveContainer, liveHtml);
        bindNavLinks(liveContainer);
      }
    } catch (_e) {
      // Sessizce geç
    }
  }
}
