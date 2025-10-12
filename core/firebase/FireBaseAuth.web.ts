// Web implementation: Google sign-in via Firebase Web SDK.
import { app } from './FirebaseConfig';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
} from 'firebase/auth';

export default class FireBaseAuth {
    static async getIdToken(): Promise<string | undefined | null> {
        const auth = getAuth(app);
        return await auth.currentUser?.getIdToken();
    }

    static async onFacebookLimitedLogin(): Promise<string | null> {
        return null;
    }

    static async onFacebookLogin(): Promise<string | null> {
        return null;
    }

    static async onAppleLogin(): Promise<string | null> {
        return null;
    }

    static async onGoogleLogin(): Promise<string | null> {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            return token;
        } catch {
            // Popup blocked or user closed
            return null;
        }
    }
}


