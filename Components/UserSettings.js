import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../styles/colors";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { changeUsername } from "../Store/lists";

export const UserSettings = () => {

  const [userFields, setUserFields] = useState({
    username: "username",
    url: ""
  })

  const handleFieldChange=(name, value) => {
    setUserFields(
      (fields) => ({
        ...fields,
        [name]: value
      })
    )
  }

  return (
    <View style={styles.container}>
      <DefText weight="medium">username</DefText>
      <DefText weight="medium">{userFields.username}</DefText>
      <DefText weight="medium">{userFields.url}</DefText>
      <TextInput style={styles.input} placeholder="Enter your Name" onChangeText={(v)=> handleFieldChange("username",v)} />

      <DefText weight="medium">avatar url</DefText>
      <TextInput style={styles.input} placeholder="Enter avatar url" onChangeText={(v)=> handleFieldChange("url",v)}/>

      <CustomBtn title="Save Changes" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },

  input: {
    backgroundColor: COLORS.gray,
    width: 340,
    padding: 15,
    borderRadius: 30,
  },
});
