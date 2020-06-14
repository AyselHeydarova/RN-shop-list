import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../styles/globalStyles";

export const IconBtn = ({ source, onPress, side }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.icon,
        {
          marginRight: side === "right" ? GLOBAL_STYLES.PADDING : 0,
          marginLeft: side === "left" ? GLOBAL_STYLES.PADDING : 0,
        },
      ]}
    >
      <Image resizeMode="contain" source={source} style={styles.iconImg} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },

  iconImg: {
    width: "100%",
    height: "100%",
  },
});
