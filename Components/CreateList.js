import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, AsyncStorage, Image } from "react-native";
import { COLORS } from "../styles/colors";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createOneTimeList, createRegularList } from "../Store/lists";
import { connect } from "react-redux";


const mapStateToProps = (state) => ({
  OneTimeLists: state.lists.OneTimeLists,
  RegularLists: state.lists.RegularLists,
});

const CreateList = connect(mapStateToProps, {
  createOneTimeList,
  createRegularList,
})((props) => {
  const [name, setName] = useState("");
  const [isOneTimeList, setIsOneTimeList] = useState(true);

  const createOneTimeList = async() => {
    props.createOneTimeList(name);
    props.navigation.navigate("homePage");
  };

  const createRegularList = () => {
    props.createRegularList(name);
    props.navigation.navigate("homePage");
  };

  const createList = isOneTimeList ? createOneTimeList : createRegularList;

  return (

    <View style={styles.container}>
      
      <DefText weight="medium">list name</DefText>
      <DefText weight="medium">{name}</DefText>
      <TextInput
        style={styles.input}
        placeholder="Something for me"
        onChangeText={(v) => setName(v)}
      />

      <View style={styles.radioWrapper}>
        <TouchableOpacity
          style={{
            ...styles.radio,
            backgroundColor: isOneTimeList ? COLORS.red : COLORS.gray,
          }}
          onPress={() => setIsOneTimeList(true)}
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
          onPress={() => setIsOneTimeList(false)}
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
