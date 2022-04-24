import { Divider } from 'react-native-paper';
import { View } from '../Custom';
import MessageItem, { MessageProps } from './MessageItem';

function MessageList({ messages }: { messages: MessageProps[] }) {
  return (
    <View className="m-3 w-full">
      {messages.map((messageProps, index) => (
        <View key={index}>
          <MessageItem {...messageProps} />
          <View className="my-2.5 border-b border-gray-300 dark:border-gray-800" />
        </View>
      ))}
    </View>
  );
}

export default MessageList;
