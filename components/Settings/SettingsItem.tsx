import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Text, View, tw } from '../Custom';

function SettingsItem({
  title,
  iconName,
  right,
  onPress,
}: {
  title: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  right?: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row justify-between border-b border-gray-400 py-4 px-2 dark:border-gray-600">
        <View className="flex-row">
          <Ionicons name={iconName} size={26} color="#64748B" style={tw`mr-2`} />
          <Text className="font-comfortaa_semibold">{title}</Text>
        </View>
        {right}
      </View>
    </TouchableOpacity>
  );
}

export default SettingsItem;
