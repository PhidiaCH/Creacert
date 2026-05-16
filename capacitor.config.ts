import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.creacert.app',
  appName: 'CreaCert',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0f6e56',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f6e56',
    },
  },
  ios: {
    contentInset: 'always',
    backgroundColor: '#0f6e56',
    preferredContentMode: 'mobile',
  },
  android: {
    backgroundColor: '#0f6e56',
    allowMixedContent: false,
  },
};

export default config;
