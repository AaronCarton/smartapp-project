import { useState } from 'react';
import { Button } from 'react-native';
import { Text, View, TextInput } from '../../components/Custom';
import tw from 'twrnc';

import AvatarPicker from '../../components/Register/AvatarPicker';
import { User } from '../../types';

export default () => {
  const [newUser, setNewUser] = useState<User>({} as User);

  return (
    <View className="mx-14 h-full justify-center">
      <View className="mb-2">
        <AvatarPicker onChange={(image) => setNewUser({ ...newUser, image })} />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Username</Text>
        <TextInput
          value={newUser.username}
          onChangeText={(username) => setNewUser({ ...newUser, username })}
          placeholder="Username"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Email</Text>
        <TextInput
          value={newUser.email}
          onChangeText={(email) => setNewUser({ ...newUser, email })}
          placeholder="Email"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Password</Text>
        <TextInput
          secureTextEntry={true}
          value={newUser.password}
          onChangeText={(password) => setNewUser({ ...newUser, password })}
          placeholder="Password"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mt-3 mb-2">
        <Button
          title="Create account"
          color={'#ef4444'}
          onPress={() => console.log(newUser)}
        />
      </View>
    </View>
  );
};
