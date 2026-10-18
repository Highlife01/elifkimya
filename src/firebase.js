/**
 * Elif Kimya - İzole Firebase Backend Servis Katmanı
 *
 * Proje: advera-c8dd0
 * Veritabanı: elifkimya (Diğer sitelerle karışmaması için tamamen izole Firestore Native DB)
 * Hosting: elifkimya
 * Storage Öneki: elifkimya/
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  documentId,
  getCountFromServer,
  onSnapshot,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import {
  validateAndPrepareUpload,
  generateSecureToken,
  buildSanitizedPortalShare,
  optStr
} from './utils/security.js';
import { computeInvoiceTotals, derivePaymentStatus } from './utils/invoice-calc.js';
import { TAX_RULES_REVIEWED_AT, invoiceSeriesFor, nextInvoiceNumber, validateInvoiceCompliance } from './utils/tax-rules.js';

export const COLLECTIONS = {
  USERS: 'users',
  CRM_REQUESTS: 'crmRequests',
  CUSTOMERS: 'customers',
  PRODUCTS: 'products',
  DOCUMENTS: 'documents',
  PROJECTS: 'projects',
  PROPOSALS: 'proposals',
  PORTAL_SHARES: 'portalShares',
  ORDERS: 'orders',
  INVENTORY_ITEMS: 'inventoryItems',
  INVENTORY_MOVEMENTS: 'inventoryMovements',
  SUPPLIERS: 'suppliers',
  PURCHASE_ORDERS: 'purchaseOrders',
  SERVICE_RECORDS: 'serviceRecords',
  SITE_SETTINGS: 'siteSettings',
  NOTIFICATION_LOGS: 'notificationLogs',
  AUDIT_LOGS: 'auditLogs',
  ACCOUNTING_INVOICES: 'accountingInvoices',
  ACCOUNTING_TRANSACTIONS: 'accountingTransactions',
  CHEQUES_AND_NOTES: 'chequesAndNotes',
  ACCOUNTING_SYNC_STATE: 'accountingSyncState',
  ACCOUNTING_SYNC_LOGS: 'accountingSyncLogs'
};

export const CRM_STAGES = [
  'Yeni Talep',
  'İlk Görüşme',
  'İhtiyaç Analizi',
  'Teknik Değerlendirme',
  'Teklif Hazırlanıyor',
  'Teklif Gönderildi',
  'Revizyon',
  'Onaylandı',
  'Tedarik/Uygulama',
  'Tamamlandı'
];

export const CRM_RESOLUTIONS = [
  { id: 'active', label: 'Aktif Süreç' },
  { id: 'lost', label: 'Kaybedildi' },
  { id: 'cancelled', label: 'İptal Edildi' },
  { id: 'archived', label: 'Arşivlendi' }
];

export const ROLES = {
  SUPERADMIN: 'superadmin',
  SALES: 'sales',
  TECHNICAL: 'technical',
  WAREHOUSE: 'warehouse',
  VIEWER: 'viewer',
  CUSTOMER: 'customer'
};

export const ROLE_LABELS = {
  superadmin: 'Süperadmin',
  sales: 'Satış Ekibi',
  technical: 'Teknik Ekip / Mühendislik',
  warehouse: 'Depo & Lojistik',
  viewer: 'Yalnızca Görüntüleme',
  customer: 'Müşteri (Portal)'
};

const BOOTSTRAP_ADMINS = new Set(['cebrailkara@gmail.com', 'cebokar@gmail.com', 'info@elifcevrekimya.com.tr']);

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

export const DATABASE_ID = import.meta.env.VITE_FIREBASE_DATABASE_ID || 'elifkimya';
export const STORAGE_PREFIX = import.meta.env.VITE_FIREBASE_STORAGE_PREFIX || 'elifkimya';

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'your_api_key_here'
);

let app = null;
let auth = null;
let db = null;
let storage = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  // İzole 'elifkimya' veritabanına bağlan
  db = getFirestore(app, DATABASE_ID);
  storage = getStorage(app);
}

export { app, auth, db, storage };

/**
 * Rol yetki matrisi kontrolü
 */
export function hasPermission(role, permissionKey) {
  if (!role) return false;
  if (role === ROLES.SUPERADMIN) return true;

  const matrix = {
    view_admin: [ROLES.SUPERADMIN, ROLES.SALES, ROLES.TECHNICAL, ROLES.WAREHOUSE, ROLES.VIEWER],
    manage_crm: [ROLES.SUPERADMIN, ROLES.SALES, ROLES.TECHNICAL],
    manage_products: [ROLES.SUPERADMIN, ROLES.SALES, ROLES.TECHNICAL, ROLES.WAREHOUSE],
    manage_documents: [ROLES.SUPERADMIN, ROLES.TECHNICAL, ROLES.SALES],
    manage_projects: [ROLES.SUPERADMIN, ROLES.TECHNICAL, ROLES.SALES],
    approve_technical: [ROLES.SUPERADMIN, ROLES.TECHNICAL],
    manage_proposals: [ROLES.SUPERADMIN, ROLES.SALES, ROLES.TECHNICAL],
    view_costs: [ROLES.SUPERADMIN, ROLES.SALES, ROLES.TECHNICAL, ROLES.VIEWER],
    manage_orders: [ROLES.SUPERADMIN, ROLES.SALES, ROLES.WAREHOUSE],
    manage_inventory: [ROLES.SUPERADMIN, ROLES.WAREHOUSE, ROLES.SALES],
    manage_service: [ROLES.SUPERADMIN, ROLES.TECHNICAL, ROLES.SALES],
    manage_accounting: [ROLES.SUPERADMIN, ROLES.SALES],
    view_accounting: [ROLES.SUPERADMIN, ROLES.SALES, ROLES.VIEWER],
    manage_settings: [ROLES.SUPERADMIN],
    manage_content: [ROLES.SUPERADMIN, ROLES.SALES]
  };

  const allowed = matrix[permissionKey] || [];
  return allowed.includes(role);
}

/**
 * Denetim izi (Audit Log) kaydı oluşturur (Değiştirilemez)
 */
export async function writeAuditLog(action, collectionName, targetId, detailsObj = {}, actor = null) {
  if (!db || !auth?.currentUser) return;
  try {
    await addDoc(collection(db, COLLECTIONS.AUDIT_LOGS), {
      action: String(action || 'ACTION').slice(0, 140),
      collection: String(collectionName || 'general').slice(0, 90),
      targetId: String(targetId || '').slice(0, 140),
      details: typeof detailsObj === 'string' ? detailsObj.slice(0, 4000) : JSON.stringify(detailsObj || {}).slice(0, 4000),
      actorUid: actor?.uid || auth.currentUser.uid,
      actorEmail: actor?.email || auth.currentUser.email || null,
      createdAt: serverTimestamp(),
      createdAtIso: new Date().toISOString()
    });
  } catch (_err) {
    // Denetim kaydı hatası ana işlemi kırmamalı
  }
}

/* ==========================================================================
   1. KİMLİK DOĞRULAMA VE KULLANICI ROLLERİ (RBAC)
   ========================================================================== */

export async function loginWithEmail(email, password) {
  if (!auth) throw new Error('Firebase Authentication yapılandırılmamış.');
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const cred = await signInWithEmailAndPassword(auth, normalizedEmail, password);
    const profile = await ensureUserProfile(cred.user);
    return { user: cred.user, profile };
  } catch (err) {
    if (
      BOOTSTRAP_ADMINS.has(normalizedEmail) &&
      (err?.code === 'auth/user-not-found' || err?.code === 'auth/invalid-credential')
    ) {
      const created = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      const profile = await ensureUserProfile(created.user);
      return { user: created.user, profile };
    }
    throw err;
  }
}

export async function loginWithGoogle() {
  if (!auth) throw new Error('Firebase Authentication yapılandırılmamış.');
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  const profile = await ensureUserProfile(cred.user);
  return { user: cred.user, profile };
}

export async function logoutCurrentUser() {
  if (auth) {
    await signOut(auth);
  }
}

export function onAuthChange(callback) {
  if (!auth) {
    callback(null, null);
    return () => {};
  }
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null, null);
      return;
    }
    try {
      const profile = await ensureUserProfile(user);
      callback(user, profile);
    } catch (_err) {
      const fallbackRole = BOOTSTRAP_ADMINS.has((user.email || '').toLowerCase()) ? ROLES.SUPERADMIN : ROLES.CUSTOMER;
      callback(user, {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email || 'Kullanıcı',
        role: fallbackRole
      });
    }
  });
}

export async function ensureUserProfile(user) {
  if (!db || !user) return null;
  const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
  const snap = await getDoc(userDocRef);
  const emailLower = (user.email || '').toLowerCase();
  const isBootstrap = BOOTSTRAP_ADMINS.has(emailLower);

  if (snap.exists()) {
    const data = snap.data();
    if (isBootstrap && data.role !== ROLES.SUPERADMIN) {
      await updateDoc(userDocRef, {
        role: ROLES.SUPERADMIN,
        updatedAt: serverTimestamp()
      });
      return { id: snap.id, ...data, role: ROLES.SUPERADMIN };
    }
    return { id: snap.id, ...data };
  }

  const initialRole = isBootstrap ? ROLES.SUPERADMIN : ROLES.CUSTOMER;
  const newProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'Kullanıcı',
    role: initialRole,
    createdAt: serverTimestamp(),
    createdAtIso: new Date().toISOString(),
    updatedAt: serverTimestamp()
  };

  await setDoc(userDocRef, newProfile);
  return newProfile;
}

export async function updateStaffUserRole(targetUid, newRole, actorProfile) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!actorProfile || actorProfile.role !== ROLES.SUPERADMIN) {
    throw new Error('Yetki hatası: Yalnızca Süperadmin kullanıcı rolleri üzerinde değişiklik yapabilir.');
  }
  if (!Object.values(ROLES).includes(newRole)) {
    throw new Error('Geçersiz rol tanımı.');
  }

  const ref = doc(db, COLLECTIONS.USERS, targetUid);
  await updateDoc(ref, {
    role: newRole,
    updatedAt: serverTimestamp(),
    updatedBy: actorProfile.email || actorProfile.uid
  });
  await writeAuditLog('UPDATE_USER_ROLE', 'users', targetUid, { newRole }, actorProfile);
}

/* ==========================================================================
   2. WEB FORMLARI & CRM TALEP YÖNETİMİ
   ========================================================================== */

export async function submitPublicCrmForm(data) {
  if (!db) throw new Error('Sunucu bağlantısı kurulamadı.');

  const companyName = String(data.companyName || data.name || '').trim();
  const contactName = String(data.contactName || data.name || '').trim();
  const email = String(data.email || '').trim();
  const rawPhone = String(data.phone || '').trim();
  const phone = rawPhone.length >= 6 ? rawPhone : 'Belirtilmedi';

  if (companyName.length < 2) throw new Error('Lütfen geçerli bir firma veya ad soyad girin.');
  if (!email.includes('@') || email.length < 5) throw new Error('Lütfen geçerli bir e-posta adresi girin.');

  const reqType = String(data.requestType || 'product_quote');
  let formChannel = String(data.formChannel || '').trim();
  if (!formChannel) {
    if (reqType === 'general_contact') formChannel = 'contact_form';
    else if (reqType === 'order_request') formChannel = 'order_form';
    else if (reqType === 'callback_30min') formChannel = 'callback_form';
    else formChannel = 'quote_form';
  }

  const nowIso = new Date().toISOString();
  const descText = String(data.description || data.message || '').trim();
  const packText = String(data.packagingInfo || data.packaging || data.requestedAmount || '').trim();

  const payload = {
    companyName,
    contactName: contactName || companyName,
    phone,
    email,
    cityCountry: String(data.cityCountry || 'Adana / Türkiye').trim(),
    formChannel,
    requestType: reqType,
    subject: String(data.subject || data.relatedProductOrSystem || '').trim().slice(0, 200),
    relatedProductOrSystem: String(data.relatedProductOrSystem || data.subject || '').trim(),
    packaging: packText.slice(0, 200),
    requestedAmount: packText.slice(0, 200),
    message: descText.slice(0, 5000),
    description: descText.slice(0, 5000),
    assignedStaff: String(data.assignedStaff || '').trim(),
    followUpDate: String(data.followUpDate || '').trim(),
    stage: 'Yeni Talep',
    resolutionStatus: 'active',
    kvkkConsent: Boolean(data.kvkkConsent ?? true),
    sourcePage: String(data.sourcePage || window.location.pathname),
    isTestRecord: Boolean(data.isTestRecord),
    stageHistory: [
      {
        fromStage: null,
        toStage: 'Yeni Talep',
        resolutionStatus: 'active',
        changedByUid: 'public_web',
        changedByEmail: email,
        timestamp: nowIso
      }
    ],
    createdAt: serverTimestamp(),
    createdAtIso: nowIso,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };

  const docRef = await addDoc(collection(db, COLLECTIONS.CRM_REQUESTS), payload);
  return { id: docRef.id, ...payload };
}

export async function submitQuoteRequest(data) {
  const isOrder = data.requestType === 'order_request' || data.formChannel === 'order_form';
  return submitPublicCrmForm({
    ...data,
    formChannel: isOrder ? 'order_form' : 'quote_form',
    requestType: data.requestType || 'product_quote'
  });
}

export async function submitContactMessage(data) {
  return submitPublicCrmForm({
    companyName: data.companyName || data.name || 'İletişim Formu Ziyaretçisi',
    contactName: data.name || data.contactName || data.companyName,
    email: data.email,
    phone: data.phone || 'Belirtilmedi',
    cityCountry: data.cityCountry || 'Adana / Türkiye',
    formChannel: 'contact_form',
    requestType: 'general_contact',
    subject: data.subject || 'İletişim Formu Mesajı',
    relatedProductOrSystem: data.subject || 'Genel İletişim Mesajı',
    message: data.message || data.description || '',
    description: data.message || data.description || '',
    kvkkConsent: data.kvkkConsent ?? true,
    sourcePage: data.sourcePage || '/iletisim'
  });
}

export async function createOrUpdateCrmRequest(requestData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_crm')) {
    throw new Error('Bu işlem için CRM yetkiniz bulunmuyor.');
  }

  const nowIso = new Date().toISOString();
  if (requestData.id) {
    const ref = doc(db, COLLECTIONS.CRM_REQUESTS, requestData.id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Talep kaydı bulunamadı.');
    const prev = snap.data();

    const history = Array.isArray(prev.stageHistory) ? [...prev.stageHistory] : [];
    const newStage = requestData.stage || prev.stage;
    const newRes = requestData.resolutionStatus || prev.resolutionStatus || 'active';

    if (newStage !== prev.stage || newRes !== prev.resolutionStatus) {
      history.push({
        fromStage: prev.stage,
        toStage: newStage,
        resolutionStatus: newRes,
        changedByUid: actor.uid,
        changedByEmail: actor.email,
        timestamp: nowIso
      });
    }

    const updates = {
      companyName: String(requestData.companyName || prev.companyName || '').trim(),
      contactName: optStr(requestData.contactName ?? prev.contactName),
      phone: optStr(requestData.phone ?? prev.phone),
      email: optStr(requestData.email ?? prev.email),
      cityCountry: optStr(requestData.cityCountry ?? prev.cityCountry) || 'Adana / Türkiye',
      requestType: String(requestData.requestType || prev.requestType || 'product_quote'),
      relatedProductOrSystem: optStr(requestData.relatedProductOrSystem ?? prev.relatedProductOrSystem),
      description: optStr(requestData.description ?? prev.description),
      assignedStaff: optStr(requestData.assignedStaff ?? prev.assignedStaff),
      followUpDate: optStr(requestData.followUpDate ?? prev.followUpDate),
      stage: newStage,
      resolutionStatus: newRes,
      stageHistory: history,
      updatedAt: serverTimestamp(),
      updatedAtIso: nowIso
    };

    await updateDoc(ref, updates);
    await writeAuditLog('UPDATE_CRM_REQUEST', 'crmRequests', requestData.id, { stage: newStage, resolutionStatus: newRes }, actor);
    return { id: requestData.id, ...prev, ...updates };
  } else {
    const companyName = String(requestData.companyName || '').trim();
    if (!companyName) throw new Error('Firma adı zorunludur.');
    const stage = requestData.stage || 'Yeni Talep';
    const payload = {
      companyName,
      contactName: optStr(requestData.contactName) || companyName,
      phone: optStr(requestData.phone),
      email: optStr(requestData.email),
      cityCountry: optStr(requestData.cityCountry) || 'Adana / Türkiye',
      requestType: String(requestData.requestType || 'product_quote'),
      relatedProductOrSystem: optStr(requestData.relatedProductOrSystem),
      description: optStr(requestData.description),
      assignedStaff: optStr(requestData.assignedStaff || actor.displayName || actor.email),
      followUpDate: optStr(requestData.followUpDate),
      stage,
      resolutionStatus: requestData.resolutionStatus || 'active',
      kvkkConsent: true,
      sourcePage: 'admin_crm',
      isTestRecord: Boolean(requestData.isTestRecord),
      stageHistory: [
        {
          fromStage: null,
          toStage: stage,
          resolutionStatus: requestData.resolutionStatus || 'active',
          changedByUid: actor.uid,
          changedByEmail: actor.email,
          timestamp: nowIso
        }
      ],
      createdAt: serverTimestamp(),
      createdAtIso: nowIso,
      updatedAt: serverTimestamp(),
      updatedAtIso: nowIso
    };
    const docRef = await addDoc(collection(db, COLLECTIONS.CRM_REQUESTS), payload);
    await writeAuditLog('CREATE_CRM_REQUEST', 'crmRequests', docRef.id, { companyName: payload.companyName }, actor);
    return { id: docRef.id, ...payload };
  }
}

export async function saveCustomerRecord(customerData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_crm')) {
    throw new Error('Müşteri kaydı düzenleme yetkiniz yok.');
  }
  const nowIso = new Date().toISOString();
  const payload = {
    companyName: String(customerData.companyName || '').trim(),
    contactName: optStr(customerData.contactName),
    phone: optStr(customerData.phone),
    email: optStr(customerData.email),
    city: optStr(customerData.city) || 'Adana',
    country: optStr(customerData.country) || 'Türkiye',
    taxOffice: optStr(customerData.taxOffice),
    taxNumber: optStr(customerData.taxNumber),
    sector: optStr(customerData.sector),
    address: optStr(customerData.address),
    assignedStaff: optStr(customerData.assignedStaff),
    portalUid: optStr(customerData.portalUid),
    notes: optStr(customerData.notes),
    isTestRecord: Boolean(customerData.isTestRecord),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };
  if (!payload.companyName) throw new Error('Firma adı zorunludur.');

  if (customerData.id) {
    const ref = doc(db, COLLECTIONS.CUSTOMERS, customerData.id);
    await updateDoc(ref, payload);
    await writeAuditLog('UPDATE_CUSTOMER', 'customers', customerData.id, { companyName: payload.companyName }, actor);
    return { id: customerData.id, ...payload };
  } else {
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    const ref = await addDoc(collection(db, COLLECTIONS.CUSTOMERS), payload);
    await writeAuditLog('CREATE_CUSTOMER', 'customers', ref.id, { companyName: payload.companyName }, actor);
    return { id: ref.id, ...payload };
  }
}

/* ==========================================================================
   3. KİMYASAL ÜRÜNLER VE DOĞRULANMIŞ BİRİM DÖNÜŞÜMÜ
   ========================================================================== */

/**
 * Doğrulanmış yoğunluk (densityKgPerL) olmadan kg <-> litre dönüşümü yapılmasını engeller.
 */
export function convertMassVolumeUnit(amount, fromUnit, toUnit, verifiedDensityKgPerL) {
  const num = Number(amount);
  if (isNaN(num) || num < 0) throw new Error('Geçersiz miktar.');
  if (fromUnit === toUnit) return num;

  const isMassToVol = (fromUnit === 'kg' && toUnit === 'litre') || (fromUnit === 'litre' && toUnit === 'kg');
  if (!isMassToVol) {
    throw new Error(`'${fromUnit}' ile '${toUnit}' birimleri arasında doğrudan dönüşüm yapılamaz.`);
  }

  const density = Number(verifiedDensityKgPerL);
  if (!density || isNaN(density) || density <= 0) {
    throw new Error('Doğrulanmış yoğunluk (g/cm³ veya kg/L) bilgisi olmadan kg ile litre arasında dönüşüm yapılamaz!');
  }

  if (fromUnit === 'litre' && toUnit === 'kg') {
    return Number((num * density).toFixed(3));
  }
  return Number((num / density).toFixed(3));
}

export async function saveChemicalProduct(productData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_products')) {
    throw new Error('Ürün yönetimi için yetkiniz bulunmuyor.');
  }

  const tradeName = String(productData.tradeName || '').trim();
  const code = String(productData.code || '').trim();
  if (!tradeName || !code) {
    throw new Error('Ticari ürün adı ve ürün kodu zorunludur.');
  }

  const rawDensity = productData.verifiedDensity !== '' && productData.verifiedDensity !== null && productData.verifiedDensity !== undefined
    ? Number(productData.verifiedDensity)
    : null;
  const rawPrice = productData.unitPrice !== '' && productData.unitPrice !== null && productData.unitPrice !== undefined
    ? Number(productData.unitPrice)
    : null;
  const rawMinOrder = productData.minOrderQuantity !== '' && productData.minOrderQuantity !== null && productData.minOrderQuantity !== undefined
    ? Number(productData.minOrderQuantity)
    : null;

  const nowIso = new Date().toISOString();
  const categoryName = String(productData.categoryName || 'Soğutma Kulesi Kimyasalları').trim();
  const payload = {
    name: tradeName,
    title: tradeName,
    tradeName,
    chemicalName: optStr(productData.chemicalName), // Bilinmiyorsa null bırakılır, uydurulmaz
    code,
    category: categoryName,
    categoryId: String(productData.categoryId || 'sogutma-kulesi-kimyasallari'),
    categoryName,
    usageArea: optStr(productData.usageArea),
    description: optStr(productData.descriptionTr || productData.usageArea),
    concentrationPurity: optStr(productData.concentrationPurity),
    technicalSpecs: Array.isArray(productData.technicalSpecs)
      ? productData.technicalSpecs
      : String(productData.technicalSpecs || '').split('\n').map((s) => s.trim()).filter(Boolean),
    packagingType: String(productData.packagingType || 'Bidon').trim(),
    packagingAmount: Number(productData.packagingAmount) || 30,
    salesUnit: String(productData.salesUnit || 'kg'),
    verifiedDensity: rawDensity && rawDensity > 0 ? rawDensity : null,
    minOrderQuantity: rawMinOrder && rawMinOrder > 0 ? rawMinOrder : null,
    casNumber: optStr(productData.casNumber), // Yalnızca doğrulanmışsa girilir
    unitPrice: rawPrice && rawPrice > 0 ? rawPrice : null, // Bilinmiyorsa null -> "Teklif isteyin"
    currency: String(productData.currency || 'TRY'),
    images: Array.isArray(productData.images) ? productData.images : (productData.imageUrl ? [productData.imageUrl] : []),
    variants: Array.isArray(productData.variants) ? productData.variants : [],
    translations: {
      tr: {
        name: tradeName,
        description: String(productData.descriptionTr || productData.usageArea || '').trim()
      },
      en: {
        name: String(productData.tradeNameEn || tradeName).trim(),
        description: String(productData.descriptionEn || '').trim()
      }
    },
    published: productData.published !== undefined ? Boolean(productData.published) : true,
    isTestRecord: Boolean(productData.isTestRecord),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso,
    updatedBy: actor.email || actor.uid
  };

  if (productData.id) {
    const ref = doc(db, COLLECTIONS.PRODUCTS, productData.id);
    await updateDoc(ref, payload);
    await writeAuditLog('UPDATE_PRODUCT', 'products', productData.id, { code, tradeName, published: payload.published }, actor);
    return { id: productData.id, ...payload };
  } else {
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    const ref = await addDoc(collection(db, COLLECTIONS.PRODUCTS), payload);
    await writeAuditLog('CREATE_PRODUCT', 'products', ref.id, { code, tradeName }, actor);
    return { id: ref.id, ...payload };
  }
}

/* ==========================================================================
   4. TEKNİK BELGE MERKEZİ (SDS/GBF, TDS, COA, SERTİFİKALAR)
   ========================================================================== */

export async function uploadAndSaveTechnicalDocument(arg1, arg2, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_documents')) {
    throw new Error('Teknik belge yükleme yetkiniz bulunmuyor.');
  }

  const isFirstFile = typeof Blob !== 'undefined' && arg1 instanceof Blob;
  const file = isFirstFile ? arg1 : (typeof Blob !== 'undefined' && arg2 instanceof Blob ? arg2 : null);
  const docMeta = (isFirstFile ? arg2 : arg1) || {};

  let fileUrl = optStr(docMeta.fileUrl);
  let storagePath = optStr(docMeta.storagePath);
  let fileName = optStr(docMeta.fileName);
  let mimeType = String(docMeta.mimeType || 'application/pdf');
  let fileSize = Number(docMeta.fileSize || 0);

  if (file) {
    const validated = await validateAndPrepareUpload(file, {
      maxBytes: 10 * 1024 * 1024,
      allowedTypes: ['application/pdf', 'image/png', 'image/jpeg'],
      allowedExts: ['pdf', 'png', 'jpg', 'jpeg']
    });
    storagePath = `${STORAGE_PREFIX}/documents/${String(docMeta.docType || 'TDS').toLowerCase()}/${validated.safeStorageFileName}`;
    fileName = validated.safeOriginalName;
    mimeType = validated.mimeType;
    fileSize = validated.size;

    if (storage) {
      const sRef = storageRef(storage, storagePath);
      await uploadBytes(sRef, file, {
        contentType: validated.mimeType,
        contentDisposition: `attachment; filename="${validated.safeOriginalName}"`
      });
      fileUrl = await getDownloadURL(sRef);
    }
  }

  const nowIso = new Date().toISOString();
  const payload = {
    title: String(docMeta.title || '').trim(),
    docType: String(docMeta.docType || 'TDS'), // SDS, TDS, COA, CERTIFICATE
    productId: optStr(docMeta.productId),
    productName: String(docMeta.productName || '').trim(),
    lotBatchNumber: optStr(docMeta.lotBatchNumber),
    language: String(docMeta.language || 'TR'),
    revisionNumber: String(docMeta.revisionNumber || 'Rev.01').trim(),
    revisionDate: String(docMeta.revisionDate || nowIso.slice(0, 10)),
    published: docMeta.published !== undefined ? Boolean(docMeta.published) : true,
    accessLevel: String(docMeta.accessLevel || 'public'), // public, portal_customer, internal
    fileUrl,
    storagePath,
    fileName,
    mimeType,
    fileSize,
    isTestRecord: Boolean(docMeta.isTestRecord),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso,
    uploadedBy: actor.email || actor.uid
  };

  if (!payload.title || !payload.productName) {
    throw new Error('Belge başlığı ve ilgili ürün adı zorunludur.');
  }

  if (docMeta.id) {
    const ref = doc(db, COLLECTIONS.DOCUMENTS, docMeta.id);
    const snap = await getDoc(ref);
    const previousVersions = snap.exists() && Array.isArray(snap.data().previousVersions)
      ? [...snap.data().previousVersions]
      : [];

    if (snap.exists()) {
      const old = snap.data();
      if (old.revisionNumber !== payload.revisionNumber || (file && old.fileUrl !== payload.fileUrl)) {
        previousVersions.push({
          revisionNumber: old.revisionNumber,
          revisionDate: old.revisionDate,
          fileUrl: old.fileUrl || null,
          storagePath: old.storagePath || null,
          archivedAt: nowIso,
          archivedBy: actor.email || actor.uid
        });
      }
    }
    payload.previousVersions = previousVersions;
    await updateDoc(ref, payload);
    await writeAuditLog('UPDATE_DOCUMENT', 'documents', docMeta.id, { title: payload.title, rev: payload.revisionNumber }, actor);
    return { id: docMeta.id, ...payload };
  } else {
    payload.previousVersions = [];
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    const ref = await addDoc(collection(db, COLLECTIONS.DOCUMENTS), payload);
    await writeAuditLog('CREATE_DOCUMENT', 'documents', ref.id, { title: payload.title, docType: payload.docType }, actor);
    return { id: ref.id, ...payload };
  }
}

/* ==========================================================================
   5. SU ARITMA PROJELERİ VE MÜHENDİSLİK ONAY MEKANİZMASI
   ========================================================================== */

export async function saveWaterProject(projectData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_projects')) {
    throw new Error('Su arıtma projelerini yönetme yetkiniz bulunmuyor.');
  }

  const phVal = projectData.pH ?? projectData.ph;
  const waterAnalysis = {
    pH: phVal !== '' && phVal !== undefined && phVal !== null ? String(phVal).trim() : '',
    ph: phVal !== '' && phVal !== undefined && phVal !== null ? String(phVal).trim() : '',
    conductivityUsCm: projectData.conductivityUsCm !== '' && projectData.conductivityUsCm !== undefined && projectData.conductivityUsCm !== null ? String(projectData.conductivityUsCm).trim() : '',
    tdsPpm: projectData.tdsPpm !== '' && projectData.tdsPpm !== undefined && projectData.tdsPpm !== null ? String(projectData.tdsPpm).trim() : '',
    hardnessFr: projectData.hardnessFr !== '' && projectData.hardnessFr !== undefined && projectData.hardnessFr !== null ? String(projectData.hardnessFr).trim() : '',
    silicaPpm: projectData.silicaPpm !== '' && projectData.silicaPpm !== undefined && projectData.silicaPpm !== null ? String(projectData.silicaPpm).trim() : '',
    ironPpm: projectData.ironPpm !== '' && projectData.ironPpm !== undefined && projectData.ironPpm !== null ? String(projectData.ironPpm).trim() : '',
    chloridePpm: projectData.chloridePpm !== '' && projectData.chloridePpm !== undefined && projectData.chloridePpm !== null ? String(projectData.chloridePpm).trim() : '',
    analysisDate: String(projectData.analysisDate || '').trim()
  };

  // Mühendislik doğrulaması: Temel su analizi (pH, İletkenlik/TDS, Sertlik) olmadan analiz tamamlanmış sayılmaz
  const isAnalysisComplete = Boolean(
    waterAnalysis.ph &&
    (waterAnalysis.conductivityUsCm || waterAnalysis.tdsPpm) &&
    waterAnalysis.hardnessFr
  );
  waterAnalysis.isComplete = isAnalysisComplete;

  const recEquipText = typeof projectData.recommendedEquipment === 'string'
    ? projectData.recommendedEquipment.trim()
    : Array.isArray(projectData.recommendedEquipment)
      ? projectData.recommendedEquipment.join(', ').trim()
      : String(projectData.recommendedEquipmentText || '').trim();

  if (recEquipText && !isAnalysisComplete) {
    throw new Error('Eksik su analizi (pH, İletkenlik ve Sertlik zorunludur) ile kesin arıtma ekipmanı veya kimyasal dozaj önerisi üretilemez!');
  }

  let approvalStatus = String(projectData.approvalStatus || 'pending_analysis');
  if (!isAnalysisComplete && approvalStatus === 'approved') {
    throw new Error('Eksik su analizi verisiyle (pH, İletkenlik/TDS ve Sertlik zorunludur) kesin teknik onay ve kapasite/performans garantisi verilemez!');
  }
  if (approvalStatus === 'approved' && !hasPermission(actor?.role, 'approve_technical')) {
    throw new Error('Teknik teklif ve mühendislik onayı yalnızca yetkili Teknik Ekip veya Süperadmin tarafından verilebilir.');
  }

  const nowIso = new Date().toISOString();
  const projectName = String(projectData.projectName || '').trim();
  const customerName = String(projectData.customerName || projectData.companyName || '').trim();
  const stage = String(projectData.stage || 'Keşif');

  const payload = {
    title: projectName,
    projectName,
    projectCode: String(projectData.projectCode || `PRJ-${Date.now().toString().slice(-5)}`).trim(),
    companyName: customerName,
    customerName,
    customerUid: optStr(projectData.customerUid),
    facilityName: optStr(projectData.facilityName),
    location: String(projectData.location || 'Adana').trim(),
    rawWaterSource: String(projectData.rawWaterSource || 'Kuyu Suyu'),
    hasVerifiedWaterAnalysis: isAnalysisComplete,
    waterAnalysis,
    requestedCapacity: projectData.requestedCapacity ? Number(projectData.requestedCapacity) : null,
    capacityUnit: String(projectData.capacityUnit || 'm³/saat'),
    targetUsage: optStr(projectData.targetUsage),
    customerRequirements: optStr(projectData.customerRequirements),
    technicalApprovalStatus: isAnalysisComplete ? approvalStatus : 'pending_analysis',
    technicalEvaluation: {
      notes: String(projectData.technicalNotes || '').trim(),
      approvalStatus: isAnalysisComplete ? approvalStatus : 'pending_analysis',
      approvedBy: approvalStatus === 'approved' ? (actor.email || actor.uid) : null,
      approvedAt: approvalStatus === 'approved' ? nowIso : null
    },
    recommendedEquipment: recEquipText,
    assignedStaff: optStr(projectData.assignedStaff || projectData.assignedEngineer || actor.displayName || actor.email),
    plannedStartDate: optStr(projectData.plannedStartDate),
    plannedCommissioningDate: optStr(projectData.plannedCommissioningDate),
    stage,
    status: stage,
    isTestRecord: Boolean(projectData.isTestRecord),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };

  if (!payload.projectName || !payload.customerName) {
    throw new Error('Proje adı ve müşteri firma adı zorunludur.');
  }

  if (projectData.id) {
    const ref = doc(db, COLLECTIONS.PROJECTS, projectData.id);
    await updateDoc(ref, payload);
    await writeAuditLog('UPDATE_PROJECT', 'projects', projectData.id, { stage: payload.stage, approvalStatus: payload.technicalEvaluation.approvalStatus }, actor);
    return { id: projectData.id, ...payload };
  } else {
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    const ref = await addDoc(collection(db, COLLECTIONS.PROJECTS), payload);
    await writeAuditLog('CREATE_PROJECT', 'projects', ref.id, { projectCode: payload.projectCode }, actor);
    return { id: ref.id, ...payload };
  }
}

/* ==========================================================================
   6. MALİYETLENDİRME, TEKLİF REVİZYONU VE PORTAL PAYLAŞIMI
   ========================================================================== */

/**
 * Teklif kalemlerini, maliyetleri, KDV'yi ve brüt kâr / kâr marjını kurallara uygun hesaplar:
 * - Eksik maliyetleri ASLA sıfır (0) kabul etmez; herhangi bir kalemde maliyet eksikse
 *   totalCost, grossProfit ve profitMarginPercent değerlerini null döner (costIncomplete = true).
 * - Farklı para birimlerini kur ve tarih kaydı olmadan doğrudan toplamaz.
 */
export function calculateProposalFinancials(inputOrItems, currencyArg = 'TRY', exchangeRateArg = null, exchangeRateDateArg = '') {
  const input = Array.isArray(inputOrItems)
    ? {
        items: inputOrItems,
        currency: currencyArg,
        exchangeRate: exchangeRateArg,
        exchangeRateDate: exchangeRateDateArg,
        shippingPrice: inputOrItems.reduce((s, i) => s + Number(i.shippingCost || 0) + Number(i.installationCost || 0) + Number(i.commissioningCost || 0), 0),
        shippingCost: 0
      }
    : (inputOrItems || {});
  const proposalCurrency = String(input.currency || input.baseCurrency || 'TRY');
  const exchangeRateValue = input.exchangeRate ? Number(input.exchangeRate) : null;
  const exchangeRateDate = String(input.exchangeRateDate || '').trim();

  const rawItems = Array.isArray(input.items) ? input.items : [];
  let subtotalExclVat = 0;
  let discountTotal = 0;
  let netExclVat = 0;
  let vatTotal = 0;
  let itemCostSum = 0;
  let hasMissingCost = false;

  const computedItems = rawItems.map((item) => {
    const itemCurr = String(item.currency || proposalCurrency);
    if (itemCurr !== proposalCurrency && (!exchangeRateValue || exchangeRateValue <= 0 || !exchangeRateDate)) {
      throw new Error(`Farklı para birimi (${itemCurr} -> ${proposalCurrency}) tespit edildi! Doğrudan toplama yapılamaz; lütfen kullanılan döviz kurunu ve kur tarihini girin.`);
    }
    const rateMultiplier = itemCurr === proposalCurrency ? 1 : exchangeRateValue;

    const qty = Number(item.quantity) || 0;
    const unitPriceOrig = Number(item.unitPrice) || 0;
    const unitPrice = Number((unitPriceOrig * rateMultiplier).toFixed(4));
    const discountPct = Math.min(100, Math.max(0, Number(item.discountPercent) || 0));
    const vatRate = Number(item.vatRate ?? 20);

    const hasUnitCost = item.unitCost !== '' && item.unitCost !== null && item.unitCost !== undefined && !isNaN(Number(item.unitCost));
    const unitCost = hasUnitCost ? Number((Number(item.unitCost) * rateMultiplier).toFixed(4)) : null;

    if (!hasUnitCost) {
      hasMissingCost = true;
    } else {
      itemCostSum += qty * unitCost;
    }

    const lineGross = qty * unitPrice;
    const lineDiscount = lineGross * (discountPct / 100);
    const lineNetExclVat = lineGross - lineDiscount;
    const lineVat = lineNetExclVat * (vatRate / 100);

    subtotalExclVat += lineGross;
    discountTotal += lineDiscount;
    netExclVat += lineNetExclVat;
    vatTotal += lineVat;

    return {
      code: String(item.code || '').trim(),
      productName: String(item.productName || item.description || item.code || '').trim(),
      description: String(item.description || item.productName || '').trim(),
      itemType: String(item.itemType || 'chemical'),
      quantity: qty,
      unit: String(item.unit || 'kg'),
      currency: proposalCurrency,
      unitCost,
      costMissing: !hasUnitCost,
      unitPrice,
      discountPercent: discountPct,
      vatRate,
      lineGross: Number(lineGross.toFixed(2)),
      lineDiscount: Number(lineDiscount.toFixed(2)),
      lineNetExclVat: Number(lineNetExclVat.toFixed(2)),
      lineVat: Number(lineVat.toFixed(2)),
      lineTotalInclVat: Number((lineNetExclVat + lineVat).toFixed(2))
    };
  });

  // Ek hizmet kalemleri (Nakliye, Montaj, Devreye Alma)
  const shippingPrice = Number(input.shippingPrice || 0);
  const installationPrice = Number(input.installationPrice || 0);
  const commissioningPrice = Number(input.commissioningPrice || 0);
  const serviceVatRate = Number(input.serviceVatRate ?? 20);

  const extraServicesSales = shippingPrice + installationPrice + commissioningPrice;
  const extraServicesVat = extraServicesSales * (serviceVatRate / 100);

  subtotalExclVat += extraServicesSales;
  netExclVat += extraServicesSales;
  vatTotal += extraServicesVat;

  // Ek hizmetlerde satış varsa maliyet kontrolü
  let extraServicesCost = 0;
  const checkExtraCost = (salesVal, costVal) => {
    const hasCost = costVal !== '' && costVal !== null && costVal !== undefined && !isNaN(Number(costVal));
    if (salesVal > 0 && !hasCost) {
      hasMissingCost = true;
      return null;
    }
    if (hasCost) {
      extraServicesCost += Number(costVal);
      return Number(costVal);
    }
    return 0;
  };

  const shippingCost = checkExtraCost(shippingPrice, input.shippingCost);
  const installationCost = checkExtraCost(installationPrice, input.installationCost);
  const commissioningCost = checkExtraCost(commissioningPrice, input.commissioningCost);

  subtotalExclVat = Number(subtotalExclVat.toFixed(2));
  discountTotal = Number(discountTotal.toFixed(2));
  netExclVat = Number(netExclVat.toFixed(2));
  vatTotal = Number(vatTotal.toFixed(2));
  const grandTotal = Number((netExclVat + vatTotal).toFixed(2));

  const totalCost = hasMissingCost || computedItems.length === 0
    ? null
    : Number((itemCostSum + extraServicesCost).toFixed(2));

  // Brüt kâr = KDV hariç satış − maliyet
  const grossProfit = totalCost !== null ? Number((netExclVat - totalCost).toFixed(2)) : null;

  // Kâr marjı = brüt kâr / satış × 100
  const profitMarginPercent = grossProfit !== null && netExclVat > 0
    ? Number(((grossProfit / netExclVat) * 100).toFixed(2))
    : null;

  return {
    currency: proposalCurrency,
    baseCurrency: proposalCurrency,
    exchangeRate: exchangeRateValue,
    exchangeRateDate,
    items: computedItems,
    shippingPrice,
    shippingCost,
    installationPrice,
    installationCost,
    commissioningPrice,
    commissioningCost,
    subtotalExclVat,
    discountTotal,
    totalDiscount: discountTotal,
    netExclVat,
    vatTotal,
    totalVat: vatTotal,
    grandTotal,
    hasMissingCost,
    totalCost,
    grossProfit,
    profitMarginPercent
  };
}

export async function saveProposalOrCreateRevision(proposalData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_proposals')) {
    throw new Error('Teklif oluşturma veya düzenleme yetkiniz bulunmuyor.');
  }

  const financials = calculateProposalFinancials(proposalData);
  if (financials.items.length === 0) {
    throw new Error('Teklifte en az 1 kalem bulunmalıdır.');
  }

  const nowIso = new Date().toISOString();
  const validityDays = Number(proposalData.validityDays || 15);
  const validUntil = proposalData.validUntil || new Date(Date.now() + validityDays * 86400000).toISOString().slice(0, 10);

  let revisionNo = Number(proposalData.revisionNo || 1);
  let parentProposalId = proposalData.parentProposalId || null;
  let proposalNo = String(proposalData.proposalNo || `EK-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`).trim();
  let forceNewDoc = false;

  if (proposalData.id) {
    const existingRef = doc(db, COLLECTIONS.PROPOSALS, proposalData.id);
    const existingSnap = await getDoc(existingRef);
    if (existingSnap.exists()) {
      const existing = existingSnap.data();
      // Gönderilen teklifler değişmez (immutable) versiyon olarak saklanır; değişiklikte yeni revizyon oluşturulur!
      if (existing.isImmutable) {
        forceNewDoc = true;
        revisionNo = Number(existing.revisionNo || 1) + 1;
        parentProposalId = existing.parentProposalId || existing.id || proposalData.id;
        proposalNo = existing.proposalNo;
        await updateDoc(existingRef, {
          status: 'revised',
          updatedAt: serverTimestamp(),
          updatedAtIso: nowIso
        });
      }
    }
  }

  const status = forceNewDoc ? 'draft' : String(proposalData.status || 'draft');
  const isImmutable = ['sent', 'approved', 'rejected'].includes(status);
  const customerName = String(proposalData.customerName || proposalData.companyName || '').trim();

  const payload = {
    proposalNo,
    revisionNo,
    parentProposalId,
    status,
    isImmutable,
    companyName: customerName,
    customerName,
    customerId: optStr(proposalData.customerId),
    customerUid: optStr(proposalData.customerUid),
    contactName: optStr(proposalData.contactName),
    customerEmail: optStr(proposalData.customerEmail || proposalData.contactEmail),
    contactEmail: optStr(proposalData.contactEmail || proposalData.customerEmail),
    customerPhone: optStr(proposalData.customerPhone),
    customerAddress: optStr(proposalData.customerAddress),
    crmRequestId: optStr(proposalData.crmRequestId),
    projectId: optStr(proposalData.projectId),
    ...financials,
    validityDays,
    validUntil,
    deliveryTerms: String(proposalData.deliveryTerms || 'Adana fabrika teslim / ADR uyumlu lojistik sevk').trim(),
    paymentTerms: String(proposalData.paymentTerms || '%50 Sipariş avansı, %50 sevk öncesi nakit/havale').trim(),
    scopeAndExclusions: String(proposalData.scopeAndExclusions || 'Teklifimiz su analizi ve proses şartlarına göre hazırlanmıştır. Bu belge fatura yerine geçmez.').trim(),
    internalAdminNotes: String(proposalData.internalAdminNotes || '').trim(), // Müşteri PDF ve Portalda ASLA görünmez!
    portalShareToken: optStr(proposalData.portalShareToken),
    isTestRecord: Boolean(proposalData.isTestRecord),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso,
    updatedBy: actor.email || actor.uid
  };

  if (!payload.customerName) {
    throw new Error('Müşteri firma adı zorunludur.');
  }

  let savedId = proposalData.id;
  if (proposalData.id && !forceNewDoc) {
    const ref = doc(db, COLLECTIONS.PROPOSALS, proposalData.id);
    await updateDoc(ref, payload);
    await writeAuditLog('UPDATE_PROPOSAL', 'proposals', proposalData.id, { proposalNo, revisionNo, status }, actor);
  } else {
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    payload.createdBy = actor.email || actor.uid;
    const ref = await addDoc(collection(db, COLLECTIONS.PROPOSALS), payload);
    savedId = ref.id;
    await writeAuditLog(forceNewDoc ? 'CREATE_PROPOSAL_REVISION' : 'CREATE_PROPOSAL', 'proposals', savedId, { proposalNo, revisionNo }, actor);
  }

  return { id: savedId, ...payload, createdNewRevision: forceNewDoc };
}

/**
 * Teklifi "Gönderildi" (Değişmez) olarak işaretler ve iç maliyetlerden tamamen arındırılmış
 * güvenli Müşteri Portalı paylaşım kaydını (portalShares/{shareToken}) oluşturur.
 */
export async function sendProposalAndPublishPortalShare(proposalId, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_proposals')) {
    throw new Error('Teklif gönderme yetkiniz yok.');
  }

  const propRef = doc(db, COLLECTIONS.PROPOSALS, proposalId);
  const propSnap = await getDoc(propRef);
  if (!propSnap.exists()) throw new Error('Teklif bulunamadı.');

  const proposal = { id: propSnap.id, ...propSnap.data() };
  const shareToken = proposal.portalShareToken && proposal.portalShareToken.length >= 32
    ? proposal.portalShareToken
    : generateSecureToken(24);

  const sanitizedShare = buildSanitizedPortalShare({ proposal: { ...proposal, status: 'sent' } });
  const shareRef = doc(db, COLLECTIONS.PORTAL_SHARES, shareToken);
  await setDoc(shareRef, sanitizedShare);

  const nowIso = new Date().toISOString();
  await updateDoc(propRef, {
    status: 'sent',
    isImmutable: true,
    portalShareToken: shareToken,
    sentAtIso: nowIso,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  });

  await writeAuditLog('SEND_PROPOSAL_AND_SHARE', 'proposals', proposalId, { proposalNo: proposal.proposalNo, revisionNo: proposal.revisionNo }, actor);
  return { shareToken, proposal: { ...proposal, status: 'sent', isImmutable: true, portalShareToken: shareToken } };
}

/* ==========================================================================
   7. SİPARİŞ, STOK HAREKETLERİ (TRANSACTION) VE TEDARİKÇİ YÖNETİMİ
   ========================================================================== */

export async function createOrUpdateOrder(orderData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_orders')) {
    throw new Error('Sipariş yönetimi için yetkiniz bulunmuyor.');
  }

  const nowIso = new Date().toISOString();
  const grandTotal = Number(orderData.grandTotal || 0);
  const paidAmount = Number(orderData.paidAmount || 0);
  const paymentStatus = paidAmount >= grandTotal && grandTotal > 0
    ? 'paid'
    : paidAmount > 0
      ? 'partial'
      : 'unpaid';

  const customerName = String(orderData.customerName || '').trim();
  const fulfillmentStatus = String(orderData.fulfillmentStatus || 'Sipariş Onaylandı');

  const payload = {
    orderNo: String(orderData.orderNo || `SIP-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`).trim(),
    proposalId: optStr(orderData.proposalId),
    proposalNo: optStr(orderData.proposalNo),
    customerId: optStr(orderData.customerId),
    customerUid: optStr(orderData.customerUid),
    companyName: customerName,
    customerName,
    contactEmail: optStr(orderData.contactEmail),
    currency: String(orderData.currency || 'TRY'),
    items: Array.isArray(orderData.items) ? orderData.items.map((i) => ({
      code: String(i.code || ''),
      description: String(i.description || ''),
      quantity: Number(i.quantity) || 0,
      unit: String(i.unit || 'kg'),
      unitPrice: Number(i.unitPrice) || 0,
      lineNetExclVat: Number(i.lineNetExclVat) || 0
    })) : [],
    netExclVat: Number(orderData.netExclVat || 0),
    vatTotal: Number(orderData.vatTotal ?? orderData.totalVat ?? 0),
    grandTotal,
    paidAmount,
    paymentStatus,
    fulfillmentStatus,
    status: fulfillmentStatus,
    shippingInfo: {
      carrier: String(orderData.carrier || '').trim(),
      trackingNo: String(orderData.trackingNo || '').trim(),
      vehiclePlate: String(orderData.vehiclePlate || '').trim(),
      deliveryAddress: String(orderData.deliveryAddress || '').trim()
    },
    portalShareToken: optStr(orderData.portalShareToken),
    isTestRecord: Boolean(orderData.isTestRecord),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };

  if (!payload.customerName) throw new Error('Müşteri firma adı zorunludur.');

  let orderId = orderData.id;
  if (orderData.id) {
    const ref = doc(db, COLLECTIONS.ORDERS, orderData.id);
    await updateDoc(ref, payload);
    await writeAuditLog('UPDATE_ORDER', 'orders', orderData.id, { orderNo: payload.orderNo, fulfillmentStatus: payload.fulfillmentStatus }, actor);
  } else {
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    payload.createdBy = actor.email || actor.uid;
    const ref = await addDoc(collection(db, COLLECTIONS.ORDERS), payload);
    orderId = ref.id;
    await writeAuditLog('CREATE_ORDER', 'orders', orderId, { orderNo: payload.orderNo, grandTotal }, actor);
  }

  // Eğer tekliften dönüştürüldüyse ve portalShareToken varsa portal özetini güncelle
  if (payload.portalShareToken) {
    try {
      const shareRef = doc(db, COLLECTIONS.PORTAL_SHARES, payload.portalShareToken);
      const shareSnap = await getDoc(shareRef);
      if (shareSnap.exists()) {
        await updateDoc(shareRef, {
          status: 'approved',
          orderSummary: {
            orderNo: payload.orderNo,
            fulfillmentStatus: payload.fulfillmentStatus,
            paymentStatus: payload.paymentStatus,
            grandTotal: payload.grandTotal,
            paidAmount: payload.paidAmount,
            currency: payload.currency,
            shippingInfo: payload.shippingInfo,
            updatedAt: nowIso
          },
          updatedAt: nowIso
        });
      }
    } catch (_e) {
      // Portal senkronizasyonu opsiyoneldir
    }
  }

  return { id: orderId, ...payload };
}

/**
 * Eşzamanlı işlemlerde stok tutarlılığını koruyan ve iz bırakmadan bakiye değişimini
 * imkansız kılan Firestore Transaction tabanlı stok hareket fonksiyonu.
 */
export async function executeStockMovementTransaction(movementInput, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_inventory')) {
    throw new Error('Stok hareketi kaydetme yetkiniz bulunmuyor.');
  }

  const movementType = String(movementInput.movementType || 'INBOUND'); // INITIAL_COUNT, INBOUND, OUTBOUND, RESERVATION, RETURN, ADJUSTMENT
  const qty = Number(movementInput.quantity);
  if (isNaN(qty) || qty <= 0) {
    throw new Error('Stok hareket miktarı sıfırdan büyük olmalıdır.');
  }

  let productCode = String(movementInput.productCode || '').trim();
  let productName = String(movementInput.productName || '').trim();
  let warehouse = String(movementInput.warehouse || 'Adana Merkez Depo').trim();
  let unit = String(movementInput.unit || 'kg').trim();
  let variantCode = String(movementInput.variantCode || 'STD').trim();
  let resolvedItemDocId = movementInput.itemId ? String(movementInput.itemId).trim() : '';

  if (resolvedItemDocId && (!productCode || !productName)) {
    const existingSnap = await getDoc(doc(db, COLLECTIONS.INVENTORY_ITEMS, resolvedItemDocId));
    if (existingSnap.exists()) {
      const d = existingSnap.data();
      productCode = d.productCode || d.sku || resolvedItemDocId;
      productName = d.productName || d.name || resolvedItemDocId;
      warehouse = d.warehouse || warehouse;
      unit = d.unit || unit;
      variantCode = d.variantCode || variantCode;
    }
  }

  if (!productCode || !productName) {
    throw new Error('Ürün kodu ve ürün adı zorunludur.');
  }

  if (movementType === 'ADJUSTMENT' && !String(movementInput.reason || movementInput.referenceNo || '').trim()) {
    throw new Error('Stok düzeltme hareketlerinde doğrulanmış açıklama/referans girilmesi zorunludur.');
  }

  // Depo + Ürün Kodu + Varyant + Birim bazında benzersiz stok anahtarı (Farklı ölçü birimleri asla doğrudan toplanmaz!)
  const itemDocId = resolvedItemDocId || `${warehouse}_${productCode}_${variantCode}_${unit}`.replace(/[^a-zA-Z0-9_-]/g, '_');
  const itemRef = doc(db, COLLECTIONS.INVENTORY_ITEMS, itemDocId);
  const movementRef = doc(collection(db, COLLECTIONS.INVENTORY_MOVEMENTS));
  const nowIso = new Date().toISOString();

  const result = await runTransaction(db, async (transaction) => {
    const itemSnap = await transaction.get(itemRef);
    let currentOnHand = 0;
    let currentReserved = 0;
    let initialVerified = false;

    if (itemSnap.exists()) {
      const existing = itemSnap.data();
      if (existing.unit !== unit) {
        throw new Error(`Birim uyuşmazlığı! Mevcut stok birimi '${existing.unit}' iken '${unit}' birimiyle doğrudan işlem yapılamaz.`);
      }
      currentOnHand = Number(existing.onHandQty || 0);
      currentReserved = Number(existing.reservedQty || 0);
      initialVerified = Boolean(existing.initialCountVerified);
    } else {
      if (!['INITIAL_COUNT', 'INBOUND'].includes(movementType)) {
        throw new Error('Henüz başlangıç sayımı veya girişi yapılmamış bir üründe çıkış/rezervasyon yapılamaz.');
      }
    }

    let nextOnHand = currentOnHand;
    let nextReserved = currentReserved;

    if (movementType === 'INITIAL_COUNT') {
      nextOnHand = qty;
      initialVerified = true;
    } else if (movementType === 'INBOUND' || movementType === 'RETURN') {
      nextOnHand = Number((currentOnHand + qty).toFixed(3));
      initialVerified = true;
    } else if (movementType === 'OUTBOUND') {
      const available = currentOnHand - currentReserved;
      if (qty > available) {
        throw new Error(`Yetersiz kullanılabilir stok! Mevcut kullanılabilir: ${available} ${unit}, talep edilen çıkış: ${qty} ${unit}.`);
      }
      nextOnHand = Number((currentOnHand - qty).toFixed(3));
    } else if (movementType === 'RESERVATION') {
      const available = currentOnHand - currentReserved;
      if (qty > available) {
        throw new Error(`Rezervasyon için yeterli stok yok! Kullanılabilir: ${available} ${unit}.`);
      }
      nextReserved = Number((currentReserved + qty).toFixed(3));
    } else if (movementType === 'ADJUSTMENT') {
      const direction = movementInput.adjustmentDirection === 'decrease' ? -1 : 1;
      nextOnHand = Number((currentOnHand + direction * qty).toFixed(3));
      if (nextOnHand < 0) {
        throw new Error('Stok bakiyesi sıfırın altına düşürülemez.');
      }
    }

    const nextAvailable = Number((nextOnHand - nextReserved).toFixed(3));

    const itemPayload = {
      sku: productCode,
      name: productName,
      productCode,
      productName,
      variantCode,
      warehouse,
      unit,
      onHandQty: nextOnHand,
      currentStock: nextOnHand,
      reservedQty: nextReserved,
      reservedStock: nextReserved,
      availableQty: nextAvailable,
      criticalThreshold: Number(movementInput.criticalThreshold ?? (itemSnap.exists() ? itemSnap.data().criticalThreshold : 100)),
      lotNumber: optStr(movementInput.lotNumber || (itemSnap.exists() ? itemSnap.data().lotNumber : null)),
      expiryDate: optStr(movementInput.expiryDate || (itemSnap.exists() ? itemSnap.data().expiryDate : null)),
      initialCountVerified: initialVerified,
      stockInitialized: initialVerified,
      isTestRecord: Boolean(movementInput.isTestRecord),
      updatedAt: serverTimestamp(),
      updatedAtIso: nowIso
    };

    const movementPayload = {
      itemId: itemDocId,
      movementType,
      productCode,
      productName,
      variantCode,
      warehouse,
      unit,
      quantity: qty,
      previousOnHand: currentOnHand,
      newOnHand: nextOnHand,
      previousReserved: currentReserved,
      newReserved: nextReserved,
      lotNumber: optStr(movementInput.lotNumber),
      expiryDate: optStr(movementInput.expiryDate),
      referenceNo: optStr(movementInput.referenceNo),
      notes: optStr(movementInput.reason || movementInput.referenceNo),
      reason: optStr(movementInput.reason || movementInput.referenceNo),
      performedByUid: actor.uid,
      performedByEmail: optStr(actor.email),
      isTestRecord: Boolean(movementInput.isTestRecord),
      createdAt: serverTimestamp(),
      createdAtIso: nowIso
    };

    transaction.set(itemRef, itemPayload, { merge: true });
    transaction.set(movementRef, movementPayload);

    return { item: { id: itemDocId, ...itemPayload }, movement: { id: movementRef.id, ...movementPayload } };
  });

  await writeAuditLog('STOCK_MOVEMENT', 'inventoryMovements', result.movement.id, {
    movementType,
    productCode,
    qty,
    unit,
    newOnHand: result.item.onHandQty
  }, actor);

  return result;
}

export async function saveSupplierRecord(supplierData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_inventory')) {
    throw new Error('Tedarikçi kaydı yetkiniz bulunmuyor.');
  }
  const nowIso = new Date().toISOString();
  const companyName = String(supplierData.companyName || '').trim();
  const payload = {
    companyName,
    name: companyName,
    contactName: optStr(supplierData.contactName),
    phone: optStr(supplierData.phone),
    email: optStr(supplierData.email),
    cityCountry: optStr(supplierData.cityCountry),
    suppliedProducts: optStr(supplierData.suppliedProducts),
    notes: optStr(supplierData.notes),
    isTestRecord: Boolean(supplierData.isTestRecord),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };
  if (!payload.companyName) throw new Error('Tedarikçi firma adı zorunludur.');

  if (supplierData.id) {
    const ref = doc(db, COLLECTIONS.SUPPLIERS, supplierData.id);
    await updateDoc(ref, payload);
    return { id: supplierData.id, ...payload };
  } else {
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    const ref = await addDoc(collection(db, COLLECTIONS.SUPPLIERS), payload);
    return { id: ref.id, ...payload };
  }
}

/* ==========================================================================
   8. SERVİS VE BAKIM YÖNETİMİ
   ========================================================================== */

export async function saveServiceRecord(serviceData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_service')) {
    throw new Error('Servis ve bakım yönetimi yetkiniz bulunmuyor.');
  }

  const status = String(serviceData.status || 'Planlandı'); // Planlandı, Atandı, İşlemde, Müşteri Bekleniyor, Tamamlandı
  const plannedDate = String(serviceData.plannedDate || serviceData.lastServiceDate || serviceData.completedDate || '').trim();
  const todayStr = new Date().toISOString().slice(0, 10);
  const actionsText = String(serviceData.actionsTaken || serviceData.technicianNotes || '').trim();

  // Kural: Gerçekleşmemiş (gelecek tarihli veya yapılan işlem girilmemiş) işi 'Tamamlandı' gösterme!
  if (status === 'Tamamlandı') {
    if (plannedDate && plannedDate > todayStr) {
      throw new Error('İleri tarihli (henüz gerçekleşmemiş) bir bakım/servis kaydı "Tamamlandı" olarak işaretlenemez!');
    }
    if (!actionsText) {
      throw new Error('Servisi "Tamamlandı" olarak işaretlemek için yapılan teknik işlemlerin yazılması zorunludur.');
    }
  }

  const intervalDays = Number(serviceData.maintenanceIntervalDays || 0);
  const baseDateStr = status === 'Tamamlandı'
    ? (plannedDate || todayStr)
    : (serviceData.lastServiceDate || serviceData.lastMaintenanceDate || serviceData.installationDate || '');

  let nextPlannedDate = String(serviceData.nextPlannedDate || '').trim();
  if (intervalDays > 0 && baseDateStr) {
    const baseMs = Date.parse(baseDateStr);
    if (!isNaN(baseMs)) {
      nextPlannedDate = new Date(baseMs + intervalDays * 86400000).toISOString().slice(0, 10);
    }
  }

  const nowIso = new Date().toISOString();
  const customerName = String(serviceData.customerName || serviceData.companyName || '').trim();
  const payload = {
    serviceNo: String(serviceData.serviceNo || `SRV-${Date.now().toString().slice(-5)}`).trim(),
    companyName: customerName,
    customerName,
    customerUid: optStr(serviceData.customerUid),
    customerEmail: optStr(serviceData.customerEmail),
    facilityName: optStr(serviceData.facilityName),
    projectId: optStr(serviceData.projectId),
    systemName: String(serviceData.systemName || '').trim(),
    serialNumber: optStr(serviceData.serialNumber),
    installationDate: optStr(serviceData.installationDate),
    recordType: String(serviceData.recordType || 'Periyodik Bakım'),
    status,
    plannedDate: optStr(plannedDate),
    maintenanceIntervalDays: intervalDays > 0 ? intervalDays : null,
    nextPlannedDate: optStr(nextPlannedDate),
    nextServiceDate: optStr(nextPlannedDate),
    assignedTechnician: optStr(serviceData.assignedTechnician),
    faultDescription: optStr(serviceData.faultDescription),
    actionsTaken: optStr(actionsText),
    technicianNotes: optStr(actionsText),
    partsAndConsumablesUsed: optStr(serviceData.partsAndConsumablesUsed),
    isTestRecord: Boolean(serviceData.isTestRecord),
    completedAtIso: status === 'Tamamlandı' ? nowIso : null,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };

  if (!payload.customerName || !payload.systemName) {
    throw new Error('Müşteri firma adı ve cihaz/sistem adı zorunludur.');
  }

  if (serviceData.id) {
    const ref = doc(db, COLLECTIONS.SERVICE_RECORDS, serviceData.id);
    await updateDoc(ref, payload);
    await writeAuditLog('UPDATE_SERVICE', 'serviceRecords', serviceData.id, { serviceNo: payload.serviceNo, status }, actor);
    return { id: serviceData.id, ...payload };
  } else {
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    const ref = await addDoc(collection(db, COLLECTIONS.SERVICE_RECORDS), payload);
    await writeAuditLog('CREATE_SERVICE', 'serviceRecords', ref.id, { serviceNo: payload.serviceNo, status }, actor);
    return { id: ref.id, ...payload };
  }
}

/* ==========================================================================
   9. SİSTEM, İÇERİK, SEO VE BİLDİRİM AYARLARI
   ========================================================================== */

export async function fetchAllSiteSettings() {
  if (!db) return {};
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.SITE_SETTINGS));
    const map = {};
    snap.forEach((d) => {
      map[d.id] = d.data();
    });
    return map;
  } catch (_err) {
    return {};
  }
}

export async function saveSiteSettingsDoc(docId, settingsData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  const allowedRole = docId === 'notifications'
    ? actor?.role === ROLES.SUPERADMIN
    : hasPermission(actor?.role, 'manage_content');

  if (!allowedRole) {
    throw new Error('Bu ayar grubunu değiştirme yetkiniz bulunmuyor.');
  }

  const nowIso = new Date().toISOString();
  const payload = {
    ...settingsData,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso,
    updatedBy: actor.email || actor.uid
  };

  await setDoc(doc(db, COLLECTIONS.SITE_SETTINGS, docId), payload, { merge: true });
  await writeAuditLog('UPDATE_SITE_SETTINGS', 'siteSettings', docId, {}, actor);
  return payload;
}

export async function sendTestNotificationChannel({ channel, recipient, message, settings }, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (actor?.role !== ROLES.SUPERADMIN) {
    throw new Error('Bildirim testi yalnızca Süperadmin tarafından tetiklenebilir.');
  }

  const nowIso = new Date().toISOString();
  const channelEnabled = Boolean(settings?.[`${channel}Enabled`]);
  const verifiedRecipient = String(recipient || '').trim();

  let status = 'failed';
  let resultDetail = '';

  if (!channelEnabled) {
    status = 'blocked_disabled';
    resultDetail = `${channel.toUpperCase()} kanalı varsayılan olarak kapalıdır. Test gönderimi için önce kanalı etkinleştirip doğrulanmış alıcı tanımlayın.`;
  } else if (!verifiedRecipient) {
    status = 'failed_validation';
    resultDetail = 'Doğrulanmış alıcı adresi/numarası girilmedi.';
  } else {
    status = 'backend_webhook_required';
    resultDetail = `İstemci tarafında gizli API anahtarı tutulmamaktadır. Sunucu/Cloud Functions webhook entegrasyonu tanımlandığında '${verifiedRecipient}' alıcısına iletilecektir.`;
  }

  const logEntry = {
    channel: String(channel),
    recipient: verifiedRecipient,
    message: String(message || 'Elif Kimya Test Bildirimi'),
    status,
    resultDetail,
    triggeredBy: actor.email || actor.uid,
    createdAt: serverTimestamp(),
    createdAtIso: nowIso
  };

  const ref = await addDoc(collection(db, COLLECTIONS.NOTIFICATION_LOGS), logEntry);
  return { id: ref.id, ...logEntry };
}

/* ==========================================================================
   10. VERİ ÇEKME & MÜŞTERİ PORTALI SORGULARI
   ========================================================================== */

const newestFirst = (a, b) => {
  const tA = a.updatedAtIso || a.createdAtIso || '';
  const tB = b.updatedAtIso || b.createdAtIso || '';
  return tB.localeCompare(tA);
};

/**
 * Koleksiyonun EN YENİ kayıtlarını getirir (createdAtIso azalan). createdAtIso alanı olmayan eski kayıtlar
 * belge kimliğiyle sayfalanarak tamamlanır. Dönen dizide `totalCount` kayıt sayısını verir;
 * `totalCount > length` ise yükleme sınırı aşılmıştır.
 */
export async function fetchCollectionList(collectionName, maxDocs = 250, { byDocumentId = false } = {}) {
  if (!db) return [];
  const col = collection(db, collectionName);
  const toItem = (d) => ({ id: d.id, ...d.data() });
  const items = [];
  const seen = new Set();

  if (!byDocumentId) {
    const ordered = await getDocs(query(col, orderBy('createdAtIso', 'desc'), limit(maxDocs)));
    ordered.docs.forEach((d) => {
      seen.add(d.id);
      items.push(toItem(d));
    });
  }

  // Tek bir sayım sorgusu (ucuz); tüm kayıtların sıralı sorguya girip girmediğini ve sınırın aşılıp aşılmadığını gösterir.
  let total = items.length;
  try {
    total = (await getCountFromServer(col)).data().count;
  } catch {
    // Sayım alınamazsa sıralı sonuçla devam edilir.
  }

  // createdAtIso alanı olmayan eski kayıtlar belge kimliğiyle sayfalanarak tamamlanır.
  if (byDocumentId || (items.length < maxDocs && total > items.length)) {
    const PAGE = 200;
    let cursor = null;
    while (items.length < maxDocs) {
      const constraints = [orderBy(documentId()), limit(PAGE)];
      if (cursor) constraints.push(startAfter(cursor));
      const snap = await getDocs(query(col, ...constraints));
      snap.docs.forEach((d) => {
        if (!seen.has(d.id) && items.length < maxDocs) {
          seen.add(d.id);
          items.push(toItem(d));
        }
      });
      if (snap.size < PAGE) break;
      cursor = snap.docs[snap.docs.length - 1];
    }
  }

  items.sort(newestFirst);
  Object.defineProperty(items, 'totalCount', { value: Math.max(total, items.length), enumerable: false });
  return items;
}

export async function fetchPublicPublishedProducts() {
  if (!db) return [];
  try {
    const q = query(collection(db, COLLECTIONS.PRODUCTS), where('published', '==', true), limit(200));
    const snap = await getDocs(q);
    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    return list;
  } catch (_err) {
    return [];
  }
}

export async function fetchPublicPublishedDocuments() {
  if (!db) return [];
  try {
    const q = query(
      collection(db, COLLECTIONS.DOCUMENTS),
      where('published', '==', true),
      where('accessLevel', '==', 'public'),
      limit(200)
    );
    const snap = await getDocs(q);
    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    return list;
  } catch (_err) {
    return [];
  }
}

export async function fetchPortalShareBySecureToken(shareToken) {
  if (!db) throw new Error('Sunucu bağlantısı yok.');
  const cleanToken = String(shareToken || '').trim();
  // Kural: Tahmin edilebilir kısa kayıt numarası tek başına erişim sağlamasın! En az 32 karakterlik kriptografik token zorunlu.
  if (cleanToken.length < 32) {
    throw new Error('Güvenlik uyarısı: Tahmin edilebilir teklif/kayıt numaraları ile tek başına erişim sağlanamaz. Lütfen size iletilen en az 32 karakterli güvenli paylaşım anahtarını kullanın veya müşteri hesabınızla giriş yapın.');
  }

  const ref = doc(db, COLLECTIONS.PORTAL_SHARES, cleanToken);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    throw new Error('Bu paylaşım bağlantısına ait aktif bir kayıt bulunamadı veya süresi doldu.');
  }
  const data = snap.data();
  if (!data.active) {
    throw new Error('Bu paylaşım bağlantısı pasif duruma getirilmiştir.');
  }
  if (data.expiresAt && new Date(data.expiresAt).getTime() < Date.now()) {
    throw new Error('Bu güvenli paylaşım bağlantısının geçerlilik süresi dolmuştur.');
  }
  return { id: snap.id, ...data };
}

export async function fetchAuthenticatedCustomerPortalData(user) {
  if (!db || !user?.email) return { shares: [], orders: [], services: [] };
  const email = user.email;

  const [sharesSnap, ordersSnap, servicesSnap] = await Promise.all([
    getDocs(query(collection(db, COLLECTIONS.PORTAL_SHARES), where('customerEmail', '==', email))),
    getDocs(query(collection(db, COLLECTIONS.ORDERS), where('contactEmail', '==', email))),
    getDocs(query(collection(db, COLLECTIONS.SERVICE_RECORDS), where('customerEmail', '==', email)))
  ]);

  const shares = [];
  sharesSnap.forEach((d) => shares.push({ id: d.id, ...d.data() }));

  const orders = [];
  ordersSnap.forEach((d) => orders.push({ id: d.id, ...d.data() }));

  const services = [];
  servicesSnap.forEach((d) => services.push({ id: d.id, ...d.data() }));

  return { shares, orders, services };
}

export async function deleteDocumentById(collectionName, docId, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (actor?.role !== ROLES.SUPERADMIN) {
    throw new Error('Kayıt silme işlemi yalnızca Süperadmin yetkisiyle yapılabilir.');
  }
  await deleteDoc(doc(db, COLLECTIONS.AUDIT_LOGS === collectionName ? '_blocked_' : collectionName, docId));
}

/* ==========================================================================
   11. UI ADAPTER EXPORTS & DURUM SABİTLERİ
   ========================================================================== */

export const CRM_RESOLUTION_STATUSES = CRM_RESOLUTIONS;

export const PROPOSAL_STATUSES = [
  { id: 'draft', label: 'Taslak' },
  { id: 'sent', label: 'Gönderildi (Kilitli)' },
  { id: 'revised', label: 'Revize Edildi' },
  { id: 'approved', label: 'Müşteri Onayladı' },
  { id: 'rejected', label: 'Reddedildi' },
  { id: 'expired', label: 'Süresi Doldu' }
];

export const ORDER_STATUSES = [
  'Sipariş Alındı',
  'Hazırlanıyor',
  'Sevk Edildi',
  'Teslim Edildi',
  'Faturalandı',
  'Tamamlandı',
  'İptal'
];

export const PAYMENT_STATUSES = [
  'Bekliyor',
  'Kısmi Tahsilat',
  'Tahsil Edildi'
];

export const STOCK_MOVEMENT_TYPES = [
  { id: 'INITIAL_COUNT', label: 'Başlangıç Fiziksel Stok Sayımı (INITIAL_COUNT)' },
  { id: 'INBOUND', label: 'Üretim / Tedarikçi Girişi (INBOUND)' },
  { id: 'OUTBOUND', label: 'Sipariş Sevkiyat Çıkışı (OUTBOUND)' },
  { id: 'RESERVATION', label: 'Sipariş Stok Rezervasyonu (RESERVATION)' },
  { id: 'RETURN', label: 'Müşteri İade Girişi (RETURN)' },
  { id: 'ADJUSTMENT', label: 'Sayım Farkı / Düzeltme (ADJUSTMENT)' }
];

export const PROJECT_STAGES = [
  'Keşif',
  'Su Analizi & Değerlendirme',
  'Projelendirme',
  'Teklif Hazırlık',
  'Onay Bekliyor',
  'Uygulama & Montaj',
  'Devreye Alma',
  'Bakım / Tamamlandı'
];

export async function fetchPublicProducts() {
  const list = await fetchPublicPublishedProducts();
  return list.map((p) => ({
    ...p,
    productCode: p.productCode || p.code || '',
    applicationArea: p.applicationArea || p.usageArea || p.description || '',
    minOrderQty: p.minOrderQty ?? p.minOrderQuantity ?? null
  }));
}

export async function fetchPublicDocuments() {
  const list = await fetchPublicPublishedDocuments();
  return list.map((d) => ({
    ...d,
    revisionNo: d.revisionNo || d.revisionNumber || 1,
    batchNumber: d.batchNumber || d.lotBatchNumber || ''
  }));
}

export async function saveProduct(productData, actor) {
  return saveChemicalProduct({
    ...productData,
    code: productData.productCode || productData.code,
    categoryName: productData.category || productData.categoryName || 'Su Şartlandırma Kimyasalları',
    usageArea: productData.applicationArea || productData.usageArea,
    minOrderQuantity: productData.minOrderQty ?? productData.minOrderQuantity
  }, actor);
}

export async function deleteProductRecord(productId, actor) {
  return deleteDocumentById(COLLECTIONS.PRODUCTS, productId, actor);
}

export async function approveWaterProjectTechnical(projectId, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'approve_technical')) {
    throw new Error('Teknik onay yalnızca Teknik Ekip veya Süperadmin tarafından verilebilir.');
  }
  const ref = doc(db, COLLECTIONS.PROJECTS, projectId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Proje bulunamadı.');
  const data = snap.data();
  const wa = data.waterAnalysis || {};
  const isComplete = Boolean((wa.pH || wa.ph) && (wa.conductivityUsCm || wa.tdsPpm) && wa.hardnessFr);
  if (!isComplete) {
    throw new Error('Eksik su analizi (pH, İletkenlik ve Sertlik zorunludur) bulunan projeye teknik onay verilemez!');
  }
  const nowIso = new Date().toISOString();
  await updateDoc(ref, {
    technicalApprovalStatus: 'approved',
    approvedByEmail: actor.email || actor.uid,
    'technicalEvaluation.approvalStatus': 'approved',
    'technicalEvaluation.approvedBy': actor.email || actor.uid,
    'technicalEvaluation.approvedAt': nowIso,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  });
  await writeAuditLog('APPROVE_PROJECT_TECHNICAL', 'projects', projectId, {}, actor);
}

export async function updateProposalCustomerStatus(proposalId, newStatus, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_proposals')) {
    throw new Error('Teklif durumu güncelleme yetkiniz bulunmuyor.');
  }
  const nowIso = new Date().toISOString();
  const ref = doc(db, COLLECTIONS.PROPOSALS, proposalId);
  await updateDoc(ref, {
    status: String(newStatus),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  });
  await writeAuditLog('UPDATE_PROPOSAL_STATUS', 'proposals', proposalId, { status: newStatus }, actor);
}

export async function saveOrderRecord(orderData, actor) {
  return createOrUpdateOrder({
    ...orderData,
    customerName: orderData.companyName || orderData.customerName,
    fulfillmentStatus: orderData.status || orderData.fulfillmentStatus || 'Sipariş Alındı',
    paidAmount: orderData.collectedAmount ?? orderData.paidAmount ?? 0
  }, actor);
}

export async function saveInventoryItemCard(cardData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_inventory')) {
    throw new Error('Stok kartı tanımlama yetkiniz bulunmuyor.');
  }
  const sku = String(cardData.sku || '').trim();
  const name = String(cardData.name || '').trim();
  const unit = String(cardData.unit || 'kg').trim();
  const warehouse = String(cardData.warehouse || 'Adana Merkez Depo').trim();
  if (!sku || !name) throw new Error('Stok kodu (SKU) ve stok kalemi adı zorunludur.');

  const itemDocId = `${warehouse}_${sku}_STD_${unit}`.replace(/[^a-zA-Z0-9_-]/g, '_');
  const nowIso = new Date().toISOString();
  const payload = {
    sku,
    name,
    productCode: sku,
    productName: name,
    variantCode: 'STD',
    warehouse,
    unit,
    onHandQty: 0,
    reservedQty: 0,
    availableQty: 0,
    minThreshold: Number(cardData.minThreshold || 500),
    criticalThreshold: Number(cardData.minThreshold || 500),
    initialCountVerified: false,
    stockInitialized: false,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };
  await setDoc(doc(db, COLLECTIONS.INVENTORY_ITEMS, itemDocId), payload, { merge: true });
  await writeAuditLog('CREATE_INVENTORY_CARD', 'inventoryItems', itemDocId, { sku, name }, actor);
  return { id: itemDocId, ...payload };
}

export async function sendTestNotificationLog(channel, recipient, actor) {
  const settings = await fetchAllSiteSettings();
  return sendTestNotificationChannel({
    channel: String(channel || 'email').toLowerCase(),
    recipient,
    message: 'Elif Kimya Yönetim Paneli Test Bildirimi',
    settings: settings.notifications || {}
  }, actor);
}

export function normalizeAccountingInvoice(inv) {
  const subtotal = Number(inv.subtotal ?? inv.subtotalExclVat ?? 0);
  const discountTotal = Number(inv.discountTotal ?? 0);
  const netExclVat = Number(inv.netExclVat ?? inv.netMatrah ?? Math.max(subtotal - discountTotal, 0));
  const vatRate = Number(inv.vatRate ?? 20);
  const vatAmount = Number(inv.vatAmount ?? ((netExclVat * vatRate) / 100));
  let withholdingRate = inv.withholdingRate || 'Yok';
  let withholdingNumer = Number(inv.withholdingNumerator ?? 0);
  if ((!inv.withholdingRate || inv.withholdingRate === 'Yok') && withholdingNumer > 0) {
    withholdingRate = `${withholdingNumer}/10`;
  } else if (typeof withholdingRate === 'string' && withholdingRate.includes('/')) {
    const parsed = Number(withholdingRate.split('/')[0]);
    if (Number.isFinite(parsed) && parsed > 0) withholdingNumer = parsed;
  }
  const withholdingAmount = Number(inv.withholdingAmount ?? (withholdingNumer > 0 ? (vatAmount * withholdingNumer) / 10 : 0));
  const payableVat = Number(inv.payableVat ?? Math.max(vatAmount - withholdingAmount, 0));
  const grandTotal = Number(inv.grandTotal ?? (netExclVat + payableVat));
  const currency = String(inv.currency || 'TRY').toUpperCase();
  const exchangeRate = currency === 'TRY' ? 1 : Math.max(Number(inv.exchangeRate || 1), 0.0001);
  const grandTotalTry = Number(inv.grandTotalTry ?? (grandTotal * exchangeRate));
  const paidAmountTry = Number(inv.paidAmountTry ?? (Number(inv.paidAmount || 0) * exchangeRate));
  const remainingAmountTry = Number(inv.remainingAmountTry ?? Math.max(grandTotalTry - paidAmountTry, 0));

  return {
    ...inv,
    companyName: inv.companyName || inv.partyName || 'İsimsiz Cari',
    partyName: inv.partyName || inv.companyName || 'İsimsiz Cari',
    docCategory: inv.docCategory || inv.eDocumentType || 'E-FATURA',
    eDocumentType: inv.eDocumentType || inv.docCategory || 'E-FATURA',
    orderId: inv.orderId || inv.linkedOrderId || '',
    linkedOrderId: inv.linkedOrderId || inv.orderId || '',
    orderNo: inv.orderNo || inv.linkedOrderNo || '',
    contactEmail: inv.contactEmail || '',
    subtotal,
    subtotalExclVat: subtotal,
    discountTotal,
    netExclVat,
    netMatrah: netExclVat,
    vatRate,
    vatAmount,
    withholdingRate,
    withholdingNumerator: withholdingNumer,
    withholdingAmount,
    payableVat,
    grandTotal,
    currency,
    exchangeRate,
    grandTotalTry,
    paidAmountTry,
    remainingAmountTry,
    paymentStatus: inv.paymentStatus || (remainingAmountTry <= 0 && grandTotalTry > 0 ? 'Ödendi' : paidAmountTry > 0 ? 'Kısmi Ödeme' : 'Ödeme Bekliyor')
  };
}

export function normalizeAccountingTransaction(trx) {
  const direction = String(trx.direction || trx.trxType || 'TAHSILAT').toUpperCase();
  const currency = String(trx.currency || 'TRY').toUpperCase();
  const exchangeRate = currency === 'TRY' ? 1 : Math.max(Number(trx.exchangeRate || 1), 0.0001);
  const amount = Number(trx.amount || 0);
  const amountTry = Number(trx.amountTry ?? (amount * exchangeRate));
  return {
    ...trx,
    direction,
    trxType: direction,
    companyName: trx.companyName || trx.partyName || 'Genel Cari',
    partyName: trx.partyName || trx.companyName || 'Genel Cari',
    invoiceId: trx.invoiceId || trx.linkedInvoiceId || '',
    linkedInvoiceId: trx.linkedInvoiceId || trx.invoiceId || '',
    invoiceNo: trx.invoiceNo || trx.linkedInvoiceNo || '',
    linkedInvoiceNo: trx.linkedInvoiceNo || trx.invoiceNo || '',
    notes: trx.notes || trx.description || '',
    description: trx.description || trx.notes || '',
    currency,
    exchangeRate,
    amount,
    amountTry
  };
}

export function normalizeChequeOrNote(chq) {
  const currency = String(chq.currency || 'TRY').toUpperCase();
  const exchangeRate = currency === 'TRY' ? 1 : Math.max(Number(chq.exchangeRate || 1), 0.0001);
  const amount = Number(chq.amount || 0);
  const amountTry = Number(chq.amountTry ?? (amount * exchangeRate));
  const portfolioNo = chq.portfolioNo || chq.instrumentNo || `PRT-${(chq.id || '').slice(0, 6).toUpperCase()}`;
  const maturityDate = chq.maturityDate || chq.dueDate || '';
  return {
    ...chq,
    portfolioNo,
    instrumentNo: portfolioNo,
    serialNumber: chq.serialNumber || chq.instrumentNo || portfolioNo,
    companyName: chq.companyName || chq.drawerName || 'İsimsiz Keşideci',
    drawerName: chq.drawerName || chq.companyName || 'İsimsiz Keşideci',
    maturityDate,
    dueDate: maturityDate,
    currency,
    exchangeRate,
    amount,
    amountTry
  };
}

export async function saveAccountingInvoice(invoiceData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_accounting')) {
    throw new Error('Fatura oluşturma ve düzenleme yetkiniz bulunmuyor.');
  }

  const partyName = String(invoiceData.partyName || invoiceData.companyName || '').trim();
  if (!partyName || partyName.length < 2) {
    throw new Error('Cari ünvanı (Müşteri veya Tedarikçi) zorunludur.');
  }

  const nowIso = new Date().toISOString();
  const invoiceType = String(invoiceData.invoiceType || 'SATIS').toUpperCase();
  const eDocumentType = String(invoiceData.docCategory || invoiceData.eDocumentType || 'E-FATURA').toUpperCase();

  const totals = computeInvoiceTotals(invoiceData);
  const {
    currency, exchangeRate, lines, subtotal: subtotalExclVat, discountTotal, netExclVat: netMatrah,
    vatRate, vatMixed, vatAmount: rawVat, withholdingRate, withholdingNumerator: withholdingNumer,
    withholdingAmount, payableVat, grandTotal, grandTotalTry
  } = totals;

  const rawPaidTry = invoiceData.paidAmountTry !== undefined && invoiceData.paidAmountTry !== null
    ? Number(invoiceData.paidAmountTry)
    : Number(invoiceData.paidAmount || 0) * exchangeRate;
  const paidAmountTry = Math.max(Number(rawPaidTry.toFixed(2)), 0);
  const remainingAmountTry = Math.max(Number((grandTotalTry - paidAmountTry).toFixed(2)), 0);

  const paymentStatus = derivePaymentStatus({
    grandTotalTry,
    paidAmountTry,
    dueDate: invoiceData.dueDate,
    fallback: invoiceData.paymentStatus || 'Ödeme Bekliyor'
  });

  const issueDate = String(invoiceData.issueDate || nowIso.slice(0, 10)).slice(0, 10);
  const providedInvoiceNo = String(invoiceData.invoiceNo || '').trim();

  // Mevzuat kontrolleri: KDV oranları, istisna/tevkifat kodları, GİB fatura numarası biçimi
  const compliance = validateInvoiceCompliance(
    { ...invoiceData, invoiceType, docCategory: eDocumentType, issueDate, invoiceNo: providedInvoiceNo },
    totals
  );
  if (compliance.errors.length > 0) throw new Error(compliance.errors.join(' '));

  let invoiceNo = providedInvoiceNo;
  if (!invoiceNo) {
    // Kesilen faturalarda seri/yıl bazında ardışık GİB biçimli numara üretilir (ELF2026000000001)
    const series = invoiceSeriesFor(eDocumentType);
    const prefix = `${series}${issueDate.slice(0, 4)}`;
    const lastSnap = await getDocs(query(
      collection(db, COLLECTIONS.ACCOUNTING_INVOICES),
      where('invoiceNo', '>=', `${prefix}000000000`),
      where('invoiceNo', '<=', `${prefix}999999999`),
      orderBy('invoiceNo', 'desc'),
      limit(1)
    ));
    invoiceNo = nextInvoiceNumber({ series, year: issueDate.slice(0, 4), lastNumber: lastSnap.docs[0]?.data().invoiceNo });
  }

  // Aynı fatura numarası ikinci kez kaydedilmesin (Alış faturalarında numara tedarikçiye göre benzersizdir)
  if (!invoiceData.id) {
    const sameNo = await getDocs(query(collection(db, COLLECTIONS.ACCOUNTING_INVOICES), where('invoiceNo', '==', invoiceNo.slice(0, 95)), limit(10)));
    const duplicate = sameNo.docs.some((d) => {
      const existing = d.data();
      return existing.invoiceType === invoiceType &&
        (invoiceType !== 'ALIS' || String(existing.partyName || '').toLowerCase() === partyName.toLowerCase());
    });
    if (duplicate) throw new Error(`${invoiceNo} numaralı fatura zaten kayıtlı. Aynı numara tekrar kullanılamaz.`);
  }

  const linkedOrderId = optStr(invoiceData.orderId || invoiceData.linkedOrderId, 120) || '';
  const linkedOrderNo = optStr(invoiceData.orderNo || invoiceData.linkedOrderNo, 120) || '';

  const payload = {
    invoiceNo: invoiceNo.slice(0, 95),
    invoiceType,
    eDocumentType,
    docCategory: eDocumentType,
    partyType: invoiceType === 'ALIS' ? 'SUPPLIER' : 'CUSTOMER',
    partyName: partyName.slice(0, 240),
    companyName: partyName.slice(0, 240),
    contactEmail: optStr(invoiceData.contactEmail, 160) || '',
    taxOffice: optStr(invoiceData.taxOffice, 140) || '',
    taxNumber: optStr(invoiceData.taxNumber, 45) || '',
    issueDate: String(invoiceData.issueDate || nowIso.slice(0, 10)),
    dueDate: String(invoiceData.dueDate || nowIso.slice(0, 10)),
    currency,
    exchangeRate,
    lines,
    vatMixed,
    subtotal: subtotalExclVat,
    subtotalExclVat,
    discountTotal,
    netExclVat: netMatrah,
    netMatrah,
    vatRate,
    vatAmount: rawVat,
    withholdingRate,
    withholdingNumerator: withholdingNumer,
    withholdingCode: withholdingNumer > 0 ? String(invoiceData.withholdingCode || '').trim() : '',
    vatExemptionCode: String(invoiceData.vatExemptionCode || '').trim().slice(0, 3),
    taxRulesReviewedAt: TAX_RULES_REVIEWED_AT,
    withholdingAmount,
    payableVat,
    grandTotal,
    grandTotalTry,
    paidAmount: Number((paidAmountTry / exchangeRate).toFixed(2)),
    paidAmountTry,
    remainingAmountTry,
    paymentStatus,
    orderId: linkedOrderId,
    linkedOrderId,
    orderNo: linkedOrderNo,
    description: optStr(invoiceData.description, 1500) || '',
    notes: optStr(invoiceData.notes, 4000) || '',
    updatedByEmail: actor?.email || actor?.uid || '',
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };

  let docId = invoiceData.id;
  if (docId) {
    await updateDoc(doc(db, COLLECTIONS.ACCOUNTING_INVOICES, docId), payload);
    await writeAuditLog('UPDATE_ACCOUNTING_INVOICE', COLLECTIONS.ACCOUNTING_INVOICES, docId, { invoiceNo, grandTotalTry }, actor);
  } else {
    payload.createdAt = serverTimestamp();
    payload.createdAtIso = nowIso;
    const ref = await addDoc(collection(db, COLLECTIONS.ACCOUNTING_INVOICES), payload);
    docId = ref.id;
    await writeAuditLog('CREATE_ACCOUNTING_INVOICE', COLLECTIONS.ACCOUNTING_INVOICES, docId, { invoiceNo, grandTotalTry }, actor);
  }

  // Eğer onaylı bir siparişten faturalandıysa siparişi "Faturalandı" olarak işaretle (proforma vergi belgesi değildir)
  if (linkedOrderId && eDocumentType !== 'PROFORMA') {
    try {
      await updateDoc(doc(db, COLLECTIONS.ORDERS, linkedOrderId), {
        status: 'Faturalandı',
        fulfillmentStatus: 'Faturalandı',
        linkedInvoiceNo: payload.invoiceNo,
        updatedAt: serverTimestamp(),
        updatedAtIso: nowIso
      });
    } catch (_err) {
      // Sipariş güncelleme hatası ana faturayı engellemesin
    }
  }

  return { ...normalizeAccountingInvoice({ id: docId, ...payload }), complianceWarnings: compliance.warnings };
}

export async function saveAccountingTransaction(trxData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_accounting')) {
    throw new Error('Kasa/Banka hareketi işleme yetkiniz bulunmuyor.');
  }

  const amount = Number(trxData.amount || 0);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('İşlem tutarı 0’dan büyük olmalıdır.');
  }

  const nowIso = new Date().toISOString();
  const trxType = String(trxData.direction || trxData.trxType || 'TAHSILAT').toUpperCase();
  const currency = String(trxData.currency || 'TRY').toUpperCase();
  const exchangeRate = currency === 'TRY' ? 1 : Math.max(Number(trxData.exchangeRate || 1), 0.0001);
  const amountTry = Number((amount * exchangeRate).toFixed(2));
  const trxNo = String(trxData.trxNo || `FIN-${Date.now().toString().slice(-6)}`).trim();
  const partyName = String(trxData.companyName || trxData.partyName || 'Genel Cari').trim().slice(0, 240);
  const linkedInvoiceId = optStr(trxData.invoiceId || trxData.linkedInvoiceId, 120) || '';
  const linkedInvoiceNo = optStr(trxData.invoiceNo || trxData.linkedInvoiceNo, 100) || '';
  const notesText = optStr(trxData.notes || trxData.description, 2000) || '';

  const payload = {
    trxNo: trxNo.slice(0, 90),
    trxType,
    direction: trxType,
    category: String(trxData.category || 'Müşteri Tahsilatı').slice(0, 140),
    paymentMethod: String(trxData.paymentMethod || 'Banka Havale / EFT').slice(0, 95),
    accountName: String(trxData.accountName || 'Merkez TL Kasa').slice(0, 140),
    partyName,
    companyName: partyName,
    invoiceId: linkedInvoiceId,
    linkedInvoiceId,
    invoiceNo: linkedInvoiceNo,
    linkedInvoiceNo,
    currency,
    exchangeRate,
    amount,
    amountTry,
    transactionDate: String(trxData.transactionDate || nowIso.slice(0, 10)),
    referenceNo: optStr(trxData.referenceNo, 100) || '',
    description: notesText,
    notes: notesText,
    createdByEmail: actor?.email || actor?.uid || '',
    createdAt: serverTimestamp(),
    createdAtIso: nowIso,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };

  const ref = await addDoc(collection(db, COLLECTIONS.ACCOUNTING_TRANSACTIONS), payload);
  await writeAuditLog('CREATE_ACCOUNTING_TRX', COLLECTIONS.ACCOUNTING_TRANSACTIONS, ref.id, { trxNo, trxType, amountTry }, actor);

  // Eğer bir faturaya bağlı tahsilat/tediye ise ilgili faturanın ödenen tutarını güncelle
  if (linkedInvoiceId) {
    try {
      const invRef = doc(db, COLLECTIONS.ACCOUNTING_INVOICES, linkedInvoiceId);
      const invSnap = await getDoc(invRef);
      if (invSnap.exists()) {
        const inv = invSnap.data();
        const newPaid = Number((Number(inv.paidAmountTry || 0) + amountTry).toFixed(2));
        const totalTry = Number(inv.grandTotalTry || inv.grandTotal || 0);
        const newRem = Math.max(Number((totalTry - newPaid).toFixed(2)), 0);
        const newStatus = newPaid >= totalTry && totalTry > 0 ? 'Ödendi' : 'Kısmi Ödeme';
        await updateDoc(invRef, {
          paidAmountTry: newPaid,
          remainingAmountTry: newRem,
          paymentStatus: newStatus,
          updatedAt: serverTimestamp(),
          updatedAtIso: nowIso
        });
      }
    } catch (_err) {
      // Fatura bakiyesi güncellemesi ana hareketi kırmasın
    }
  }

  return normalizeAccountingTransaction({ id: ref.id, ...payload });
}

export async function saveChequeOrNote(instrumentData, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_accounting')) {
    throw new Error('Çek ve senet kaydetme yetkiniz bulunmuyor.');
  }

  const drawerName = String(instrumentData.companyName || instrumentData.drawerName || '').trim();
  const amount = Number(instrumentData.amount || 0);
  if (!drawerName || drawerName.length < 2) {
    throw new Error('Keşideci / Cari ünvanı zorunludur.');
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Çek/Senet tutarı 0’dan büyük olmalıdır.');
  }

  const nowIso = new Date().toISOString();
  const currency = String(instrumentData.currency || 'TRY').toUpperCase();
  const exchangeRate = currency === 'TRY' ? 1 : Math.max(Number(instrumentData.exchangeRate || 1), 0.0001);
  const amountTry = Number((amount * exchangeRate).toFixed(2));
  const portfolioNo = String(instrumentData.portfolioNo || instrumentData.instrumentNo || `PRT-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`).trim();
  const serialNumber = String(instrumentData.serialNumber || portfolioNo).trim();
  const maturityDate = String(instrumentData.maturityDate || instrumentData.dueDate || nowIso.slice(0, 10));

  const payload = {
    portfolioNo: portfolioNo.slice(0, 90),
    instrumentNo: portfolioNo.slice(0, 90),
    serialNumber: serialNumber.slice(0, 90),
    instrumentType: String(instrumentData.instrumentType || 'MUSTERI_CEKI').slice(0, 55),
    companyName: drawerName.slice(0, 240),
    drawerName: drawerName.slice(0, 240),
    bankName: String(instrumentData.bankName || '').slice(0, 140),
    branchName: String(instrumentData.branchName || '').slice(0, 120),
    maturityDate,
    dueDate: maturityDate,
    currency,
    exchangeRate,
    amount,
    amountTry,
    status: String(instrumentData.status || 'Portföyde').slice(0, 55),
    endorsedTo: String(instrumentData.endorsedTo || '').slice(0, 200),
    notes: optStr(instrumentData.notes, 2000) || '',
    createdByEmail: actor?.email || actor?.uid || '',
    createdAt: serverTimestamp(),
    createdAtIso: nowIso,
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  };

  const ref = await addDoc(collection(db, COLLECTIONS.CHEQUES_AND_NOTES), payload);
  await writeAuditLog('CREATE_CHEQUE_NOTE', COLLECTIONS.CHEQUES_AND_NOTES, ref.id, { instrumentNo: portfolioNo, amountTry }, actor);
  return normalizeChequeOrNote({ id: ref.id, ...payload });
}

export async function updateChequeOrNoteStatus(instrumentId, newStatus, endorsedTo, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_accounting')) {
    throw new Error('Çek/Senet durumu güncelleme yetkiniz bulunmuyor.');
  }
  const nowIso = new Date().toISOString();
  const ref = doc(db, COLLECTIONS.CHEQUES_AND_NOTES, instrumentId);
  await updateDoc(ref, {
    status: String(newStatus || 'Portföyde').slice(0, 55),
    endorsedTo: String(endorsedTo || '').slice(0, 200),
    updatedAt: serverTimestamp(),
    updatedAtIso: nowIso
  });
  await writeAuditLog('UPDATE_CHEQUE_STATUS', COLLECTIONS.CHEQUES_AND_NOTES, instrumentId, { status: newStatus }, actor);
}

function normalizeInboundCrmRecord(item, fallbackChannel = null) {
  const reqType = item.requestType || (fallbackChannel === 'contact_form' ? 'general_contact' : 'product_quote');
  let formChannel = item.formChannel || fallbackChannel || '';
  if (!formChannel) {
    if (reqType === 'general_contact' || item.sourcePage?.includes('/iletisim')) formChannel = 'contact_form';
    else if (reqType === 'order_request') formChannel = 'order_form';
    else if (reqType === 'callback_30min') formChannel = 'callback_form';
    else formChannel = 'quote_form';
  }
  return {
    ...item,
    companyName: item.companyName || item.company || item.name || 'İsimsiz Başvuru',
    contactName: item.contactName || item.contactPerson || item.name || item.companyName || '-',
    phone: item.phone || '-',
    email: item.email || '-',
    cityCountry: item.cityCountry || item.city || 'Adana / Türkiye',
    formChannel,
    requestType: reqType,
    subject: item.subject || item.relatedProductOrSystem || item.productDetail || 'Kurumsal Talep',
    relatedProductOrSystem: item.relatedProductOrSystem || item.subject || item.productDetail || item.category || 'Genel Talep',
    packaging: item.packaging || item.requestedAmount || '',
    requestedAmount: item.requestedAmount || item.packaging || '',
    description: item.description || item.message || item.waterReportNotes || item.notes || '',
    message: item.message || item.description || item.waterReportNotes || item.notes || '',
    stage: item.stage || 'Yeni Talep',
    resolutionStatus: item.resolutionStatus || 'active',
    createdAtIso: item.createdAtIso || (item.createdAt?.toDate ? item.createdAt.toDate().toISOString() : '')
  };
}

export function subscribeToAdminInbox(onUpdate) {
  if (!db || typeof onUpdate !== 'function') return () => {};
  let initialized = false;
  let knownIds = new Set();

  const q = query(collection(db, COLLECTIONS.CRM_REQUESTS), limit(250));
  const unsubscribe = onSnapshot(
    q,
    (snap) => {
      const items = [];
      let newCount = 0;
      let latestNewItem = null;

      snap.forEach((d) => {
        const normalized = normalizeInboundCrmRecord({ id: d.id, ...d.data() });
        items.push(normalized);
        if (initialized && !knownIds.has(d.id)) {
          newCount += 1;
          latestNewItem = normalized;
        }
        knownIds.add(d.id);
      });

      items.sort((a, b) => {
        const tA = a.updatedAtIso || a.createdAtIso || '';
        const tB = b.updatedAtIso || b.createdAtIso || '';
        return tB.localeCompare(tA);
      });

      const wasInit = initialized;
      initialized = true;
      onUpdate(items, { isInitial: !wasInit, newCount, latestNewItem });
    },
    (_err) => {
      // Bağlantı veya yetki kesintisinde sessizce geç
    }
  );

  return unsubscribe;
}

export async function convertCrmRequestToOrder(crmReq, grandTotalTry, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_orders')) {
    throw new Error('Sipariş oluşturma yetkiniz bulunmuyor.');
  }
  const orderNo = `SIP-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
  const orderPayload = {
    orderNo,
    companyName: crmReq.companyName || crmReq.contactName || 'Müşteri',
    customerName: crmReq.companyName || crmReq.contactName || 'Müşteri',
    contactEmail: crmReq.email && crmReq.email !== '-' ? crmReq.email : '',
    status: 'Sipariş Alındı',
    fulfillmentStatus: 'Sipariş Alındı',
    grandTotal: Math.max(Number(grandTotalTry || 0), 0),
    collectedAmount: 0,
    paidAmount: 0,
    paymentStatus: 'Bekliyor',
    deliveryDate: crmReq.followUpDate || new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    notes: `[Web Sipariş/Teklif Formundan Aktarıldı - Ref: ${crmReq.id}] Ürün/Sistem: ${crmReq.relatedProductOrSystem || ''} | Miktar/Ambalaj: ${crmReq.requestedAmount || '-'} | Not: ${crmReq.description || ''}`.slice(0, 4000)
  };

  const createdOrder = await saveOrderRecord(orderPayload, actor);
  if (crmReq.id && !String(crmReq.id).startsWith('legacy_')) {
    try {
      await createOrUpdateCrmRequest({
        id: crmReq.id,
        stage: 'Onaylandı',
        resolutionStatus: 'active'
      }, actor);
    } catch (_e) {
      // Aşama güncellemesi başarısız olsa da sipariş oluştu
    }
  }
  return createdOrder;
}

const ADMIN_STORE_KEYS = [
  'crmRequests', 'customers', 'products', 'documents', 'projects', 'proposals', 'orders',
  'inventoryItems', 'inventoryMovements', 'suppliers', 'serviceRecords', 'accountingInvoices',
  'accountingTransactions', 'chequesAndNotes', 'accountingSyncStates', 'users', 'auditLogs', 'settings'
];

// Firestore kurallarındaki okuma yetkileriyle aynı: yetkisiz koleksiyon için istek hiç atılmaz.
function canLoadAdminKey(key, role) {
  if (!role) return true;
  switch (key) {
    case 'accountingInvoices':
    case 'accountingTransactions':
    case 'chequesAndNotes':
    case 'accountingSyncStates':
      return hasPermission(role, 'view_accounting');
    case 'auditLogs':
      return role === ROLES.SUPERADMIN || role === ROLES.VIEWER;
    case 'suppliers':
      return [ROLES.SUPERADMIN, ROLES.WAREHOUSE, ROLES.SALES, ROLES.VIEWER].includes(role);
    case 'proposals':
      return hasPermission(role, 'view_costs');
    default:
      return hasPermission(role, 'view_admin');
  }
}

/**
 * @param {{ role?: string, only?: string[] }} [options]
 *   role: yalnızca okunabilir koleksiyonları çeker. only: kısmi yenileme (yalnızca bu anahtarlar döner).
 */
export async function loadAdminAllData(options = {}) {
  const role = options?.role;
  const only = Array.isArray(options?.only) ? new Set(options.only) : null;
  const wants = (key) => (!only || only.has(key)) && canLoadAdminKey(key, role);

  if (!db) {
    return {
      crmRequests: [],
      customers: [],
      products: [],
      documents: [],
      projects: [],
      proposals: [],
      orders: [],
      inventoryItems: [],
      inventoryMovements: [],
      suppliers: [],
      serviceRecords: [],
      accountingInvoices: [],
      accountingTransactions: [],
      chequesAndNotes: [],
      accountingSyncStates: [],
      users: [],
      auditLogs: [],
      settings: {}
    };
  }

  const skipped = Promise.resolve([]);
  const loadLimits = {};
  // Gün içinde hızla büyüyen kayıt dizileri 250 ile sınırlı kalır; iş kayıtları için sınır daha yüksektir.
  const LIGHT_KEYS = new Set(['auditLogs', 'inventoryMovements']);
  const safeFetch = (col, key) => {
    if (!wants(key)) return skipped;
    const options = key === 'accountingSyncStates' ? { byDocumentId: true } : {};
    return fetchCollectionList(col, LIGHT_KEYS.has(key) ? 250 : 1000, options)
      .then((list) => {
        // Sınır aşıldıysa liste eksiktir; panel bunu kullanıcıya bildirir.
        if (list.totalCount > list.length) loadLimits[key] = { loaded: list.length, total: list.totalCount };
        return list;
      })
      .catch(() => []);
  };

  const [
    rawCrmRequests,
    legacyContacts,
    legacyQuotes,
    customers,
    rawProducts,
    rawDocuments,
    rawProjects,
    rawProposals,
    rawOrders,
    rawInventoryItems,
    inventoryMovements,
    suppliers,
    rawServices,
    rawAccountingInvoices,
    rawAccountingTransactions,
    rawChequesAndNotes,
    rawSyncStates,
    users,
    auditLogs,
    settings
  ] = await Promise.all([
    safeFetch(COLLECTIONS.CRM_REQUESTS, 'crmRequests'),
    safeFetch('contactMessages', 'crmRequests'),
    safeFetch('quoteRequests', 'crmRequests'),
    safeFetch(COLLECTIONS.CUSTOMERS, 'customers'),
    safeFetch(COLLECTIONS.PRODUCTS, 'products'),
    safeFetch(COLLECTIONS.DOCUMENTS, 'documents'),
    safeFetch(COLLECTIONS.PROJECTS, 'projects'),
    safeFetch(COLLECTIONS.PROPOSALS, 'proposals'),
    safeFetch(COLLECTIONS.ORDERS, 'orders'),
    safeFetch(COLLECTIONS.INVENTORY_ITEMS, 'inventoryItems'),
    safeFetch(COLLECTIONS.INVENTORY_MOVEMENTS, 'inventoryMovements'),
    safeFetch(COLLECTIONS.SUPPLIERS, 'suppliers'),
    safeFetch(COLLECTIONS.SERVICE_RECORDS, 'serviceRecords'),
    safeFetch(COLLECTIONS.ACCOUNTING_INVOICES, 'accountingInvoices'),
    safeFetch(COLLECTIONS.ACCOUNTING_TRANSACTIONS, 'accountingTransactions'),
    safeFetch(COLLECTIONS.CHEQUES_AND_NOTES, 'chequesAndNotes'),
    safeFetch(COLLECTIONS.ACCOUNTING_SYNC_STATE, 'accountingSyncStates'),
    safeFetch(COLLECTIONS.USERS, 'users'),
    safeFetch(COLLECTIONS.AUDIT_LOGS, 'auditLogs'),
    wants('settings') ? fetchAllSiteSettings() : Promise.resolve({})
  ]);

  const mergedCrmMap = new Map();
  rawCrmRequests.forEach((r) => {
    mergedCrmMap.set(r.id, normalizeInboundCrmRecord(r));
  });
  legacyContacts.forEach((c) => {
    const key = `legacy_contact_${c.id}`;
    if (!mergedCrmMap.has(c.id)) {
      mergedCrmMap.set(key, normalizeInboundCrmRecord({ ...c, id: key }, 'contact_form'));
    }
  });
  legacyQuotes.forEach((q) => {
    const key = `legacy_quote_${q.id}`;
    if (!mergedCrmMap.has(q.id)) {
      mergedCrmMap.set(key, normalizeInboundCrmRecord({ ...q, id: key }, 'quote_form'));
    }
  });

  const crmRequests = Array.from(mergedCrmMap.values()).sort((a, b) => {
    const tA = a.updatedAtIso || a.createdAtIso || '';
    const tB = b.updatedAtIso || b.createdAtIso || '';
    return tB.localeCompare(tA);
  });

  const products = rawProducts.map((p) => ({
    ...p,
    productCode: p.productCode || p.code || '',
    applicationArea: p.applicationArea || p.usageArea || p.description || '',
    minOrderQty: p.minOrderQty ?? p.minOrderQuantity ?? null
  }));

  const documents = rawDocuments.map((d) => ({
    ...d,
    revisionNo: d.revisionNo || d.revisionNumber || 1,
    batchNumber: d.batchNumber || d.lotBatchNumber || ''
  }));

  const projects = rawProjects.map((prj) => ({
    ...prj,
    companyName: prj.companyName || prj.customerName || '',
    hasVerifiedWaterAnalysis: Boolean(prj.hasVerifiedWaterAnalysis ?? prj.waterAnalysis?.isComplete),
    technicalApprovalStatus: prj.technicalApprovalStatus || prj.technicalEvaluation?.approvalStatus || 'pending_analysis',
    approvedByEmail: prj.approvedByEmail || prj.technicalEvaluation?.approvedBy || '',
    recommendedEquipment: Array.isArray(prj.recommendedEquipment)
      ? prj.recommendedEquipment.join(', ')
      : (prj.recommendedEquipment || '')
  }));

  const proposals = rawProposals.map((pr) => ({
    ...pr,
    companyName: pr.companyName || pr.customerName || '',
    baseCurrency: pr.baseCurrency || pr.currency || 'TRY',
    totalVat: pr.totalVat ?? pr.vatTotal ?? 0,
    totalDiscount: pr.totalDiscount ?? pr.discountTotal ?? 0
  }));

  const orders = rawOrders.map((o) => ({
    ...o,
    companyName: o.companyName || o.customerName || '',
    status: o.status || o.fulfillmentStatus || 'Sipariş Alındı',
    collectedAmount: o.collectedAmount ?? o.paidAmount ?? 0
  }));

  const inventoryItems = rawInventoryItems.map((it) => ({
    ...it,
    sku: it.sku || it.productCode || '',
    name: it.name || it.productName || '',
    currentStock: it.currentStock ?? it.onHandQty ?? 0,
    reservedStock: it.reservedStock ?? it.reservedQty ?? 0,
    minThreshold: it.minThreshold ?? it.criticalThreshold ?? 100,
    stockInitialized: Boolean(it.stockInitialized ?? it.initialCountVerified)
  }));

  const serviceRecords = rawServices.map((s) => ({
    ...s,
    companyName: s.companyName || s.customerName || '',
    nextServiceDate: s.nextServiceDate || s.nextPlannedDate || '',
    technicianNotes: s.technicianNotes || s.actionsTaken || s.faultDescription || ''
  }));

  const accountingInvoices = rawAccountingInvoices.map(normalizeAccountingInvoice);
  const accountingTransactions = rawAccountingTransactions.map(normalizeAccountingTransaction);
  const chequesAndNotes = rawChequesAndNotes.map(normalizeChequeOrNote);
  const accountingSyncStates = rawSyncStates.filter((s) => !String(s.id).startsWith('_'));

  const result = {
    crmRequests,
    customers,
    products,
    documents,
    projects,
    proposals,
    orders,
    inventoryItems,
    inventoryMovements,
    suppliers,
    serviceRecords,
    accountingInvoices,
    accountingTransactions,
    chequesAndNotes,
    accountingSyncStates,
    users,
    auditLogs,
    settings
  };
  if (!only) return { ...result, loadLimits };
  return {
    ...Object.fromEntries(ADMIN_STORE_KEYS.filter((key) => only.has(key)).map((key) => [key, result[key]])),
    loadLimits
  };
}

