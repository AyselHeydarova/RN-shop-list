// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { ListView } from "../Components/ListView";
// import Burger from "../assets/burger.png";

// import { connect } from "react-redux";
// import { Layout } from "../Commons/Layout";

// const mapStateToProps = (state) => ({
//   allLists: state.lists.AllLists,
// });

// export const RegularLists = connect(mapStateToProps)((props) => {
//   const RegularLists = props.allLists.filter(
//     (list) => list.listType === "Regular"
//   );
//   return (
//     <Layout
//       title={"Regular Lists"}
//       source={Burger}
//       backBtn={false}
//       onPress={() => props.navigation.openDrawer()}
//     >
//       <View>
//         {RegularLists.map((list) => (
//           <ListView
//             listId={list.id}

//             listName={}
//             key={list.id}
//             listItemsLength={list.listItems.length}
//             boughtCount={
//               list.listItems.filter((item) => item.bought === true).length
//             }
//             onPress={(listId) =>
//               props.navigation.navigate("singleEdit", {
//                 listName: list.name,
//                 listId: listId,
//                 listType: "Regular",
//               })
//             }
//           />
//         ))}
//       </View>
//     </Layout>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
// });
