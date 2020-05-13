import React from "react";
import { StyleSheet, View } from "react-native";
import { ListView } from "../Components/ListView";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  RegularLists: state.lists.AllLists.filter(
    (list) => list.listType === "Regular"
  ),
});

export const RegularLists = connect(mapStateToProps)((props) => {

  console.log("REgular", props)
  return (
    <View style={styles.container}>
      <View>
        {props.RegularLists.map((list) => (
          <ListView
            listId={list.id}
            listName={list.name}
            key={list.id}
            listItemsLength={list.listItems.length}
            onPress={(listId) =>
              props.navigation.navigate("singleEdit", {
                listName: list.name,
                listId: listId,
                listType: "Regular",
              })
            }
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});


