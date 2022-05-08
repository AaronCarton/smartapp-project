import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import { DefaultTheme } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { loadAsync } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppColorScheme } from 'twrnc';
import { tw } from './components/Custom';
import { AuthContext } from './hooks/Auth';
import { CustomDarkTheme, DarkModeContext } from './hooks/darkmode';
import Navigation from './navigation';
import { User } from './types';

export default function App() {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const [user, setUser] = useState<User>();
  const bgColor =
    colorScheme === 'dark'
      ? CustomDarkTheme.colors.background
      : DefaultTheme.colors.background;

  let [fontsLoaded] = useFonts({
    Comfortaa: require('./assets/fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-Bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-SemiBold': require('./assets/fonts/Comfortaa-SemiBold.ttf'),
    'Comfortaa-Medium': require('./assets/fonts/Comfortaa-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <DarkModeContext.Provider
        value={{ colorScheme, toggleColorScheme, setColorScheme }}
      >
        <View style={{ flex: 1, backgroundColor: bgColor }}>
          <AuthContext.Provider value={{ user, setUser }}>
            <StatusBar style={colorScheme == 'light' ? 'dark' : 'light'} />
            <Navigation />
          </AuthContext.Provider>
        </View>
      </DarkModeContext.Provider>
      {/* If colorScheme is in light mode, make the statusbar black, otherwise make it white */}
    </SafeAreaProvider>
  );
}
