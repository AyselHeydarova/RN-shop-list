import React, { useState } from "react";
import { StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import { ListView } from "../Components/ListView";

import { connect } from "react-redux";
import { DefText } from "../Commons/DefText";

const mapStateToProps = (state) => ({
  allLists: state.lists.AllLists,
});

const HomePage = connect(mapStateToProps)((props) => {
  console.log(props);
  const OneTimeLists = props.allLists.filter(
    (list) => list.listType === "OneTimeList"
  );

  return (
    <View style={styles.container}>
      <View>
        {OneTimeLists.map((list) => (
          <ListView
            listId={list.id}
            listName={list.name}
            key={list.id}
            listItemsLength={list.listItems.length}
            boughtCount={
              list.listItems.filter((item) => item.bought === true).length
            }
            onPress={(listId) =>
              props.navigation.navigate("singleEdit", {
                listName: list.name,
                listId: listId,
                listType: "OneTime",
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
