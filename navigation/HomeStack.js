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
    <Navigator
      headerMode="none"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.red,
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 18,
          fontFamily: "MontserratRegular",
        },
      }}
    >
      <Screen
        name="homePage"
        component={HomePage}
        options={({ navigation }) => ({
          title: "One Time Lists",
          headerRight: () => (
            <IconBtn source={Burger} onPress={() => navigation.openDrawer()} />
          ),
        })}
      />

      <Screen
        name="singleEdit"
        component={SingleListEdit}
        options={({ route, navigation }) => ({
          title: route.params.listName,
          headerRight: () => (
            <IconBtn
              source={SaveIcon}
              onPress={() =>
                navigation.navigate("singleStatic", {
                  listName: route.params.listName,
                  listId: route.params.listId,
                  listType: route.params.listType,
                })
              }
            />
          ),
        })}
      />

      <Screen
        name="singleStatic"
        component={SingleListStatic}
        options={({ route }) => ({
          title: route.params.listName,
          headerRight: () => <IconBtn source={EditIcon} />,
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
