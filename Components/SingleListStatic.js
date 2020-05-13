import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../styles/colors";
import { ListItem } from "../Components/ListItem";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  OneTimeLists: state.lists.OneTimeLists,
});
export const SingleListStatic = connect(mapStateToProps)((props) => {
  const indexOfList = props.OneTimeLists.findIndex(
    (list) => list.id === props.route.params.listId
  );

  return (
    <View style={styles.container}>
      <View>
        {props.OneTimeLists[indexOfList].listItems.map((listItem) => (
          <ListItem
            listItemName={listItem.name}
            editPage={false}
            listId = {props.route.params.listId}
            listItemId={listItem.id}
            unitName={listItem.unit}
            count={listItem.count}
            editHandler={() => handleEdit(listItem.id)}
            deleteHandler={() => handleDelete(listItem.id)}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
});
