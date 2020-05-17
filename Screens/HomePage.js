import React from "react";
import { StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import { ListView } from "../Components/ListView";
import Burger from "../assets/burger.png";

import { connect } from "react-redux";
import { Layout } from "../Commons/Layout";

const mapStateToProps = (state) => ({
  allLists: state.lists.AllLists,
});

const HomePage = connect(mapStateToProps)((props) => {
  const OneTimeLists = props.allLists.filter(
    (list) => list.listType === "OneTimeList"
  );

  return (
    <Layout
      title={"One Time Lists"}
      backBtn={false}
      source={Burger}
      onPress={() => props.navigation.openDrawer()}
    >
        <View>
          {OneTimeLists.map((list) => (
            <ListView
              listId={list.id}
              listType="OneTime"
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
     
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomePage;
