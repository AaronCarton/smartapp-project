import { Image } from 'react-native';
import { View, Text, tw } from '../Custom';

interface MessageProps {
  avatar: string;
  name: string;
  message: string;
  time: string;
}

function MessageItem({ avatar, name, message, time }: MessageProps) {
  return (
    <View className="w-full flex-row justify-start">
      <Image
        source={{
          uri: avatar,
        }}
        style={tw`h-[3.75rem] w-[3.75rem] rounded-full m-0`}
      />
      <View className="m-0 ml-2">
        <View className="w-72 flex-row  items-end justify-between">
          <Text className="mb-1 font-comfortaa_bold text-base leading-8">{name}</Text>
          <Text className="font-comfortaa_semibold text-xs leading-8 text-gray-400">
            {time}
          </Text>
        </View>
        <Text className="text-xs leading-3 text-gray-600 dark:text-gray-400">
          {message}
        </Text>
      </View>
    </View>
  );
}

export default MessageItem;
export { MessageProps };
