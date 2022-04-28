import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabParamList, RootStackParamList } from '../navigation';
import { Text, View, Button, tw } from '../components/Custom';
import { Image } from 'react-native';
import { User } from '../types';
import { useAuth } from '../hooks/Auth';

import SettingsItem from '../components/Settings/SettingsItem';
import ProfilePreview from '../components/Settings/ProfilePreview';
import useDarkMode from '../hooks/darkmode';

export default () => {
  var stackNav = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  var tabNav = useNavigation<NavigationProp<BottomTabParamList, 'Settings'>>();
  let { user, setUser } = useAuth();
  let { colorScheme, toggleColorScheme } = useDarkMode();

  // if no User is passed, redirect to the Login screen
  if (!user)
    return (
      <View className="mx-auto h-full justify-center">
        <Text className="mb-1">User not logged in</Text>
        <Button title="Login" onPress={() => stackNav.navigate('LoginModal')} />
      </View>
    );
  return (
    <View>
      <ProfilePreview user={user} />
      <SettingsItem
        title={'Listed pets'}
        iconName={'list'}
        onPress={() => tabNav.navigate('Search', { petList: user?.pets })}
        right={
          <Text className="mr-4 font-comfortaa_bold text-base">
            {user.pets.length || ''}
          </Text>
        }
      />
      <SettingsItem
        title={'Favorited'}
        iconName={'heart'}
        onPress={() => tabNav.navigate('Search', { petList: user?.favorites })}
        right={
          <Text className="mr-4 font-comfortaa_bold text-base">
            {user.favorites.length || ''}
          </Text>
        }
      />
      <SettingsItem
        title={colorScheme == 'light' ? 'Dark Mode' : 'Light mode'}
        iconName={colorScheme == 'light' ? 'moon' : 'sunny'}
        onPress={toggleColorScheme}
      />
      <SettingsItem title={'Settings'} iconName={'settings'} />
      <Button title="Logout" onPress={() => setUser(undefined)} className="m-3" />
    </View>
  );
};
