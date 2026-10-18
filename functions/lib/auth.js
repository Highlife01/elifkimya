import { HttpsError } from 'firebase-functions/v2/https';

// firestore.rules ve src/firebase.js içindeki yönetici listesiyle aynı tutulmalıdır.
const BOOTSTRAP_ADMIN_EMAILS = new Set(['cebrailkara@gmail.com', 'cebokar@gmail.com', 'info@elifcevrekimya.com.tr']);

const PERMISSION_ROLES = {
  manage: new Set(['superadmin', 'sales']),
  view: new Set(['superadmin', 'sales', 'viewer'])
};

export async function requireAccountingRole(request, db, level) {
  const auth = request.auth;
  if (!auth) throw new HttpsError('unauthenticated', 'Bu işlem için oturum açmalısınız.');
  const allowed = PERMISSION_ROLES[level];

  const token = auth.token || {};
  // E-posta ile yönetici tanıma yalnızca doğrulanmış e-postada geçerlidir (hesap ele geçirme riskine karşı).
  const bootstrap = token.admin === true || (token.email_verified === true && BOOTSTRAP_ADMIN_EMAILS.has(String(token.email || '').toLowerCase()));
  if (bootstrap) return { uid: auth.uid, email: token.email || '', role: 'superadmin' };

  const profile = await db.collection('users').doc(auth.uid).get();
  const role = profile.exists ? profile.data().role : null;
  if (!allowed.has(role)) throw new HttpsError('permission-denied', 'Muhasebe entegrasyonu için yetkiniz bulunmuyor.');
  return { uid: auth.uid, email: token.email || '', role };
}
