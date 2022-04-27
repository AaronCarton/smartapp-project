import { Ionicons } from '@expo/vector-icons';
import { Text, View, tw } from '../Custom';

function SettingsItem({
  title,
  iconName,
}: {
  title: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
}) {
  return (
    <View className="flex-row border-b border-gray-400 py-4 px-2 dark:border-gray-600">
      <Ionicons name={iconName} size={26} color="#64748B" style={tw`mr-2`} />
      <Text className="font-comfortaa_semibold">{title}</Text>
    </View>
  );
}

export default SettingsItem;
