import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, Route } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import tw from 'twrnc';

import Title from '../components/Pet/Title';
import { Tags } from '../components/Tags';
import AdoptButton from '../components/Pet/AdoptButton';
import Seller from '../components/Pet/Seller';
import { Text, View } from '../components/Custom';

interface Props {
  route: RouteProp<RootStackParamList, 'PetModal'>;
  navigation: NavigationProp<RootStackParamList, 'PetModal'>;
}

function Pet({ route, navigation }: Props) {
  const pet = route.params.pet;
  const { seller } = pet;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          style={tw`w-full h-[35%] rounded-b-3xl`}
          source={{
            uri: pet.image,
          }}
        />
        <View className="mx-4">
          <Title name={pet.name} gender={pet.gender} />
          <Tags details={[`${pet.age} ${pet.ageType}`, ...pet.details]} />
          <AdoptButton />
          <Text className="mb-3 text-slate-500">
            Some description here Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
            quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
            consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec
          </Text>
          <Text className="text-xl font-bold">Location</Text>
          <Text className="text-base text-slate-500">
            <Ionicons name="location" color={'#64748B'} size={15} />
            {pet.location}
          </Text>
          <Seller
            name={seller.username}
            location={seller.location}
            avatar={seller.image}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Pet;
