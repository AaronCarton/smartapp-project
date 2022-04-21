import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Text, View } from '../components/Custom';
import { User } from '../types';

export default ({ user }: { user?: User }) => {
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();

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
      <Text>"Title: User name"</Text>
      <View>
        <Text>Profile</Text>
        <Text>Avatar</Text>
        <Text>Username</Text>
        <Text>Edit button</Text>
      </View>
      <Text>Listed pets</Text>
      <Text>Favorited</Text>
      <Text>Dark Mode</Text>
      <Text>Settings</Text>
      <Text>Logout</Text>
    </View>
  );
};
