import * as Font from "expo-font";
import MontserratRegular from "../assets/Fonts/Montserrat-Regular.ttf";
import MontserratMedium from "../assets/Fonts/Montserrat-Medium.ttf";
import MontserratBold from "../assets/Fonts/Montserrat-Bold.ttf";
import MontserratSemiBold from "../assets/Fonts/Montserrat-SemiBold.ttf";

export const loadFonts = () => {
  return Font.loadAsync({
    MontserratRegular,
    MontserratMedium,
    MontserratSemiBold,
    MontserratBold,
  });
};

export const FONT_FAMILIES = {
  regular: "MontserratRegular",
  medium: "MontserratMedium",
  semi: "MontserratSemiBold",
  bold: "MontserratBold",
};
