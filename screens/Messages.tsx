import { Image } from 'react-native';
import { Text, View, tw } from '../components/Custom';
import MessageItem from '../components/Messages/MessageItem';
import MessageList from '../components/Messages/MessageList';

import { BASE_URL } from '../requests';

export default () => {
  let dummy_message_list = [
    {
      avatar: `${BASE_URL}/images/users/6277d9e11132e1cd98a38cb4.webp`,
      name: 'Monique',
      message: 'Hiya! I was wondering if Bailey is sti...',
      time: '4:16 pm',
    },
    {
      avatar: `${BASE_URL}/images/users/6277da3b1132e1cd98a38cb5.webp`,
      name: 'Lieven',
      message: 'How old is the dog?',
      time: '1:25 pm',
    },
    {
      avatar: `https://i.imgur.com/czrRSt3.jpg`,
      name: 'Harold',
      message: 'Any allergies I should know about?',
      time: '8:25 pm',
    },
  ];

  return <MessageList messages={dummy_message_list} />;
};
