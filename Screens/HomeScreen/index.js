import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { connect } from "react-redux";

import { ListView } from "../Components/ListView";
import Burger from "../assets/burger.png";
import { Layout } from "../../Commons/Layout";
import { selectListByType } from "../../Store/lists";
import { LIST_TYPES, getListTypeFromParams } from "../../utilities/listTypes";

const mapStateToProps = (state, { route }) => ({
  coversList: selectListByType(state, getListTypeFromParams(route)),
});

export const HomeScreen = connect(mapStateToProps)(
  ({ route, navigation, coversList }) => {
    const listType = getListTypeFromParams(route);

    const handleDelete = (listName, listId) => {
      Alert.alert(
        "Confirm Delete",
        `Are you sure to delete "${listName}"?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes, Delete Please",
            onPress: () => deleteList({ listType, listId }),
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <Layout
        title={"One Time Lists"}
        backBtn={false}
        source={Burger}
        onPress={() => navigation.openDrawer()}
      >
        <FlatList
          contentContainerStyle={styles.container}
          data={coversList}
          renderItem={({ list }) => (
            <ListView
              listName={list.name}
              listItemsLength={list.listItems.length}
              boughtCount={
                list.listItems.filter((item) => item.bought === true).length
              }
              onPress={() =>
                navigation.navigate("listScreen", {
                  listID: list.id,
                  isEditMode: false,
                  listType,
                  title: list.title,
                })
              }
              onLongPress={() => handleDelete(list.title, list.id)}
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
