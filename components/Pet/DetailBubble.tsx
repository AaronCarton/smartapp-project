import { Text } from 'react-native';
import tw from 'twrnc';

export default ({ title }: { title: string }) => {
  return (
    <Text
      key={title}
      style={tw`rounded-md bg-slate-300 text-slate-800 text-center self-start px-2 py-1 m-0.5`}
    >
      {title}
    </Text>
  );
};
