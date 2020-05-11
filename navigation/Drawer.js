import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import HomePage from "../Screens/HomePage";
import { CustomDrawer } from "../Components/CustomDrawer";
import { TeacherCustomDrawer } from "../Components/teacherDrawer";
import HomeStack from "./HomeStack";
import CreateList from "../Components/CreateList";

const { Navigator, Screen } = createDrawerNavigator();

export const Drawer = () => {
  return (
    <NavigationContainer>
      <Navigator drawerContent={TeacherCustomDrawer}>
        <Screen name="home" component={HomeStack} />
      </Navigator>
    </NavigationContainer>
  );
};
