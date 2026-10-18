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
  AUDIT_LOGS: 'auditLogs'
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

const BOOTSTRAP_ADMINS = new Set(['cebrailkara@gmail.com', 'cebokar@gmail.com']);

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
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  const profile = await ensureUserProfile(cred.user);
  return { user: cred.user, profile };
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
  const phone = String(data.phone || '').trim();

  if (companyName.length < 2) throw new Error('Lütfen geçerli bir firma veya ad soyad girin.');
  if (!email.includes('@') || email.length < 5) throw new Error('Lütfen geçerli bir e-posta adresi girin.');
  if (phone.length < 6) throw new Error('Lütfen geçerli bir telefon numarası girin.');

  const nowIso = new Date().toISOString();
  const payload = {
    companyName,
    contactName: contactName || companyName,
    phone,
    email,
    cityCountry: String(data.cityCountry || 'Adana / Türkiye').trim(),
    requestType: String(data.requestType || 'product_quote'),
    relatedProductOrSystem: String(data.relatedProductOrSystem || '').trim(),
    description: String(data.description || data.message || '').trim(),
    assignedStaff: String(data.assignedStaff || '').trim(),
    followUpDate: String(data.followUpDate || '').trim(),
    stage: 'Yeni Talep',
    resolutionStatus: 'active',
    kvkkConsent: Boolean(data.kvkkConsent),
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
  return submitPublicCrmForm({
    ...data,
    requestType: data.requestType || 'product_quote'
  });
}

export async function submitContactMessage(data) {
  return submitPublicCrmForm({
    companyName: data.companyName || data.name,
    contactName: data.name,
    email: data.email,
    phone: data.phone || 'Belirtilmedi',
    cityCountry: data.cityCountry || 'Türkiye',
    requestType: 'general_contact',
    relatedProductOrSystem: data.subject || 'Genel İletişim',
    description: data.message,
    kvkkConsent: data.kvkkConsent ?? true,
    sourcePage: '/iletisim'
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
      companyName: String(requestData.companyName || prev.companyName).trim(),
      contactName: String(requestData.contactName || prev.contactName).trim(),
      phone: String(requestData.phone || prev.phone).trim(),
      email: String(requestData.email || prev.email).trim(),
      cityCountry: String(requestData.cityCountry ?? prev.cityCountry).trim(),
      requestType: String(requestData.requestType || prev.requestType),
      relatedProductOrSystem: String(requestData.relatedProductOrSystem ?? prev.relatedProductOrSystem).trim(),
      description: String(requestData.description ?? prev.description).trim(),
      assignedStaff: String(requestData.assignedStaff ?? prev.assignedStaff).trim(),
      followUpDate: String(requestData.followUpDate ?? prev.followUpDate).trim(),
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
    const stage = requestData.stage || 'Yeni Talep';
    const payload = {
      companyName: String(requestData.companyName || '').trim(),
      contactName: String(requestData.contactName || '').trim(),
      phone: String(requestData.phone || '').trim(),
      email: String(requestData.email || '').trim(),
      cityCountry: String(requestData.cityCountry || 'Adana').trim(),
      requestType: String(requestData.requestType || 'product_quote'),
      relatedProductOrSystem: String(requestData.relatedProductOrSystem || '').trim(),
      description: String(requestData.description || '').trim(),
      assignedStaff: String(requestData.assignedStaff || actor.displayName || actor.email || '').trim(),
      followUpDate: String(requestData.followUpDate || '').trim(),
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

export async function uploadAndSaveTechnicalDocument(file, docMeta, actor) {
  if (!db) throw new Error('Veritabanı bağlantısı yok.');
  if (!hasPermission(actor?.role, 'manage_documents')) {
    throw new Error('Teknik belge yükleme yetkiniz bulunmuyor.');
  }

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

  const waterAnalysis = {
    ph: projectData.ph !== '' && projectData.ph !== undefined ? String(projectData.ph).trim() : '',
    conductivityUsCm: projectData.conductivityUsCm !== '' && projectData.conductivityUsCm !== undefined ? String(projectData.conductivityUsCm).trim() : '',
    tdsPpm: projectData.tdsPpm !== '' && projectData.tdsPpm !== undefined ? String(projectData.tdsPpm).trim() : '',
    hardnessFr: projectData.hardnessFr !== '' && projectData.hardnessFr !== undefined ? String(projectData.hardnessFr).trim() : '',
    silicaPpm: projectData.silicaPpm !== '' && projectData.silicaPpm !== undefined ? String(projectData.silicaPpm).trim() : '',
    ironPpm: projectData.ironPpm !== '' && projectData.ironPpm !== undefined ? String(projectData.ironPpm).trim() : '',
    chloridePpm: projectData.chloridePpm !== '' && projectData.chloridePpm !== undefined ? String(projectData.chloridePpm).trim() : '',
    analysisDate: String(projectData.analysisDate || '').trim()
  };

  // Mühendislik doğrulaması: Temel su analizi (pH, İletkenlik/TDS, Sertlik) olmadan analiz tamamlanmış sayılmaz
  const isAnalysisComplete = Boolean(
    waterAnalysis.ph &&
    (waterAnalysis.conductivityUsCm || waterAnalysis.tdsPpm) &&
    waterAnalysis.hardnessFr
  );
  waterAnalysis.isComplete = isAnalysisComplete;

  let approvalStatus = String(projectData.approvalStatus || 'pending_analysis');
  if (!isAnalysisComplete && approvalStatus === 'approved') {
    throw new Error('Eksik su analizi verisiyle (pH, İletkenlik/TDS ve Sertlik zorunludur) kesin teknik onay ve kapasite/performans garantisi verilemez!');
  }
  if (approvalStatus === 'approved' && !hasPermission(actor?.role, 'approve_technical')) {
    throw new Error('Teknik teklif ve mühendislik onayı yalnızca yetkili Teknik Ekip veya Süperadmin tarafından verilebilir.');
  }

  const nowIso = new Date().toISOString();
  const projectName = String(projectData.projectName || '').trim();
  const stage = String(projectData.stage || 'Keşif');

  const payload = {
    title: projectName,
    projectName,
    projectCode: String(projectData.projectCode || `PRJ-${Date.now().toString().slice(-5)}`).trim(),
    customerName: String(projectData.customerName || '').trim(),
    customerUid: optStr(projectData.customerUid),
    facilityName: optStr(projectData.facilityName),
    location: String(projectData.location || 'Adana').trim(),
    rawWaterSource: String(projectData.rawWaterSource || 'Kuyu Suyu'),
    waterAnalysis,
    requestedCapacity: projectData.requestedCapacity ? Number(projectData.requestedCapacity) : null,
    capacityUnit: String(projectData.capacityUnit || 'm³/saat'),
    targetUsage: optStr(projectData.targetUsage),
    customerRequirements: optStr(projectData.customerRequirements),
    technicalEvaluation: {
      notes: String(projectData.technicalNotes || '').trim(),
      approvalStatus: isAnalysisComplete ? approvalStatus : 'pending_analysis',
      approvedBy: approvalStatus === 'approved' ? (actor.email || actor.uid) : null,
      approvedAt: approvalStatus === 'approved' ? nowIso : null
    },
    recommendedEquipment: Array.isArray(projectData.recommendedEquipment)
      ? projectData.recommendedEquipment
      : String(projectData.recommendedEquipmentText || '').split('\n').map((s) => s.trim()).filter(Boolean),
    assignedStaff: optStr(projectData.assignedStaff || actor.displayName || actor.email),
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
export function calculateProposalFinancials(input) {
  const proposalCurrency = String(input.currency || 'TRY');
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
      description: String(item.description || '').trim(),
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
    netExclVat,
    vatTotal,
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
  const customerName = String(proposalData.customerName || '').trim();

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
    customerEmail: optStr(proposalData.customerEmail),
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
    vatTotal: Number(orderData.vatTotal || 0),
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

  const productCode = String(movementInput.productCode || '').trim();
  const productName = String(movementInput.productName || '').trim();
  const warehouse = String(movementInput.warehouse || 'Adana Merkez Depo').trim();
  const unit = String(movementInput.unit || 'kg').trim();
  const variantCode = String(movementInput.variantCode || 'STD').trim();

  if (!productCode || !productName) {
    throw new Error('Ürün kodu ve ürün adı zorunludur.');
  }

  if (movementType === 'ADJUSTMENT' && !String(movementInput.reason || '').trim()) {
    throw new Error('Stok düzeltme hareketlerinde doğrulanmış açıklama/sebep girilmesi zorunludur.');
  }

  // Depo + Ürün Kodu + Varyant + Birim bazında benzersiz stok anahtarı (Farklı ölçü birimleri asla doğrudan toplanmaz!)
  const itemDocId = `${warehouse}_${productCode}_${variantCode}_${unit}`.replace(/[^a-zA-Z0-9_-]/g, '_');
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
      reservedQty: nextReserved,
      availableQty: nextAvailable,
      criticalThreshold: Number(movementInput.criticalThreshold ?? (itemSnap.exists() ? itemSnap.data().criticalThreshold : 100)),
      lotNumber: optStr(movementInput.lotNumber || (itemSnap.exists() ? itemSnap.data().lotNumber : null)),
      expiryDate: optStr(movementInput.expiryDate || (itemSnap.exists() ? itemSnap.data().expiryDate : null)),
      initialCountVerified: initialVerified,
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
      notes: optStr(movementInput.reason),
      reason: optStr(movementInput.reason),
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
  const plannedDate = String(serviceData.plannedDate || '').trim();
  const todayStr = new Date().toISOString().slice(0, 10);

  // Kural: Gerçekleşmemiş (gelecek tarihli veya yapılan işlem girilmemiş) işi 'Tamamlandı' gösterme!
  if (status === 'Tamamlandı') {
    if (plannedDate && plannedDate > todayStr) {
      throw new Error('İleri tarihli (henüz gerçekleşmemiş) bir bakım/servis kaydı "Tamamlandı" olarak işaretlenemez!');
    }
    if (!String(serviceData.actionsTaken || '').trim()) {
      throw new Error('Servisi "Tamamlandı" olarak işaretlemek için yapılan teknik işlemlerin yazılması zorunludur.');
    }
  }

  const intervalDays = Number(serviceData.maintenanceIntervalDays || 0);
  const baseDateStr = status === 'Tamamlandı'
    ? todayStr
    : (serviceData.lastMaintenanceDate || serviceData.installationDate || '');

  let nextPlannedDate = String(serviceData.nextPlannedDate || '').trim();
  if (intervalDays > 0 && baseDateStr) {
    const baseMs = Date.parse(baseDateStr);
    if (!isNaN(baseMs)) {
      nextPlannedDate = new Date(baseMs + intervalDays * 86400000).toISOString().slice(0, 10);
    }
  }

  const nowIso = new Date().toISOString();
  const customerName = String(serviceData.customerName || '').trim();
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
    assignedTechnician: optStr(serviceData.assignedTechnician),
    faultDescription: optStr(serviceData.faultDescription),
    actionsTaken: optStr(serviceData.actionsTaken),
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

export async function fetchCollectionList(collectionName, maxDocs = 250) {
  if (!db) return [];
  const q = query(collection(db, collectionName), limit(maxDocs));
  const snap = await getDocs(q);
  const items = [];
  snap.forEach((d) => {
    items.push({ id: d.id, ...d.data() });
  });
  return items.sort((a, b) => {
    const tA = a.updatedAtIso || a.createdAtIso || '';
    const tB = b.updatedAtIso || b.createdAtIso || '';
    return tB.localeCompare(tA);
  });
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
