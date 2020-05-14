import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "../Components/ListItem";

import { connect } from "react-redux";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";

const mapStateToProps = (state) => ({
  allLists: state.lists.AllLists,
});
export const SingleListStatic = connect(mapStateToProps)((props) => {
  let LIST_TYPE;
  {
    props.route.params.listType === "OneTime"
      ? (LIST_TYPE = "OneTimeList")
      : (LIST_TYPE = "Regular");
  }

  const chosenListType = props.allLists.filter(
    (list) => list.listType === LIST_TYPE
  );

  const index = chosenListType.findIndex(
    (list) => list.id === props.route.params.listId
  );

  const totalCount = chosenListType[index].listItems.length;
  const boughtArray = chosenListType[index].listItems.filter(
    (item) => item.bought === true
  );
  const boughtCount = boughtArray.length;

  const listItemsArray = chosenListType[index].listItems

  const boughtObject = {...boughtArray}
  console.log(boughtObject)

  const resetHandler = () => {

  };

  return (
    <View style={styles.container}>
      <CustomBtn title="Reset" onPress={resetHandler} />
      <DefText>
        {boughtCount} / {totalCount}
      </DefText>

      <View>
        {chosenListType[index].listItems.map((listItem) => (
          <ListItem
            listItemName={listItem.name}
            listId={props.route.params.listId}
            listItemId={listItem.id}
            unitName={listItem.unit}
            count={listItem.count}
            editPage={false}
            style={listItem.bought ? { opacity: 0.3 } : null}
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
