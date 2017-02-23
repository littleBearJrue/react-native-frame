package com.reactframe;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;

/**
 * 描述：示例： 获取手机app的各项信息
 * Created by jrue on 17/2/23.
 */
public class MessageAlert extends ReactContextBaseJavaModule{

    private PackageManager packageManager;

    static final String APP_PACKAGE_NAME = "packageName";
    static final String APP_NAME = "appName";
    static final String APP_IMAGE = "appImage";

    public MessageAlert(ReactApplicationContext reactContext) {
        super(reactContext);
        packageManager = reactContext.getPackageManager();
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
    }

    @Override
    public String getName() {
        return "MessageAlert";
    }

    /**
     * 获取手机系统应用列表
     * @param promise
     */
    @ReactMethod
    public void getPackageInfo(final Promise promise) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                WritableArray array = Arguments.createArray();
                //获取到所有安装了的应用程序的信息
                List<PackageInfo> packageInfos = packageManager.getInstalledPackages(0);
                for (PackageInfo info : packageInfos) {
                    WritableMap map = Arguments.createMap();
                    //获取应用程序的信息
                    ApplicationInfo appInfo = info.applicationInfo;
                    map.putString(APP_PACKAGE_NAME, info.packageName);
                    map.putString(APP_NAME, appInfo.loadLabel(packageManager).toString());
                    Drawable icon = appInfo.loadIcon(packageManager);
                    // map.putString(APP_IMAGE, drawable2Base64(icon));
                    if ((appInfo.flags& ApplicationInfo.FLAG_SYSTEM) == 0) {
                        if (info.packageName.equals("com.tencent.mm")
                                || info.packageName.equals("com.twitter.android")
                                || info.packageName.equals("com.tencent.mobileqq")
                                || info.packageName.equals("com.facebook.katana")
                                || info.packageName.equals("com.alibaba.android.rimet")
                                || info.packageName.equals("com.sina.weibo")
                                || info.packageName.equals("com.eg.android.AlipayGphone")) {
                            array.pushMap(map);
                        }
                    } else {
                        //获取系统级所需的应用
                        if(info.packageName.equals("com.android.email")
                                || info.packageName.equals("com.android.calendar")
                                || info.packageName.equals("com.android.alarmclock")
                                || info.packageName.equals("com.android.mms")) {
                            array.pushMap(map);
                        }
                    }
                }
                if (array.size() <= 0) {
                    promise.reject("error", "App package can't fetch");
                } else {
                    promise.resolve(array);
                }
            }
        }).start();
    }
}
