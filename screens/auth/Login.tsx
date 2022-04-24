import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, TouchableWithoutFeedback } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { Text, View, TextInput } from '../../components/Custom';
import tw from 'twrnc';
import { useEffect, useState } from 'react';
import { loginUser } from '../../requests';
import { FormError, User } from '../../types';

export default () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FormError>({
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
    },
  });
  var navigation = useNavigation<NavigationProp<RootStackParamList, 'LoginModal'>>();

  const login = () => {
    console.log(loginData);

    loginUser(loginData).then((data) => {
      if ((data as FormError).generic !== undefined) {
        setErrors({ ...errors, ...(data as FormError) });
      } else {
        console.log(data);
        // navigation.navigate('Root');
      }
    });
  };

  useEffect(() => {
    setErrors({
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
      },
    });
  }, [loginData]);

  return (
    <View className="mx-14 h-full justify-center">
      <View className="mb-2">
        <Text
          className={`mb-0.5 font-comfortaa_bold text-slate-600 ${
            errors.fields.email.hasError ? 'text-red-500' : ''
          } `}
        >
          Email {errors.fields.email.hasError && 'incorrect'}
        </Text>
        <TextInput
          className={`rounded-md border-2 border-slate-700 px-3 py-1 ${
            errors.fields.email.hasError && 'border-red-500 text-red-500'
          }`}
          placeholder="user@email.com"
          value={loginData.email}
          onChangeText={(text) => setLoginData({ ...loginData, email: text })}
        />
      </View>
      <View className="mb-2">
        <Text
          className={`mb-0.5 font-comfortaa_bold text-slate-600 ${
            errors.fields.password.hasError ? 'text-red-500' : ''
          } `}
        >
          Password {errors.fields.password.hasError && 'incorrect'}
        </Text>
        <TextInput
          className={`rounded-md border-2 border-slate-700 py-1 px-3 ${
            errors.fields.password.hasError && 'border-red-500 text-red-500'
          }`}
          placeholder="test123"
          secureTextEntry={true}
          value={loginData.password}
          onChangeText={(text) => setLoginData({ ...loginData, password: text })}
        />
      </View>
      <View className="mt-3 mb-2">
        <Button title="Login" color={'#ef4444'} onPress={() => login()} />
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('RegisterModal')}>
        <View className="w-full p-2">
          <Text className="text-center font-comfortaa_bold text-slate-600">
            Create account
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
