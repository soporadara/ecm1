import { getApps, initializeApp } from "firebase/app";
import { getRedirectResult, GoogleAuthProvider, signOut, signInWithPopup, signInWithRedirect, getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, linkWithCredential, EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail, setPersistence, browserLocalPersistence, browserSessionPersistence, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBTlcTFgUExvxG_IT1-BKMSQQacSIk-XKg",
  authDomain: "eco1-57396.firebaseapp.com",
  projectId: "eco1-57396",
  storageBucket: "eco1-57396.firebasestorage.app",
  messagingSenderId: "783590196250",
  appId: "1:783590196250:web:04dcee76cb1ecaa4453da3"
};
const firebaseIsConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId
);
const app = firebaseIsConfigured ? getApps()[0] ?? initializeApp(firebaseConfig) : null;
const firebaseAuth = app ? getAuth(app) : null;
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
async function signInWithGooglePopupOrRedirect() {
  if (!firebaseAuth) {
    throw Object.assign(new Error("Firebase is not configured."), { code: "auth/not-configured" });
  }
  try {
    return await signInWithPopup(firebaseAuth, googleProvider);
  } catch (error) {
    if (["auth/popup-blocked", "auth/operation-not-supported-in-this-environment"].includes(error == null ? void 0 : error.code)) {
      await signInWithRedirect(firebaseAuth, googleProvider);
      return null;
    }
    throw error;
  }
}
async function getGoogleRedirectResult() {
  if (!firebaseAuth) return null;
  return getRedirectResult(firebaseAuth);
}
async function signInWithFirebasePassword(email, password, remember = false) {
  if (!firebaseAuth) {
    throw Object.assign(new Error("Firebase is not configured."), { code: "auth/not-configured" });
  }
  await setPersistence(firebaseAuth, remember ? browserLocalPersistence : browserSessionPersistence);
  return signInWithEmailAndPassword(firebaseAuth, email, password);
}
async function createFirebasePasswordAccount(name, email, password) {
  if (!firebaseAuth) {
    throw Object.assign(new Error("Firebase is not configured."), { code: "auth/not-configured" });
  }
  const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  if (name.trim()) {
    await updateProfile(credential.user, { displayName: name.trim() });
  }
  await sendEmailVerification(credential.user);
  return credential;
}
async function sendFirebasePasswordReset(email) {
  if (!firebaseAuth) {
    throw Object.assign(new Error("Firebase is not configured."), { code: "auth/not-configured" });
  }
  return sendPasswordResetEmail(firebaseAuth, email);
}
async function reauthenticateWithFirebasePassword(password) {
  const user = firebaseAuth == null ? void 0 : firebaseAuth.currentUser;
  if (!(user == null ? void 0 : user.email)) {
    throw Object.assign(new Error("A recent customer session is required."), { code: "auth/requires-recent-login" });
  }
  return reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
}
async function linkFirebasePasswordCredential(email, password) {
  const user = firebaseAuth == null ? void 0 : firebaseAuth.currentUser;
  if (!user) {
    throw Object.assign(new Error("A customer session is required."), { code: "auth/requires-recent-login" });
  }
  return linkWithCredential(user, EmailAuthProvider.credential(email, password));
}
async function updateFirebasePassword(password) {
  const user = firebaseAuth == null ? void 0 : firebaseAuth.currentUser;
  if (!user) {
    throw Object.assign(new Error("A customer session is required."), { code: "auth/requires-recent-login" });
  }
  return updatePassword(user, password);
}
async function signOutFirebase() {
  if (!firebaseAuth) return;
  await signOut(firebaseAuth);
}
export {
  createFirebasePasswordAccount,
  firebaseAuth,
  firebaseIsConfigured,
  getGoogleRedirectResult,
  googleProvider,
  linkFirebasePasswordCredential,
  reauthenticateWithFirebasePassword,
  sendFirebasePasswordReset,
  signInWithFirebasePassword,
  signInWithGooglePopupOrRedirect,
  signOutFirebase,
  updateFirebasePassword
};
