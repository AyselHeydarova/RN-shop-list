import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomePage from "../Screens/HomePage";
import CreateList from "../Components/CreateList";
import { COLORS } from "../styles/colors";
import { UserSettings } from "../Components/UserSettings";
import { RegularLists } from "../Components/RegularLists";
import SingleListEdit from "../Components/SingleListEdit";
import { SingleListStatic } from "../Components/SingleListStatic";
import { IconBtn } from "../Components/IconBtn";

import SaveIcon from "../assets/Save.png";
import EditIcon from "../assets/Pen.png";
import Burger from "../assets/burger.png";

const { Navigator, Screen } = createStackNavigator();

const HomeStack = () => {
  return (
    <Navigator headerMode="none">
      <Screen
        name="homePage"
        component={HomePage}
        options={() => ({
          title: "One Time Lists",
        })}
      />

      <Screen
        name="singleEdit"
        component={SingleListEdit}
        options={({ route }) => ({
          title: route.params.listName,
        })}
      />

      <Screen
        name="singleStatic"
        component={SingleListStatic}
        options={({ route }) => ({
          title: route.params.listName,
        })}
      />

      <Screen
        name="regular"
        component={RegularLists}
        options={{
          title: "Regular Lists",
        }}
      />

      <Screen
        name="newList"
        component={CreateList}
        options={{
          title: "New List",
        }}
      />

      <Screen
        name="userSettings"
        component={UserSettings}
        options={{
          title: "User Settings",
        }}
      />
    </Navigator>
  );
};

export default HomeStack;
