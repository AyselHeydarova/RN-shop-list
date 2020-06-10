import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";

import { CustomBtn } from "../Commons/CustomBtn";
import { createList } from "../Store/lists";
import { Layout } from "../Commons/Layout";
import { CustomInput } from "../Commons/CustomInput";
import { LIST_TYPES } from "../utilities/listTypes";
import { GLOBAL_STYLES } from "../styles";
import { genID } from "../utilities/genID";

const createFieldsInitialState = {
  name: "",
  listType: LIST_TYPES.ONETIME,
};

export const CreateList = connect(null, {
  createList,
})(({ navigation, createList }) => {
  const [listFields, setListFields] = useState(createFieldsInitialState);

  const fieldChangeHandler = (name, value) => {
    setListFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const createList = async () => {
    if (listFields.name.trim() === "") {
      Alert.alert("Enter list name", "It is required");
      return;
    }
    const listId = genID();
    await createList({ ...listFields, listId });
    navigation.navigate("List", {
      listName: listFields.name,
      listType: listFields.listType,
      isEditMode: true,
      listId,
    });
    setListFields(createFieldsInitialState);
  };
  return (
    <Layout title={"New List"} backBtn={false}>
      <CustomInput
        placeholder="Something for me"
        value={listFields.name}
        title="list name"
        onChangeText={(value) => fieldChangeHandler("name", value)}
      />

      <RadioGroup
        value={listFields.listType}
        onValueChange={(value) => fieldChangeHandler("listType", value)}
        options={Object.keys(LIST_TYPES)}
        contentContainerStyle={styles.topMargin}
      />

      <CustomBtn
        title="Create List"
        onPress={createList}
        style={style.topMargin}
      />
    </Layout>
  );
});
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },

  topMargin: {
    marginTop: 14,
  },
});
