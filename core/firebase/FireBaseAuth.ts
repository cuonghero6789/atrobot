import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { LoginManager, AccessToken, AuthenticationToken } from 'react-native-fbsdk-next';
import * as Crypto from 'expo-crypto';
// 970774422293-u230dd9ec24vij3927k5gniv9182glp5.apps.googleusercontent.com
// 745936822115-8abv2v3uj5u9dkcepc059cv1i207mdf1.apps.googleusercontent.com
GoogleSignin.configure({
    webClientId: '970774422293-u230dd9ec24vij3927k5gniv9182glp5.apps.googleusercontent.com',
    iosClientId: '970774422293-6j281hum16i8lotep39ghds2fvf99pm1.apps.googleusercontent.com',
    offlineAccess: false
});
export default class FireBaseAuth {
    static async getIdToken() {
        return await auth().currentUser?.getIdToken();
    }

    static async onFacebookLimitedLogin() {
        // Create a nonce and the corresponding
        // sha256 hash of the nonce
        const nonce = Date.now().toString();
        const nonceSha2562 = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
        // Attempt login with permissions and limited login
        const result = await LoginManager.logInWithPermissions(
            ['public_profile', 'email'],
            'limited',
            nonceSha2562,
        );

        if (result.isCancelled) {
            global.loadingRef.current?.hide();
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AuthenticationToken
        const data = await AuthenticationToken.getAuthenticationTokenIOS();
        console.log('data ===', data);

        if (!data) {
            throw 'Something went wrong obtaining authentication token';
        }

        // Create a Firebase credential with the AuthenticationToken
        // and the nonce (Firebase will validates the hash against the nonce)
        const facebookCredential = auth.FacebookAuthProvider.credential(
            data.authenticationToken,
            nonce,
        );

        // Sign-in the user with the credential
        await auth().signInWithCredential(facebookCredential);
        const idToken = await auth().currentUser?.getIdToken();
        console.log('idToken facebook login limited ==== ', idToken);
        return idToken;
    }
    static async onFacebookLogin() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            return null;
            // throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            return null;
            // throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(facebookCredential);
        const _idToken = await auth().currentUser?.getIdToken();
        console.log('idToken facebook login ==== ', _idToken);
        return _idToken;
    }
    static async onAppleLogin() {
        try {
            // Check availability first to avoid silent failures on unsupported devices/simulators
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            if (!isAvailable) {
                console.log('error apple login ==== ', JSON.stringify({ message: 'Apple Sign-In not available' }));
                return null;
            }
            const appleAuthRequestResponse = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw 'Apple Sign-In failed - no identify token returned';
            }
            // Create a Firebase credential from the response
            const { identityToken } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken);
            // Sign the user in with the credential
            await auth().signInWithCredential(appleCredential);
            const idToken = await auth().currentUser?.getIdToken();
            return idToken;
            // signed in
        } catch (e: any) {
            // Normalize error output; expo-apple-authentication throws with code on cancel
            const normalized = {
                message: e?.message ?? 'Unknown error',
                code: e?.code ?? e?.name ?? undefined,
            };
            console.log('error apple login ==== ', JSON.stringify(normalized));
            return null;
        }

    }
    static async onGoogleLogin() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Start Google sign-in flow
            await GoogleSignin.signIn();
            // Get the users ID token
            const { idToken } = await GoogleSignin.getTokens();
            if (!idToken) return null;
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
            const _idToken = await auth().currentUser?.getIdToken();
            console.log('idToken google login ==== ', _idToken);
            return _idToken;

        } catch (error: Error | any) {
            console.log('error google login ==== ', JSON.stringify(error));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
            return null;
        }
    }
}