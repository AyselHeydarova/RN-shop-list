import React, { useState } from "react";
import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import {
  selectAuthData,
  saveData,
  loadData,
  signInOrSignUp,
} from "../Store/auth";
import { connect } from "react-redux";

import { DefText } from "./DefText";
import { CustomBtn } from "./CustomBtn";
import { CustomInput } from "./CustomInput";
import { logOut } from "../Store/auth";

const mapStateToProps = (state) => ({
  authData: selectAuthData(state),
});

const fiedlsInitialState = {
  email: "",
  password: "",
};

export const AuthForm = connect(mapStateToProps, {
  saveData,
  loadData,
  signInOrSignUp,
  logOut,
})(({ saveData, loadData, signInOrSignUp, authData, logOut }) => {
  const { userID } = authData;
  const [fields, setFields] = useState(fiedlsInitialState);

  const fieldChangeHandler = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const submitSignUp = () => {
    if (fields.email.trim() === "" && fields.password === "") return;
    signInOrSignUp(fields.email, fields.password, false);
    setFields(fiedlsInitialState);
  };
  const submitSignIn = () => {
    if (fields.email.trim() === "" && fields.password === "") return;
    signInOrSignUp(fields.email, fields.password, true);
    setFields(fiedlsInitialState);
  };

  return (
    <View>
      <KeyboardAvoidingView behavior="height">
        {userID ? (
          <View>
            <DefText>Auth as: {userID}</DefText>
            <CustomBtn
              title="make backUP"
              onPress={saveData}
              style={styles.btn}
            />
            <CustomBtn
              title="load backUP"
              onPress={loadData}
              style={styles.btn}
            />
            <CustomBtn
              title="Log out"
              style={{ backgroundColor: "black", marginTop: 10 }}
              onPress={logOut}
            />
          </View>
        ) : (
          <View>
            <CustomInput
              key={"1"}
              value={fields.email}
              label="email"
              onChangeText={(v) => fieldChangeHandler("email", v)}
            />
            <CustomInput
              key={"2"}
              value={fields.password}
              label="password"
              onChangeText={(v) => fieldChangeHandler("password", v)}
            />

            <CustomBtn
              title="Sign Up"
              onPress={submitSignUp}
              style={styles.btn}
            />
            <CustomBtn
              title="Sign In"
              onPress={submitSignIn}
              style={styles.btn}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
});

const styles = StyleSheet.create({
  btn: {
    marginTop: 15,
  },
});
