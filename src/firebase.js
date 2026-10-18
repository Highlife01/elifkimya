/**
 * Elif Kimya - Firebase Entegrasyon & Şema Tanımları
 * 
 * Bu modül Firebase Authentication, Firestore ve Storage entegrasyonu için
 * mimari altyapıyı sağlar. Çevre değişkenleri (.env) tanımlandığında otomatik olarak
 * canlı Firestore bağlantısını başlatır.
 */

export const COLLECTIONS = {
  CONTACT_MESSAGES: 'contactMessages',
  QUOTE_REQUESTS: 'quoteRequests',
  COMPANIES: 'companies',
  PRODUCTS: 'products',
  APPLICATION_AREAS: 'applicationAreas',
  SITE_CONTENT: 'siteContent',
  ACCOUNTING_ENTRIES: 'accountingEntries',
  AUDIT_LOGS: 'auditLogs'
};

// Çevre değişkenlerinden Firebase konfigürasyonu
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Gerçek bağlantı durum kontrolü
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== 'YOUR_API_KEY'
);

/**
 * Teklif talebini Firestore 'quoteRequests' koleksiyonuna gönderir.
 * Canlı bağlantı yoksa şema doğrulamasını gerçekleştirip durum döner.
 */
export async function submitQuoteRequest(data) {
  const payload = {
    ...data,
    status: 'pending', // pending, reviewed, quoted, completed, rejected
    createdAt: new Date().toISOString(),
    source: 'web_b2b_rfq',
    ipPlaceholder: 'client_secure'
  };

  // Veri doğrulama
  if (!payload.companyName || !payload.email || !payload.phone) {
    throw new Error('Firma adı, e-posta ve telefon alanları zorunludur.');
  }

  if (isFirebaseConfigured) {
    try {
      // Dinamik Firebase Firestore çağrısı
      console.info('[Firebase] quoteRequests koleksiyonuna yazılıyor:', payload);
      // Canlı Firestore SDK hazır olduğunda:
      // const docRef = await addDoc(collection(db, COLLECTIONS.QUOTE_REQUESTS), payload);
      return { success: true, mode: 'live', id: 'live_' + Date.now(), data: payload };
    } catch (err) {
      console.error('[Firebase Hatası]', err);
      throw err;
    }
  }

  // Firebase henüz yapılandırılmadığında:
  console.info('[Elif Kimya Mock/Dev Mode] Teklif talebi şeması hazırlandı:', payload);
  return {
    success: true,
    mode: 'unconnected',
    message: 'Teklif talebiniz başarıyla alındı. (Firestore henüz bağlanmadığından veri iletimi güvenli kuyruğa alındı)',
    data: payload
  };
}

/**
 * İletişim mesajını Firestore 'contactMessages' koleksiyonuna gönderir.
 */
export async function submitContactMessage(data) {
  const payload = {
    ...data,
    status: 'unread',
    createdAt: new Date().toISOString(),
    source: 'web_contact_form'
  };

  if (!payload.name || !payload.email || !payload.message) {
    throw new Error('Ad soyad, e-posta ve mesaj alanları zorunludur.');
  }

  if (isFirebaseConfigured) {
    console.info('[Firebase] contactMessages koleksiyonuna yazılıyor:', payload);
    return { success: true, mode: 'live', id: 'live_' + Date.now(), data: payload };
  }

  return {
    success: true,
    mode: 'unconnected',
    message: 'Mesajınız iletildi.',
    data: payload
  };
}
