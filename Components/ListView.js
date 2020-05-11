import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DefText } from "../Commons/DefText";
import { COLORS } from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ListView = ({ listName, listItemsLength, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("singleEdit")}
    >
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
