import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Keyboard } from "react-native";

import { CountField } from "../../Components/CountField";
import { RadioGroup } from "../../Components/RadioGroup";
import { getEqualWidth } from "../../utilities/getEqualWidth";
import { COLORS } from "../../styles/colors";
import { CustomInput } from "../../Components/CustomInput";
import { CustomBtn } from "../../Components/CustomBtn";

const UNITS = ["pkg", "kg", "litre", "bott"];

const fieldsInitialState = {
  name: "",
  count: 1,
  unit: UNITS[0],
};

export const ListForm = ({
  onCreateSubmit,
  singleProductEditState,
  onProductUpdateSubmit,
  onProductUpdateCancel,
}) => {
  const [fields, setFields] = useState(fieldsInitialState);

  useEffect(() => {
    if (singleProductEditState.status) {
      setFields(singleProductEditState.product);
    }
  }, [singleProductEditState]);

  const handleFieldChange = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const resetForm = () => setFields(fieldsInitialState);

  const validateForm = () => {
    if (fields.name.trim() === "") {
      Alert.alert("Enter product name", "name is required");
      return false;
    } else if (fields.count < 1) {
      Alert.alert("Invalid count", "Enter count bigger than 0");
      return false;
    }
    return true;
  };

  const updateItem = () => {
    if (validateForm()) {
      onProductUpdateSubmit(fields);
      resetForm();
    }
  };

  const updateCancel = () => {
    onProductUpdateCancel();
    resetForm();
  };

  const createListItem = () => {
    if (validateForm()) {
      onCreateSubmit(fields);
      resetForm();
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomInput
          value={fields.name}
          label="position name"
          style={styles.name}
          onChangeText={(v) => handleFieldChange("name", v)}
        />
        <CountField
          value={fields.count}
          label="count"
          onChangeText={(v) => handleFieldChange("count", v)}
          style={styles.count}
        />
      </View>

      <View style={styles.unitsWrapper}>
        <RadioGroup
          value={fields.unit}
          onValueChange={(v) => handleFieldChange("unit", v)}
          options={UNITS}
        />
      </View>

      {singleProductEditState.status ? (
        <View style={styles.row}>
          <CustomBtn
            title="cancel"
            style={styles.cancel}
            width={getEqualWidth(2)}
            onPress={updateCancel}
          />
          <CustomBtn
            title="update"
            width={getEqualWidth(2)}
            onPress={updateItem}
          />
        </View>
      ) : (
        <CustomBtn title="Add to list" onPress={createListItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 21,
    borderBottomColor: COLORS.BG_SECONDARY,
    borderBottomWidth: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    width: getEqualWidth(2) * (3 / 2),
  },

  count: {
    width: getEqualWidth(2) * (1 / 2),
  },

  unitsWrapper: {
    marginTop: 14,
    marginBottom: 14,
  },
  cancel: {
    opacity: 0.6,
  },
});
