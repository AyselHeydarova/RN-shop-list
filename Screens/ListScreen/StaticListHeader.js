import React from "react";
import { View, Alert, StyleSheet } from "react-native";

import { GLOBAL_STYLES } from "../../styles/globalStyles";
import { LIST_TYPES } from "../../utilities/listTypes";
import { CustomBtn } from "../../Components/CustomBtn";
import { DefText } from "../../Components/DefText";

export const StaticListHeader = ({ listType, products, onReset }) => {
  const boughtCount = products.filter((product) => product.bought).length;

  const onResetPress = () => {
    Alert.alert("Reset List", "Do you want to reset list?", [
      { text: "No", style: "cancel" },
      { text: "Yes, reset", onPress: onReset },
    ]);
  };
  return (
    <View style={styles.row}>
      <View>
        {listType === LIST_TYPES.REGULAR && (
          <CustomBtn
            title="reset"
            style={styles.reset}
            fontStyle={{ fontSize: 10 }}
            onPress={onResetPress}
          />
        )}
      </View>
      <DefText weight="medium" style={styles.info}>
        {boughtCount} / {products.length}
      </DefText>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },

  reset: {
    height: 19,
    paddingVertical: 3,
    paddingHorizontal: 17,
  },

  info: {
    fontSize: 14,
  },
});
