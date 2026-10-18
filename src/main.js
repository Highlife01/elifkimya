import './styles.css';
import { createNavbar, updateActiveNav } from './components/navbar.js';
import { createFooter } from './components/footer.js';
import { renderHomePage } from './pages/home.js';
import {
  renderProductsPage,
  renderSystemsPage,
  renderSectorsPage,
  renderRegionsPage,
  renderTechnicalCenterPage,
  renderQuotePage,
  renderContactPage
} from './pages/public-pages.js';
import { renderPortalPage } from './pages/portal.js';
import { renderAdminPage } from './pages/admin.js';
import { pageSEO } from './data/products.js';

const appRoot = document.getElementById('app');
let navbarEl = null;
let mainEl = null;
let footerEl = null;

function ensurePublicLayout(currentPath) {
  if (!appRoot) return;
  if (!mainEl || !appRoot.contains(mainEl)) {
    appRoot.replaceChildren();
    navbarEl = createNavbar(navigate, currentPath);
    mainEl = document.createElement('main');
    mainEl.id = 'main-view';
    footerEl = createFooter(navigate);
    appRoot.append(navbarEl, mainEl, footerEl);
  } else {
    updateActiveNav(currentPath);
  }
}

function updateSeoAndRobotsMeta(pathname) {
  const isNoIndex = pathname.startsWith('/admin') || pathname.startsWith('/portal');
  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.setAttribute('name', 'robots');
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.setAttribute(
    'content',
    isNoIndex
      ? 'noindex, nofollow, noarchive'
      : 'index, follow, max-image-preview:large, max-snippet:-1'
  );

  const seo = pageSEO[pathname] || pageSEO['/'];
  if (isNoIndex) {
    document.title = pathname.startsWith('/admin')
      ? 'Elif Kimya Yönetim Paneli | Kurumsal ERP & CRM'
      : 'Elif Kimya Müşteri Portalı | Teklif & Sipariş Takibi';
  } else if (seo) {
    document.title = seo.title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', seo.description);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && seo.canonical) canonicalLink.setAttribute('href', seo.canonical);
  }
}

export function navigate(targetUrl, replace = false) {
  if (!targetUrl) return;
  const currentFull = window.location.pathname + window.location.search + window.location.hash;
  if (targetUrl !== currentFull) {
    if (replace) {
      window.history.replaceState({}, '', targetUrl);
    } else {
      window.history.pushState({}, '', targetUrl);
    }
  }
  routeCurrentUrl();
}

function normalizePathname() {
  const hash = window.location.hash || '';
  if (hash.startsWith('#/')) {
    const cleanUrl = hash.slice(1);
    window.history.replaceState({}, '', cleanUrl);
  } else if (hash === '#admin') {
    window.history.replaceState({}, '', '/admin');
  }

  let pathname = window.location.pathname || '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  if (pathname === '/uygulama-alanlari') pathname = '/sektorler';
  if (pathname === '/cozumler') pathname = '/urunler';
  return pathname;
}

function routeCurrentUrl() {
  if (!appRoot) return;
  const pathname = normalizePathname();
  updateSeoAndRobotsMeta(pathname);

  // Admin rotası tam ekran bağımsız kabukta çalışır
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    mainEl = null;
    appRoot.replaceChildren();
    const adminContainer = document.createElement('div');
    adminContainer.id = 'admin-root';
    appRoot.appendChild(adminContainer);
    renderAdminPage(adminContainer, navigate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  ensurePublicLayout(pathname);

  switch (pathname) {
    case '/':
      renderHomePage(mainEl, navigate);
      break;
    case '/urunler':
      renderProductsPage(mainEl, navigate);
      break;
    case '/sistemler':
      renderSystemsPage(mainEl, navigate);
      break;
    case '/sektorler':
      renderSectorsPage(mainEl, navigate);
      break;
    case '/hizmet-bolgeleri':
      renderRegionsPage(mainEl, navigate);
      break;
    case '/teknik-bilgi':
      renderTechnicalCenterPage(mainEl, navigate);
      break;
    case '/teklif-al':
      renderQuotePage(mainEl, navigate);
      break;
    case '/iletisim':
      renderContactPage(mainEl, navigate);
      break;
    case '/portal':
      renderPortalPage(mainEl, navigate);
      break;
    default:
      renderHomePage(mainEl, navigate);
      break;
  }

  if (window.location.hash && !window.location.hash.startsWith('#/')) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 80);
      return;
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('popstate', routeCurrentUrl);
window.addEventListener('hashchange', routeCurrentUrl);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', routeCurrentUrl);
} else {
  routeCurrentUrl();
}
