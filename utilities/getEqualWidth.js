import { Dimensions } from "react-native";
import { GLOBAL_STYLES } from "../styles/globalStyles";

export function getEqualWidth(itemCount) {
  const equalWidth =
    (Dimensions.get("window").width - GLOBAL_STYLES.PADDING * (itemCount + 1)) /
    itemCount;

  return equalWidth;
}
