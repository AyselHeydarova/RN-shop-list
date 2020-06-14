import React from "react";
import { FlatList, Alert } from "react-native";
import { connect } from "react-redux";

import { ListView } from "./ListView";
import { Container } from "../../Commons/Container";
import { selectListByType, deleteList } from "../../Store/lists";
import { getListTypeFromParams } from "../../utilities/listTypes";

const mapStateToProps = (state, { route }) => ({
  coversList: selectListByType(state, getListTypeFromParams(route)),
});

export const HomeScreen = connect(mapStateToProps, { deleteList })(
  ({ route, navigation, coversList, deleteList }) => {
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
      <Container>
        <FlatList
          data={coversList}
          renderItem={({ item }) => {
            return (
              <ListView
                listName={item.name}
                listItemsLength={item.listItems.length}
                boughtCount={
                  item.listItems.filter((item) => item.bought === true).length
                }
                onPress={() =>
                  navigation.navigate("List", {
                    listId: item.id,
                    isEditMode: false,
                    listType,
                    listName: item.name,
                  })
                }
                listType={listType}
                onLongPress={() => handleDelete(item.name, item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </Container>
    );
  }
);
