import { TouchableOpacity } from 'react-native';
import { useDarkMode } from '../hooks/darkmode';
import { Text } from '../components/Custom';

export default () => {
  const { colorScheme, toggleColorScheme, setColorScheme } = useDarkMode();

  return (
    <>
      <Text>Search</Text>
      <TouchableOpacity onPress={toggleColorScheme}>
        <Text className="text-black dark:text-white">Switch Color Scheme</Text>
      </TouchableOpacity>
      <Text className="text-amber-500 dark:text-red-700">
        Dark mode: {colorScheme}
      </Text>
    </>
  );
};
