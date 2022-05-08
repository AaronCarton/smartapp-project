import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TagInput } from '../../components/Tags';
import { Text, View, TextInput, Button, tw } from '../../components/Custom';
import AvatarPicker from '../../components/Register/AvatarPicker';
import { FormError, Pet } from '../../types';
import { Picker } from '@react-native-picker/picker';
import { postPet } from '../../requests';
import { useAuth } from '../../hooks/Auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';

export default () => {
  const errorBase = {
    generic: { title: '', message: '' },
    fields: {
      name: {
        hasError: false,
        inlineErrorMessage: '',
      },
      age: {
        hasError: false,
        inlineErrorMessage: '',
      },
      ageType: {
        hasError: false,
        inlineErrorMessage: '',
      },
      gender: {
        hasError: false,
        inlineErrorMessage: '',
      },
      type: {
        hasError: false,
        inlineErrorMessage: '',
      },
      location: {
        hasError: false,
        inlineErrorMessage: '',
      },
      description: {
        hasError: false,
        inlineErrorMessage: '',
      },
      details: {
        hasError: false,
        inlineErrorMessage: '',
      },
    },
  } as FormError;
  var stackNav = useNavigation<NavigationProp<RootStackParamList, 'AddModal'>>();
  const [newPet, setNewPet] = useState<Partial<Pet>>({
    name: undefined,
    age: undefined,
    ageType: undefined,
    description: undefined,
    details: undefined,
    gender: undefined,
    image: undefined,
    type: undefined,
    location: undefined,
  });
  const [errors, setErrors] = useState<FormError>(errorBase);
  const { user, setUser } = useAuth();

  const setAge = (text: string) => {
    // check regex
    if (text.match(/^\d+ (weeks|days|months|years)$/)) {
      const [amount, unit] = text.split(' ');
      // @ts-ignore
      setNewPet({ ...newPet, age: parseInt(amount), ageType: unit });
    } else {
      setErrors({
        ...errors,
        fields: {
          ...errors.fields,
          age: { hasError: true, inlineErrorMessage: 'Age invalid' },
        },
      });
    }
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors.fields };
    for (var prop in newPet) {
      if (Object.prototype.hasOwnProperty.call(newPet, prop)) {
        if (
          // @ts-ignore
          newPet[prop] === undefined ||
          // @ts-ignore
          newPet[prop] === '' ||
          newPet['details']!.length === 0
        ) {
          valid = false;
          newErrors[prop] = { hasError: true, inlineErrorMessage: `${prop} required` };
        }
      }
    }
    setErrors({ ...errors, fields: newErrors });
    if (newPet.image === undefined) alert('Please select an image');
    return valid;
  };

  const register = () => {
    if (validateForm()) {
      postPet(newPet as Pet, user!).then((response) => {
        if ((response as FormError).generic !== undefined) {
          setErrors({
            ...errors,
            fields: { ...errors.fields, ...(response as FormError).fields },
          });
        } else {
          user?.pets.push(response as Pet);
          setUser({ ...user });
          stackNav.navigate('Root');
        }
      });
    }
  };

  useEffect(() => {
    setErrors({ ...errorBase });
  }, [newPet]);

  if (!user)
    return (
      <View className="mx-auto h-full justify-center">
        <Text className="mb-1">User not logged in</Text>
        <Button title="Login" onPress={() => stackNav.navigate('LoginModal')} />
      </View>
    );
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 30 }}>
      <View className="mx-14 h-full justify-center">
        <View className="mt-2 mb-4">
          <AvatarPicker
            aspect={[4, 3]}
            onChange={(uri) => setNewPet({ ...newPet, image: uri })}
          />
        </View>
        <View className="mb-2">
          <Text
            className={`mb-0.5 font-comfortaa_bold capitalize text-slate-600 dark:text-slate-200 ${
              errors.fields.name.hasError ? 'text-red-500 dark:text-red-500' : ''
            } `}
          >
            {errors.fields.name.hasError ? errors.fields.name.inlineErrorMessage : 'Name'}
          </Text>
          <TextInput
            className="rounded-md border-2 border-slate-700 py-1 px-3"
            placeholder="Name"
            value={newPet.name}
            onChangeText={(name) => setNewPet({ ...newPet, name })}
          />
        </View>
        <View className="mb-2">
          <Text
            className={`mb-0.5 font-comfortaa_bold capitalize text-slate-600 dark:text-slate-200 ${
              errors.fields.age.hasError ? 'text-red-500 dark:text-red-500' : ''
            } `}
          >
            {errors.fields.age.hasError ? errors.fields.age.inlineErrorMessage : 'Age'}
          </Text>
          <TextInput
            className="rounded-md border-2 border-slate-700 py-1 px-3"
            placeholder="4 years"
            onChangeText={(text) => setAge(text)}
          />
        </View>
        <View className="mb-2">
          <Text
            className={`mb-0.5 font-comfortaa_bold capitalize text-slate-600 dark:text-slate-200 ${
              errors.fields.gender.hasError ? 'text-red-500 dark:text-red-500' : ''
            } `}
          >
            {errors.fields.gender.hasError
              ? errors.fields.gender.inlineErrorMessage
              : 'Gender'}
          </Text>
          <Picker
            style={tw`dark:text-slate-200`}
            selectedValue={newPet.gender}
            onValueChange={(itemValue, itemIndex) =>
              setNewPet({ ...newPet, gender: itemValue })
            }
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View className="mb-2">
          <Text
            className={`mb-0.5 font-comfortaa_bold capitalize text-slate-600 dark:text-slate-200 ${
              errors.fields.type.hasError ? 'text-red-500 dark:text-red-500' : ''
            } `}
          >
            {errors.fields.type.hasError ? errors.fields.type.inlineErrorMessage : 'Type'}
          </Text>
          <Picker
            style={tw`dark:text-slate-200`}
            selectedValue={newPet.type}
            onValueChange={(itemValue, itemIndex) =>
              setNewPet({ ...newPet, type: itemValue })
            }
          >
            <Picker.Item label="Dog" value="Dog" />
            <Picker.Item label="Cat" value="Cat" />
            <Picker.Item label="Rat" value="Rat" />
            <Picker.Item label="Hamster" value="Hamster" />
            <Picker.Item label="Rabbit" value="Rabbit" />
          </Picker>
        </View>
        <View className="mb-2">
          <Text
            className={`mb-0.5 font-comfortaa_bold capitalize text-slate-600 dark:text-slate-200 ${
              errors.fields.location.hasError ? 'text-red-500 dark:text-red-500' : ''
            } `}
          >
            {errors.fields.location.hasError
              ? errors.fields.location.inlineErrorMessage
              : 'Location'}
          </Text>
          <TextInput
            className="rounded-md border-2 border-slate-700 py-1 px-3"
            placeholder="Name"
            value={newPet.location}
            onChangeText={(location) => setNewPet({ ...newPet, location })}
          />
        </View>
        <View className="mb-2">
          <Text
            className={`mb-0.5 font-comfortaa_bold capitalize text-slate-600 dark:text-slate-200 ${
              errors.fields.description.hasError ? 'text-red-500 dark:text-red-500' : ''
            } `}
          >
            {errors.fields.description.hasError
              ? errors.fields.description.inlineErrorMessage
              : 'Description'}
          </Text>
          <TextInput
            className="rounded-md border-2 border-slate-700 py-1 px-3"
            placeholder="Description"
            numberOfLines={4}
            multiline={true}
            textAlignVertical="top"
            value={newPet.description}
            onChangeText={(description) => setNewPet({ ...newPet, description })}
          />
        </View>
        <View>
          <Text
            className={`mb-0.5 font-comfortaa_bold capitalize text-slate-600 dark:text-slate-200 ${
              errors.fields.details.hasError ? 'text-red-500 dark:text-red-500' : ''
            } `}
          >
            {errors.fields.details.hasError
              ? errors.fields.details.inlineErrorMessage
              : 'Details'}
          </Text>
          <TagInput
            value={newPet.details ?? []}
            onChange={(details) => setNewPet({ ...newPet, details })}
          />
        </View>
        <View className="mt-3 mb-3">
          <Button
            title="Preview"
            onPress={() =>
              stackNav.navigate('PetModal', { pet: { ...(newPet as Pet), seller: user } })
            }
          />
        </View>
        <View>
          <Button title="Save" onPress={() => register()} />
        </View>
      </View>
    </ScrollView>
  );
};
