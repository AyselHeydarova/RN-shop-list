import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";

import { CustomBtn } from "../Components/CustomBtn";
import { createList } from "../Store/lists";
import { Container } from "../Commons/Container";
import { CustomInput } from "../Components/CustomInput";
import { LIST_TYPES } from "../utilities/listTypes";
import { GLOBAL_STYLES } from "../styles/globalStyles";
import { genID } from "../utilities/genID";
import { RadioGroup } from "../Components/RadioGroup";

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

  const createListHandler = async () => {
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
    <Container>
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
        onPress={createListHandler}
        style={styles.topMargin}
      />
    </Container>
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
