import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { Text, View } from '../Custom';

function Seller({
  name,
  avatar,
  location,
}: {
  name: string;
  avatar: string;
  location: string;
}) {
  return (
    <View className="my-6 flex-row">
      <Image style={tw`h-16 w-16 rounded-md`} source={{ uri: avatar }} />
      <View className="my-4 mx-2">
        <Text className="text-base font-bold leading-none">{name}</Text>
        <Text className="text-sm leading-5 text-slate-500">
          <Ionicons name="location" color={'#64748B'} />
          {location}
        </Text>
      </View>
    </View>
  );
}

export default Seller;
