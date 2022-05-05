import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { User } from '../../types';
import { Text, View, tw, Button } from '../Custom';

function ProfilePreview({ user }: { user: User }) {
  const nav = useNavigation<NavigationProp<RootStackParamList, 'Root'>>();
  return (
    <View className="my-1 border-b border-gray-400 py-3 dark:border-gray-600">
      <View className="mx-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row">
            <Image source={{ uri: user.image }} style={tw`h-14 w-14 rounded-full`} />
            <View className="ml-2.5">
              <Text className="font-comfortaa_bold text-lg">{user.username}</Text>
              <Text className="text-xs text-slate-500">{user.location}</Text>
            </View>
          </View>
          <View>
            <Button
              title="Edit"
              onPress={() => alert('Edit profile')}
              className="px-3 py-2"
              textStyle="text-xs"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProfilePreview;
