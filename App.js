import React, { useState } from "react";

import * as Font from "expo-font";
// import AppLoading from "expo";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

// import { store } from "./redux/store";
import { useRoute } from "./router";

const loadAplication = async () => {
  await Font.loadAsync({
    NotoSerif: require("./assets/Fonts/NotoSerif-BoldItalic.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(true);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    // <Provider store={store}>
    <NavigationContainer>{routing}</NavigationContainer>
    // </Provider>
  );
}
