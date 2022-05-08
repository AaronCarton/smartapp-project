import { Image, Modal, Pressable } from 'react-native';
import { Button, Text, tw, View } from './Custom';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../types';
import { BottomTabParamList } from '../navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useDarkMode from '../hooks/darkmode';

function ProfileModal({
  user,
  shown,
  onChangeShown,
}: {
  user: User;
  shown: boolean;
  onChangeShown: (visible: boolean) => void;
}) {
  const tabNav = useNavigation<NavigationProp<BottomTabParamList, 'Home'>>();
  const { colorScheme } = useDarkMode();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={shown}
      onRequestClose={() => {
        onChangeShown(!shown);
      }}
    >
      <View className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <View className="mx-auto rounded-md border border-neutral-200 bg-neutral-100 p-5 shadow-md dark:border-slate-600 dark:bg-slate-700">
          <Pressable
            style={tw`absolute top-0 right-0 p-2`}
            onPress={() => onChangeShown(!shown)}
          >
            <Ionicons
              name="close"
              size={30}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
          </Pressable>
          <View className="mx-3 mb-1 h-auto items-center">
            <Image
              source={{ uri: user.image }}
              style={tw`h-32 w-32 rounded-full mt-5 mb-3`}
            />
            <Text className="font-comfortaa_bold text-2xl font-thin leading-none">
              {user.username}
            </Text>
            <Text className="mt-[-6px]">{user.location}</Text>
            <Text className="mt-2 mb-5 w-44 text-center">{user.bio}</Text>
            <Button
              title="Message me"
              className=""
              onPress={() => tabNav.navigate('Messages')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ProfileModal;
