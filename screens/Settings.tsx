import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { Text, View, Button, tw } from '../components/Custom';
import { Image } from 'react-native';
import { User } from '../types';
import { useAuth } from '../hooks/Auth';

import SettingsItem from '../components/Settings/SettingsItem';
import ProfilePreview from '../components/Settings/ProfilePreview';

export default () => {
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  let { user, setUser } = useAuth();

  // if no User is passed, redirect to the Login screen
  if (!user)
    return (
      <View className="mx-auto h-full justify-center">
        <Text className="mb-1">User not logged in</Text>
        <Button title="Login" onPress={() => navigation.navigate('LoginModal')} />
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
    </View>
  );
};
