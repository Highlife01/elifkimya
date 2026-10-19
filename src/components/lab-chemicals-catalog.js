import { escapeAttr, escapeHtml } from '../utils/security.js';
import { fold, withLanguageSearch } from '../utils/i18n.js';
import {
  LAB_CHEMICALS_COUNT,
  LAB_CHEMICAL_GROUPS,
  LAB_CHEMICAL_PRODUCTS
} from '../data/lab-chemicals-locale.js';
import { openChemicalProductModal } from './product-order-modal.js';

const FEATURED_BRANDS = [
  'HORIBA',
  'HACH',
  'MERCK',
  'ISOLAB',
  'SIGMA-ALDRICH',
  'CARLO ERBA',
  'CHEMBIO',
  'CPACHEM',
  'TEKKİM',
  'NORATEKS',
  'SRL'
];

const SHOWCASE_CODES = [
  'LAB-003',
  'LAB-004',
  'LAB-010',
  'LAB-011',
  'LAB-017',
  'LAB-038',
  'HRB-035',
  'HRB-010',
  'HRB-011',
  'HRB-032',
  'HRB-001',
  'HORIBA-500-7'
];

function renderLabProductCard(product, idx, groupTitle) {
  const search = withLanguageSearch(
    `${product.code} ${product.name} ${product.brand} ${product.cas} ${product.packaging} ${groupTitle} ${product.summary}`
  );
  return `
    <article
      class="medipure-card group cursor-pointer flex flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg"
      data-lab-card
      data-lab-idx="${idx}"
      data-lab-group="${escapeAttr(product.group)}"
      data-lab-brand="${escapeAttr(product.brand)}"
      data-search="${escapeAttr(search)}"
    >
      <div class="relative aspect-square bg-slate-50 border-b border-slate-100" data-lab-open="detail">
        <img
          src="${escapeAttr(product.image)}"
          alt="${escapeAttr(product.name)}"
          width="420"
          height="420"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
          data-lab-img
          class="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
        />
        <div data-lab-fallback hidden class="absolute inset-0 grid place-items-center bg-slate-100 p-4 text-center">
          <div>
            <span class="block font-mono text-xs font-black uppercase text-emerald-700">${escapeHtml(product.brand)}</span>
            <span class="mt-1 block font-display text-sm font-extrabold text-slate-800 line-clamp-2">${escapeHtml(product.name)}</span>
          </div>
        </div>
        <span class="absolute left-3 top-3 rounded-full border border-emerald-200 bg-white/95 px-2.5 py-1 font-mono text-[11px] font-black text-emerald-900 shadow-sm">
          ${escapeHtml(product.brand)}
        </span>
        <span class="absolute right-3 top-3 rounded-full border border-slate-200 bg-white/95 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
          ${escapeHtml(product.code)}
        </span>
        <span class="absolute bottom-2.5 right-3 rounded-lg bg-slate-900/90 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
          ${escapeHtml(product.packaging)}
        </span>
      </div>
      <div class="flex flex-1 flex-col p-4">
        <p class="text-[11px] font-bold uppercase tracking-wide text-emerald-700">${escapeHtml(groupTitle)}</p>
        <h3 class="mt-1 font-display text-sm sm:text-base font-extrabold leading-snug text-slate-900 group-hover:text-emerald-800 transition" data-lab-open="detail">
          ${escapeHtml(product.name)}
        </h3>
        <p class="mt-1 font-mono text-[11px] font-bold text-slate-600">
          Spesifikasyon: ${escapeHtml(product.cas)}
        </p>
        <p class="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-2" data-lab-open="detail">
          ${escapeHtml(product.summary)}
        </p>
        <div class="mt-auto pt-3">
          <div class="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <div>
              <p class="text-[10px] font-bold uppercase tracking-wide text-slate-500">Kurumsal Tedarik</p>
              <p class="font-display text-xs font-extrabold text-emerald-800">Teklif &amp; Sipariş</p>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                data-lab-open="detail"
                class="inline-flex items-center rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-[11px] font-extrabold text-slate-800 hover:border-emerald-500 hover:text-emerald-800 transition"
              >📋 Açıklama</button>
              <button
                type="button"
                data-lab-open="order"
                class="inline-flex items-center rounded-xl bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-700 shadow-xs transition"
              >🛒 Sipariş Ver</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function renderLabChemicalsShowcase() {
  const groupTitleById = new Map(LAB_CHEMICAL_GROUPS.map((g) => [g.id, g.title]));
  const featured = SHOWCASE_CODES
    .map((code) => {
      const idx = LAB_CHEMICAL_PRODUCTS.findIndex((p) => p.code === code);
      return idx >= 0 ? { product: LAB_CHEMICAL_PRODUCTS[idx], idx } : null;
    })
    .filter(Boolean);

  return `
    <section class="section bg-white border-b border-slate-200" id="laboratuvar-kimyasallari-vitrin">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-3xl">
            <p class="chip">HORIBA • HACH • MERCK • ISOLAB • CHEMBIO • CPACHEM</p>
            <h2 class="h2-title">Laboratuvar Kimyasalları, Reaktifler &amp; HORIBA Ölçüm Cihazları / Çözeltileri (${LAB_CHEMICALS_COUNT} Ürün)</h2>
            <p class="mt-3 text-base leading-relaxed text-slate-700">
              Su, atıksu ve endüstriyel kalite kontrol laboratuvarları için <strong>HORIBA LAQUAtwin cep tipi ölçerler</strong>, <strong>HORIBA LAQUA portatif &amp; masa tipi pH/EC/DO/İyon cihazları</strong>, <strong>HORIBA elektrotları ve standart çözeltileri</strong> ile <strong>HACH, Merck EMSURE® / Suprapur® / Titrisol®, Isolab, Sigma-Aldrich, Carlo Erba, CPAChem CRM ve Chembio</strong> laboratuvar kimyasalları. Tüm ürünler fiyatsız olarak kurumsal teklif ve sipariş usulüyle sunulmaktadır.
            </p>
          </div>
          <a class="btn-primary !px-5 !py-3 text-xs font-extrabold" href="/urunler#laboratuvar-kimyasallari-katalog" data-nav="/urunler#laboratuvar-kimyasallari-katalog">
            Tüm ${LAB_CHEMICALS_COUNT} Laboratuvar &amp; HORIBA Ürününü İncele →
          </a>
        </div>

        <div class="mt-6 flex flex-wrap gap-2">
          ${LAB_CHEMICAL_GROUPS.map((group) => `
            <a
              class="rounded-full border border-slate-300 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:border-emerald-500 hover:text-emerald-800"
              href="/urunler?lab_grup=${escapeAttr(group.id)}#laboratuvar-kimyasallari-katalog"
              data-nav="/urunler?lab_grup=${escapeAttr(group.id)}#laboratuvar-kimyasallari-katalog"
            >${escapeHtml(group.shortTitle)}</a>
          `).join('')}
        </div>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          ${featured.map(({ product, idx }) =>
            renderLabProductCard(product, idx, groupTitleById.get(product.group) || 'Laboratuvar & HORIBA')
          ).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderLabChemicalsCatalog() {
  const groupTitleById = new Map(LAB_CHEMICAL_GROUPS.map((g) => [g.id, g.title]));

  return `
    <section id="laboratuvar-kimyasallari-katalog" class="mb-14 pt-6 pb-10 border-b-2 border-slate-200" style="scroll-margin-top:6.5rem;" data-lab-catalog>
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-3xl">
          <span class="section-tag">HORIBA • HACH • MERCK • ISOLAB • SIGMA-ALDRICH • CHEMBIO • CPACHEM</span>
          <h2 class="section-title" style="margin-top:0.4rem;">
            Laboratuvar Kimyasalları, Reaktifler &amp; HORIBA Cihaz / Elektrot / Standart Çözeltileri (${LAB_CHEMICALS_COUNT} Ürün)
          </h2>
          <p class="section-desc" style="margin:0.6rem 0 0;">
            Su ve atıksu kalite kontrol laboratuvarları için <strong>HORIBA LAQUAtwin cep tipi pH/EC/Tuzluluk/ORP/İyon ölçerler</strong>, <strong>HORIBA LAQUA portatif &amp; masa tipi su analiz cihazları</strong>, <strong>HORIBA elektrotları, probları ve kalibrasyon çözeltileri</strong> ile <strong>HACH küvet/toz reaktifleri</strong>, <strong>Merck EMSURE® / Suprapur® / Titrisol®</strong> kimyasalları, <strong>Isolab, Carlo Erba, Sigma-Aldrich, CPAChem CRM ve Chembio</strong> reaktifleri. Tüm ürünler fiyatsız kurumsal teklif ve sipariş usulüyle sunulmaktadır.
          </p>
        </div>
        <div class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-extrabold text-emerald-950">
          <span data-lab-count>${LAB_CHEMICALS_COUNT}</span> analitik ürün listeleniyor
        </div>
      </div>

      <!-- Arama ve Marka Filtresi -->
      <div class="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div class="flex-1">
          <input
            type="search"
            data-lab-search
            class="form-input"
            placeholder="HORIBA cihaz/elektrot modeli (LAQUAtwin, WQ-330, PC220, 9615S), HACH/Merck kodu veya CAS no ara..."
            aria-label="Laboratuvar ve HORIBA ürünlerinde ara"
          />
        </div>
        <select data-lab-brand-select class="form-select lg:max-w-xs" aria-label="Marka Filtresi">
          <option value="all">Tüm Markalar (${LAB_CHEMICALS_COUNT} Ürün)</option>
          ${FEATURED_BRANDS.map((brand) => {
            const count = LAB_CHEMICAL_PRODUCTS.filter((p) => p.brand === brand).length;
            return `<option value="${escapeAttr(brand)}">${escapeHtml(brand)} (${count})</option>`;
          }).join('')}
        </select>
      </div>

      <!-- Alt Grup Filtre Hapları -->
      <div class="mb-4 flex flex-wrap gap-2" data-lab-groups>
        <button type="button" class="filter-pill active" data-lab-group-btn="all">
          Tüm Laboratuvar &amp; HORIBA Ürünleri (${LAB_CHEMICALS_COUNT})
        </button>
        ${LAB_CHEMICAL_GROUPS.map((group) => {
          const count = LAB_CHEMICAL_PRODUCTS.filter((p) => p.group === group.id).length;
          return `
            <button type="button" class="filter-pill" data-lab-group-btn="${escapeAttr(group.id)}">
              ${escapeHtml(group.shortTitle)} (${count})
            </button>
          `;
        }).join('')}
      </div>

      <!-- Hızlı Marka Etiketleri -->
      <div class="mb-6 flex flex-wrap items-center gap-1.5">
        <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500 mr-1">Markalar:</span>
        <button
          type="button"
          data-lab-brand-pill="all"
          class="rounded-full border border-emerald-500 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-900 transition"
        >Tümü</button>
        ${FEATURED_BRANDS.map((brand) => `
          <button
            type="button"
            data-lab-brand-pill="${escapeAttr(brand)}"
            class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-700 hover:border-emerald-400 transition"
          >${escapeHtml(brand)}</button>
        `).join('')}
      </div>

      <!-- Ürün Kartları Izgarası -->
      <div class="medipure-grid" data-lab-grid>
        ${LAB_CHEMICAL_PRODUCTS.map((product, idx) =>
          renderLabProductCard(product, idx, groupTitleById.get(product.group) || 'Laboratuvar & HORIBA')
        ).join('')}
      </div>

      <p data-lab-empty hidden class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm font-semibold text-slate-600">
        Aradığınız kritere uygun laboratuvar kimyasalı veya HORIBA ürünü bulunamadı. Farklı bir terim veya marka seçin.
      </p>
    </section>
  `;
}

export function bindLabChemicalsCatalog(root) {
  root.querySelectorAll('[data-lab-img]').forEach((img) => {
    img.addEventListener('error', () => {
      img.hidden = true;
      const fallback = img.parentElement?.querySelector('[data-lab-fallback]');
      if (fallback) fallback.hidden = false;
    });
  });

  root.querySelectorAll('[data-lab-card]').forEach((card) => {
    card.addEventListener('click', (e) => {
      const idx = Number(card.getAttribute('data-lab-idx') || 0);
      const product = LAB_CHEMICAL_PRODUCTS[idx];
      if (!product) return;
      const actionEl = e.target.closest('[data-lab-open]');
      const mode = actionEl?.getAttribute('data-lab-open') || 'detail';
      e.preventDefault();
      openChemicalProductModal({
        code: product.code,
        title: product.name,
        categoryTitle: `${product.brand} • Laboratuvar Kimyasalları & Standart Çözeltiler`,
        activeChemical: `${product.brand} | ${product.cas}`,
        description: product.summary,
        specs: product.specs,
        packaging: product.packaging,
        image: product.image || '/assets/hero-horiba-lab.jpg',
        priceLabel: 'Kurumsal Teklif & Analitik Tedarik'
      }, { mode });
    });
  });

  const scope = root.querySelector('[data-lab-catalog]');
  if (!scope) return;

  const searchInput = scope.querySelector('[data-lab-search]');
  const brandSelect = scope.querySelector('[data-lab-brand-select]');
  const countEl = scope.querySelector('[data-lab-count]');
  const emptyEl = scope.querySelector('[data-lab-empty]');
  const groupBtns = [...scope.querySelectorAll('[data-lab-group-btn]')];
  const brandPills = [...scope.querySelectorAll('[data-lab-brand-pill]')];
  const cards = [...scope.querySelectorAll('[data-lab-card]')];

  let activeGroup = 'all';
  let activeBrand = 'all';

  if (typeof window !== 'undefined') {
    const requestedGroup = new URLSearchParams(window.location.search).get('lab_grup');
    if (requestedGroup && LAB_CHEMICAL_GROUPS.some((g) => g.id === requestedGroup)) {
      activeGroup = requestedGroup;
    }
  }

  function syncUi() {
    groupBtns.forEach((btn) => {
      const isOn = (btn.getAttribute('data-lab-group-btn') || 'all') === activeGroup;
      btn.classList.toggle('active', isOn);
    });
    brandPills.forEach((pill) => {
      const isOn = (pill.getAttribute('data-lab-brand-pill') || 'all') === activeBrand;
      pill.className = isOn
        ? 'rounded-full border border-emerald-500 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-900 transition'
        : 'rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-700 hover:border-emerald-400 transition';
    });
    if (brandSelect && brandSelect.value !== activeBrand) {
      brandSelect.value = activeBrand;
    }
  }

  function applyLabFilters() {
    const q = fold(searchInput?.value || '');
    let visibleCount = 0;

    cards.forEach((card) => {
      const groupOk = activeGroup === 'all' || card.getAttribute('data-lab-group') === activeGroup;
      const brandOk = activeBrand === 'all' || card.getAttribute('data-lab-brand') === activeBrand;
      const searchOk = !q || (card.getAttribute('data-search') || '').includes(q);
      const show = groupOk && brandOk && searchOk;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    if (countEl) countEl.textContent = String(visibleCount);
    if (emptyEl) emptyEl.hidden = visibleCount !== 0;
    syncUi();
  }

  groupBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeGroup = btn.getAttribute('data-lab-group-btn') || 'all';
      applyLabFilters();
    });
  });

  brandPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      activeBrand = pill.getAttribute('data-lab-brand-pill') || 'all';
      applyLabFilters();
    });
  });

  brandSelect?.addEventListener('change', () => {
    activeBrand = brandSelect.value || 'all';
    applyLabFilters();
  });

  searchInput?.addEventListener('input', applyLabFilters);
  applyLabFilters();
}
