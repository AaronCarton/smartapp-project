import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, TouchableWithoutFeedback } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { Text, View, TextInput } from '../../components/Custom';
import tw from 'twrnc';

export default () => {
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'LoginModal'>>();

  return (
    <View className="mx-14 h-full justify-center">
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Email</Text>
        <TextInput
          className="rounded-md border-2 border-slate-700 px-3 py-1"
          placeholder="user@email.com"
        />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Password</Text>
        <TextInput
          className="rounded-md border-2 border-slate-700 py-1 px-3"
          placeholder="test123"
        />
      </View>
      <View className="mt-3 mb-2">
        <Button title="Login" color={'#ef4444'} onPress={() => {}} />
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('RegisterModal')}>
        <View className="w-full p-2">
          <Text className="text-center font-bold text-slate-600">Create account</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
