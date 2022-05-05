import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View, TextInput, Button } from '../../components/Custom';

import AvatarPicker from '../../components/Register/AvatarPicker';
import { FormError, User } from '../../types';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { postUser } from '../../requests';
import { useAuth } from '../../hooks/Auth';

interface Props {
  route: RouteProp<RootStackParamList, 'RegisterModal'>;
  navigation: NavigationProp<RootStackParamList, 'RegisterModal'>;
}

export default ({ route, navigation }: Props) => {
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'RegisterModal'>>();
  const isFocused = useIsFocused();
  const { user, setUser } = useAuth();
  const [newUser, setNewUser] = useState<User>({
    username: '',
    email: '',
    password: '',
    location: '',
    image: '',
  } as User);
  const errorBase = {
    generic: { title: '', message: '' },
    fields: {
      email: {
        hasError: false,
        inlineErrorMessage: '',
      },
      password: {
        hasError: false,
        inlineErrorMessage: '',
      },
      username: {
        hasError: false,
        inlineErrorMessage: '',
      },
      location: {
        hasError: false,
        inlineErrorMessage: '',
      },
    },
  } as FormError;
  const [errors, setErrors] = useState<FormError>(errorBase);

  const register = () => {
    postUser(newUser).then((response) => {
      if ((response as FormError).generic !== undefined) {
        console.log(response);
        setErrors({
          ...errors,
          fields: { ...errors.fields, ...(response as FormError).fields },
        });
      } else {
        // if user is already logged in === update current user
        setUser(response as User);
        navigation.navigate('Root');
      }
    });
  };

  useEffect(() => {
    setErrors({ ...errorBase });
  }, [newUser]);

  useEffect(() => {
    let userP = route.params?.user;
    // if params were passed, set state
    if (userP) {
      console.log(userP);
      setNewUser({ ...userP });
      navigation.setParams({ user: undefined }); // empty the params, otherwise it will keep replacing the list on focus
    }
  }, [isFocused]);

  return (
    <View className="mx-14 h-full justify-center">
      <View className="mb-2">
        <AvatarPicker
          aspect={[1, 1]}
          value={newUser.image == '' ? undefined : newUser.image}
          onChange={(image) => setNewUser({ ...newUser, image })}
        />
      </View>
      <View className="mb-2">
        <Text
          className={`mb-0.5 font-comfortaa_bold text-slate-600 ${
            errors.fields.username.hasError ? 'text-red-500 dark:text-red-500' : ''
          } `}
        >
          {errors.fields.username.hasError
            ? errors.fields.username.inlineErrorMessage
            : 'Username'}
        </Text>
        <TextInput
          value={newUser.username}
          onChangeText={(username) => setNewUser({ ...newUser, username })}
          placeholder="Username"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mb-2">
        <Text
          className={`mb-0.5 font-comfortaa_bold text-slate-600 ${
            errors.fields.email.hasError ? 'text-red-500 dark:text-red-500' : ''
          } `}
        >
          {errors.fields.email.hasError
            ? errors.fields.email.inlineErrorMessage
            : 'Email'}
        </Text>
        <TextInput
          value={newUser.email}
          onChangeText={(email) => setNewUser({ ...newUser, email })}
          placeholder="Email"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mb-2">
        <Text
          className={`mb-0.5 font-comfortaa_bold text-slate-600 ${
            errors.fields.password.hasError ? 'text-red-500 dark:text-red-500' : ''
          } `}
        >
          {errors.fields.password.hasError
            ? errors.fields.password.inlineErrorMessage
            : 'Password'}
        </Text>
        <TextInput
          secureTextEntry={true}
          value={newUser.password}
          onChangeText={(password) => setNewUser({ ...newUser, password })}
          placeholder="Password"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mb-2">
        <Text
          className={`mb-0.5 font-comfortaa_bold text-slate-600 ${
            errors.fields.location.hasError ? 'text-red-500 dark:text-red-500' : ''
          } `}
        >
          {errors.fields.location.hasError
            ? errors.fields.location.inlineErrorMessage
            : 'Location'}
        </Text>
        <TextInput
          value={newUser.location}
          onChangeText={(location) => setNewUser({ ...newUser, location })}
          placeholder="Location"
          className="rounded-md border-2 border-slate-700 py-1 px-3"
        />
      </View>
      <View className="mt-3 mb-2">
        <Button title="Create account" onPress={() => register()} />
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View className="w-full p-2">
          <Text className="text-center font-comfortaa_bold text-slate-600">
            Already have an account? Login
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
