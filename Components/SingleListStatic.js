import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "../Components/ListItem";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  OneTimeLists: state.lists.AllLists.filter(
    (list) => list.listType === "OneTimeList"
  ),
  RegularLists: state.lists.AllLists.filter(
    (list) => list.listType === "Regular"
  ),
});
export const SingleListStatic = connect(mapStateToProps)((props) => {
  const indexOfListOneTime = props.OneTimeLists.findIndex(
    (list) => list.id === props.route.params.listId
  );

  const indexOfListRegular = props.RegularLists.findIndex(
    (list) => list.id === props.route.params.listId
  );

  console.log("static", props);
  return (
    <View style={styles.container}>
      <View>
        {props.route.params.listType === "OneTime"
          ? props.OneTimeLists[indexOfListOneTime].listItems.map((listItem) => (
              <ListItem
                listItemName={listItem.name}
                editPage={false}
                style={listItem.bought ? { opacity: 0.3 } : null}
                listId={props.route.params.listId}
                listItemId={listItem.id}
                unitName={listItem.unit}
                count={listItem.count}
                editHandler={() => handleEdit(listItem.id)}
                deleteHandler={() => handleDelete(listItem.id)}
              />
            ))
          : props.RegularLists[indexOfListRegular].listItems.map((listItem) => (
              <ListItem
                listItemName={listItem.name}
                editPage={false}
                style={listItem.bought ? { opacity: 0.3 } : null}
                listId={props.route.params.listId}
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
