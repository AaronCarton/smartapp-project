import { Divider } from 'react-native-paper';
import { View } from '../Custom';
import MessageItem, { MessageProps } from './MessageItem';

function MessageList({ messages }: { messages: MessageProps[] }) {
  return (
    <View className="m-3 w-full">
      {messages.map((messageProps, index) => (
        <>
          <MessageItem key={index} {...messageProps} />
          <View
            key={`divider-${index}`}
            className="my-2.5 border-b border-gray-300 dark:border-gray-800"
          />
        </>
      ))}
    </View>
  );
}

export default MessageList;
