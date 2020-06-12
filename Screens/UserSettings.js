import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { CustomBtn } from "../Components/CustomBtn";
import { Container } from "../Commons/Container";
import { CustomInput } from "../Components/CustomInput";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { Image } from "react-native";
import { COLORS } from "../styles/colors";
import { changeUsernameAndAvatar } from "../Store/settings";

const getPermissions = async () => {
  try {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status != "granted") {
      console.log("Access denied");
      return false;
    }
    return true;
  } catch (error) {
    console.log("catched error", error);
  }
};

export const UserSettings = connect(null, {
  changeUsernameAndAvatar,
})(({ navigation, changeUsernameAndAvatar }) => {
  const [userFields, setUserFields] = useState({
    username: "username",
    userAvatar: "",
  });

  useEffect(() => {
    getPermissions().then((answer) => console.log("Permission answer", answer));
  }, []);

  const username = userFields.username;
  const userAvatar = userFields.userAvatar;

  const handleFieldChange = (name, value) => {
    setUserFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const takeImageFromGallery = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    const newPath = `${FileSystem.documentDirectory}${image.uri
      .split("/")
      .pop()}`;

    const result = await FileSystem.moveAsync({
      from: image.uri,
      to: newPath,
    });

    image.uri = newPath;

    setUserFields((fields) => ({
      ...fields,
      userAvatar: image.uri,
    }));
  };

  const takePicture = async () => {
    const image = await ImagePicker.launchCameraAsync();
    setUserFields((fields) => ({
      ...fields,
      userAvatar: image.uri,
    }));
  };

  const saveChangesHandler = () => {
    changeUsernameAndAvatar({ username, userAvatar });
    navigation.navigate("Home");
  };

  return (
    <Container>
      <CustomInput
        placeholder="Enter your Name"
        label="user name"
        value={userFields.username}
        onChangeText={(v) => handleFieldChange("username", v)}
      />
      <Image
        source={{ uri: userAvatar }}
        style={{
          width: 100,
          height: 100,
          marginTop: 10,
          borderWidth: 2,
          borderColor: COLORS.red,
          borderRadius: 50,
        }}
      />
      <CustomBtn
        title="Take image from Gallery"
        onPress={takeImageFromGallery}
      />
      <CustomBtn title="Take Picture" onPress={takePicture} />
      <CustomBtn title="Save Changes" onPress={saveChangesHandler} />
      </Container>
  );
});
