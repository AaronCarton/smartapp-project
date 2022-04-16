import { View, Button } from 'react-native';
import tw from 'twrnc';

function AdopButton() {
  return (
    <View style={tw`mb-4`}>
      <Button title="Adopt me" color={'#ef4444'} onPress={() => {}} />
    </View>
  );
}

export default AdopButton;
