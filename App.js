import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import { loadFonts } from "./styles/fonts";
import HomePage from "./Screens/HomePage";
import Drawer from "./navigation/Drawer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onError={() => console.log("error")}
        onFinish={() => setLoaded(true)}
      />
    );
  }

  return <Drawer />;
}
