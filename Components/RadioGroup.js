import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { DefText } from "./DefText";
import { COLORS } from "../styles/colors";
import { getEqualWidth } from "../utilities/getEqualWidth";

export const RadioGroup = ({
  options = [],
  onValueChange = () => {},
  value,
  contentContainerStyle,
}) => {
  const itemWidth = getEqualWidth(options.length);

  return (
    <View style={[styles.container, contentContainerStyle]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onValueChange(option)}
          style={{ width: itemWidth }}
        >
          <View
            style={[styles.radioItem, { opacity: option === value ? 1 : 0.5 }]}
          >
            <DefText weight={option === value ? "bold" : "regular"}>
              {option}
            </DefText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  radioItem: {
    height: 42,
    backgroundColor: COLORS.BG_SECONDARY,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
