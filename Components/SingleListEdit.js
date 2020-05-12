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

import { addListItem } from "../Store/lists";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  OneTimeLists: state.lists.OneTimeLists,
});
const SingleListEdit = connect(mapStateToProps, { addListItem })((props) => {

  const [fields, setFields] = useState({
    listId: props.route?.params?.listId,
    name: "",
    count: 0,
    unit: "kg",
  });

  const[itemEditMode, setItemEditMode] = useState (false)
  


  const indexOfList = props.OneTimeLists.findIndex(
    (list) => list.id === fields.listId
  );

  const handleFieldChange = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const handleEdit = () => {
setItemEditMode(true);
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

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.center}>
          <DefText weight="medium">position name</DefText>
          <TextInput
            style={styles.input}
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
        <TouchableOpacity
          style={styles.count}
          onPress={() => unitHandler("pkg")}
        >
          <DefText>pkg</DefText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.count}
          onPress={() => unitHandler("kg")}
        >
          <DefText>kg</DefText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.count}
          onPress={() => unitHandler("litre")}
        >
          <DefText>litre</DefText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.count}
          onPress={() => unitHandler("bott")}
        >
          <DefText>bott</DefText>
        </TouchableOpacity>
      </View>
         
            {
            itemEditMode ? 
            <View><CustomBtn title="cancel"/><CustomBtn title="update"/></View>
              : 
         <CustomBtn
            title="Add to list"
            style={{ width: 400 }}
            onPress={createListItem}
            />  } 


      <View style={styles.line} />

          <View>
            {props.OneTimeLists[indexOfList].listItems.map((listItem) => (
              <ListItem
                listItemName={listItem.name}
                unitName={listItem.unit}
                count={listItem.count}
                editHandler={handleEdit}
                // deleteHandler={}
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
