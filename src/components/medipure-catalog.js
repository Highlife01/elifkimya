import { escapeAttr, escapeHtml } from '../utils/security.js';
import { fold, t, withLanguageSearch } from '../utils/i18n.js';
import {
  MEDIPURE_CATEGORIES,
  MEDIPURE_GROUPS,
  MEDIPURE_PRODUCT_COUNT,
  MEDIPURE_SOURCE,
  allMedipureProducts
} from '../data/medipure-catalog.js';

const SHOWCASE_CODES = [
  'DT-5012',
  'DT-6110',
  'DT-5810',
  'SM-3500',
  'ED-9820',
  'XC-9100',
  'XL-9310',
  'XH-8415'
];

function quoteHref(product) {
  const label = `${product.code} ${product.name} ${product.capacity}`;
  return `/teklif-al?type=water_project&product=${encodeURIComponent(label)}`;
}

function capacityRank(capacity) {
  const match = String(capacity).match(/([\d.,]+)\s*(lt\/saat|m³\/saat|ton\/saat|ton\/gün)/);
  if (!match) return 0;
  const amount = Number(match[1].replace(/\./g, '').replace(',', '.'));
  if (!Number.isFinite(amount)) return 0;
  if (match[2] === 'lt/saat') return amount;
  if (match[2] === 'ton/gün') return (amount * 1000) / 24;
  return amount * 1000;
}

function productCard(product, categoryTitle) {
  const search = withLanguageSearch(`${product.code} ${product.name} ${product.capacity} ${categoryTitle}`);
  const href = quoteHref(product);
  return `
    <article
      class="medipure-card group flex flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg"
      data-medipure-card
      data-group="${escapeAttr(product.group)}"
      data-category="${escapeAttr(product.categoryId)}"
      data-search="${escapeAttr(search)}"
      data-price="${escapeAttr(String(product.listPriceValue || 0))}"
      data-capacity="${escapeAttr(String(capacityRank(product.capacity)))}"
    >
      <div class="relative aspect-square bg-slate-50">
        <img
          src="${escapeAttr(product.image)}"
          alt="${escapeAttr(`${product.code} ${product.name}`)}"
          width="480"
          height="480"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
          data-medipure-img
          class="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
        />
        <div data-medipure-fallback hidden class="absolute inset-0 grid place-items-center bg-slate-100 text-center">
          <span class="font-mono text-sm font-black text-slate-700">${escapeHtml(product.code)}</span>
        </div>
        <span class="absolute left-3 top-3 rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] font-black text-slate-900 shadow-sm">
          ${escapeHtml(product.code)}
        </span>
        <span class="absolute bottom-3 right-3 rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
          ${escapeHtml(product.capacity)}
        </span>
      </div>
      <div class="flex flex-1 flex-col p-4">
        <p class="text-[11px] font-bold uppercase tracking-wide text-emerald-700">${escapeHtml(categoryTitle)}</p>
        <h3 class="mt-1 font-display text-base font-extrabold leading-snug text-slate-900">${escapeHtml(product.name)}</h3>
        <div class="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-wide text-slate-500">Medipure liste</p>
            <p class="font-display text-lg font-black text-slate-950">${escapeHtml(product.listPriceEur)} €</p>
          </div>
          <a
            class="inline-flex items-center rounded-xl bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-700"
            href="${escapeAttr(href)}"
            data-nav="${escapeAttr(href)}"
          >Teklif iste</a>
        </div>
      </div>
    </article>
  `;
}

export function renderMedipureShowcase() {
  const products = allMedipureProducts();
  const featured = SHOWCASE_CODES
    .map((code) => products.find((item) => item.code === code))
    .filter(Boolean);

  return `
    <section class="section bg-slate-50 border-y border-slate-200" id="medipure-vitrin">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-2xl">
            <p class="chip mb-3">Medipure saf su cihazları</p>
            <h2 class="h2-title">Laboratuvardan endüstriye ${MEDIPURE_PRODUCT_COUNT} model</h2>
            <p class="mt-3 text-base leading-relaxed text-slate-700">
              Laboratuvar, medikal, deiyonize, mobil ve endüstriyel saf su cihazları model kodu, saatlik kapasite ve EUR liste fiyatıyla listelenir.
            </p>
          </div>
          <a class="btn-primary !px-5 !py-3 text-xs font-extrabold" href="/sistemler#medipure-katalog" data-nav="/sistemler#medipure-katalog">
            Tüm modelleri gör →
          </a>
        </div>

        <div class="mt-6 flex flex-wrap gap-2">
          ${MEDIPURE_GROUPS.map((group) => `
            <a
              class="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:border-emerald-500 hover:text-emerald-800"
              href="/sistemler?grup=${escapeAttr(group.id)}#medipure-katalog"
              data-nav="/sistemler?grup=${escapeAttr(group.id)}#medipure-katalog"
            >${escapeHtml(group.title)}</a>
          `).join('')}
        </div>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          ${featured.map((product) => productCard(product, product.categoryTitle)).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderMedipureCatalog() {
  const products = allMedipureProducts();
  return `
    <section id="medipure-katalog" class="mt-14" style="scroll-margin-top:7rem;" data-medipure-catalog>
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-2xl">
          <span class="section-tag">Medipure cihaz kataloğu</span>
          <h2 class="section-title" style="margin-top:0.4rem;">Saf su ve ultra saf su modelleri</h2>
          <p class="section-desc" style="margin:0.6rem 0 0;">
            ${MEDIPURE_PRODUCT_COUNT} model; kapasite ve EUR liste fiyatı
            <a href="${escapeAttr(MEDIPURE_SOURCE)}" target="_blank" rel="noopener noreferrer">Medipure</a>
            kamu kataloğundan alınmıştır. Kur, teslimat ve güncel teklif Elif Kimya tarafından ayrıca verilir.
          </p>
        </div>
        <p class="text-sm font-bold text-slate-700">
          <span data-medipure-count>${MEDIPURE_PRODUCT_COUNT}</span> model görünüyor
        </p>
      </div>

      <div class="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <input
          type="search"
          data-medipure-search
          class="form-input"
          placeholder="${escapeAttr(t('search_medipure'))}"
          aria-label="Medipure modellerinde ara"
        />
        <select data-medipure-sort class="form-select lg:max-w-xs" aria-label="Sıralama">
          <option value="catalog">Katalog sırası</option>
          <option value="price-asc">Liste fiyatı: düşükten yükseğe</option>
          <option value="price-desc">Liste fiyatı: yüksekten düşüğe</option>
          <option value="capacity-asc">Kapasite: küçükten büyüğe</option>
          <option value="capacity-desc">Kapasite: büyükten küçüğe</option>
        </select>
      </div>

      <div class="mb-3 flex flex-wrap gap-2" data-medipure-groups>
        <button type="button" class="filter-pill active" data-medipure-filter="all">${escapeHtml(t('all_groups'))}</button>
        ${MEDIPURE_GROUPS.map((group) => `
          <button type="button" class="filter-pill" data-medipure-filter="${escapeAttr(group.id)}">${escapeHtml(group.title)}</button>
        `).join('')}
      </div>

      <div class="mb-6 flex flex-wrap gap-2" data-medipure-categories>
        ${MEDIPURE_CATEGORIES.map((category) => `
          <button
            type="button"
            class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-700 hover:border-emerald-400"
            data-medipure-category="${escapeAttr(category.id)}"
            data-group="${escapeAttr(category.group)}"
          >${escapeHtml(category.title)} (${category.products.length})</button>
        `).join('')}
      </div>

      <div class="medipure-grid" data-medipure-grid>
        ${products.map((product) => productCard(product, product.categoryTitle)).join('')}
      </div>

      <p data-medipure-empty hidden class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm font-semibold text-slate-600">
        Bu aramaya uyan model yok. Kodun bir kısmını veya grup adını deneyin.
      </p>
    </section>
  `;
}

export function bindMedipureCatalog(root) {
  root.querySelectorAll('[data-medipure-img]').forEach((img) => {
    img.addEventListener('error', () => {
      img.hidden = true;
      const fallback = img.parentElement?.querySelector('[data-medipure-fallback]');
      if (fallback) fallback.hidden = false;
    });
  });

  const scope = root.querySelector('[data-medipure-catalog]');
  if (!scope) return;

  const search = scope.querySelector('[data-medipure-search]');
  const sort = scope.querySelector('[data-medipure-sort]');
  const grid = scope.querySelector('[data-medipure-grid]');
  const countEl = scope.querySelector('[data-medipure-count]');
  const empty = scope.querySelector('[data-medipure-empty]');
  const groupButtons = [...scope.querySelectorAll('[data-medipure-filter]')];
  const categoryButtons = [...scope.querySelectorAll('[data-medipure-category]')];
  const cards = [...scope.querySelectorAll('[data-medipure-card]')];
  let activeGroup = 'all';
  let activeCategory = 'all';

  const requestedGroup = new URLSearchParams(window.location.search).get('grup');
  if (requestedGroup && MEDIPURE_GROUPS.some((group) => group.id === requestedGroup)) {
    activeGroup = requestedGroup;
  }

  function syncPills() {
    groupButtons.forEach((button) => {
      const on = (button.getAttribute('data-medipure-filter') || 'all') === activeGroup;
      button.classList.toggle('active', on);
    });
    categoryButtons.forEach((button) => {
      const group = button.getAttribute('data-group');
      const id = button.getAttribute('data-medipure-category');
      const inGroup = activeGroup === 'all' || group === activeGroup;
      button.hidden = !inGroup;
      button.classList.toggle('border-emerald-600', id === activeCategory);
      button.classList.toggle('bg-emerald-600', id === activeCategory);
      button.classList.toggle('text-white', id === activeCategory);
    });
  }

  function apply() {
    const query = fold(search?.value || '');
    let visible = 0;
    cards.forEach((card) => {
      const groupOk = activeGroup === 'all' || card.dataset.group === activeGroup;
      const categoryOk = activeCategory === 'all' || card.dataset.category === activeCategory;
      const textOk = !query || (card.dataset.search || '').includes(query);
      const show = groupOk && categoryOk && textOk;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (countEl) countEl.textContent = String(visible);
    if (empty) empty.hidden = visible !== 0;
    syncPills();
  }

  function sortCards() {
    const mode = sort?.value || 'catalog';
    const ranked = cards
      .map((card, index) => ({ card, index }))
      .sort((a, b) => {
        if (mode === 'price-asc') return Number(a.card.dataset.price) - Number(b.card.dataset.price);
        if (mode === 'price-desc') return Number(b.card.dataset.price) - Number(a.card.dataset.price);
        if (mode === 'capacity-asc') return Number(a.card.dataset.capacity) - Number(b.card.dataset.capacity);
        if (mode === 'capacity-desc') return Number(b.card.dataset.capacity) - Number(a.card.dataset.capacity);
        return a.index - b.index;
      });
    ranked.forEach(({ card }) => grid.appendChild(card));
  }

  groupButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeGroup = button.getAttribute('data-medipure-filter') || 'all';
      activeCategory = 'all';
      apply();
    });
  });

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-medipure-category') || 'all';
      activeCategory = activeCategory === id ? 'all' : id;
      apply();
    });
  });

  search?.addEventListener('input', apply);
  sort?.addEventListener('change', () => {
    sortCards();
    apply();
  });

  apply();
}
