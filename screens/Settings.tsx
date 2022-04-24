import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { Text, View, Button, tw } from '../components/Custom';
import { User } from '../types';
import { useAuth } from '../hooks/Auth';
import { Image } from 'react-native';

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
      <Text>"Title: User name"</Text>
      <View>
        <Text>Profile</Text>
        <Text>Avatar</Text>
        <Text>{user.image}</Text>
        <Image source={{ uri: user.image }} style={tw`h-14 w-14`} />
        <Text>Username: {user.username}</Text>
        <Text>Edit button</Text>
      </View>
      <Text>Listed pets</Text>
      <Text>Favorited</Text>
      <Text>Dark Mode</Text>
      <Text>Settings</Text>
      <Button title="Logout" onPress={() => setUser(undefined)} />
    </View>
  );
};
