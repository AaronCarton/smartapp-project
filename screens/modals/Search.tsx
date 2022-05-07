import { Button, Text, TextInput, View } from '../../components/Custom';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { SearchQuery } from '../../types';
import InputField from '../../components/InputField';
import { searchPet } from '../../requests';
import { TagInput } from '../../components/Tags';
import { BottomTabParamList } from '../../navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default () => {
  const bottomNav = useNavigation<NavigationProp<BottomTabParamList, 'Home'>>();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({});
  const [age, setAge] = useState<string>('');

  useEffect(() => {
    if (age) {
      let arr = age.split(' ');
      setSearchQuery({
        ...searchQuery,
        age: parseInt(arr[0]),
        // @ts-ignore
        ageType: arr[1],
      });
    }
  }, [age]);

  const search = () => {
    searchPet(searchQuery).then((res) => {
      console.log(res);

      if (res.length > 0) {
        bottomNav.navigate('Search', { petList: res });
      } else {
        alert('No pets found');
      }
    });
  };

  return (
    <View className="m-4">
      <InputField
        title="Name"
        placeholder="Fido"
        value={searchQuery.name}
        onChangeText={(name) => setSearchQuery({ ...searchQuery, name })}
      />
      <InputField
        title="Location"
        placeholder="Kuurne"
        value={searchQuery.location}
        onChangeText={(location) => setSearchQuery({ ...searchQuery, location })}
      />
      <InputField
        title="Age"
        placeholder="5 years"
        regex={/^\d+ (weeks|days|months|years)$/}
        value={age}
        onChangeText={(age) => setAge(age)}
      />
      <View>
        <Text className="mb-0.5 font-comfortaa_bold text-slate-600">Type</Text>
        <Picker
          selectedValue={searchQuery.type}
          onValueChange={(itemValue, itemIndex) =>
            setSearchQuery({ ...searchQuery, type: itemValue })
          }
        >
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Cat" value="Cat" />
          <Picker.Item label="Rat" value="Rat" />
          <Picker.Item label="Hamster" value="Hamster" />
          <Picker.Item label="Rabbit" value="Rabbit" />
        </Picker>
      </View>
      <View>
        <Text className="mb-0.5 font-comfortaa_bold text-slate-600">Type</Text>
        <Picker
          selectedValue={searchQuery.gender}
          onValueChange={(itemValue, itemIndex) =>
            setSearchQuery({ ...searchQuery, gender: itemValue })
          }
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>
      <View>
        <Text className="mb-0.5 font-comfortaa_bold text-slate-600">Details</Text>
        <TagInput
          value={searchQuery.details ?? []}
          onChange={(details) => setSearchQuery({ ...searchQuery, details })}
        />
      </View>
      <Button title="Search" onPress={() => search()} />
    </View>
  );
};
