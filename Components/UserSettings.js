import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../styles/colors";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";
import { TouchableOpacity } from "react-native-gesture-handler";

export const UserSettings = () => {

  return (
    <View style={styles.container}>
      <DefText weight="medium">username</DefText>
      <TextInput style={styles.input} placeholder="Enter your Name" />

      <DefText weight="medium">avatar url</DefText>
      <TextInput style={styles.input} placeholder="Enter avatar url" />

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
