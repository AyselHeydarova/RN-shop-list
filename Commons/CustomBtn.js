import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { COLORS } from "../styles/colors";
import { DefText } from "../Commons/DefText";

export const CustomBtn = ({ title, onPress, style }) => {
  return (
    <View>
      <TouchableOpacity style = {{...styles.wrapper, ...style}} onPress={onPress}> 
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
    backgroundColor: COLORS.red,
    width: 340,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 10
  },

  text: {
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
