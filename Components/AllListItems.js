import React, { useState } from "react";

import { View } from "react-native";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  allLists: state.lists.AllLists,
});

export const AllListItems = connect(mapStateToProps)((props) => {
  let MODULE_NAME;
  {
    props.route.params.listType === "OneTime"
      ? (LIST_NAME = "OneTimeList")
      : (MODULE_NAME = "Regular");
  }
  const chosenListType = props.allLists.filter(
    (list) => list.listType === MODULE_NAME
  );

  const index = chosenListType.findIndex(
    (list) => list.id === props.chosenListId
  );

  return (
    <View>
      chosenListType[index].listItems.map((listItem) => (
      <ListItem
        listItemName={listItem.name}
        editPage={true}
        listItemId={listItem.id}
        key={listItem.id}
        unitName={listItem.unit}
        count={listItem.count}
        editHandler={() => handleEdit(listItem.id)}
        deleteHandler={() => handleDelete(listItem.id)}
      />
      ))
    </View>
  );
});
