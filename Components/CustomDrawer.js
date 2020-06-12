import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import DefaultAvatarImg from "../assets/profile.png";
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
    const url = userData.userAvatar;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeIcon}>
          <Image style={styles.closeIconImg} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View style={styles.imageWrapper}>
            <Image
              source={url === "" ? DefaultAvatarImg : { uri: url }}
              style={styles.userImg}
            />
          </View>

          <DefText style={styles.username}>{userData.username}</DefText>
        </View>

        <DrawerContentScrollView style={styles.containerList}>
          <CustomBtn
            style={styles.drawerLink}
            textStyle ={styles.drawerTitle}
            title="Add new list"
            onPress={() => navigation.navigate("CreateStack")}
          />

          <CustomBtn
            style={styles.drawerLink}
            textStyle ={styles.drawerTitle}
            title="One Time list"
            onPress={() =>
              navigation.navigate("Home", {
                params: { listType: LIST_TYPES.ONETIME },
              })
            }
          />

          <CustomBtn
            style={styles.drawerLink}
            textStyle ={styles.drawerTitle}
            title="Regular list"
            onPress={() =>
              navigation.navigate("Home", {
                params: { listType: LIST_TYPES.REGULAR },
              })
            }
          />

          <CustomBtn
            style={styles.drawerLink}
            textStyle ={styles.drawerTitle}
            title="User Settings"
            onPress={() => navigation.navigate("SettingStack")}
          />
        </DrawerContentScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerList: {
    backgroundColor: COLORS.BG_PRIMARY,
    padding: GLOBAL_STYLES.PADDING,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  userInfo: {
    flexDirection: "row",
    paddingTop: 40,
    paddingBottom: 13,
    alignItems: "center",
    width: 200,
  },
  userImg: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  imageWrapper: {
    width: 73,
    height: 73,
    borderRadius: 35,
    borderWidth: 3,
    margin: 15,
    borderColor: COLORS.BG_PRIMARY,
  },

  username: {
    fontSize: 20,
    marginTop: 6,
  },
  drawerLink: {
    height: 34,
    marginBottom: 10,
    backgroundColor: "white",
  },
  drawerTitle: {
    color: COLORS.BG_PRIMARY,
  },
});
