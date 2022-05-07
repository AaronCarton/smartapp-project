import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, Route } from 'react-native';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { BottomTabParamList, RootStackParamList } from '../../navigation';
import tw from 'twrnc';

import Title from '../../components/Pet/Title';
import { Tags } from '../../components/Tags';
import AdoptButton from '../../components/Pet/AdoptButton';
import Seller from '../../components/Pet/Seller';
import { Text, View } from '../../components/Custom';
import { useEffect, useState } from 'react';
import { HeartToggle } from '../../components/Icon';
import { useAuth } from '../../hooks/Auth';

interface Props {
  route: RouteProp<RootStackParamList, 'PetModal'>;
  navigation: NavigationProp<RootStackParamList, 'PetModal'>;
}

function Pet({ route, navigation }: Props) {
  const pet = route.params.pet;
  const { seller } = pet;
  const { user, setUser } = useAuth();
  const [isFavorited, setFavorited] = useState(
    user?.favorites?.find((fav) => fav.id == pet.id) ? true : false,
  );
  const tabNav = useNavigation<NavigationProp<BottomTabParamList, 'Home'>>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        seller.id === user?.id ? (
          <Ionicons name="trash" color={'#f1f5f9'} size={28} />
        ) : (
          <HeartToggle value={isFavorited} onPress={(value) => favoritePet(value)} />
        ),
    });
  }, [isFavorited]);

  const favoritePet = (value: boolean) => {
    if (!user) alert('You must be logged in to favorite pets');
    else {
      if (seller.id === user.id) {
        // TODO: Delete pet
      }
      setFavorited(value);
      console.log(pet);

      setUser({
        ...user,
        favorites: value
          ? [...user.favorites, pet]
          : user.favorites.filter((p) => p.id !== pet.id),
      });
    }
  };

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
          <Tags details={[`${pet.age} ${pet.ageType} old`, ...pet.details]} />
          <AdoptButton onPress={() => tabNav.navigate('Messages')} />
          <Text className="mb-3 text-slate-500">
            Some description here Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
            felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
            massa quis enim. Donec pede justo, fringilla vel, aliquet nec
          </Text>
          <Text className="font-comfortaa_bold text-xl">Location</Text>
          <Text className="mb-[-8px] text-base text-slate-500">
            <Ionicons name="location" color={'#64748B'} size={15} />
            {pet.location}
          </Text>
          <Seller
            name={seller.username}
            location={seller.location}
            avatar={seller.image}
            onPress={() => {
              navigation.navigate('ProfileModal', { user: seller });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Pet;
