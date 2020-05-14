import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { CustomDrawer } from "../Components/CustomDrawer";
import HomeStack from "./HomeStack";

const { Navigator, Screen } = createDrawerNavigator();

export const Drawer = () => {

  return (
    <NavigationContainer>
      <Navigator drawerContent={props => <CustomDrawer {...props}/>}>
        <Screen name="home" component={HomeStack} />
      </Navigator>
    </NavigationContainer>
  );
};
