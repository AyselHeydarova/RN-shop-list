import React from "react";
import { View, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import { DefText } from "../Commons/DefText";
import { COLORS } from "../styles/colors";

export const ListView = ({ listName, listItemsLength, onPress, listId }) => {


  console.log('listId', listId)
  return (
    <TouchableOpacity style={styles.container} id={listId} onPress={()=> onPress(listId)}>
      <DefText weight="medium" style={styles.text}>
        {listName}
      </DefText>
      <DefText>{listItemsLength}</DefText>
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
});
