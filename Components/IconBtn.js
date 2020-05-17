import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export const IconBtn = ({ source, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    marginRight: 16,
    marginTop: 10,
  },
});
