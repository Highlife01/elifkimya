/**
 * Elif Kimya - Yüksek Kontrastlı Kurumsal Alt Bilgi (Footer),
 * Öne Çıkarılmış Teknik Bilgi Merkezi (SDS/TDS/COA) & WhatsApp B2B Masa
 */

import { escapeHtml, escapeAttr, renderSafeHtml } from '../utils/security.js';
import { companyInfo } from '../data/products.js';
import { getLanguage, t } from '../utils/i18n.js';

export function renderFooter(_currentLang = 'tr', generalSettings = {}) {
  const rawPhone = generalSettings.phone || companyInfo.phoneDisplay;
  const whatsappClean = (generalSettings.whatsapp || companyInfo.whatsappNumber || '905425903626').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent('Merhaba ELİF KİMYA, web siteniz üzerinden ulaşıyorum. Endüstriyel kimyasal ürünleriniz ve su arıtma sistemleriniz hakkında detaylı bilgi ve fiyat teklifi almak istiyorum.')}`;
  const email = generalSettings.salesEmail || companyInfo.salesEmail || companyInfo.email;

  return `
    <footer class="border-t-4 border-brand-green bg-slate-900 text-slate-200">
      <!-- Üst Bilgi Merkezi & Teknik Dokümantasyon Vitrini (Footer'a Taşınan Özel Alan) -->
      <div class="border-b border-white/10 bg-emerald-950/60 py-8">
        <div class="container-x flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-2">
              <span>📚</span>
              <span>Teknik Bilgi &amp; Belge Merkezi (SDS / GBF • TDS • COA)</span>
            </div>
            <h3 class="font-display text-xl sm:text-2xl font-extrabold text-white">
              Mühendislik Rehberi, Güvenlik Bilgi Formları ve Parti Analiz Sertifikaları
            </h3>
            <p class="mt-1.5 text-sm text-slate-300 leading-relaxed">
              Kimyasal yoğunluk (g/cm³) tabloları, Langelier Doygunluk İndeksi (LSI) hesaplama rehberleri, RO membran koruma protokolleri ve ürünlerimize ait doğrulanmış SDS/TDS dokümanlarına doğrudan erişin.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-3 shrink-0">
            <a href="/teknik-bilgi" data-nav="/teknik-bilgi" class="btn-primary !px-6 !py-3.5 text-xs font-extrabold shadow-cta">
              <span>📄</span>
              <span>Bilgi &amp; Belge Merkezini Aç →</span>
            </a>
            <a href="/teklif-al?type=water" data-nav="/teklif-al?type=water" class="px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 !text-white text-xs font-bold transition">
              Ücretsiz Jar-Test &amp; Su Analizi
            </a>
          </div>
        </div>
      </div>

      <!-- 4 Sütunlu Kurumsal Footer -->
      <div class="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a class="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-md" aria-label="ELİF KİMYA Ana Sayfa" href="/" data-nav="/">
            <img
              alt="ELİF KİMYA"
              loading="lazy"
              width="190"
              height="45"
              decoding="async"
              class="h-9 w-auto object-contain"
              src="/logo.svg"
            />
          </a>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-slate-300 font-medium">
            ${escapeHtml(t('footer_tagline'))}
          </p>
          <div class="mt-4 space-y-1.5 text-xs text-slate-300">
            <p>
              <a href="https://www.elifcevrekimya.com.tr" class="font-bold text-white hover:text-emerald-400 transition-colors">🌐 www.elifcevrekimya.com.tr</a>
            </p>
            <p>
              <a href="mailto:${escapeAttr(email)}" class="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">✉️ ${escapeHtml(email)}</a>
            </p>
            <p class="font-mono font-bold text-white text-sm">📞 ${escapeHtml(rawPhone)}</p>
            <p>
              <a
                href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x15288751a6fd9097:0xffc6bfce58ff18ef?sa=X&amp;ved=1t:8290&amp;ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-300 hover:text-emerald-400 transition-colors underline decoration-slate-600 underline-offset-4"
              >📍 Ova Mah. Şakirpaşa Cd. No:269, 01080 Seyhan/Adana</a>
            </p>
          </div>
        </div>

        <div>
          <h3 class="text-xs font-black uppercase tracking-wider text-emerald-400">
            ${escapeHtml(t('footer_groups'))}
          </h3>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li>
              <a class="text-slate-200 hover:text-emerald-400 font-semibold transition-colors" href="/urunler#sogutma-kulesi-kimyasallari" data-nav="/urunler">
                Soğutma Kulesi Kimyasalları
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 font-semibold transition-colors" href="/urunler#kazan-suyu-kimyasallari" data-nav="/urunler">
                Buhar Kazanı &amp; Kondens Kimyasalları
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 font-semibold transition-colors" href="/urunler#jeotermal-su-sartlandirma" data-nav="/urunler#jeotermal-su-sartlandirma">
                Jeotermal Su Şartlandırma
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 font-semibold transition-colors" href="/sistemler#medipure-katalog" data-nav="/sistemler#medipure-katalog">
                Medipure Saf Su Cihazları
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 font-semibold transition-colors" href="/sistemler" data-nav="/sistemler">
                Ters Ozmoz (RO), UF &amp; EDI Sistemleri
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 font-semibold transition-colors" href="/urunler#atik-su-aritma-kimyasallari" data-nav="/urunler">
                Atıksu Polimerleri (PAC, A-PAM, C-PAM)
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 font-semibold transition-colors" href="/urunler" data-nav="/urunler">
                Baz Kimyasallar (Hipoklorit, Kostik, HCl)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-black uppercase tracking-wider text-emerald-400">
            ${escapeHtml(t('footer_corporate'))}
          </h3>
          <ul class="mt-4 space-y-2.5 text-sm font-semibold">
            <li>
              <a class="text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5" href="/teknik-bilgi" data-nav="/teknik-bilgi">
                <span>📌</span>
                <span>Bilgi &amp; Belge Merkezi (SDS / TDS / COA)</span>
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 transition-colors" href="/sistemler" data-nav="/sistemler">
                360° Mühendislik, Pano &amp; SCADA Otomasyon
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 transition-colors" href="/sektorler" data-nav="/sektorler">
                Hizmet Verilen Sektörler &amp; ROI
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 transition-colors" href="/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri">
                Hizmet Bölgeleri &amp; ADR Lojistik Ağı
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 transition-colors" href="/teklif-al" data-nav="/teklif-al">
                Kurumsal Teklif &amp; Jar-Test Başvurusu
              </a>
            </li>
            <li>
              <a class="text-slate-200 hover:text-emerald-400 transition-colors" href="/iletisim" data-nav="/iletisim">
                İletişim &amp; Merkez Depo
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-black uppercase tracking-wider text-emerald-400">
            ${escapeHtml(t('footer_regions'))}
          </h3>
          <ul class="mt-4 flex flex-wrap gap-2 text-xs">
            <li>
              <a href="/hizmet-bolgeleri" data-nav="/hizmet-bolgeleri" class="inline-block px-3 py-1.5 rounded-lg border transition bg-emerald-500/20 border-emerald-400/40 font-extrabold text-emerald-300 hover:bg-emerald-500/30">
                TR · 81 İl Sevkiyat
              </a>
            </li>
            <li>
              <a href="/teknik-bilgi" data-nav="/teknik-bilgi" class="inline-block px-3 py-1.5 rounded-lg border transition bg-white/10 border-white/20 font-bold text-white hover:border-emerald-400">
                📚 Bilgi Merkezi (SDS/TDS)
              </a>
            </li>
            <li>
              <a href="/portal" data-nav="/portal" class="inline-block px-3 py-1.5 rounded-lg border transition bg-white/10 border-white/20 font-bold text-white hover:border-emerald-400">
                🌐 Müşteri Portalı
              </a>
            </li>
            <li>
              <a href="/teklif-al" data-nav="/teklif-al" class="inline-block px-3 py-1.5 rounded-lg border transition bg-white/10 border-white/20 font-bold text-white hover:border-emerald-400">
                FOB / CIF İhracat
              </a>
            </li>
          </ul>
          <p class="mt-4 text-xs leading-relaxed text-slate-300">
            Adana AOSB, Mersin-Tarsus OSB, İskenderun-Payas, Osmaniye, Gaziantep, Kayseri ve Niğde sanayi bölgelerine 2–6 saatte ADR sertifikalı sevkiyat.
          </p>
        </div>
      </div>

      <div class="border-t border-white/10 bg-slate-950/60">
        <div class="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-400 sm:flex-row font-semibold">
          <p>© 2026 ELİF ÇEVRE KİMYA SANAYİ VE TİCARET (www.elifcevrekimya.com.tr). Tüm hakları saklıdır.</p>
          <div class="flex flex-wrap items-center gap-6">
            <a class="text-emerald-400 hover:text-white transition-colors" href="/teknik-bilgi" data-nav="/teknik-bilgi">Teknik Bilgi Merkezi</a>
            <a class="hover:text-emerald-400 transition-colors" href="/llms.txt" target="_blank" rel="noopener">AI / GEO Rehberi (llms.txt)</a>
            <a class="hover:text-emerald-400 transition-colors" href="/sitemap.xml" target="_blank" rel="noopener">Site Haritası</a>
            <a class="hover:text-emerald-400 transition-colors" href="/portal" data-nav="/portal">Müşteri Portalı</a>
            <a class="text-slate-300 hover:text-emerald-400 transition-colors" href="/admin" data-nav="/admin">Yönetim Paneli (ERP)</a>
          </div>
        </div>
      </div>

      <!-- Yüzen WhatsApp B2B Teknik & İhracat Masası Butonu -->
      <div class="fixed bottom-6 end-0 mx-4 sm:mx-6 z-40 flex items-center gap-3 group pointer-events-none">
        <div class="hidden sm:flex flex-col items-end bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-emerald-500/40 text-xs font-medium text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-auto">
          <span class="font-bold text-emerald-400">WhatsApp B2B Masa</span>
          <span class="text-[10px] text-slate-300">Toptan &amp; Teknik • Hızlı yanıt</span>
        </div>
        <a
          href="${escapeAttr(whatsappUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp B2B Hattı"
          class="pointer-events-auto relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300">
          <span class="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping"></span>
          <svg viewBox="0 0 32 32" class="w-7 h-7 fill-current relative" aria-hidden="true">
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"></path>
          </svg>
        </a>
      </div>
    </footer>
  `;
}

export function createFooter(navigate) {
  const wrapper = document.createElement('div');
  renderSafeHtml(wrapper, renderFooter(getLanguage()));

  wrapper.querySelectorAll('a[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || link.getAttribute('data-nav');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    });
  });

  return wrapper.firstElementChild || wrapper;
}
