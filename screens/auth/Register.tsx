import { useState } from 'react';
import { Button, Text, View, TextInput } from 'react-native';

import tw from 'twrnc';
import AvatarPicker from '../../components/Register/AvatarPicker';
import { User } from '../../types';

export default () => {
  const [newUser, setNewUser] = useState<User>({} as User);

  return (
    <View style={tw`h-full mx-14 justify-center`}>
      <View style={tw`mb-2`}>
        <AvatarPicker onChange={(image) => setNewUser({ ...newUser, image })} />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Username</Text>
        <TextInput
          value={newUser.username}
          onChangeText={(username) => setNewUser({ ...newUser, username })}
          placeholder="Username"
          style={tw`border-slate-700 border-2 rounded-md py-1 px-3`}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Email</Text>
        <TextInput
          value={newUser.email}
          onChangeText={(email) => setNewUser({ ...newUser, email })}
          placeholder="Email"
          style={tw`border-slate-700 border-2 rounded-md py-1 px-3`}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Password</Text>
        <TextInput
          secureTextEntry={true}
          value={newUser.password}
          onChangeText={(password) => setNewUser({ ...newUser, password })}
          placeholder="Password"
          style={tw`border-slate-700 border-2 rounded-md py-1 px-3`}
        />
      </View>
      <View style={tw`mt-3 mb-2`}>
        <Button
          title="Create account"
          color={'#ef4444'}
          onPress={() => console.log(newUser)}
        />
      </View>
    </View>
  );
};
