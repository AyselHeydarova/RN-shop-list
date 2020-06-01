import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const COUNT_TYPES = ["pkg", "kg", "litre", "bott"];

export const ListForm = () => {
  const [fields, setFields] = useState({
    name: "",
    count: 0,
    countType: "pkg",
  });

  return (
    <View style={styles.row}>
    <View style={styles.center}>
      <DefText weight="medium">position name</DefText>

      <CustomInput
        value={fields.name}
        onChangeText={(v) => handleFieldChange("name", v)}
      />
    </View>

    <View style={styles.center}>
      <DefText weight="medium">count</DefText>
      <View style={styles.count}>
        <TouchableOpacity onPress={decrement}>
          <DefText weight="bold">-</DefText>
        </TouchableOpacity>
        <DefText weight="bold">{fields.count}</DefText>

        <TouchableOpacity onPress={increment}>
          <DefText weight="bold">+</DefText>
        </TouchableOpacity>
      </View>
    </View>
  </View>

  <View style={styles.row}>
    {units.map((item, index) => (
      <View style={[styles.count, { opacity: item.clicked ? 1 : 0.2 }]}>
        <TouchableOpacity
          onPress={() => {
            unitHandler(item.unit);
            clickHandler(index);
            console.log("clicked");
          }}
          key={index}
        >
          <DefText weight={item.clicked ? "bold" : "regular"}>
            {item.unit}
          </DefText>
        </TouchableOpacity>
      </View>
    ))}
  </View>

  {itemEditMode ? (
    <View style={styles.row}>
      <CustomBtn
        title="cancel"
        style={{ width: 150, marginRight: 10 }}
        onPress={() => setItemEditMode(false)}
      />
      <CustomBtn
        title="update"
        style={{ width: 150, marginLeft: 10 }}
        onPress={updateItem}
      />
    </View>
  ) : (
    <CustomBtn
      title="Add to list"
      style={{ width: 340 }}
      onPress={createListItem}
    />
  )}

  <View style={styles.line} />
  )
};
