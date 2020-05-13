import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { COLORS } from "../styles/colors";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createList } from "../Store/lists";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  OneTimeLists: state.lists.AllLists.filter(
    (list) => list.listType === "OneTimeList"
  ),
  RegularLists: state.lists.AllLists.filter(
    (list) => list.listType === "Regular"
  ),
});

const CreateList = connect(mapStateToProps, {
  createList,
})((props) => {
  const [listFields, setListFields] = useState({
    name: "",
    listType: "OneTime",
  });
  const [isOneTimeList, setIsOneTimeList] = useState(true);

  const name = listFields.name;
  const listType = listFields.listType;

  const createList = async () => {
    props.createList({ name, listType });
    props.navigation.navigate("homePage");
  };

  const listNameHandler = (v) => {
    setListFields((fields) => ({ ...fields, name: v }));
  };

  const listTypeHandler = (type) => {
    setIsOneTimeList(true);
    setListFields((fields) => ({ ...fields, listType: type }))
  } 

  

  return (
    <View style={styles.container}>
      <DefText weight="medium">list name</DefText>
      <TextInput
        style={styles.input}
        placeholder="Something for me"
        onChangeText={(value) => listNameHandler(value)}
      />

      <View style={styles.radioWrapper}>
        <TouchableOpacity
          style={{
            ...styles.radio,
            backgroundColor: isOneTimeList ? COLORS.red : COLORS.gray,
          }}
          onPress={() => listTypeHandler("OneTimeList")}
        >
          <DefText style={styles.radioText} weight="bold">
            One Time
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.radio,
            backgroundColor: isOneTimeList ? COLORS.gray : COLORS.red,
          }}
          onPress={() => listTypeHandler("Regular")}
        >
          <DefText style={styles.radioText} weight="bold">
            Regular
          </DefText>
        </TouchableOpacity>
      </View>

      <CustomBtn title="Create List" onPress={createList} />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },

  input: {
    backgroundColor: COLORS.gray,
    width: 340,
    padding: 15,
    borderRadius: 30,
  },

  radioWrapper: {
    display: "flex",
    flexDirection: "row",
  },

  radio: {
    width: 160,
    backgroundColor: COLORS.gray,
    paddingVertical: 15,
    borderRadius: 30,
    margin: 10,
  },

  radioText: {
    textAlign: "center",
  },
});

export default CreateList;
