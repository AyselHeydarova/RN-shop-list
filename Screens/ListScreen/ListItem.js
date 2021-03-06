import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

import { DefText } from "../../Components/DefText";
import DeleteIcon from "../../assets/delete.png";
import EditIcon from "../../assets/Pen.png";
import { COLORS } from "../../styles/colors";

export const ListItem = ({
  product,
  isEditMode,
  isCurrentInEdit,
  onLongPress,
  onDeletePress,
  onEditPress,
}) => {
  const { name, count, unit, bought } = product;

  const onDeleteHandler = () => {
    Alert.alert("Delete this product?", "Are you sure?", [
      { text: "No", style: "cancel" },
      { text: "Yes, delete", onPress: onDeletePress },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={isEditMode}
      onLongPress={onLongPress}
    >
      <View
        style={[
          styles.wrapper,
          {
            opacity: !isEditMode && bought ? 0.5 : 1,
            paddingHorizontal: isEditMode ? 55 : 20,
          },
        ]}
      >
        <DefText weight="medium" style={styles.title}>
          {name}
        </DefText>

        <DefText weight="medium" style={styles.title}>
          x{count} {unit}
        </DefText>

        {isEditMode ? (
          <>
            <TouchableOpacity
              onPress={onEditPress}
              style={styles.editBtnWrapper}
              disabled={isCurrentInEdit}
            >
              <View
                style={[
                  styles.btn,
                  styles.btnEdit,
                  { opacity: isCurrentInEdit ? 0.5 : 1 },
                ]}
              >
                <Image source={EditIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDeleteHandler}
              style={[styles.btn, styles.btnDelete]}
            >
              <Image source={DeleteIcon} style={styles.icon} />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    borderColor: COLORS.SECONDARY,
    borderWidth: 2,
  },

  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: COLORS.BG_SECONDARY,
    position: "absolute",
    top: -2,
    zIndex: 2,
  },

  icon: {
    width: "100%",
    height: "100%",
  },

  editBtnWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
  },
  btnEdit: {
    backgroundColor: COLORS.SECONDARY,
    left: -2,
  },

  btnDelete: {
    backgroundColor: COLORS.BG_PRIMARY,
    right: -2,
  },
});
