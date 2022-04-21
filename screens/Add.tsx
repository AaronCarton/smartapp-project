import { useState } from 'react';
import { Button } from 'react-native';
import { TagInput } from '../components/Tags';
import { Text, View, TextInput } from '../components/Custom';
import tw from 'twrnc';

export default () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <View className="mx-14 h-full justify-center">
      <Text>Image</Text>
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Name</Text>
        <TextInput
          className="rounded-md border-2 border-slate-700 py-1 px-3"
          placeholder="Name"
        />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Age</Text>
        <View className="flex-row">
          <TextInput
            className="rounded-md border-2 border-slate-700 py-1 px-3"
            placeholder="4"
            keyboardType="numeric"
          />
          <TextInput
            className="rounded-md border-2 border-slate-700 py-1 px-3"
            placeholder="4"
            keyboardType="numeric"
          />
        </View>
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Details</Text>
        <TagInput value={['bruh', 'moment']} onChange={(t) => setTags(t)} />
      </View>
      <View className="mb-2">
        <Text className="mb-0.5 font-bold text-slate-600">Description</Text>
        <TextInput
          className="rounded-md border-2 border-slate-700 py-1 px-3"
          placeholder="Description"
          numberOfLines={4}
          multiline={true}
          textAlignVertical="top"
        />
      </View>
      <View className="mt-3 mb-3">
        <Button title="Preview" color={'#ef4444'} onPress={() => {}} />
      </View>
      <View>
        <Button title="Save" color={'#ef4444'} onPress={() => {}} />
      </View>
    </View>
  );
};
