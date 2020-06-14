import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import DefaultAvatarImg from "../assets/avatar.jpg";
import { COLORS } from "../styles/colors";
import { DefText } from "../Components/DefText";
import { connect } from "react-redux";
import { LIST_TYPES } from "../utilities/listTypes";
import { selectUserInfo } from "../Store/settings";
import { CustomBtn } from "./CustomBtn";
import { GLOBAL_STYLES } from "../styles/globalStyles";

const mapStateToProps = (state) => ({
  userData: selectUserInfo(state),
});

export const CustomDrawer = connect(mapStateToProps)(
  ({ navigation, userData }) => {
    const url = userData.userInfo.userAvatar;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeIcon}>
          <Image style={styles.closeIconImg} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Image
            source={url === "" ? DefaultAvatarImg : { uri: url }}
            style={styles.userImg}
          />

          <DefText style={styles.username}>
            {userData.userInfo.username}
          </DefText>
        </View>

        <View style={styles.containerList}>
          <CustomBtn
            style={{ ...styles.drawerLink, ...styles.spacing }}
            textStyle={styles.drawerTitle}
            title="Add new list"
            onPress={() => navigation.navigate("CreateStack")}
          />

          <CustomBtn
            style={styles.drawerLink}
            textStyle={styles.drawerTitle}
            title="One Time list"
            onPress={() =>
              navigation.navigate("Home", { listType: LIST_TYPES.ONETIME })
            }
          />

          <CustomBtn
            style={styles.drawerLink}
            textStyle={styles.drawerTitle}
            title="Regular list"
            onPress={() => {
              navigation.navigate("Home", { listType: LIST_TYPES.REGULAR });
            }}
          />

          <CustomBtn
            style={styles.drawerLink}
            textStyle={styles.drawerTitle}
            title="User Settings"
            onPress={() => navigation.navigate("SettingStack")}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerList: {
    flex: 1,
    backgroundColor: COLORS.BG_PRIMARY,
    padding: GLOBAL_STYLES.PADDING,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  userInfo: {
    flexDirection: "row",
    paddingTop: 35,
    paddingBottom: 10,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    alignItems: "center",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: COLORS.BG_PRIMARY,
  },

  username: {
    fontSize: 22,
    marginLeft: 22,
    color: COLORS.TEXT,
    opacity: 0.65,
  },
  drawerLink: {
    height: 34,
    marginBottom: 10,
    backgroundColor: "white",
  },
  drawerTitle: {
    color: COLORS.BG_PRIMARY,
  },

  spacing: {
    marginBottom: 32,
  },
});
