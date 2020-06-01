import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { connect } from "react-redux";

import { ListView } from "../Components/ListView";
import Burger from "../assets/burger.png";
import { Layout } from "../../Commons/Layout";
import { selectListByType } from "../../Store/lists";
import { LIST_TYPES } from "../../utilities/listTypes";

const mapStateToProps = (state) => ({
  coversList: selectListByType(state, route.params?.type || LIST_TYPES.ONETIME),
});

export const HomeScreen = connect(mapStateToProps)(
  ({ navigation, coversList }) => {
    return (
      <Layout
        title={"One Time Lists"}
        backBtn={false}
        source={Burger}
        onPress={() => props.navigation.openDrawer()}
      >
        <FlatList
          contentContainerStyle={styles.container}
          data={coversList}
          renderItem={({ item }) => (
            <ListView
              listName={list.name}
              listItemsLength={list.listItems.length}
              boughtCount={
                list.listItems.filter((item) => item.bought === true).length
              }
              onPress={(listId) =>
                props.navigation.navigate("singleEdit")             })
              }
            />
          )}
        />
        
      </Layout>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
