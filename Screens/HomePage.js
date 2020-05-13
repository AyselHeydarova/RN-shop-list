import React, { useState } from "react";
import { StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import { ListView } from "../Components/ListView";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  OneTimeLists: state.lists.AllLists.filter(
    (list) => list.listType === "OneTimeList"
  ),
});

const HomePage = connect(mapStateToProps)((props) => {
  console.log(props.OneTimeLists);

  return (
    <View style={styles.container}>
      <View>
        {props.OneTimeLists.map((list) => (
          <ListView
            listId={list.id}
            listName={list.name}
            key={list.id}
            listItemsLength={list.listItems.length}
            onPress={(listId) =>
              props.navigation.navigate("singleEdit", {
                listName: list.name,
                listId: listId,
                listType: "OneTime"
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

export default HomePage;
