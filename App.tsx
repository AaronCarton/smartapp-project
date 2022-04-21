import { DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import tw, { useAppColorScheme } from 'twrnc';
import { CustomDarkTheme, DarkModeContext } from './hooks/darkmode';
import Navigation from './navigation';

export default function App() {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const bgColor =
    colorScheme === 'dark'
      ? CustomDarkTheme.colors.background
      : DefaultTheme.colors.background;

  return (
    <SafeAreaProvider>
      <DarkModeContext.Provider
        value={{ colorScheme, toggleColorScheme, setColorScheme }}
      >
        <View style={{ flex: 1, backgroundColor: bgColor }}>
          <Navigation />
        </View>
      </DarkModeContext.Provider>
      {/* If colorScheme is in light mode, make the statusbar black, otherwise make it white */}
      <StatusBar style={colorScheme == 'light' ? 'dark' : 'light'} />
    </SafeAreaProvider>
  );
}
