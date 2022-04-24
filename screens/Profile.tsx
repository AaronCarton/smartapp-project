import { Image } from 'react-native';
import { Text, View, Button } from '../components/Custom';
import { User } from '../types';
import tw from 'twrnc';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

interface Props {
  route: RouteProp<RootStackParamList, 'ProfileModal'>;
  navigation: NavigationProp<RootStackParamList, 'ProfileModal'>;
}
export default ({ route, navigation }: Props) => {
  const { user } = route.params;
  return (
    <View className="mx-14 h-full items-center">
      <Text>Profile</Text>
      <Image source={{ uri: user.image }} style={tw`h-44 w-44 rounded-full`} />
      <Text className="font-comfortaa_bold text-3xl font-thin">{user.username}</Text>
      <Text>{user.location}</Text>
      <Button title="Message me" className="" onPress={() => {}} />
    </View>
  );
};
