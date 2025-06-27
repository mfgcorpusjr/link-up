import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

type MediaTypes = ImagePicker.MediaType[];

const useMediaPicker = () => {
  const [media, setMedia] = useState<ImagePicker.ImagePickerAsset>();

  const pickMedia = async (mediaTypes: MediaTypes = ["images"]) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Media Library permission is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  };

  return {
    media,
    pickMedia,
  };
};

export default useMediaPicker;
