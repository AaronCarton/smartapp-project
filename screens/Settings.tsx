import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabParamList, RootStackParamList } from '../navigation';
import { Text, View, Button, tw } from '../components/Custom';
import { Image } from 'react-native';
import { User } from '../types';
import { useAuth } from '../hooks/Auth';

import SettingsItem from '../components/Settings/SettingsItem';
import ProfilePreview from '../components/Settings/ProfilePreview';
import { fetchAllPets } from '../requests';

export default () => {
  var stackNav = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  var tabNav = useNavigation<NavigationProp<BottomTabParamList, 'Settings'>>();
  let { user, setUser } = useAuth();

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
      <SettingsItem title={'Listed pets'} iconName={'list'} />
      <SettingsItem title={'Favorited'} iconName={'heart'} />
      <SettingsItem title={'Dark Mode'} iconName={'moon'} />
      <SettingsItem title={'Settings'} iconName={'settings'} />
      <Button title="Logout" onPress={() => setUser(undefined)} className="m-3" />
      <Button
        title="Fav"
        onPress={() =>
          fetchAllPets().then((pets) => tabNav.navigate('Search', { petList: pets }))
        }
        className="m-3"
      />
    </View>
  );
};
