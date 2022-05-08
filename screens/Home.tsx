import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, Button } from '../components/Custom';
import { BottomTabParamList, RootStackParamList } from '../navigation/index';

import { fetchAllPets, searchPet } from '../requests';
import { Pet, SearchQuery } from '../types';
import { ScrollView } from 'react-native';
import { useAuth } from '../hooks/Auth';
import ResultButton from '../components/Home/ResultButton';
import ResultItem from '../components/Results/ResultItem';

export default () => {
  const tabNav = useNavigation<NavigationProp<BottomTabParamList, 'Home'>>();
  const stackNav = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  const [recentlyAdded, setRecentlyAdded] = useState<Pet[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchAllPets().then((pets) => {
      let sortedPets = pets
        .sort((a, b) => {
          let dateA = new Date(a.created);
          let dateB = new Date(b.created);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(-4);
      setRecentlyAdded(sortedPets);
    });
  }, []);

  const searchPets = (query: SearchQuery) => {
    console.log(query);

    searchPet(query).then((res) => tabNav.navigate('Search', { petList: res }));
  };

  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 30 }}>
        <Text className="my-4 text-center text-2xl">
          Welcome{user && `, ${user.username}`}
        </Text>
        {user && user!.favorites.length > 0 && (
          <Button
            title="Check out your favorites"
            onPress={() => tabNav.navigate('Search', { petList: user?.favorites })}
          />
        )}
        <View>
          <Text className="my-4 text-center font-comfortaa_semibold text-2xl">
            Find your pet
          </Text>
          <View className="flex items-center">
            <View className="flex flex-row">
              <ResultButton
                title="Dogs"
                icon="dog"
                onPress={() => searchPets({ type: 'dog' } as SearchQuery)}
              />
              <ResultButton
                title="Cats"
                icon="cat"
                onPress={() => searchPets({ type: 'cat' } as SearchQuery)}
              />
            </View>
            <View className="flex flex-row">
              <ResultButton
                title="Male"
                icon="gender-male"
                onPress={() => searchPets({ gender: 'male' } as SearchQuery)}
              />
              <ResultButton
                title="Female"
                icon="gender-female"
                onPress={() => searchPets({ gender: 'female' } as SearchQuery)}
              />
            </View>
          </View>
        </View>
        <View>
          <Text className="my-4 text-center font-comfortaa_semibold text-2xl">
            Recently added
          </Text>
          <View className="mx-8">
            {recentlyAdded.map((item) => (
              <ResultItem
                key={item.id}
                pet={item}
                onPress={(pet) => stackNav.navigate('PetModal', { pet })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
