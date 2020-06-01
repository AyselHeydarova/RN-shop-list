import React from "react";
import { Text } from "react-native";

const families = {
  regular: "MontserratRegular",
  medium: "MontserratMedium",
  bold: "MontserratBold",
};
export const DefText = ({ style, weight, children }) => {
  return (
    <Text
      style={{ fontFamily: families[weight] || families.regular, ...style }}
    >
      {children}
    </Text>
  );
};
