import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

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

function HeartToggle({ enabled }: { enabled: boolean }) {
  var [toggled, setToggled] = useState(enabled);
  return (
    <Ionicons
      color={toggled ? '#ef4444' : '#f1f5f9'}
      name={toggled ? 'heart' : 'heart-outline'}
      size={28}
      onPress={() => setToggled(!toggled)}
    />
  );
}

function GenderIcon({ gender }: { gender: 'male' | 'female' }) {
  var style =
    gender == 'male'
      ? { marginLeft: 3, bottom: -3 }
      : { marginLeft: 3, bottom: -4 };
  return (
    <Ionicons
      name={gender}
      size={25}
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
