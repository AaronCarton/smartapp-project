import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Button,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RootStackParamList } from '../../navigation';
import tw from 'twrnc';

export default () => {
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'LoginModal'>>();

  return (
    <View style={tw`h-full mx-14 justify-center`}>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Email</Text>
        <TextInput
          style={tw`border-slate-700 rounded-md border-2 px-3 py-1`}
          placeholder="user@email.com"
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Password</Text>
        <TextInput
          style={tw`border-slate-700 border-2 rounded-md py-1 px-3`}
          placeholder="test123"
        />
      </View>
      <View style={tw`mt-3 mb-2`}>
        <Button title="Login" color={'#ef4444'} onPress={() => {}} />
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('RegisterModal')}>
        <View style={tw`w-full p-2`}>
          <Text style={tw`font-bold text-slate-600 text-center`}>
            Create account
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
