import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { DefText } from "../../Components/DefText";
import { COLORS } from "../../styles/colors";
import { LIST_TYPES } from "../../utilities/listTypes";

export const ListView = ({
  listName,
  listItemsLength,
  listType,
  onPress,
  onLongPress,
  boughtCount,
}) => {
  const progressPercentage = (boughtCount / listItemsLength) * 100;

  const validation =
    listType === LIST_TYPES.ONETIME && progressPercentage === 100;

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={[styles.container, { opacity: validation ? 0.5 : 1 }]}>
        <View style={styles.row}>
          <DefText weight="semi" style={styles.text}>
            {listName}
          </DefText>
          <DefText weight="semi" style={styles.progressInNums}>
            {boughtCount} / {listItemsLength}
          </DefText>
        </View>

        <View style={styles.progressWrapper}>
          <View
            style={[
              styles.progress,
              progressPercentage ? { width: `${progressPercentage} %` } : null,
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: COLORS.SECONDARY,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 15,
    marginBottom: 13,
  },
  text: {
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  progressWrapper: {
    height: 19,
    backgroundColor: COLORS.BG_SECONDARY,
    borderRadius: 20,
    marginTop: 8,
  },

  progress: {
    height: 19,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
  },

  progressInNums: {
    fontSize: 12,
  },
});
