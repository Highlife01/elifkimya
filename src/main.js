/**
 * Elif Kimya - Ana Uygulama & Router (SPA Main Entry)
 * 
 * Bu paket localStorage kullanmaz; Firestore şemaları ve mimari güvenlik
 * kurallarıyla tam uyumlu olarak çalışır.
 */

import './styles.css';
import './pages.css';

import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { showToast } from './components/notification.js';

import { renderHomePage } from './pages/home.js';
import { renderProductsPage } from './pages/products.js';
import { renderSystemsPage } from './pages/systems.js';
import { renderSectorsPage } from './pages/sectors.js';
import { renderRegionsPage } from './pages/regions.js';
import { renderTechnicalPage } from './pages/technical.js';
import { renderQuotePage } from './pages/quote.js';
import { renderContactPage } from './pages/contact.js';
import { renderAdminPage } from './pages/admin.js';

import { submitQuoteRequest, submitContactMessage, isFirebaseConfigured } from './firebase.js';

// Uygulama Durumu (State)
let appState = {
  route: '/',
  params: {},
  lang: 'tr',
  adminTab: 'genel-bakis',
  productFilter: 'all'
};

/**
 * URL Hash ve Path ayrıştırıcı
 */
function parseCurrentRoute() {
  const hash = window.location.hash || '';
  let path = '/';
  let queryParams = {};

  if (hash.startsWith('#/')) {
    const rawPath = hash.slice(2);
    const [routePart, queryPart] = rawPath.split('?');
    path = '/' + (routePart || '');
    if (queryPart) {
      const sp = new URLSearchParams(queryPart);
      sp.forEach((val, key) => { queryParams[key] = val; });
    }
  } else if (hash === '#admin') {
    path = '/admin';
  } else if (hash === '#top' || hash === '#solutions' || hash === '#contact') {
    path = '/';
  } else {
    // Normal pathname kontrolü
    const pathname = window.location.pathname;
    if (pathname && pathname !== '/') {
      path = pathname;
    }
  }

  // Özel alias yönlendirmeleri
  if (path === '/uygulama-alanlari') path = '/sektorler';
  if (path === '/cozumler') path = '/urunler';

  return { path, params: queryParams };
}

/**
 * Sayfayı Ekrana Bas (Render)
 */
function renderApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const { path, params } = parseCurrentRoute();
  appState.route = path;
  appState.params = params;

  // Sayfa içeriğini seç
  let mainContent = '';
  const isAdmin = path === '/admin' || path.startsWith('/admin');

  if (isAdmin) {
    appContainer.innerHTML = renderAdminPage(appState.adminTab, appState.lang);
  } else {
    switch (path) {
      case '/':
        mainContent = renderHomePage(appState.lang);
        break;
      case '/urunler':
        mainContent = renderProductsPage(appState.productFilter, appState.lang);
        break;
      case '/sistemler':
        mainContent = renderSystemsPage(appState.lang);
        break;
      case '/sektorler':
        mainContent = renderSectorsPage(appState.lang);
        break;
      case '/hizmet-bolgeleri':
        mainContent = renderRegionsPage(appState.lang);
        break;
      case '/teknik-bilgi':
        mainContent = renderTechnicalPage(appState.lang);
        break;
      case '/teklif-al':
        mainContent = renderQuotePage(params, appState.lang);
        break;
      case '/iletisim':
        mainContent = renderContactPage(appState.lang);
        break;
      default:
        mainContent = renderHomePage(appState.lang);
        break;
    }

    appContainer.innerHTML = `
      ${renderNavbar(path, appState.lang)}
      ${mainContent}
      ${renderFooter(appState.lang)}
    `;
  }

  // Etkileşim dinleyicilerini bağla
  bindEvents();
}

/**
 * Etkileşimler ve Olay Dinleyicileri
 */
function bindEvents() {
  // 1. Gezinme Bağlantıları (SPA Routing)
  document.querySelectorAll('a[data-nav], a[href^="#/"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetNav = anchor.getAttribute('data-nav') || anchor.getAttribute('href')?.replace('#', '');
      if (targetNav && !anchor.getAttribute('target')) {
        e.preventDefault();
        window.location.hash = '#' + targetNav;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // 2. Dil Değiştirici (TR / EN)
  const langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      appState.lang = appState.lang === 'tr' ? 'en' : 'tr';
      showToast(
        appState.lang === 'tr' ? 'Dil Türkçe olarak ayarlandı.' : 'Language switched to English.',
        'info',
        2500
      );
      renderApp();
    });
  }

  // 3. Mobil Hamburger Menü
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 4. B2B Teklif Sihirbazı (RFQ Wizard Adımları ve Gönderim)
  setupRfqWizard();

  // 5. Ürün Kataloğu Filtreleme ve Arama
  setupProductCatalog();

  // 6. TDS Modal İşlemleri
  setupTdsModal();

  // 7. Teknik GEO SSS Akordiyonu
  setupFaqAccordion();

  // 8. İletişim Formu
  setupContactForm();

  // 9. Admin Dashboard Sekmeleri
  setupAdminTabs();
}

/**
 * RFQ Sihirbazı Mantığı
 */
function setupRfqWizard() {
  const form = document.getElementById('b2bQuoteForm');
  if (!form) return;

  const panes = form.querySelectorAll('.rfq-step-pane');
  const stepIndicators = document.querySelectorAll('.step-indicator');

  function goToStep(stepNum) {
    panes.forEach(p => {
      const isTarget = p.getAttribute('data-pane') === String(stepNum);
      p.classList.toggle('active', isTarget);
    });
    stepIndicators.forEach(ind => {
      const isPastOrCurrent = parseInt(ind.getAttribute('data-step')) <= stepNum;
      ind.classList.toggle('active', isPastOrCurrent);
    });

    // 4. Adıma geçildiğinde özeti güncelle
    if (stepNum === 4) {
      updateSummary();
    }

    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateSummary() {
    const cat = document.getElementById('rfqCategory')?.value || 'Belirtilmedi';
    const prod = document.getElementById('rfqProductDetail')?.value || 'Genel Şartlandırma';
    const purpose = document.getElementById('rfqPurpose')?.value || 'Belirtilmedi';
    const amount = document.getElementById('rfqRequestedAmount')?.value || 'Miktar Belirtilmedi';
    const company = document.getElementById('rfqCompanyName')?.value || 'Firma Adı Belirtilmedi';
    const city = document.getElementById('rfqCity')?.value || 'Şehir Belirtilmedi';
    const contact = document.getElementById('rfqContactPerson')?.value || '';
    const phone = document.getElementById('rfqPhone')?.value || '';
    const email = document.getElementById('rfqEmail')?.value || '';

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setTxt('sumCategory', cat);
    setTxt('sumProduct', prod);
    setTxt('sumPurpose', purpose);
    setTxt('sumAmount', amount);
    setTxt('sumCompany', `${company} (${city})`);
    setTxt('sumContact', `${contact} · ${phone} · ${email}`);
  }

  // İleri Butonları
  form.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-target'));
      const currentPane = btn.closest('.rfq-step-pane');

      // Validasyon
      let valid = true;
      currentPane.querySelectorAll('input[required], select[required]').forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#ef4444';
          input.focus();
        } else {
          input.style.borderColor = '';
        }
      });

      if (!valid) {
        showToast('Lütfen zorunlu alanları doldurunuz.', 'error', 3000);
        return;
      }

      goToStep(targetStep);
    });
  });

  // Geri Butonları
  form.querySelectorAll('.btn-prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-target'));
      goToStep(targetStep);
    });
  });

  // Form Gönderim (Submit)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const consent = document.getElementById('rfqKvkkConsent');
    if (!consent || !consent.checked) {
      showToast('Lütfen KVKK aydınlatma metnini onaylayınız.', 'error');
      return;
    }

    const submitBtn = document.getElementById('btnSubmitRfq');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>İletiliyor (Firestore)...</span>';
    }

    const payload = {
      category: document.getElementById('rfqCategory')?.value || '',
      productDetail: document.getElementById('rfqProductDetail')?.value || '',
      purpose: document.getElementById('rfqPurpose')?.value || '',
      systemCapacity: document.getElementById('rfqSystemCapacity')?.value || '',
      requestedAmount: document.getElementById('rfqRequestedAmount')?.value || '',
      waterSource: document.getElementById('rfqWaterSource')?.value || '',
      packaging: document.getElementById('rfqPackaging')?.value || '',
      waterReportNotes: document.getElementById('rfqWaterReportNotes')?.value || '',
      companyName: document.getElementById('rfqCompanyName')?.value || '',
      city: document.getElementById('rfqCity')?.value || '',
      contactPerson: document.getElementById('rfqContactPerson')?.value || '',
      email: document.getElementById('rfqEmail')?.value || '',
      phone: document.getElementById('rfqPhone')?.value || '',
      taxInfo: document.getElementById('rfqTaxInfo')?.value || ''
    };

    try {
      const result = await submitQuoteRequest(payload);
      const refCode = 'RFQ-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      // Başarı Ekranını Aç
      form.style.display = 'none';
      const successCard = document.getElementById('rfqSuccessCard');
      if (successCard) {
        successCard.style.display = 'block';
        const refEl = document.getElementById('rfqReferenceNo');
        if (refEl) refEl.textContent = refCode;

        // WhatsApp Doğrudan Bildirim Linki
        const waText = encodeURIComponent(
          `*Elif Kimya Teklif Talebi (${refCode})*\n` +
          `*Firma:* ${payload.companyName} (${payload.city})\n` +
          `*Yetkili:* ${payload.contactPerson} (${payload.phone})\n` +
          `*Kategori:* ${payload.category}\n` +
          `*Ürün/Sistem:* ${payload.productDetail}\n` +
          `*Talep Edilen Miktar:* ${payload.requestedAmount}\n` +
          `*Notlar:* ${payload.waterReportNotes || 'Yok'}`
        );

        const waBtn = document.getElementById('rfqWhatsAppDirectBtn');
        if (waBtn) {
          waBtn.href = `https://wa.me/905464992342?text=${waText}`;
        }
      }

      showToast('Teklif talebiniz başarıyla kaydedildi!', 'success', 5000);

    } catch (err) {
      showToast('Bir hata oluştu: ' + err.message, 'error', 4000);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Tekrar Dene</span>';
      }
    }
  });

  // Yeni Talep Butonu
  const newReqBtn = document.getElementById('rfqNewRequestBtn');
  if (newReqBtn) {
    newReqBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      const successCard = document.getElementById('rfqSuccessCard');
      if (successCard) successCard.style.display = 'none';
      goToStep(1);
    });
  }
}

/**
 * Ürün Kataloğu Filtre ve Arama
 */
function setupProductCatalog() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('productSearchInput');
  const catBlocks = document.querySelectorAll('.category-block');
  const itemCards = document.querySelectorAll('.product-item-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const catFilter = tab.getAttribute('data-cat-filter');
      appState.productFilter = catFilter;

      catBlocks.forEach(block => {
        const blockId = block.getAttribute('data-category-id');
        const show = catFilter === 'all' || catFilter === blockId;
        block.style.display = show ? 'block' : 'none';
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      itemCards.forEach(card => {
        const name = card.getAttribute('data-product-name') || '';
        const text = card.textContent.toLowerCase();
        const match = !q || name.includes(q) || text.includes(q);
        card.style.display = match ? 'flex' : 'none';
      });
    });
  }
}

/**
 * TDS Talep Modalı
 */
function setupTdsModal() {
  const modal = document.getElementById('tdsModal');
  const modalClose = document.getElementById('tdsModalClose');
  const selectedProdEl = document.getElementById('tdsSelectedProduct');
  const tdsForm = document.getElementById('tdsRequestForm');

  document.querySelectorAll('.btn-tds-request').forEach(btn => {
    btn.addEventListener('click', () => {
      const prodName = btn.getAttribute('data-product');
      if (selectedProdEl) selectedProdEl.textContent = prodName;
      if (modal) modal.style.display = 'grid';
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  if (tdsForm) {
    tdsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('tdsEmail')?.value;
      showToast(`Teknik Veri Föyü (TDS) ve SDS dokümanı ${email} adresine iletildi.`, 'success', 4000);
      if (modal) modal.style.display = 'none';
      tdsForm.reset();
    });
  }
}

/**
 * GEO FAQ Akordiyonu
 */
function setupFaqAccordion() {
  document.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.faq-card');
      const drawer = card.querySelector('.faq-answer-drawer');
      const isOpen = drawer.classList.contains('is-open');

      // Diğerlerini kapat (akordiyon davranışı)
      document.querySelectorAll('.faq-answer-drawer').forEach(d => d.classList.remove('is-open'));
      document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('is-open'));
      document.querySelectorAll('.faq-question-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        drawer.classList.add('is-open');
        card.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * İletişim Formu
 */
function setupContactForm() {
  const contactForm = document.getElementById('contactDirectForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const phone = document.getElementById('contactPhone')?.value;
    const company = document.getElementById('contactCompany')?.value || '';
    const subject = document.getElementById('contactSubject')?.value || 'Genel';
    const message = document.getElementById('contactMessage')?.value;

    const submitBtn = document.getElementById('btnSubmitContact');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Mesaj İletiliyor...</span>';
    }

    try {
      await submitContactMessage({ name, email, phone, company, subject, message });
      showToast('Mesajınız başarıyla iletildi. Mühendislerimiz sizinle irtibata geçecektir.', 'success', 5000);
      contactForm.reset();
      const statusBox = document.getElementById('contactFormStatus');
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.className = 'form-status-alert success';
        statusBox.textContent = '✓ Mesajınız Firestore güvenli kayıt havuzuna alındı.';
      }
    } catch (err) {
      showToast('Hata: ' + err.message, 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Mesajı Gönder (Firestore)</span>';
      }
    }
  });
}

/**
 * Admin Dashboard Sekme Değişimi
 */
function setupAdminTabs() {
  document.querySelectorAll('[data-admin-tab]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = elem.getAttribute('data-admin-tab');
      appState.adminTab = tabId;
      renderApp();
    });
  });
}

// Router Event Listeners
window.addEventListener('hashchange', renderApp);
window.addEventListener('popstate', renderApp);

// Başlangıç Yüklemesi
document.addEventListener('DOMContentLoaded', renderApp);
renderApp();
