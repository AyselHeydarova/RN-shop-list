import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS } from "../styles/colors";
import { GLOBAL_STYLES } from "../styles/globalStyles";
import { KeyboardDismiss } from "./KeyboardDismiss";

export const Container = ({ children, style }) => {
  return (
    <View style={styles.container}>
      <KeyboardDismiss>
        <View style={[styles.main, style]}>{children}</View>
      </KeyboardDismiss>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_PRIMARY,
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
    paddingVertical: GLOBAL_STYLES.PADDING,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
});
