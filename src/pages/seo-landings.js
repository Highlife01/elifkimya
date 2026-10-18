/**
 * Katalog, sistem, sektör ve hizmet bölgesi sayfaları.
 * Metinler mevcut ürün verisinden gelir; fiyat, stok ve sertifika eklenmez.
 */
import { escapeAttr, escapeHtml } from '../utils/security.js';
import {
  companyInfo,
  pageSEO,
  productCategories,
  sectorsData,
  serviceRegions,
  waterTreatmentSystems
} from '../data/products.js';

const SITE = 'https://www.elifcevrekimya.com.tr';

export const REGION_SLUGS = [
  'adana',
  'mersin',
  'iskenderun-osmaniye',
  'nigde-kayseri',
  'gaziantep-kahramanmaras',
  'turkiye-geneli'
];

function clip(text, max = 158) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function route(path, title, description, h1, kind, body) {
  return {
    path,
    title,
    description: clip(description),
    h1,
    kind,
    canonical: path === '/' ? `${SITE}/` : `${SITE}${path}`,
    body
  };
}

export function buildPublicRoutes() {
  const routes = Object.entries(pageSEO).map(([path, seo]) => route(
    path,
    seo.title,
    seo.description,
    seo.title.split('|')[0].trim(),
    'hub',
    { paragraphs: [seo.description], links: [] }
  ));

  productCategories.forEach((cat) => {
    routes.push(route(
      `/urunler/${cat.id}`,
      `${cat.title} | Elif Çevre Kimya`,
      cat.shortDesc || cat.description,
      cat.title,
      'product',
      {
        paragraphs: [
          cat.shortDesc || cat.description,
          `Ambalaj seçenekleri katalog kaydına göredir: ${cat.packaging}. Fiyat, stok ve teslim süresi teklifte netleşir. Dozaj veya kapasite, su analizi olmadan garanti edilmez.`
        ],
        items: (cat.subcategories || []).map((sub) => ({
          title: sub.name,
          text: sub.desc,
          facts: [sub.activeChemical, ...(sub.specs || []).filter((line) => /ambalaj/i.test(line))].filter(Boolean)
        })),
        quote: cat.title
      }
    ));
  });

  waterTreatmentSystems.forEach((sys) => {
    routes.push(route(
      `/sistemler/${sys.id}`,
      `${sys.title} | Elif Çevre Kimya`,
      sys.summary,
      sys.title,
      'system',
      {
        paragraphs: [
          sys.summary,
          `Katalogda yazılı kapasite aralığı: ${sys.capacityRange}. Kesin kapasite ham su analizi ve kullanım amacı görülmeden taahhüt edilmez.`
        ],
        items: [{
          title: 'Sistem notları',
          text: sys.useCases,
          facts: sys.features || []
        }],
        quote: sys.title
      }
    ));
  });

  sectorsData.forEach((sector) => {
    routes.push(route(
      `/sektorler/${sector.id}`,
      `${sector.title} | Elif Çevre Kimya`,
      sector.summary,
      sector.title,
      'sector',
      {
        paragraphs: [
          sector.summary,
          `Bu sayfadaki bölge notu mevcut hizmet kaydındandır: ${sector.region}. Şube, depo veya referans listesi bu kayıttan üretilmez.`
        ],
        items: [{
          title: 'Katalogda adı geçen hatlar',
          text: 'Aşağıdaki adlar mevcut sektör kaydından alınmıştır. Saflık ve fiyat teklif aşamasında doğrulanır.',
          facts: sector.keyChemicals || []
        }],
        quote: sector.title
      }
    ));
  });

  serviceRegions.forEach((region, index) => {
    const slug = REGION_SLUGS[index];
    if (!slug) return;
    routes.push(route(
      `/hizmet-bolgeleri/${slug}`,
      `${region.region} | Elif Çevre Kimya Sevkiyat`,
      region.details,
      region.region,
      'region',
      {
        paragraphs: [
          region.details,
          'Kayıtlı adres Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana’dır. Site adresi www.elifcevrekimya.com.tr. Bu sayfa sevkiyat bölgesini anlatır; ayrı şube adresi ilan etmez.'
        ],
        items: [{
          title: region.badge,
          text: 'Öne çıkan hatlar mevcut bölge kaydındandır.',
          facts: region.highlights || []
        }],
        quote: region.region
      }
    ));
  });

  const home = routes.find((item) => item.path === '/');
  if (home) {
    home.body.links = [
      ...productCategories.map((cat) => ({ href: `/urunler/${cat.id}`, label: cat.title })),
      ...waterTreatmentSystems.map((sys) => ({ href: `/sistemler/${sys.id}`, label: sys.title })),
      ...sectorsData.map((sector) => ({ href: `/sektorler/${sector.id}`, label: sector.title })),
      ...serviceRegions.map((region, index) => ({ href: `/hizmet-bolgeleri/${REGION_SLUGS[index]}`, label: region.region }))
    ];
  }
  const products = routes.find((item) => item.path === '/urunler');
  if (products) {
    products.body.links = productCategories.map((cat) => ({ href: `/urunler/${cat.id}`, label: cat.title }));
  }
  const systems = routes.find((item) => item.path === '/sistemler');
  if (systems) {
    systems.body.links = waterTreatmentSystems.map((sys) => ({ href: `/sistemler/${sys.id}`, label: sys.title }));
  }
  const sectors = routes.find((item) => item.path === '/sektorler');
  if (sectors) {
    sectors.body.links = sectorsData.map((sector) => ({ href: `/sektorler/${sector.id}`, label: sector.title }));
  }
  const regions = routes.find((item) => item.path === '/hizmet-bolgeleri');
  if (regions) {
    regions.body.links = serviceRegions.map((region, index) => ({
      href: `/hizmet-bolgeleri/${REGION_SLUGS[index]}`,
      label: region.region
    }));
  }

  return routes;
}

const ROUTE_LIST = buildPublicRoutes();
const ROUTE_MAP = new Map(ROUTE_LIST.map((item) => [item.path, item]));

export function findPublicRoute(pathname) {
  return ROUTE_MAP.get(pathname) || null;
}

export function listIndexableRoutes() {
  return ROUTE_LIST;
}

function crumb(kind) {
  if (kind === 'product') return { href: '/urunler', label: 'Ürünler' };
  if (kind === 'system') return { href: '/sistemler', label: 'Su arıtma sistemleri' };
  if (kind === 'sector') return { href: '/sektorler', label: 'Sektörler' };
  if (kind === 'region') return { href: '/hizmet-bolgeleri', label: 'Hizmet bölgeleri' };
  return { href: '/', label: 'Ana sayfa' };
}

export function renderPublicLanding(record) {
  const parent = crumb(record.kind);
  const wa = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(`Merhaba, ${record.h1} için teklif istiyorum.`)}`;
  const items = record.body.items || [];
  const links = record.body.links || [];
  return `
    <article class="section bg-white">
      <div class="container-x max-w-4xl">
        <p class="text-sm font-semibold text-slate-500">
          <a href="/" data-nav>Ana sayfa</a>
          <span aria-hidden="true"> / </span>
          <a href="${escapeAttr(parent.href)}" data-nav>${escapeHtml(parent.label)}</a>
        </p>
        <h1 class="mt-3 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">${escapeHtml(record.h1)}</h1>
        ${(record.body.paragraphs || []).map((p) => `<p class="mt-4 text-base leading-relaxed text-slate-700">${escapeHtml(p)}</p>`).join('')}
        ${items.map((item) => `
          <section class="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 class="font-display text-xl font-extrabold text-slate-900">${escapeHtml(item.title)}</h2>
            <p class="mt-2 text-sm leading-relaxed text-slate-700">${escapeHtml(item.text)}</p>
            <ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              ${item.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')}
            </ul>
          </section>
        `).join('')}
        ${links.length ? `
          <nav class="mt-8" aria-label="İlgili sayfalar">
            <h2 class="font-display text-xl font-extrabold text-slate-900">İlgili sayfalar</h2>
            <ul class="mt-3 space-y-2 text-sm font-semibold">
              ${links.map((link) => `<li><a class="text-emerald-800 hover:underline" href="${escapeAttr(link.href)}" data-nav>${escapeHtml(link.label)}</a></li>`).join('')}
            </ul>
          </nav>
        ` : ''}
        <section class="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 class="font-display text-xl font-extrabold text-slate-900">Teklif ve iletişim</h2>
          <p class="mt-2 text-sm text-slate-700">Talep Firestore üzerinde CRM kaydı olarak tutulur. Fiyat bu sayfada yayınlanmaz.</p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a class="btn-primary text-sm" href="/teklif-al?product=${encodeURIComponent(record.body.quote || record.h1)}" data-nav>Teklif isteyin</a>
            <a class="btn-outline-dark text-sm" href="${escapeAttr(companyInfo.whatsappUrl || wa)}">WhatsApp</a>
            <a class="btn-outline-dark text-sm" href="tel:${escapeAttr(companyInfo.phoneRaw)}">${escapeHtml(companyInfo.phoneDisplay)}</a>
          </div>
          <h3 class="mt-6 font-bold text-slate-900">Sık sorulanlar</h3>
          <h4 class="mt-3 font-semibold text-slate-800">Dozaj veya sistem kapasitesi bu sayfada neden yazılmıyor?</h4>
          <p class="mt-1 text-sm text-slate-700">Su, brine veya atıksu analizi görülmeden dozaj ve kapasite taahhüt edilmez.</p>
          <h4 class="mt-3 font-semibold text-slate-800">SDS, TDS ve COA nereden gelir?</h4>
          <p class="mt-1 text-sm text-slate-700">Belge, talep edilen partinin doğrulanmış dosyası varsa teknik ekip tarafından paylaşılır. Sayfada olmayan bir sertifika var kabul edilmez.</p>
        </section>
      </div>
    </article>
  `;
}

export function renderNotFoundPage() {
  return `
    <article class="section bg-white">
      <div class="container-x max-w-3xl">
        <h1 class="font-display text-3xl font-extrabold text-slate-900">Sayfa bulunamadı</h1>
        <p class="mt-4 text-slate-700">Bu adres Elif Kimya sitesinde yok. Ürün, sistem veya teklif sayfalarına dönebilirsiniz.</p>
        <p class="mt-4"><a class="font-bold text-emerald-800" href="/" data-nav>Ana sayfaya dön</a></p>
      </div>
    </article>
  `;
}

export function renderCrawlableDocument(record) {
  const parent = crumb(record.kind);
  return `
    <main>
      <p><a href="/">Ana sayfa</a> / <a href="${escapeAttr(parent.href)}">${escapeHtml(parent.label)}</a></p>
      <h1>${escapeHtml(record.h1)}</h1>
      ${(record.body.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
      ${(record.body.items || []).map((item) => `
        <section>
          <h2>${escapeHtml(item.title)}</h2>
          <p>${escapeHtml(item.text)}</p>
          <ul>${item.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')}</ul>
        </section>
      `).join('')}
      ${(record.body.links || []).length ? `<ul>${record.body.links.map((link) => `<li><a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul>` : ''}
      <p><a href="/teklif-al">Teklif isteyin</a> · <a href="tel:${escapeAttr(companyInfo.phoneRaw)}">${escapeHtml(companyInfo.phoneDisplay)}</a></p>
    </main>
  `;
}
