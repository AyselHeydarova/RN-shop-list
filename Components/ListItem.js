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


export const ListItem = ({
  listItemName,
  unitName,
  count,
  editHandler,
  deleteHandler,
  editPage,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      {editPage ? (
        <TouchableOpacity onPress={editHandler}>
          <Image source={EditIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.textArea}>
        <DefText>{listItemName}</DefText>

        <View style={styles.totalCount}>
          <DefText>x{count} </DefText>
          <DefText>{unitName}</DefText>
        </View>
      </View>

      {editPage ? (
        <TouchableOpacity onPress={deleteHandler}>
          <Image source={DeleteIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  totalCount: {
    flexDirection: "row",
  },

  icon: {
    width: 44,
    height: 44,
  },
});
