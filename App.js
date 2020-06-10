import React, { useState } from "react";
import { AppLoading } from "expo";
import { Provider } from "react-redux";

import { loadFonts } from "./styles/fonts";
import { Drawer } from "./navigation/Drawer";
import store from "./Store/store";

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
      <Drawer />
    </Provider>
  );
}

export default App;
