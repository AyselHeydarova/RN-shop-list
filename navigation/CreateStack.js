import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { headerDefaultStyles } from "../styles/headerDefaultStyles";
import { CreateList } from "../Screens/CreateList";

const { Navigator, Screen } = createStackNavigator();

export const CreateStack = () => (
  <Navigator screenOptions={headerDefaultStyles}>
    <Screen name="Settings" component={CreateList} />
  </Navigator>
);
