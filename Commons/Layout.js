import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImagePropTypes,
  StatusBar,
} from "react-native";
import { COLORS } from "../styles/colors";
import { DefText } from "./DefText";
import { IconBtn } from "../Components/IconBtn";
import BackBtn from "../assets/Back.png";

export const Layout = ({
  children,
  title,
  source,
  onPress,
  goBack,
  backBtn,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"transparent"}
      />
      <View style={styles.header}>
        <View>
          {backBtn ? (
            <TouchableOpacity onPress={goBack}>
              <Image style={styles.back} source={BackBtn} />
            </TouchableOpacity>
          ) : null}
        </View>

        <DefText style={styles.titleText} weight="medium">
          {title}
        </DefText>
        <IconBtn source={source} onPress={onPress} />
      </View>

      <View style={styles.main}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.red,
  },
  header: {
    height: 75,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  titleText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },

  back: {
    width: 22,
    height: 18,
    marginLeft: 15,
  },

  main: {
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});
