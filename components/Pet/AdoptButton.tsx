import { View, Button } from '../Custom';

function AdopButton({ onPress }: { onPress: () => void }) {
  return (
    <View className="mb-4">
      <Button title="Adopt me" onPress={onPress} />
    </View>
  );
}

export default AdopButton;
