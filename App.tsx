import 'react-native-gesture-handler';
import React, { useState,useEffect } from 'react';
import 'i18n/config';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox, StyleSheet } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as darkTheme } from 'constants/theme/dark.json';
import { default as lightTheme } from 'constants/theme/light.json';
import { default as customTheme } from 'constants/theme/appTheme.json';
import { default as customMapping } from 'constants/theme/mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AssetIconsPack from 'assets/AssetIconsPack';
import * as eva from '@eva-design/eva';
import ThemeContext from './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from 'navigation/AppContainer';
import { useCachedResources } from 'hooks';
import { patchFlatListProps } from 'react-native-web-refresh-control';
import { Provider } from 'react-redux';
import store from './store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

LogBox.ignoreLogs(['Constants.installationId has been deprecated']);
patchFlatListProps();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    AsyncStorage.getItem('theme').then((value) => {
      if (value === 'light' || value === 'dark') setTheme(value);
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    AsyncStorage.setItem('theme', nextTheme).then(() => {
      setTheme(nextTheme);
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Provider store={store}>
            <IconRegistry defaultIcons="lock" icons={[EvaIconsPack, AssetIconsPack]} />
            <ApplicationProvider
              {...eva}
              theme={
                theme === 'light'
                  ? { ...eva.light, ...customTheme, ...lightTheme }
                  : { ...eva.dark, ...customTheme, ...darkTheme }
              }
              /* @ts-ignore */
              customMapping={customMapping}>
              <SafeAreaProvider>
                <StatusBar
                  style={theme === 'light' ? 'dark' : 'light'}
                  translucent={true}
                  backgroundColor={'#00000000'}
                />
                <BottomSheetModalProvider>
                  <AppContainer cachedResources={isLoadingComplete} />
                </BottomSheetModalProvider>
              </SafeAreaProvider>
            </ApplicationProvider>
          </Provider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
