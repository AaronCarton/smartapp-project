import { Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

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
    <View style={tw`flex-row my-6`}>
      <Image style={tw`h-16 w-16 rounded-md`} source={{ uri: avatar }} />
      <View style={tw`my-4 mx-2`}>
        <Text style={tw`font-bold text-base leading-none`}>{name}</Text>
        <Text style={tw`text-slate-500 text-sm leading-5`}>
          <Ionicons name="location" color={'#64748B'} />
          {location}
        </Text>
      </View>
    </View>
  );
}

export default Seller;
