import { Image } from 'react-native';
import { Text, View, tw } from '../components/Custom';
import MessageItem from '../components/Messages/MessageItem';
import MessageList from '../components/Messages/MessageList';

export default () => {
  let dummy_message_list = [
    {
      avatar:
        'https://scontent-bru2-1.xx.fbcdn.net/v/t1.6435-9/178462305_1977835462354879_5722545480825483274_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=X_NfMoAAHvsAX-JwVf9&_nc_ht=scontent-bru2-1.xx&oh=00_AT_2FJ-C802gcpvYvGqFnpfxafx1fPqhBxgMzW2CsQTeoQ&oe=6289C681',
      name: 'Monique',
      message: 'Hiya! I was wondering if Bailey is sti...',
      time: '4:16 pm',
    },
    {
      avatar:
        'https://scontent-bru2-1.xx.fbcdn.net/v/t31.18172-1/14409507_10210333150626382_6164119766069332529_o.jpg?stp=dst-jpg_p320x320&_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_ohc=S9lkETZkkWkAX_Luldj&_nc_ht=scontent-bru2-1.xx&oh=00_AT-m5WUTmOc_PuEJB2rje39lmM6JZQIbpjYblt6UGOOHtQ&oe=628B6D7B',
      name: 'Lieven',
      message: 'How old is the dog?',
      time: '1:25 pm',
    },
    {
      avatar:
        'https://scontent-bru2-1.xx.fbcdn.net/v/t39.30808-1/249171248_3045414709007559_1515231592711080850_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=lJZYYjzysxQAX-6KTmr&_nc_ht=scontent-bru2-1.xx&oh=00_AT9wXTUrSy4ayG2q3N2-nS2roKGQkCZCdhREV5Rdr7Cumw&oe=626B0735',
      name: 'Dries',
      message: 'Any allergies I should know about?',
      time: '8:25 pm',
    },
  ];

  return <MessageList messages={dummy_message_list} />;
};
