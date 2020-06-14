import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Image, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

import { CustomBtn } from "../Components/CustomBtn";
import { Container } from "../Commons/Container";
import { CustomInput } from "../Components/CustomInput";
import { COLORS } from "../styles/colors";
import { changeUsernameAndAvatar } from "../Store/settings";
import { AuthForm } from "../Components/AuthForm";

import { getEqualWidth } from "../utilities/getEqualWidth";

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
    username: "",
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
      <View style={styles.imgWraper}>
        <Image
          source={{ uri: userAvatar }}
          style={styles.img}
          resizeMode="contain"
        />
      </View>

      <View style={styles.row}>
        <CustomBtn
          title="from Gallery"
          onPress={takeImageFromGallery}
          style={styles.btn}
          width={getEqualWidth(2)}
        />
        <CustomBtn
          title="Take Picture"
          onPress={takePicture}
          style={styles.btn}
          width={getEqualWidth(2)}
        />
      </View>

      <CustomBtn
        title="Save Changes"
        onPress={saveChangesHandler}
        style={styles.btn}
      />

      <AuthForm />
    </Container>
  );
});

const styles = StyleSheet.create({
  btn: {
    marginBottom: 10,
  },

  img: {
    width: "100%",
    height: "100%",
  },

  imgWraper: {
    alignSelf: "center",
    width: 80,
    height: 80,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.BG_PRIMARY,
    borderRadius: 50,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
});
