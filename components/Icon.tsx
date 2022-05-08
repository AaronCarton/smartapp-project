import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface GenericIconProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color?: string;
  size?: number;
}

interface TabIconProps {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
  size?: number;
}

function Icon(props: GenericIconProps) {
  return <Ionicons size={32} {...props} />;
}

function HeartToggle({
  size,
  value,
  onPress,
}: {
  size?: number;
  value: boolean;
  onPress: (value: boolean) => void;
}) {
  return (
    <Ionicons
      color={value ? '#ef4444' : '#f1f5f9'}
      name={value ? 'heart' : 'heart-outline'}
      size={size ?? 28}
      onPress={() => onPress(!value)}
    />
  );
}

function GenderIcon({ gender, size }: { gender: 'male' | 'female'; size?: number }) {
  var style =
    gender == 'male' ? { marginLeft: 3, bottom: -3 } : { marginLeft: 3, bottom: -4 };
  return (
    <Ionicons
      name={gender}
      size={size ?? 25}
      color={gender == 'male' ? '#02a3fe' : '#ea48a0'}
      style={style}
    />
  );
}

function TabIcon(props: TabIconProps) {
  return <MaterialIcons size={32} {...props} />;
}

export default Icon;
export { GenderIcon, TabIcon, Icon, HeartToggle };
