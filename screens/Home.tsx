import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../navigation/index';

import { fetchAllPets, fetchUser } from '../requests';
import { Pet as PetType } from '../types';

export default () => {
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  const [pets, setPets] = useState<PetType[]>([]);
  useEffect(() => {
    fetchAllPets().then((pets) => {
      console.log(pets);

      setPets(pets);
    });
  }, []);

  return (
    <>
      <Text>Home</Text>
      {pets.map((pet) => (
        <Button
          title={pet.name}
          key={pet.id}
          onPress={() => navigation.navigate('PetModal', { pet })}
        />
      ))}
    </>
  );
};
