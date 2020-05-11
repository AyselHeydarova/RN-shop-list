import React, { useState } from "react";
import { StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import { COLORS } from "../styles/colors";
import { DefText } from "../Commons/DefText";
import { ListView } from "../Components/ListView";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  OneTimeLists: state.lists.OneTimeLists,
});

const HomePage = connect(mapStateToProps)((props) => {
  console.log(props.OneTimeLists);

  return (
    <View style={styles.container}>
      <View>
        {props.OneTimeLists.map((list) => (
          <ListView listName={list.name} key={list.id} listItemsLength={list.listItems.length} navigation={props.navigation}/>
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
