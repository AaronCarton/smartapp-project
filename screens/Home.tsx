import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, Button } from 'react-native';
import {RootStackParamList} from '../navigation/index'

export default () => {
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  return (
    <>
      <Text>Home</Text>
      <Button title='Bailey' onPress={() => navigation.navigate('PetModal')}/>
    </>
  );
};
