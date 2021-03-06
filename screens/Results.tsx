import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Text, View } from '../components/Custom';
import ResultItem from '../components/Results/ResultItem';
import { BottomTabParamList, RootStackParamList } from '../navigation';
import { Pet } from '../types';
import { fetchAllPets } from '../requests';

interface Props {
  route: RouteProp<BottomTabParamList, 'Search'>;
  navigation: NavigationProp<BottomTabParamList, 'Search'>;
}

function Results({ route, navigation }: Props) {
  const stackNav = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  const [results, setResults] = useState<Pet[] | undefined>(undefined);
  const isFocused = useIsFocused();

  useEffect(() => {
    let paramList = route.params?.petList;
    // if params were passed, set state
    if (paramList) {
      setResults(paramList);
      navigation.setParams({ petList: undefined }); // empty the params, otherwise it will keep replacing the list on focus
    }
  }, [isFocused]);

  return (
    <View>
      <Button
        className="m-4"
        title="Search"
        onPress={() => stackNav.navigate('SearchModal')}
      />
      {results && (
        <View>
          <FlatList
            data={results}
            numColumns={2}
            renderItem={({ item }) => (
              <ResultItem
                pet={item}
                onPress={(pet) => stackNav.navigate('PetModal', { pet })}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}

export default Results;
