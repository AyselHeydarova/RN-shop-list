import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { COLORS } from "../styles/colors";
import { DefText } from "./DefText";

export const CustomBtn = ({ title, onPress, style, textStyle, width }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ width }}>
      <View style={{ ...styles.wrapper, ...style }}>
        <DefText style={{ ...styles.text, ...textStyle }} weight="bold">
          {title}
        </DefText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.BG_PRIMARY,
    height: 42,
    borderRadius: 25,
  },

  text: {
    color: COLORS.HEADER_COLOR,
    fontSize: 14,
    textTransform: "uppercase",
  },
});
