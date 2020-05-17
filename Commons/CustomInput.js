import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

export const CustomInput = (props) => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.gray,
    width: 340,
    padding: 15,
    borderRadius: 30,
  },
});
