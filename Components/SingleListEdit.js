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
 const SingleListEdit = connect(mapStateToProps, {addListItem})(
  (props) => {
    console.log("props.OneTimeLists" + props.OneTimeLists);
    console.log("props" + props);
    const [fields, setFields] = useState({
      listId: props.route?.params?.listId,
      name: "",
      count: 0,
      unit: "kg",
    });

    const indexOfList = props.OneTimeLists.findIndex(
      (list) => list.id === fields.listId
    );

    const handleFieldChange = (name, value) => {
      setFields((fields) => ({
        ...fields,
        [name]: value,
      }));
    };

    const createListItem = (fields) => {
      props.addListItem(fields);
    };

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.center}>
            <DefText weight="medium">position name</DefText>
            <TextInput
              style={styles.input}
              onChangeText={(v) => handleFieldChange(name, v)}
            />
          </View>

          <View style={styles.center}>
            <DefText weight="medium">count</DefText>
            <View style={styles.count}>
              <TouchableOpacity>
                <DefText weight="bold">-</DefText>
              </TouchableOpacity>
              <DefText weight="bold">2</DefText>

              <TouchableOpacity>
                <DefText weight="bold">+</DefText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.count}>
            <DefText>pkg</DefText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.count}>
            <DefText>kg</DefText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.count}>
            <DefText>litre</DefText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.count}>
            <DefText>bott</DefText>
          </TouchableOpacity>
        </View>
        <CustomBtn
          title="Add to list"
          style={{ width: 400 }}
          onPress={createListItem}
        />
        <View style={styles.line} />

        {/* <View>
          {props.OneTimeLists[indexOfList].listItems.map((listItem) => (
            <ListItem listItemName={listItem.name} />
          ))}
        </View> */}
      </View>
    );
  }
);

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
