import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { TagInput } from '../components/Tags';
import tw from 'twrnc';

export default () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <View style={tw`h-full mx-14 justify-center`}>
      <Text>Image</Text>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Name</Text>
        <TextInput
          style={tw`border-slate-700 border-2 rounded-md py-1 px-3`}
          placeholder="Name"
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Age</Text>
        <View style={tw`flex-row`}>
          <TextInput
            style={tw`border-slate-700 border-2 rounded-md py-1 px-3`}
            placeholder="4"
            keyboardType="numeric"
          />
          <TextInput
            style={tw`border-slate-700 border-2 rounded-md py-1 px-3`}
            placeholder="4"
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Details</Text>
        <TagInput value={['bruh', 'moment']} onChange={(t) => setTags(t)} />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`font-bold text-slate-600 mb-0.5`}>Description</Text>
        <TextInput
          style={tw`border-slate-700 border-2 rounded-md py-1 px-3 overflow-none`}
          placeholder="Description"
          numberOfLines={4}
          multiline={true}
          textAlignVertical="top"
        />
      </View>
      <View style={tw`mt-3 mb-3`}>
        <Button title="Preview" color={'#ef4444'} onPress={() => {}} />
      </View>
      <View>
        <Button title="Save" color={'#ef4444'} onPress={() => {}} />
      </View>
    </View>
  );
};
