/**
 * Katalog, sistem, sektör, hizmet bölgesi ve teknik mühendislik rehberi (blog) sayfaları.
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
import { TECHNICAL_BLOG_POSTS } from '../data/technical-blog.js';
import { TURKEY_81_PROVINCES, TURKEY_7_REGIONS_SUMMARY } from '../data/provinces-81.js';

const SITE = 'https://www.elifcevrekimya.com.tr';

export const REGION_SLUGS = [
  'adana',
  'mersin',
  'iskenderun-osmaniye',
  'nigde-kayseri',
  'gaziantep-kahramanmaras',
  'turkiye-geneli'
];

function route(path, title, description, h1, kind, body) {
  return {
    path,
    title,
    description: String(description || '').replace(/\s+/g, ' ').trim(),
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
    const extraRegionItems = slug === 'turkiye-geneli'
      ? TURKEY_7_REGIONS_SUMMARY.map((reg) => ({
          title: reg.region,
          text: reg.summary,
          facts: [
            `Kapsanan İller: ${reg.provinces}`,
            ...TURKEY_81_PROVINCES
              .filter((prov) => reg.region.startsWith(prov.region))
              .map((prov) => `${prov.plate} ${prov.name} (${prov.delivery}): ${prov.focus}`)
          ]
        }))
      : [];
    routes.push(route(
      `/hizmet-bolgeleri/${slug}`,
      `${region.region} | Elif Çevre Kimya Sevkiyat`,
      region.details,
      region.region,
      'region',
      {
        paragraphs: [
          region.details,
          'Kayıtlı adres Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana’dır. Site adresi www.elifcevrekimya.com.tr. Bu sayfa 01 Adana’dan 81 Düzce’ye tüm Türkiye sevkiyat kapsamını anlatır; ayrı şube adresi ilan etmez.'
        ],
        items: [
          {
            title: region.badge,
            text: 'Öne çıkan hatlar mevcut bölge kaydındandır.',
            facts: region.highlights || []
          },
          ...extraRegionItems
        ],
        quote: region.region
      }
    ));
  });

  TECHNICAL_BLOG_POSTS.forEach((post) => {
    const related = TECHNICAL_BLOG_POSTS
      .filter((other) => other.slug !== post.slug && other.category === post.category)
      .slice(0, 4)
      .map((other) => ({ href: `/teknik-bilgi/${other.slug}`, label: `${other.number}. ${other.title}` }));

    routes.push(route(
      `/teknik-bilgi/${post.slug}`,
      post.seoTitle,
      post.metaDescription,
      post.title,
      'blog',
      {
        blogPost: post,
        paragraphs: [
          post.summary,
          ...post.sections.flatMap((sec) => sec.paragraphs || [])
        ],
        items: [
          ...post.sections.map((sec) => ({
            title: sec.heading,
            text: (sec.paragraphs || []).join(' '),
            facts: []
          })),
          {
            title: 'Saha Kontrol ve İzleme Listesi',
            text: 'Kimyasal dozaj ve sistem kapasitesi kararları analiz ve tesis koşullarıyla belirlenmelidir; sabit dozaj veya performans garantisi verilmez.',
            facts: post.fieldChecklist || []
          }
        ],
        links: [
          { href: post.ctaLink, label: post.ctaLabel },
          { href: post.secondaryLink, label: post.secondaryLabel },
          ...related
        ],
        quote: post.quoteProduct || post.title
      }
    ));
  });

  const home = routes.find((item) => item.path === '/');
  if (home) {
    home.body.links = [
      ...productCategories.map((cat) => ({ href: `/urunler/${cat.id}`, label: cat.title })),
      ...waterTreatmentSystems.map((sys) => ({ href: `/sistemler/${sys.id}`, label: sys.title })),
      ...sectorsData.map((sector) => ({ href: `/sektorler/${sector.id}`, label: sector.title })),
      ...serviceRegions.map((region, index) => ({ href: `/hizmet-bolgeleri/${REGION_SLUGS[index]}`, label: region.region })),
      ...TECHNICAL_BLOG_POSTS.slice(0, 6).map((post) => ({ href: `/teknik-bilgi/${post.slug}`, label: post.title }))
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
    regions.body.items = TURKEY_7_REGIONS_SUMMARY.map((reg) => ({
      title: reg.region,
      text: reg.summary,
      facts: [`Kapsanan İller: ${reg.provinces}`]
    }));
    regions.body.links = serviceRegions.map((region, index) => ({
      href: `/hizmet-bolgeleri/${REGION_SLUGS[index]}`,
      label: region.region
    }));
  }
  const techHub = routes.find((item) => item.path === '/teknik-bilgi');
  if (techHub) {
    techHub.body.links = TECHNICAL_BLOG_POSTS.map((post) => ({
      href: `/teknik-bilgi/${post.slug}`,
      label: `${post.number}. ${post.title}`
    }));
  }

  return routes;
}

const ROUTE_LIST = buildPublicRoutes();
const ROUTE_MAP = new Map(ROUTE_LIST.map((item) => [item.path, item]));

export function findPublicRoute(pathname) {
  let clean = String(pathname || '');
  try {
    clean = decodeURIComponent(clean);
  } catch (_err) {
    // ignore decode error
  }
  if (clean === '/teknik-bilgi/esanjör-hat-temizligi-birikinti-metal-uyumu') {
    clean = '/teknik-bilgi/esanjor-hat-temizligi-birikinti-metal-uyumu';
  }
  return ROUTE_MAP.get(clean) || ROUTE_MAP.get(pathname) || null;
}

export function listIndexableRoutes() {
  return ROUTE_LIST;
}

function crumb(kind) {
  if (kind === 'product') return { href: '/urunler', label: 'Ürünler' };
  if (kind === 'system') return { href: '/sistemler', label: 'Su arıtma sistemleri' };
  if (kind === 'sector') return { href: '/sektorler', label: 'Sektörler' };
  if (kind === 'region') return { href: '/hizmet-bolgeleri', label: 'Hizmet bölgeleri' };
  if (kind === 'blog') return { href: '/teknik-bilgi', label: 'Teknik Belge Merkezi & Mühendislik Rehberi' };
  return { href: '/', label: 'Ana sayfa' };
}

export function renderPublicLanding(record) {
  const parent = crumb(record.kind);
  const wa = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(`Merhaba, ${record.h1} için teklif istiyorum.`)}`;

  if (record.kind === 'blog' && record.body?.blogPost) {
    const post = record.body.blogPost;
    const relatedPosts = TECHNICAL_BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 4);
    return `
      <section class="page-hero">
        <div class="container">
          <div class="breadcrumb">
            <a href="/" data-nav>Ana Sayfa</a>
            <span>/</span>
            <a href="/teknik-bilgi" data-nav>Teknik Belge Merkezi & Mühendislik Rehberi</a>
            <span>/</span>
            <span>Rehber #${escapeHtml(String(post.number))}</span>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">
            <span class="badge badge-teal">${escapeHtml(post.categoryLabel)}</span>
            <span class="badge badge-neutral">Anahtar Kelime: ${escapeHtml(post.keyword)}</span>
            <span class="badge badge-neutral">⏱️ ${escapeHtml(post.readingTime)}</span>
          </div>
          <h1>${escapeHtml(post.title)}</h1>
          <p>${escapeHtml(post.summary)}</p>
        </div>
      </section>

      <article class="section">
        <div class="container" style="max-width:940px;">
          <div class="engineering-guard-banner" style="margin-bottom:2rem;">
            <div>
              <strong>Mühendislik Doğrulama Notu:</strong>
              <span>Kimyasal dozaj, derişim ve sistem kapasitesi kararları su/brine/atıksu analizi ve tesis koşullarıyla belirlenmelidir; sabit dozaj veya performans garantisi verilmez.</span>
            </div>
            <a href="${escapeAttr(post.secondaryLink)}" class="btn btn-primary btn-sm" data-nav>${escapeHtml(post.secondaryLabel)}</a>
          </div>

          <div class="card" style="padding:2.25rem;margin-bottom:2rem;">
            ${post.sections.map((sec, idx) => `
              <section style="${idx > 0 ? 'margin-top:2rem;padding-top:1.75rem;border-top:1px solid var(--border-subtle);' : ''}">
                <h2 style="font-size:1.35rem;margin-bottom:0.85rem;color:var(--text-primary);">${escapeHtml(sec.heading)}</h2>
                ${(sec.paragraphs || []).map((p) => `<p style="color:var(--text-secondary);line-height:1.75;margin-bottom:0.95rem;font-size:0.98rem;">${escapeHtml(p)}</p>`).join('')}
              </section>
            `).join('')}

            ${(post.fieldChecklist && post.fieldChecklist.length) ? `
              <section style="margin-top:2rem;padding:1.5rem;background:var(--bg-teal-tint);border:1px solid rgba(13,148,136,0.28);border-radius:var(--radius-sm);">
                <h2 style="font-size:1.2rem;margin-bottom:0.75rem;color:var(--accent-teal-hover);">✅ Saha Kontrol ve İzleme Parametreleri</h2>
                <ul style="padding-left:1.25rem;display:flex;flex-direction:column;gap:0.45rem;color:var(--text-primary);font-size:0.93rem;">
                  ${post.fieldChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
                </ul>
              </section>
            ` : ''}

            <div style="margin-top:1.75rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
              ${(post.keywords || []).map((kw) => `<span class="metric-tag">#${escapeHtml(kw)}</span>`).join('')}
            </div>
          </div>

          <!-- Görsel Alt Metni & 16:9 Fotoğraf Üretim Promptu -->
          <div class="card" style="padding:1.75rem;margin-bottom:2rem;background:var(--bg-secondary);">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.75rem;">
              <span class="section-tag">Görsel & Medya Künyesi (16:9 Endüstriyel Standart)</span>
              <span class="badge badge-neutral">Slug: /teknik-bilgi/${escapeHtml(post.slug)}</span>
            </div>
            <div style="font-size:0.9rem;margin-bottom:0.65rem;">
              <strong>Görsel Alt Metni (Alt Text):</strong> ${escapeHtml(post.imageAlt)}
            </div>
            <div style="font-size:0.86rem;color:var(--text-secondary);background:#ffffff;padding:0.9rem 1rem;border-radius:8px;border:1px solid var(--border-subtle);">
              <strong>16:9 Fotoğraf Üretim Promptu (TR):</strong><br/>
              <span>${escapeHtml(post.imagePromptTr)}</span>
            </div>
          </div>

          <!-- Nazik CTA ve İç Yönlendirme -->
          <div class="cta-banner-box" style="margin-bottom:2.5rem;">
            <div class="cta-banner-content">
              <span class="section-tag">Teknik Değerlendirme & Teklif</span>
              <h2 style="font-size:1.45rem;margin:0.4rem 0 0.6rem;">Tesisinizin Su Analizi ve İşletme Verileriyle Doğrulayalım</h2>
              <p style="font-size:0.92rem;color:var(--text-secondary);">Sisteminiz için uygun şartlandırma veya ekipman yaklaşımını değerlendirmek üzere ilgili ürün/sistem sayfamızı inceleyebilir veya su analiz bilgilerinizi paylaşarak teklif talep edebilirsiniz.</p>
            </div>
            <div class="cta-banner-actions">
              <a href="${escapeAttr(post.ctaLink)}" class="btn btn-secondary" data-nav>${escapeHtml(post.ctaLabel)}</a>
              <a href="${escapeAttr(post.secondaryLink)}" class="btn btn-primary" data-nav>${escapeHtml(post.secondaryLabel)}</a>
              <a href="${escapeAttr(companyInfo.whatsappUrl || wa)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">💬 WhatsApp Teknik Destek</a>
            </div>
          </div>

          ${relatedPosts.length ? `
            <div>
              <h3 style="margin-bottom:1rem;">Aynı Kategorideki Diğer Teknik Rehberler</h3>
              <div class="knowledge-grid">
                ${relatedPosts.map((rel) => `
                  <article class="knowledge-card" style="display:flex;flex-direction:column;justify-content:space-between;">
                    <div>
                      <span class="badge badge-neutral" style="margin-bottom:0.5rem;">Rehber #${escapeHtml(String(rel.number))}</span>
                      <h4 style="margin-bottom:0.45rem;">${escapeHtml(rel.title)}</h4>
                      <p style="font-size:0.88rem;color:var(--text-secondary);">${escapeHtml(rel.summary)}</p>
                    </div>
                    <div style="margin-top:1rem;">
                      <a href="/teknik-bilgi/${escapeAttr(rel.slug)}" class="btn btn-secondary btn-sm" data-nav>Rehberi Oku →</a>
                    </div>
                  </article>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }

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
          <section class="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 ${record.kind === 'product' ? 'cursor-pointer hover:border-emerald-500 transition' : ''}" ${record.kind === 'product' ? `data-landing-chem="${escapeAttr(item.title)}"` : ''}>
            <div class="flex flex-wrap items-start justify-between gap-3">
              <h2 class="font-display text-xl font-extrabold text-slate-900">${escapeHtml(item.title)}</h2>
              ${record.kind === 'product' ? `
                <div class="flex items-center gap-2">
                  <button type="button" data-chem-open="detail" class="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-800 hover:border-emerald-500 transition">📋 Açıklama</button>
                  <button type="button" data-chem-open="order" class="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-extrabold text-white hover:bg-emerald-700 transition">🛒 Sipariş Ver</button>
                </div>
              ` : ''}
            </div>
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
    <main class="section bg-white" data-prerender-seo="true">
      <div class="container-x">
      <p><a href="/">Ana sayfa</a> / <a href="${escapeAttr(parent.href)}">${escapeHtml(parent.label)}</a></p>
      <h1>${escapeHtml(record.h1)}</h1>
      ${(record.body.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
      ${(record.body.items || []).map((item) => `
        <section>
          <h2>${escapeHtml(item.title)}</h2>
          <p>${escapeHtml(item.text)}</p>
          ${(item.facts || []).length ? `<ul>${item.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')}</ul>` : ''}
        </section>
      `).join('')}
      ${(record.body.links || []).length ? `<ul>${record.body.links.map((link) => `<li><a href="${escapeAttr(link.href)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul>` : ''}
      <p><a href="/teklif-al">Teklif isteyin</a> · <a href="tel:${escapeAttr(companyInfo.phoneRaw)}">${escapeHtml(companyInfo.phoneDisplay)}</a></p>
      </div>
    </main>
  `;
}
