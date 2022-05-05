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
  aspect,
}: {
  value?: string;
  onChange: (imageURI: string) => void;
  aspect: [number, number];
}) {
  const [image, setImage] = useState<string>(
    value ?? 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg',
  );

  useEffect(() => {
    let img =
      image ===
      'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'
        ? ''
        : image;
    onChange(img);
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspect,
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
        <Image source={{ uri: image }} style={tw`w-60 h-40 rounded-lg`} />
        <View
          className={`absolute bottom-2 right-2 mx-auto rounded-lg bg-[#f2f2f2] p-1.5`}
        >
          <MaterialIcons name="edit" size={32} color={'#ef4444'} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AvatarPicker;
