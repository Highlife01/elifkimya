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
import { applyDynamicPageSeoAndGeo } from './utils/seo-geo.js';
import { findPublicRoute, renderNotFoundPage, renderPublicLanding } from './pages/seo-landings.js';
import { renderSafeHtml } from './utils/security.js';
import { applyDocumentLanguage, subscribeLanguage } from './utils/i18n.js';

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
  applyDynamicPageSeoAndGeo(pathname);
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
  applyDocumentLanguage();
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

  const landing = findPublicRoute(pathname);
  const isDetail = landing && !['/', '/urunler', '/sistemler', '/sektorler', '/hizmet-bolgeleri', '/teknik-bilgi', '/teklif-al', '/iletisim'].includes(pathname);
  if (isDetail) {
    renderSafeHtml(mainEl, renderPublicLanding(landing));
    mainEl.querySelectorAll('a[data-nav]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/')) {
          event.preventDefault();
          navigate(href);
        }
      });
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

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
      renderSafeHtml(mainEl, renderNotFoundPage());
      mainEl.querySelectorAll('a[data-nav]').forEach((link) => {
        link.addEventListener('click', (event) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('/')) {
            event.preventDefault();
            navigate(href);
          }
        });
      });
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

subscribeLanguage(() => {
  mainEl = null;
  routeCurrentUrl();
});

window.addEventListener('popstate', routeCurrentUrl);
window.addEventListener('hashchange', routeCurrentUrl);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', routeCurrentUrl);
} else {
  routeCurrentUrl();
}

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
  });
}

