import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../Screens/HomePage";
import CreateList from "../Components/CreateList";
import { COLORS } from "../styles/colors";
import { UserSettings } from "../Components/UserSettings";
import RegularLists from "../Components/RegularLists";
import { SingleListEdit } from "../Components/SingleListEdit";

const { Navigator, Screen } = createStackNavigator();

const HomeStack = () => {
  return (
    <Navigator>
      <Screen
        name="homePage"
        component={HomePage}
        options={{
          title: "One Time Lists",
          headerStyle: {
            backgroundColor: COLORS.red,
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "MontserratRegular",
          },
        }}
      />

      <Screen
        name="singleEdit"
        component={SingleListEdit}
        options={{
          title: "Single Edit",
          headerStyle: {
            backgroundColor: COLORS.red,
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "MontserratRegular",
          },
        }}
      />

      <Screen
        name="regular"
        component={RegularLists}
        options={{
          title: "Regular Lists",
          headerStyle: {
            backgroundColor: COLORS.red,
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "MontserratRegular",
          },
        }}
      />

      <Screen
        name="newList"
        component={CreateList}
        options={{
          title: "New List",
          headerStyle: {
            backgroundColor: COLORS.red,
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "MontserratRegular",
          },
        }}
      />

      <Screen
        name="userSettings"
        component={UserSettings}
        options={{
          title: "User Settings",
          headerStyle: {
            backgroundColor: COLORS.red,
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "MontserratRegular",
          },
        }}
      />
    </Navigator>
  );
};

export default HomeStack;
