import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import Root from './navigation/Root';
import { DBContext } from "./context";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { RealmProvider } = DBContext;
  const [appIsReady, setAppIsReady] = useState(false);
  async function prepare() {
    try {
      // 추후에, 로딩이 필요한 요소들 집어넣기(이미지 등)
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  };  
  useEffect(() => {
    prepare();
  }, [])

  if (!appIsReady) {
    return null;
  }
  
  return (
    <RealmProvider>
      <NavigationContainer>
          <Root />
          <StatusBar style="dark" />
      </NavigationContainer>
    </RealmProvider>
  );
}
