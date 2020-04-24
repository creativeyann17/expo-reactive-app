import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { View, Platform, StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { SplashScreen, Logs } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import includes from 'lodash/includes';
import configureStore from './services';
import LoadingLayout from './layouts/LoadingLayout';
import I18nLayout from './layouts/I18nLayout';
import { wsServiceOpen } from './services/wsService/actions';

const WebLayout = React.lazy(() => import('./layouts/WebLayout'));
const MobileLayout = React.lazy(() => import('./layouts/MobileLayout'));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const theme = {
  Input: {
    containerStyle: {
      marginTop: 10,
      marginBottom: 10,
    },
    placeholderTextColor: 'lightgrey',
  },
  /*colors: {
    primary: '#333',
    secondary: '#fff',
  },*/
};

export default function App() {
  if (__DEV__ && Platform.OS !== 'web') {
    Logs.disableExpoCliLogging();
  }

  const [isLoadingComplete, setLoadingComplete] = React.useState(true);

  const store = configureStore();

  store.dispatch(wsServiceOpen());

  /*React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);*/

  EStyleSheet.clearCache();
  EStyleSheet.build();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            <Suspense fallback={<LoadingLayout />}>
              <I18nLayout>
                {includes(['android', 'ios'], Platform.OS) ? <MobileLayout /> : <WebLayout />}
              </I18nLayout>
            </Suspense>
          </View>
        </ThemeProvider>
      </Provider>
    );
  }
}
