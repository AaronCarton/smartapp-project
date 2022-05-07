import { Text, View } from '../Custom';
import { GenderIcon } from '../Icon';

function Title({ name, gender }: { name: string; gender: 'male' | 'female' }) {
  return (
    <View className="mt-3 mb-1 flex-row items-center">
      <Text className="font-comfortaa_bold text-2xl capitalize">{name}</Text>
      <GenderIcon gender={gender} />
    </View>
  );
}

export default Title;
