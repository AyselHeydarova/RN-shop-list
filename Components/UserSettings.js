import React, { useState, useEffect } from "react";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";
import { connect } from "react-redux";
import { changeUsernameAndUrl } from "../Store/lists";
import { Layout } from "../Commons/Layout";
import { CustomInput } from "../Commons/CustomInput";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { Image } from "react-native";
import { COLORS } from "../styles/colors";

const mapStateToProps = (state) => ({
  userData: state.userSettings,
});

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

export const UserSettings = connect(mapStateToProps, { changeUsernameAndUrl })(
  (props) => {
    const [userFields, setUserFields] = useState({
      username: "username",
      url: "",
    });

    useEffect(() => {
      getPermissions().then((answer) =>
        console.log("Permission answer", answer)
      );
    }, []);

    const username = userFields.username;
    const url = userFields.url;

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
        url: image.uri,
      }));
    };

    const takePicture = async () => {
      const image = await ImagePicker.launchCameraAsync();
      setUserFields((fields) => ({
        ...fields,
        url: image.uri,
      }));
    };

    const saveChangesHandler = () => {
      props.changeUsernameAndUrl({ username, url });
    };

    return (
      <Layout title={"User Settings"} backBtn={false}>
        <DefText weight="medium">username</DefText>

        <CustomInput
          placeholder="Enter your Name"
          style={{ width: "100%" }}
          onChangeText={(v) => handleFieldChange("username", v)}
        />

        {/* <DefText weight="medium">Enter avatar url</DefText>

        <CustomInput
          value={userFields.url}
          placeholder="Enter avatar url"
          style={{ width: "100%" }}
          onChangeText={(v) => handleFieldChange("url", v)}
        />

        <DefText weight="medium">or take image from Gallery</DefText> */}
        <Image
          source={{ uri: url }}
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
      </Layout>
    );
  }
);
