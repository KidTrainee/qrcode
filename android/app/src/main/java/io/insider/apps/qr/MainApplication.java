package io.insider.apps.qr;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.calendarevents.CalendarEventsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.insider.apps.qr.BuildConfig;
import com.zmxv.RNSound.RNSoundPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import cl.json.RNSharePackage;
import org.reactnative.camera.RNCameraPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cl.json.ShareApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNLanguagesPackage(),
            new ReactNativeContacts(),
            new CalendarEventsPackage(),
            new RNFirebasePackage(),
            new RNSoundPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new RNSharePackage(),
            new RNCameraPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebaseAnalyticsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
   public String getFileProviderAuthority() {
          return "io.insider.apps.qr";
   }
}
