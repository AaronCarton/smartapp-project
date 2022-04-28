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
      <Image source={{ uri: user.image }} style={tw`h-44 w-44 rounded-full mt-5 mb-3`} />
      <Text className="font-comfortaa_bold text-3xl font-thin leading-none">
        {user.username}
      </Text>
      <Text className="mt-[-6px] mb-5">{user.location}</Text>
      <Button title="Message me" className="" onPress={() => {}} />
    </View>
  );
};
