import React, { useState } from "react";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";

import { store } from "./redux/store";

import Main from "./components/Main";

const loadAplication = async () => {
  await Font.loadAsync({
    NotoSerif: require("./assets/Fonts/NotoSerif-BoldItalic.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

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
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
