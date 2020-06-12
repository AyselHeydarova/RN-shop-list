import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const KeyboardDismiss = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);
