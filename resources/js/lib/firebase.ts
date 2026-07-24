import { initializeApp, getApps } from 'firebase/app';
import {
    browserLocalPersistence,
    browserSessionPersistence,
    connectAuthEmulator,
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    getAuth,
    GoogleAuthProvider,
    getRedirectResult,
    linkWithCredential,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    setPersistence,
    signOut,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    updatePassword,
    updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseIsConfigured = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

const app = firebaseIsConfigured
    ? (getApps()[0] ?? initializeApp(firebaseConfig))
    : null;

export const firebaseAuth = app ? getAuth(app) : null;

if (firebaseAuth && import.meta.env.DEV && import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST) {
    const marker = '__firebaseAuthEmulatorConnected';
    if (!(window as any)[marker]) {
        connectAuthEmulator(firebaseAuth, `http://${import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST}`, {
            disableWarnings: true,
        });
        (window as any)[marker] = true;
    }
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithGooglePopupOrRedirect() {
    if (!firebaseAuth) {
        throw Object.assign(new Error('Firebase is not configured.'), { code: 'auth/not-configured' });
    }

    try {
        return await signInWithPopup(firebaseAuth, googleProvider);
    } catch (error: any) {
        if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment'].includes(error?.code)) {
            await signInWithRedirect(firebaseAuth, googleProvider);
            return null;
        }

        throw error;
    }
}

export async function getGoogleRedirectResult() {
    if (!firebaseAuth) return null;

    return getRedirectResult(firebaseAuth);
}

export async function signInWithFirebasePassword(email: string, password: string, remember = false) {
    if (!firebaseAuth) {
        throw Object.assign(new Error('Firebase is not configured.'), { code: 'auth/not-configured' });
    }

    await setPersistence(firebaseAuth, remember ? browserLocalPersistence : browserSessionPersistence);

    return signInWithEmailAndPassword(firebaseAuth, email, password);
}

export async function createFirebasePasswordAccount(name: string, email: string, password: string) {
    if (!firebaseAuth) {
        throw Object.assign(new Error('Firebase is not configured.'), { code: 'auth/not-configured' });
    }

    const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

    if (name.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() });
    }

    await sendEmailVerification(credential.user);

    return credential;
}

export async function sendFirebasePasswordReset(email: string) {
    if (!firebaseAuth) {
        throw Object.assign(new Error('Firebase is not configured.'), { code: 'auth/not-configured' });
    }

    return sendPasswordResetEmail(firebaseAuth, email);
}

export async function reauthenticateWithFirebasePassword(password: string) {
    const user = firebaseAuth?.currentUser;
    if (!user?.email) {
        throw Object.assign(new Error('A recent customer session is required.'), { code: 'auth/requires-recent-login' });
    }

    return reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
}

export async function linkFirebasePasswordCredential(email: string, password: string) {
    const user = firebaseAuth?.currentUser;
    if (!user) {
        throw Object.assign(new Error('A customer session is required.'), { code: 'auth/requires-recent-login' });
    }

    return linkWithCredential(user, EmailAuthProvider.credential(email, password));
}

export async function updateFirebasePassword(password: string) {
    const user = firebaseAuth?.currentUser;
    if (!user) {
        throw Object.assign(new Error('A customer session is required.'), { code: 'auth/requires-recent-login' });
    }

    return updatePassword(user, password);
}

export async function signOutFirebase() {
    if (!firebaseAuth) return;

    await signOut(firebaseAuth);
}
