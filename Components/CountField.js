import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomInput } from "./CustomInput";
import { DefText } from "./DefText";


export const CountField = ({onChangeText, value, ...rest}) => {
  const onChangeHandler = (value) => {
    if (value < 0 || isNaN(value)) {
      return;
    }
    onChangeText(+value);
  };

  const increment = () => onChangeHandler(+value + 1);
  const decrement = () => onChangeHandler(+value - 1);

  return (
    <View>
      <TouchableOpacity style={[styles.btn, styles.minus]} onPress={decrement}>
        <DefText weight="bold" style={styles.btnText}>
          -
        </DefText>
      </TouchableOpacity>
      <CustomInput
        {...rest}
        value={value.toString()}
        keyboardType="number-pad"
        onChangeText={onChangeHandler}
      />

      <TouchableOpacity style={[styles.btn, styles.plus]} onPress={increment}>
        <DefText weight="bold" style={styles.btnText}>
          +
        </DefText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    height: 42,
    width: 30,
    zIndex: 2,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  minus: {
    left: 0,
  },
  plus: {
    right: 0,
  },
});
