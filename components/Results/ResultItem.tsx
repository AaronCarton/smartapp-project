import { Image, TextBase, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/Auth';
import { Pet } from '../../types';
import { Text, View, tw } from '../Custom';
import { GenderIcon, HeartToggle } from '../Icon';
import Title from '../Pet/Title';
import { Tags } from '../Tags';

function ResultItem({ pet, onPress }: { pet: Pet; onPress: (pet: Pet) => void }) {
  const { user } = useAuth();
  const description = `${pet.age} ${pet.ageType.slice(
    0,
    -1,
  )} old ${pet.type.toLowerCase()}`;

  return (
    <TouchableOpacity onPress={() => onPress(pet)} style={{ flex: 1 / 2, margin: 5 }}>
      <View className="h-50 rounded-[0.5rem]  bg-slate-300 dark:bg-slate-700">
        <View className="h-[60%]">
          <Image
            source={{ uri: pet.image }}
            style={tw`w-full h-full rounded-t-[0.4rem]`}
          />
          {user?.favorites.find((fav) => fav.id == pet.id) && (
            <View className="absolute right-1 top-1">
              <HeartToggle size={25} value={true} onPress={() => {}} />
            </View>
          )}
        </View>
        <View className="mx-2">
          <View className="flex-row justify-between">
            <Text className="font-comfortaa_bold text-lg">{pet.name}</Text>
            <GenderIcon gender={pet.gender} size={20} />
          </View>
          <Text className="font-comfortaa_semibold text-xs text-slate-600 dark:text-neutral-50">
            {description}
          </Text>
          <Text className="font-comfortaa_semibold text-xs text-slate-600 dark:text-neutral-50">
            {pet.seller.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ResultItem;
