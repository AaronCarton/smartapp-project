import { Text, View, tw } from '../Custom';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

function ResultButton({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
}) {
  return (
    <Pressable onPress={() => onPress()} style={{ flex: 3 / 7, margin: 5 }}>
      <View className="items-center rounded-xl border border-neutral-100 bg-white p-10 shadow-md dark:border-slate-600 dark:bg-slate-700">
        <MaterialCommunityIcons
          name={icon}
          size={38}
          color="#ef4444"
          style={tw`text-center`}
        />
        <Text className="font-comfortaa_bold text-base">{title}</Text>
      </View>
    </Pressable>
  );
}

export default ResultButton;
