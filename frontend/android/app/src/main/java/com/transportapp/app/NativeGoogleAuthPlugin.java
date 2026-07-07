package com.transportapp.app;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

@CapacitorPlugin(name = "NativeGoogleAuth")
public class NativeGoogleAuthPlugin extends Plugin {
    private static final String TAG = "NativeGoogleAuth";
    private static final int RC_SIGN_IN = 9001;
    private GoogleSignInClient mGoogleSignInClient;
    private PluginCall savedCall;

    @Override
    public void load() {
        // Web Client ID from google-services.json (client_type: 3)
        String webClientId = "81243763076-m201g8ppb0fqoieq9501stmr85ldpee2.apps.googleusercontent.com";
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(webClientId)
                .requestEmail()
                .requestProfile()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(getActivity(), gso);
    }

    @PluginMethod
    public void signIn(PluginCall call) {
        savedCall = call;
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(call, signInIntent, "handleSignInResult");
    }

    @ActivityCallback
    private void handleSignInResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        Intent data = result.getData();
        if (data == null) {
            call.reject("Sign-in cancelled");
            return;
        }
        Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
        try {
            GoogleSignInAccount account = task.getResult(ApiException.class);
            JSObject ret = new JSObject();
            ret.put("idToken", account.getIdToken());
            ret.put("email", account.getEmail() != null ? account.getEmail() : "");
            ret.put("displayName", account.getDisplayName() != null ? account.getDisplayName() : "");
            String photoUrl = account.getPhotoUrl() != null ? account.getPhotoUrl().toString() : "";
            ret.put("photoUrl", photoUrl);
            call.resolve(ret);
        } catch (ApiException e) {
            Log.w(TAG, "Google sign-in failed", e);
            call.reject("Google sign-in failed: " + e.getStatusCode());
        }
    }

    @PluginMethod
    public void signOut(PluginCall call) {
        mGoogleSignInClient.signOut().addOnCompleteListener(task -> call.resolve());
    }
}
