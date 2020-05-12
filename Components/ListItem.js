import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { DefText } from "../Commons/DefText";
import DeleteIcon from "../assets/delete.png";
import EditIcon from "../assets/edit.png";
import { COLORS } from "../styles/colors";

export const ListItem = ({ listItemName, unitName, count, editHandler, deleteHandler }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={editHandler}>
        <Image source={EditIcon} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.textArea}>
        <DefText>{listItemName}</DefText>
        <DefText>{count}</DefText>
        <DefText>{unitName}</DefText>
        

      </View>

      <TouchableOpacity onPress = { deleteHandler }>
        <Image source={DeleteIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    width: Dimensions.get("window").width - 30,
    borderRadius: 30,
    borderColor: COLORS.yellow,
    borderWidth: 2,
    marginBottom: 15,
  },
  textArea: {
    width: Dimensions.get("window").width - 120,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  icon: {
    width: 44,
    height: 44,
  },
});
