import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../styles/colors";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";
import { connect } from "react-redux";
import {changeUsernameAndUrl} from "../Store/lists"
import { Layout } from "../Commons/Layout";
import { CustomInput } from "../Commons/CustomInput";

const mapStateToProps = (state) =>( {
  userData: state.userSettings
});

export const UserSettings = connect(mapStateToProps, {changeUsernameAndUrl})((props) => {
  const [userFields, setUserFields] = useState({
    username: "username",
    url: "",
  });

  const handleFieldChange = (name, value) => {
    setUserFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const username = userFields.username
  const url = userFields.url

  const saveChangesHandler=() => {
    props.changeUsernameAndUrl({username, url})
  }

  return (
    <Layout
      title={"User Settings"}
      backBtn={false}

    >
      <DefText weight="medium">username</DefText>
  

      <CustomInput placeholder="Enter your Name"
        onChangeText={(v) => handleFieldChange("username", v)}/>

      <DefText weight="medium">avatar url</DefText>
    
      <CustomInput value={userFields.url}
        placeholder="Enter avatar url"
        onChangeText={(v) => handleFieldChange("url", v)}/>

      <CustomBtn title="Save Changes"  onPress={saveChangesHandler}/>
      </Layout>
  );
});


