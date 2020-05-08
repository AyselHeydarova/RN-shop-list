import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "../Screens/HomePage";
import CreateList from "../Components/CreateList";

const { Navigator, Screen } = createDrawerNavigator();

const Drawer = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="home" component={HomePage} />
        <Screen name="New List" component={CreateList} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Drawer;
