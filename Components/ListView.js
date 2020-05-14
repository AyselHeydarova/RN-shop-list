import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View } from "react-native";
import { DefText } from "../Commons/DefText";
import { COLORS } from "../styles/colors";

export const ListView = ({
  listName,
  listItemsLength,
  onPress,
  listId,
  boughtCount,
}) => {

  const progressPercentage =  boughtCount/listItemsLength  ;
  return (
    <TouchableOpacity
      style={styles.container}
      id={listId}
      onPress={() => onPress(listId)}
    >
      <DefText weight="medium" style={styles.text}>
        {listName}
      </DefText>
      <DefText>
        {boughtCount}/ {listItemsLength}
      </DefText>

      <View style={styles.progressWrapper}>
        <View style={[styles.progress , progressPercentage ? {width: 300 * progressPercentage} : null]} />
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

  progressWrapper: {
    width: 300,
    height: 20,
    backgroundColor: COLORS.gray,
    borderRadius: 10
  },

  progress: {
    height: 20,
    width: 0,
    backgroundColor: COLORS.yellow,
    borderRadius: 10
  }
});
