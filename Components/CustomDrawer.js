import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import DefaultAvatarImg from "../assets/profile.png";
import { COLORS } from "../styles/colors";
import { DefText } from "../Components/DefText";
import { connect } from "react-redux";
import { LIST_TYPES } from "../utilities/listTypes";

const mapStateToProps = (state) => ({
  userData: state.userSettings,
});

export const CustomDrawer = connect(mapStateToProps)((props) => {
  const url = props.userData.url;

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

        <DefText style={styles.username}>{props.userData.username}</DefText>
      </View>

      <DrawerContentScrollView style={styles.containerList}>
        <TouchableOpacity
          style={styles.drawerLink}
          onPress={() => props.navigation.navigate("CreateStack")}
        >
          <DefText style={styles.drawerTitle} weight="bold">
            Add new List
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerLink}
          onPress={() =>
            props.navigation.navigate("Home", {
              params: { listType: LIST_TYPES.ONETIME },
            })
          }
        >
          <DefText style={styles.drawerTitle} weight="bold">
            One Time LIst
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerLink}
          onPress={() =>
            props.navigation.navigate("Home", {
              params: { listType: LIST_TYPES.REGULAR },
            })
          }
        >
          <DefText style={styles.drawerTitle} weight="bold">
            Regular Lists
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerLink}
          onPress={() => props.navigation.navigate("SettingStack")}
        >
          <DefText style={styles.drawerTitle} weight="bold">
            User Settings
          </DefText>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerList: {
    backgroundColor: COLORS.red,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  userInfo: {
    display: "flex",
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
    borderColor: COLORS.red,
  },

  username: {
    fontSize: 20,
    marginTop: 6,
  },
  drawerLink: {
    display: "flex",
    alignItems: "center",
    width: 250,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 40,
    backgroundColor: "white",
    textAlign: "center",
    overflow: "hidden",
  },
  drawerTitle: {
    fontSize: 14,
    color: COLORS.red,
    textTransform: "uppercase",
  },
});
