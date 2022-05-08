import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { Text, View, TextInput, Button } from '../../components/Custom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../requests';
import { FormError, User } from '../../types';
import { useAuth } from '../../hooks/Auth';

export default () => {
  const { user, setUser } = useAuth();
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
    loginUser(loginData).then((data) => {
      if ((data as FormError).generic !== undefined) {
        setErrors({ ...errors, ...(data as FormError) });
      } else {
        setUser(data as User);
        navigation.navigate('Root');
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
      <Text className="mb-16 text-center font-comfortaa_semibold text-3xl">Login</Text>
      <View className="mb-2">
        <Text
          className={`mb-0.5 font-comfortaa_bold text-slate-600 dark:text-slate-300 ${
            errors.fields.email.hasError ? 'text-red-500 dark:text-red-500' : ''
          } `}
        >
          Email {errors.fields.email.hasError && 'not found'}
        </Text>
        <TextInput
          className={`rounded-md border-2 border-slate-700 px-3 py-1${
            errors.fields.email.hasError ? 'border-red-500 text-red-500' : ''
          }`}
          placeholder="user@email.com"
          value={loginData.email}
          onChangeText={(text) => setLoginData({ ...loginData, email: text.trim() })}
        />
      </View>
      <View className="mb-2">
        <Text
          className={`mb-0.5 font-comfortaa_bold text-slate-600 dark:text-slate-300 ${
            errors.fields.password.hasError ? 'text-red-500 dark:text-red-500' : ''
          } `}
        >
          Password {errors.fields.password.hasError && 'incorrect'}
        </Text>
        <TextInput
          className={`rounded-md border-2 border-slate-700 py-1 px-3 ${
            errors.fields.password.hasError ? 'border-red-500 text-red-500' : ''
          }`}
          placeholder="test123"
          secureTextEntry={true}
          value={loginData.password}
          onChangeText={(text) => setLoginData({ ...loginData, password: text.trim() })}
        />
      </View>
      <View className="mt-3 mb-2">
        <Button title="Login" onPress={() => login()} />
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('RegisterModal')}>
        <View className="w-full p-2">
          <Text className="text-center font-comfortaa_bold text-slate-600 dark:text-slate-500">
            Create account
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
