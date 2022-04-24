import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { Text, View } from '../Custom';

function Seller({
  name,
  avatar,
  location,
  onPress,
}: {
  name: string;
  avatar: string;
  location: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="my-6 flex-row">
        <Image style={tw`h-16 w-16 rounded-md`} source={{ uri: avatar }} />
        <View className="my-4 mx-2">
          <Text className="font-comfortaa_bold text-base leading-none">{name}</Text>
          <Text className="text-sm leading-5 text-slate-500">
            <Ionicons name="location" color={'#64748B'} />
            {location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Seller;
