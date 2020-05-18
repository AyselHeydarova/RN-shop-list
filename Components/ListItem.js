import React, { useState } from "react";
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
import { toggleItemBought } from "../Store/lists";
import { connect } from "react-redux";

export const ListItem = connect(null, { toggleItemBought })((props) => {
  const listId = props.listId;
  const listItemId = props.listItemId;
  const customStyle = props.style;

   return (
    <TouchableOpacity
      onPress={() => {
        props.toggleItemBought({ listId, listItemId });

      }}
    >
      <View style={{ ...styles.container, ...customStyle }}>
        {props.editPage ? (
          <TouchableOpacity  onPress={ props.editHandler}>
            <View style={{ opacity: listItemId === props.clickedListItemId ? 0.5 : 1 }}>
              <Image source={EditIcon} style={styles.icon} />
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={styles.textArea}>
          <DefText>{props.listItemName}</DefText>

          <View style={styles.totalCount}>
            <DefText>x{props.count} </DefText>
            <DefText>{props.unitName}</DefText>
          </View>
        </View>

        {props.editPage ? (
          <TouchableOpacity onPress={props.deleteHandler}>
            <Image source={DeleteIcon} style={styles.icon} />
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
});

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
