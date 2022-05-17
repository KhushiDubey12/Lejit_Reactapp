import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    AuthError,
    UserCredential,
    sendPasswordResetEmail,
    updatePassword
} from '@firebase/auth';
import { auth } from './firebaseConfig';

export const register = async (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password).then((res) => {
        return res;
    });
};

export const login = async (loginEmail: string, loginPassword: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((res) => {
        return res;
    });
};

export const resetPassword = async (
    registeredEmail: string
): Promise<void | AuthError | string> => {
    return sendPasswordResetEmail(auth, registeredEmail).then((res) => {
        return res;
    });
};

export const signout = async (): Promise<void> => {
    await signOut(auth);
};

export const changePassword = async (newPassword: string): Promise<boolean | string | null> => {
    const currentuser = auth.currentUser;
    if (currentuser) {
        await updatePassword(currentuser, newPassword);
        return true;
    }
    signout();
    return null;
};
