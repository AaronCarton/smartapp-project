import { View, Text } from 'react-native';
import tw from 'twrnc';

import { GenderIcon } from '../Icon';

function Title({ name, gender }: { name: string; gender: 'male' | 'female' }) {
  return (
    <View style={tw`flex-row items-center mt-3 mb-1`}>
      <Text style={tw`font-bold text-2xl`}>{name}</Text>
      <GenderIcon gender={gender} />
    </View>
  );
}

export default Title;
