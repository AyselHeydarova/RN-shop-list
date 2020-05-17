import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Alert } from "react-native";
import { DefText } from "../Commons/DefText";
import { COLORS } from "../styles/colors";
import { connect } from "react-redux";
import { deleteList } from "../Store/lists";

export const ListView = connect(null, { deleteList })(
  ({
    listName,
    listItemsLength,
    onPress,
    listId,
    boughtCount,
    listType,
    deleteList,
  }) => {
    const progressPercentage = (boughtCount / listItemsLength) * 100;

    const validation = listType === "OneTime" && progressPercentage === 100;
    const handleDelete = (listId) => {
      Alert.alert(
        "Confirm Delete",
        "Are you sure to delete?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes, Delete Please", onPress: () => deleteList({listId}) }
        ],
        { cancelable: false }
      );
    };
    return (
      <TouchableOpacity
        style={[styles.container, { opacity: validation ? 0.5 : 1 }]}
        id={listId}
        onPress={() => onPress(listId)}
        onLongPress={() => handleDelete(listId)}
      >
        <View style={styles.row}>
          <DefText weight="medium" style={styles.text}>
            {listName}
          </DefText>
          <DefText weight="medium">
            {boughtCount} / {listItemsLength}
          </DefText>
        </View>

        <View style={styles.progressWrapper}>
          <View
            style={[
              styles.progress,
              progressPercentage ? { width: `${progressPercentage} %` } : null,
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: Dimensions.get("window").width - 40,
    borderRadius: 10,
    borderColor: COLORS.yellow,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressWrapper: {
    width: "100%",
    height: 20,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    marginTop: 5,
  },

  progress: {
    height: 20,
    width: 0,
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
  },
});
