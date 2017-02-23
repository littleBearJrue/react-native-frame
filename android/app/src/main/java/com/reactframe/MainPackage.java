package com.reactframe;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ViewManager;

import java.lang.ref.WeakReference;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by jrue on 17/2/23.
 */
public class MainPackage implements ReactPackage{
    private static WeakReference<ReactContext> mContext;

    public static ReactContext getContext() {
        if (mContext != null) {
            return mContext.get();
        }
        return null;
    }
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        mContext = new WeakReference<ReactContext>(reactContext);
        return Arrays.<NativeModule>asList(
                new MessageAlert(reactContext)
        );
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList();
    }
}
