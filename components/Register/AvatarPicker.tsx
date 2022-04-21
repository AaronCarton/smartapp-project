import { MaterialIcons } from '@expo/vector-icons';
import { Image, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import tw from 'twrnc';
import { View } from '../Custom';

/**
 * An avatar picker component, opens images so user can select an avatar.
 * @arg value Default user avatar
 * @arg onChange Callback to update the user avatar
 */
function AvatarPicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (imageURI: string) => void;
}) {
  const [image, setImage] = useState<string>(
    value ??
      'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg',
  );

  useEffect(() => {
    onChange(image);
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      // get image type
      let uri = result.uri;
      let filename = uri.split('/').pop() as string;

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename!);
      let type = match ? `image/${match[1]}` : `image`;

      setImage(uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => pickImage()}>
      <View className="relative mx-auto">
        <Image source={{ uri: image }} style={tw`w-40 h-40 rounded-full`} />
        <View className="absolute bottom-2 right-2 mx-auto rounded-full bg-[#f2f2f2] p-1.5">
          <MaterialIcons name="edit" size={32} color={'#ef4444'} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AvatarPicker;
