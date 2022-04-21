import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import tw, { useAppColorScheme } from 'twrnc';
import { DarkModeContext } from './hooks/darkmode';
import Navigation from './navigation';

export default function App() {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

  return (
    <SafeAreaProvider>
      <DarkModeContext.Provider
        value={{ colorScheme, toggleColorScheme, setColorScheme }}
      >
        <Navigation />
      </DarkModeContext.Provider>
      {/* If colorScheme is in light mode, make the statusbar black, otherwise make it white */}
      <StatusBar style={colorScheme == 'light' ? 'dark' : 'light'} />
    </SafeAreaProvider>
  );
}
