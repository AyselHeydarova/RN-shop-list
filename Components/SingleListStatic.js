import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "../Components/ListItem";

import { connect } from "react-redux";
import { CustomBtn } from "../Commons/CustomBtn";
import { DefText } from "../Commons/DefText";
import { resetBought } from "../Store/lists";
import { Layout } from "../Commons/Layout";
import EditIcon from "../assets/Pen.png";

const mapStateToProps = (state) => ({
  allLists: state.lists.AllLists,
});
export const SingleListStatic = connect(mapStateToProps, { resetBought })(
  (props) => {
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

    const listId = props.route.params.listId;

    const resetHandler = () => {
      props.resetBought({ listId: listId });
    };

    return (
      <Layout
        title={props.route.params.listName}
        source={EditIcon}
        backBtn={true}
        onPress={() => props.navigation.navigate("singleEdit")}
        goBack={() => props.navigation.goBack()}
      >
        {LIST_TYPE === "Regular" ? null : (
          <View style={styles.row}>
            <CustomBtn
              title="Reset"
              style={{ width: 70, height: 20, fontSize: 10 }}
              onPress={() => resetHandler()}
            />
            <DefText>
              {boughtCount} / {totalCount}
            </DefText>
          </View>
        )}

        <View>
          {chosenListType[index].listItems.map((listItem) => (
            <ListItem
              listItemName={listItem.name}
              listId={props.route.params.listId}
              listItemId={listItem.id}
              unitName={listItem.unit}
              key={listItem.id}
              count={listItem.count}
              editPage={false}
              style={listItem.bought ? { opacity: 0.3 } : null}
              editHandler={() => handleEdit(listItem.id)}
              deleteHandler={() => handleDelete(listItem.id)}
            />
          ))}
        </View>
      </Layout>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});
