import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

const CreateList = () => {
  return (
    <View style={styles.container}>
      <Text>I ammm New LIst page</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateList;
