import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default (props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
  size?: number;
}) => {
  return <MaterialIcons size={32} {...props} />;
};
