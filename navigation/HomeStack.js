import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { IconBtn } from "../Components/IconBtn";
import { headerDefaultStyles } from "../styles/headerDefaultStyles";
import { HomeScreen } from "../Screens/HomeScreen";
import { LIST_TYPES } from "../utilities/listTypes";
import BurgerIcon from "../assets/burger.png";
import SaveIcon from "../assets/Save.png";
import PenIcon from "../assets/Pen.png";
import BackIcon from "../assets/Back.png";
import { ListScreen } from "../Screens";

const { Navigator, Screen } = createStackNavigator();

const HomeStack = () => {
  return (
    <Navigator screenOptions={headerDefaultStyles}>
      <Screen
        name="Home"
        component={HomeScreen}
        options={({ route, navigation }) => ({
          title: getHomepageTitle(route?.params?.listType),
          headerRight: () => (
            <IconBtn
              source={BurgerIcon}
              side="right"
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Screen
        name="List"
        component={ListScreen}
        options={({ route, navigation }) => ({
          title: route.params.listName,
          headerRight: () => (
            <IconBtn
              source={route.params.isEditMode ? SaveIcon : PenIcon}
              side="right"
              onPress={() =>
                navigation.setParams({
                  isEditMode: !route.params.isEditMode,
                })
              }
            />
          ),

          headerLeft: () => (
            <IconBtn
              source={BackIcon}
              side="left"
              onPress={() => {
                navigation.navigate("Home", {
                  listType: route.params?.listType,
                });
              }}
            />
          ),
        })}
      />
    </Navigator>
  );
};

export default HomeStack;

function getHomepageTitle(type) {
  const titles = {
    [LIST_TYPES.ONETIME]: "One time lists",
    [LIST_TYPES.REGULAR]: "Regular lists",
  };

  return titles[type] || titles[LIST_TYPES.ONETIME];
}
