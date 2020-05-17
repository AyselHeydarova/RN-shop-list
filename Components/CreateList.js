import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../styles/colors";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createList } from "../Store/lists";
import { connect } from "react-redux";
import { Layout } from "../Commons/Layout";

const CreateList = connect(null, {
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

    if (listType === "Regular") {
      props.navigation.navigate("regular");
    } else {
      props.navigation.navigate("homePage");
    }
  };

  const listNameHandler = (v) => {
    setListFields((fields) => ({ ...fields, name: v }));
  };

  const listTypeHandler = (type) => {
    setIsOneTimeList(true);
    setListFields((fields) => ({ ...fields, listType: type }));
  };

  return (
    <Layout title={"New List"} backBtn={false}>
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
            opacity: isOneTimeList ? 1 : 0.5,
          }}
          onPress={() => {
            listTypeHandler("OneTimeList");
            setIsOneTimeList(true);
          }}
        >
          <DefText style={styles.radioText} weight="bold">
            One Time
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.radio,
            opacity: isOneTimeList ? 0.5 : 1,
          }}
          onPress={() => {listTypeHandler("Regular"); setIsOneTimeList(false);}}
        >
          <DefText style={styles.radioText} weight="bold">
            Regular
          </DefText>
        </TouchableOpacity>
      </View>

      <CustomBtn
        title="Create List"
        onPress={createList}
        style={{ width: 350 }}
      />
    </Layout>
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
