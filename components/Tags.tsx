import { Text, View } from 'react-native';
import tw from 'twrnc';

function Tags({ details }: { details: string[] }) {
  return (
    <View style={tw`flex-row flex-wrap my-2`}>
      {details.map((detail) => (
        <Tag key={detail} title={detail} />
      ))}
    </View>
  );
}

function Tag({ title }: { title: string }) {
  return (
    <Text
      style={tw`rounded-md bg-slate-300 text-slate-800 text-center self-start px-2 py-1 mr-2 mb-2`}
    >
      {title}
    </Text>
  );
}

export default Tags;
export { Tag };
