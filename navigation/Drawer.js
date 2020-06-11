import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { CustomDrawer } from "../Components/CustomDrawer";
import HomeStack from "./HomeStack";
import { SettingStack } from "./SettingsStack";
import { CreateStack } from "./CreateStack";

const { Navigator, Screen } = createDrawerNavigator();

export const Drawer = () => {

  return (
    <NavigationContainer>
      <Navigator drawerContent={props => <CustomDrawer {...props}/>}>
        <Screen name="HomeStack" component={HomeStack} />
        <Screen name="SettingStack" component={SettingStack} />
        <Screen name="CreateStack" component={CreateStack} />
      </Navigator>
    </NavigationContainer>
  );
};
