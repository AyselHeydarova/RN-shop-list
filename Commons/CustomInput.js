import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

export const CustomInput = ({style, placeholder, onChangeText, value}) => {
  return <TextInput style={[styles.input, style]} placeholder={placeholder} onChangeText={onChangeText} value={value} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.gray,
    width: 280,
    padding: 9,
    borderRadius: 30,
  },
});
