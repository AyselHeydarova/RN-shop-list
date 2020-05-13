import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { COLORS } from "../styles/colors";
import { DefText } from "../Commons/DefText";
import { CustomBtn } from "../Commons/CustomBtn";
import { ListItem } from "../Components/ListItem";

import { addListItem, deleteListItem, updateListItem } from "../Store/lists";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  OneTimeLists: state.lists.AllLists.filter(
    (list) => list.listType === "OneTimeList"
  ),
  RegularLists: state.lists.AllLists.filter(
    (list) => list.listType === "Regular"
  ),
  allLists: state.lists.AllLists
});
const SingleListEdit = connect(mapStateToProps, {
  addListItem,
  deleteListItem,
  updateListItem,
})((props) => {
  const [fields, setFields] = useState({
    listId: props.route?.params?.listId,
    listItemId: "",
    name: "",
    count: 0,
    unit: "kg",
  });

  const [itemEditMode, setItemEditMode] = useState(false);

  const units = ["pkg", "kg", "litre", "bott"];

  const indexOfListOneTime = props.OneTimeLists.findIndex(
    (list) => list.id === fields.listId
  );

  const indexOfListRegular = props.RegularLists.findIndex(
    (list) => list.id === fields.listId
  );

  const indexOfAllLists = props.allLists.findIndex(
    (list) => list.id === fields.listId
  );

  const handleFieldChange = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const allListItems = props.allLists[indexOfAllLists].listItems


  const handleEdit = (idvalue) => {
    const indexOfListItem = allListItems.findIndex(
      (listItem) => listItem.id === idvalue
    );
    setItemEditMode(true);
    setFields((fields) => ({
      ...fields,
      ...allListItems[indexOfListItem],
      listItemId: idvalue,
    }));
  };

  const updateItem = () => {
    props.updateListItem(fields);
  };

  const increment = () => {
    setFields((fields) => ({
      ...fields,
      count: fields.count + 1,
    }));
  };

  const decrement = () => {
    setFields((fields) => ({
      ...fields,
      count: fields.count - 1,
    }));
  };

  const unitHandler = (value) => {
    setFields((fields) => ({
      ...fields,
      unit: value,
    }));
  };

  const createListItem = () => {
    props.addListItem(fields);
  };

  const handleDelete = (listItemId) => {
    props.deleteListItem({ listId: fields.listId, listItemId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.center}>
          <DefText weight="medium">position name</DefText>
          <TextInput
            style={styles.input}
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
        {units.map((unit) => (
          <TouchableOpacity
            style={styles.count}
            onPress={() => {
              unitHandler(unit);
            }}
          >
            <DefText>{unit}</DefText>
          </TouchableOpacity>
        ))}
      </View>

      {itemEditMode ? (
        <View style={styles.row}>
          <CustomBtn
            title="cancel"
            style={{ width: 150 }}
            onPress={() => setItemEditMode(false)}
          />
          <CustomBtn
            title="update"
            style={{ width: 150 }}
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

      <View>
        {props.route.params.listType === "OneTime"
          ? props.OneTimeLists[indexOfListOneTime].listItems.map((listItem) => (
              <ListItem
                listItemName={listItem.name}
                editPage={true}
                listItemId={listItem.id}
                unitName={listItem.unit}
                count={listItem.count}
                editHandler={() => handleEdit(listItem.id)}
                deleteHandler={() => handleDelete(listItem.id)}
              />
            ))
          : props.RegularLists[indexOfListRegular].listItems.map((listItem) => (
              <ListItem
                listItemName={listItem.name}
                editPage={true}
                listItemId={listItem.id}
                unitName={listItem.unit}
                count={listItem.count}
                editHandler={() => handleEdit(listItem.id)}
                deleteHandler={() => handleDelete(listItem.id)}
              />
            ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
  input: {
    backgroundColor: COLORS.gray,
    width: 270,
    height: 42,
    borderRadius: 45,
    paddingHorizontal: 15,
    margin: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  center: {
    display: "flex",
    alignItems: "center",
  },
  count: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.gray,
    height: 40,
    width: 80,
    borderRadius: 30,
    margin: 10,
  },

  line: {
    height: 2,
    width: Dimensions.get("window").width,
    backgroundColor: COLORS.gray,
    marginVertical: 20,
  },
});

export default SingleListEdit;
