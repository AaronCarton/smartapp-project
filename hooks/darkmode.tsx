import { DarkTheme } from '@react-navigation/native';
import { createContext, useContext } from 'react';
import { RnColorScheme } from 'twrnc';

// React Navigation custom dark theme
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0c0c0c',
  },
};

interface DarkModeContextType {
  colorScheme: RnColorScheme;
  toggleColorScheme: () => void;
  setColorScheme: (colorScheme: RnColorScheme) => void;
}

const DarkModeContext = createContext<DarkModeContextType>({} as DarkModeContextType);

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
export { useDarkMode, DarkModeContext, DarkModeContextType, CustomDarkTheme };
