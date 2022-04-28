import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, Button } from '../components/Custom';
import { BottomTabParamList, RootStackParamList } from '../navigation/index';

import { fetchAllPets, fetchUser } from '../requests';
import { Pet } from '../types';
import { TagInput } from '../components/Tags';

export default () => {
  var stackNav = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [tags, setTags] = useState<string[]>(['Rottweiler', 'Dumb']);
  useEffect(() => {
    fetchAllPets().then((pets) => {
      console.log(pets);

      setPets(pets);
    });
  }, []);

  return (
    <View>
      <Text>Home</Text>
      {pets.map((pet) => (
        <Button
          title={pet.name}
          key={pet.id}
          onPress={() => stackNav.navigate('PetModal', { pet })}
          className="m-2"
        />
      ))}
      <TagInput value={tags} onChange={(t) => setTags(tags)} />
      <Button
        title="Results"
        onPress={() => {
          stackNav.navigate('Root');
        }}
      />
    </View>
  );
};
