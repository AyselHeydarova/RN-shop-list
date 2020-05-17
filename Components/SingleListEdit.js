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
import { Layout } from "../Commons/Layout";
import SaveIcon from "../assets/Save.png";
import { CustomInput } from "../Commons/CustomInput";

const mapStateToProps = (state) => ({
  allLists: state.lists.AllLists,
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

  const [units, setUnits] = useState([
    { unit: "pkg", clicked: false },
    { unit: "kg", clicked: false },
    { unit: "litre", clicked: false },
    { unit: "bott", clicked: false },
  ]);

  let LIST_TYPE;
  {
    props.route.params.listType === "OneTime"
      ? (LIST_TYPE = "OneTimeList")
      : (LIST_TYPE = "Regular");
  }

  const chosenListType = props.allLists.filter(
    (list) => list.listType === LIST_TYPE
  );

  const index = chosenListType.findIndex((list) => list.id === fields.listId);

  const handleFieldChange = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };
  const indexOfAllLists = props.allLists.findIndex(
    (list) => list.id === fields.listId
  );
  const allListItems = props.allLists[indexOfAllLists].listItems;

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

  const clickHandler = (index) => {
    const newUnits = [...units];
    newUnits.forEach((unit) => (unit.clicked = false));
    newUnits[index].clicked = true;
    setUnits(newUnits);
  };

  const unitHandler = (value) => {
    setFields((fields) => ({
      ...fields,
      unit: value,
    }));
  };

  const createListItem = () => {
    props.addListItem(fields);
    setFields((fields) => ({
      ...fields,
      name: "",
      count: 0,
    }));

    const newUnits = [...units];
    newUnits.forEach((unit) => (unit.clicked = false));
    setUnits(newUnits);
  };

  const handleDelete = (listItemId) => {
    props.deleteListItem({ listId: fields.listId, listItemId });
  };

  return (
    <Layout
      title={props.route.params.listName}
      source={SaveIcon}
      backBtn={true}
      onPress={() =>
        props.navigation.navigate("singleStatic", {
          listName: props.route.params.listName,
          listId: props.route.params.listId,
          listType: props.route.params.listType,
        })
      }
      goBack={() => props.navigation.goBack()}
    >
      <View style={styles.row}>
        <View style={styles.center}>
          <DefText weight="medium">position name</DefText>

          <CustomInput value={fields.name}
            onChangeText={(v) => handleFieldChange("name", v)}/>
         
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

        {units.map((unit, index) => (
          <View style={[styles.count, { opacity: unit.clicked ? 1 : 0.2 }]}>
            <TouchableOpacity
              onPress={(unit) => {
                unitHandler(unit.unit);
                clickHandler(index);
                console.log("clicked")
              }}
              key={index}
            >
              <DefText weight={unit.clicked ? "bold" : "regular"}>
                {unit.unit}
              </DefText>
            </TouchableOpacity>
          </View>
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
        {chosenListType[index].listItems.map((listItem) => (
          <ListItem
            listItemName={listItem.name}
            editPage={true}
            listItemId={listItem.id}
            key={listItem.id}
            unitName={listItem.unit}
            count={listItem.count}
            editHandler={() => handleEdit(listItem.id)}
            deleteHandler={() => handleDelete(listItem.id)}
          />
        ))}
      </View>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
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
    opacity: 1,
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
