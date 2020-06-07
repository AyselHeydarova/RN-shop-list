import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  
} from "react-native";
import { DefText } from "../../Commons/DefText";
import { COLORS } from "../../styles/colors";
import { LIST_TYPES } from "../../utilities/listTypes";

export const ListView = 
  ({
    listName,
    listItemsLength,
    onPress,
    onLongPress,
    boughtCount,
    
  }) => {
    const progressPercentage = (boughtCount / listItemsLength) * 100;

    const validation = listType === LIST_TYPES.ONETIME && progressPercentage === 100;
    
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View style={[styles.container, { opacity: validation ? 0.5 : 1 }]}>
          <View style={styles.row}>
            <DefText weight="medium" style={styles.text}>
              {listName}
            </DefText>
            <DefText weight="medium">
              {boughtCount} / {listItemsLength}
            </DefText>
          </View>

          <View style={styles.progressWrapper}>
            <View
              style={[
                styles.progress,
                progressPercentage
                  ? { width: `${progressPercentage} %` }
                  : null,
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: Dimensions.get("window").width - 40,
    borderRadius: 10,
    borderColor: COLORS.yellow,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressWrapper: {
    width: "100%",
    height: 20,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    marginTop: 5,
  },

  progress: {
    height: 20,
    width: 0,
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
  },
});
