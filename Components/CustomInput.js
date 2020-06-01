import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";
import { DefText } from "./DefText";

export const CustomInput = ({ style, label, ...rest }) => {
  return (
    <View style={[styles.container, style]}>
      <DefText weight="semi" style={styles.label}>
        {label}
      </DefText>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.BG_SECONDARY,
    height: 42,
    paddingHorizontal: 15,
    marginTop: 8,
    textAlign: "center",
    borderRadius: 25,
  },
  label: {
    textAlign: "center",
    fontSize: 11,
    color: COLORS.TEXT,
    opacity: 0.75,
  },
});
