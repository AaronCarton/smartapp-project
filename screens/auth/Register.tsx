import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View, TextInput, Button } from '../../components/Custom';

import AvatarPicker from '../../components/Register/AvatarPicker';
import { User } from '../../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';

export default () => {
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'RegisterModal'>>();
  const [newUser, setNewUser] = useState<User>({} as User);

  return (
    <View className="mx-14 h-full justify-center">
      <View className="mb-2">
        <AvatarPicker onChange={(image) => setNewUser({ ...newUser, image })} />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-comfortaa_bold text-slate-600">Username</Text>
        <TextInput
          value={newUser.username}
          onChangeText={(username) => setNewUser({ ...newUser, username })}
          placeholder="Username"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-comfortaa_bold text-slate-600">Email</Text>
        <TextInput
          value={newUser.email}
          onChangeText={(email) => setNewUser({ ...newUser, email })}
          placeholder="Email"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-comfortaa_bold text-slate-600">Password</Text>
        <TextInput
          secureTextEntry={true}
          value={newUser.password}
          onChangeText={(password) => setNewUser({ ...newUser, password })}
          placeholder="Password"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mt-3 mb-2">
        <Button title="Create account" onPress={() => console.log(newUser)} />
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('LoginModal')}>
        <View className="w-full p-2">
          <Text className="text-center font-comfortaa_bold text-slate-600">
            Already have an account? Login
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
