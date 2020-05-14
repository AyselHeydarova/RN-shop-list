import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import DefaultAvatarImg from "../assets/profile.png";
import { COLORS } from "../styles/colors";
import { DefText } from "../Commons/DefText";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  userData: state.userSettings
})

export const CustomDrawer = connect(mapStateToProps)((props) => {

  return (
    <View  style={styles.container}>
      <TouchableOpacity style={styles.closeIcon}>
        <Image style={styles.closeIconImg} />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <View style={styles.imageWrapper}>
          <Image
          resizeMode="cover"
          style={styles.userImg}
          source={{uri: props.userData.url}}
        />
        </View>
        
        <DefText style={styles.username}>{props.userData.username}</DefText>
      </View>

      <DrawerContentScrollView style={styles.containerList}>
        <TouchableOpacity
          style={styles.drawerLink}
          onPress={() => props.navigation.navigate("newList")}
        >
          <DefText style={styles.drawerTitle} weight="bold">
            Add new List
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerLink}
          onPress={() => props.navigation.navigate("homePage")}
        >
          <DefText style={styles.drawerTitle} weight="bold">
            One Time LIst
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerLink}
          onPress={() => props.navigation.navigate("regular")}
        >
          <DefText style={styles.drawerTitle} weight="bold">
            Regular Lists
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerLink}
          onPress={() => props.navigation.navigate("userSettings")}
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
  },
  userImg: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
    
    overflow: "hidden",
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
    fontSize: 24,
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
