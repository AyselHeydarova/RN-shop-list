import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { loadFonts } from "./styles/fonts";
import { Drawer } from "./navigation/Drawer";
import { Provider } from "react-redux";
import { AsyncStorage } from "react-native";
import store from "./Store/store";
import { SingleListEdit } from "./Components/SingleListEdit";

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

  return (
    <Provider store={store}>
     <Drawer/>
    </Provider>
  );
}
