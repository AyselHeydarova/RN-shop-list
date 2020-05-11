import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../styles/colors";
import { DefText } from "../Commons/DefText";

const RegularLists = () => {
  return (
    <View style={styles.container}>
      <DefText >Regular Listsss!!</DefText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});

export default RegularLists;
