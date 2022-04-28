import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, Text, View } from '../components/Custom';
import { BottomTabParamList } from '../navigation';
import { Pet } from '../types';

interface Props {
  route: RouteProp<BottomTabParamList, 'Search'>;
  navigation: NavigationProp<BottomTabParamList, 'Search'>;
}

function Results({ route, navigation }: Props) {
  const petList = route.params?.petList;
  const [results, setResults] = useState<Pet[] | undefined>(petList);

  useEffect(() => {
    setResults(petList);
  }, [petList]);

  if (!results) {
    return (
      <View>
        <Text>Search</Text>
        <Button title="Search" onPress={() => setResults([{ name: 'test' } as Pet])} />
      </View>
    );
  }
  return (
    <View>
      <Button title="Search" onPress={() => setResults([{ name: 'test' } as Pet])} />
      <Text>Results</Text>
      {results.map((pet) => (
        <Text>{pet.name}</Text>
      ))}
    </View>
  );
}

export default Results;
