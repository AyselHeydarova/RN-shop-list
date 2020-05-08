import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../styles/colors";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text>I am A HomePage!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;
