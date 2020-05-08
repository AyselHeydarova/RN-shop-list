import * as Font from "expo-font";
import MontserratRegular from "../assets/Fonts/Montserrat-Regular.ttf";
import MontserratMedium from "../assets/Fonts/Montserrat-Medium.ttf";
import MontserratBold from "../assets/Fonts/Montserrat-Bold.ttf";

export const loadFonts = () => {
  return Font.loadAsync({
    MontserratRegular,
    MontserratMedium,
    MontserratBold,
  });
};
