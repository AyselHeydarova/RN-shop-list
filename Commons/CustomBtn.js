import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { COLORS } from "../styles/colors";
import { DefText } from "../Commons/DefText";

export const CustomBtn = ({ title, onPress, style }) => {
  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.wrapper, ...style }}
        onPress={onPress}
      >
        <DefText style={styles.text} weight="bold">
          {title}
        </DefText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.red,
    width: 350,
    height: 42,
    borderRadius: 30,
    marginTop: 10,
  },

  text: {
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
