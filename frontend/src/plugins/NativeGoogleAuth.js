import { registerPlugin } from '@capacitor/core';

// Register the native plugin (only works on Android)
const NativeGoogleAuth = registerPlugin('NativeGoogleAuth');

/**
 * Trigger native Android Google Sign-In (shows the account picker sheet)
 * Returns { idToken, email, displayName, photoUrl }
 */
export async function nativeGoogleSignIn() {
  return NativeGoogleAuth.signIn();
}

export async function nativeGoogleSignOut() {
  return NativeGoogleAuth.signOut();
}

export default NativeGoogleAuth;
