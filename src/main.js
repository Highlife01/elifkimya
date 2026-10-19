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
import { closeProductOrderModal, openChemicalProductModal } from './components/product-order-modal.js';
import { applyDocumentLanguage, initDomTranslator, subscribeLanguage, translatePageDom } from './utils/i18n.js';
import { getLanguageFromPath, localizePath, stripLanguagePrefix, isPrivatePath, loadTranslationCatalog } from './utils/translation-catalog.js';

const appRoot = document.getElementById('app');
let navbarEl = null;
let mainEl = null;
let footerEl = null;
let routeRequest = 0;
let layoutLanguage = null;

function ensurePublicLayout(currentPath) {
  if (!appRoot) return;
  if (layoutLanguage !== getLanguageFromPath(window.location.pathname)) mainEl = null;
  if (!mainEl || !appRoot.contains(mainEl)) {
    appRoot.replaceChildren();
    navbarEl = createNavbar(navigate, currentPath);
    mainEl = document.createElement('main');
    mainEl.id = 'main-view';
    footerEl = createFooter(navigate);
    appRoot.append(navbarEl, mainEl, footerEl);
    layoutLanguage = getLanguageFromPath(window.location.pathname);
  } else {
    updateActiveNav(currentPath);
  }
}

function updateSeoAndRobotsMeta(pathname) {
  applyDynamicPageSeoAndGeo(pathname);
}

export function navigate(targetUrl, replace = false) {
  if (!targetUrl) return;
  const target = new URL(targetUrl, window.location.href);
  if (target.origin !== window.location.origin) return;
  const targetLanguage = stripLanguagePrefix(target.pathname) !== target.pathname
    ? getLanguageFromPath(target.pathname)
    : getLanguageFromPath(window.location.pathname);
  targetUrl = localizePath(target.pathname, targetLanguage) + target.search + target.hash;
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

  let pathname = stripLanguagePrefix(window.location.pathname || '/');
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  if (pathname === '/uygulama-alanlari') pathname = '/sektorler';
  if (pathname === '/cozumler') pathname = '/urunler';
  return stripLanguagePrefix(pathname);
}

async function routeCurrentUrl() {
  if (!appRoot) return;
  const request = ++routeRequest;
  const pathname = normalizePathname();
  // Private records always use their original, unprefixed application routes.
  if (isPrivatePath(window.location.pathname) && stripLanguagePrefix(window.location.pathname) !== window.location.pathname) {
    window.history.replaceState({}, '', stripLanguagePrefix(window.location.pathname) + window.location.search + window.location.hash);
  }
  try {
    await loadTranslationCatalog(getLanguageFromPath(window.location.pathname));
  } catch (error) {
    console.error('The language catalog could not be loaded.', error);
    return;
  }
  if (request !== routeRequest) return;
  closeProductOrderModal();
  applyDocumentLanguage();
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
    mainEl.querySelectorAll('[data-landing-chem]').forEach((sec) => {
      sec.addEventListener('click', (event) => {
        const title = sec.getAttribute('data-landing-chem');
        if (!title) return;
        const actionEl = event.target.closest('[data-chem-open]');
        const mode = actionEl?.getAttribute('data-chem-open') || 'detail';
        event.preventDefault();
        openChemicalProductModal({ title }, { mode });
      });
    });
    initDomTranslator(appRoot);
    translatePageDom(appRoot);
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

  initDomTranslator(appRoot);
  translatePageDom(appRoot);

  if (window.location.hash && !window.location.hash.startsWith('#/')) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 80);
      return;
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

subscribeLanguage((code) => {
  const targetUrl = localizePath(window.location.pathname, code) + window.location.search + window.location.hash;
  window.history.pushState({}, '', targetUrl);
  mainEl = null;
  routeCurrentUrl();
});

window.addEventListener('popstate', routeCurrentUrl);
window.addEventListener('hashchange', routeCurrentUrl);

function initIntroSplash() {
  const splash = document.getElementById('elif-intro-splash');
  if (!splash) return;
  if (window.location.pathname.startsWith('/admin')) {
    splash.remove();
    return;
  }
  const dismiss = () => {
    if (!splash.isConnected || splash.classList.contains('is-hiding')) return;
    splash.classList.add('is-hiding');
    setTimeout(() => {
      splash.remove();
    }, 600);
  };
  splash.addEventListener('click', dismiss, { once: true });
  setTimeout(dismiss, 2350);
}

initIntroSplash();

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

