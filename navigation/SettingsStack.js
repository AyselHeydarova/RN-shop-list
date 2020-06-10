import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { headerDefaultStyles } from "../styles/headerDefaultStyles";
import { UserSettings } from "../Screens/UserSettings";

const { Navigator, Screen } = createStackNavigator();

export const SettingStack = () => (
  <Navigator screenOptions={headerDefaultStyles}>
    <Screen name="Settings" component={UserSettings} />
  </Navigator>
);
