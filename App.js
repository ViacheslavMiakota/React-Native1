import React, { useState } from "react";
import {} from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";

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
    <NavigationContainer>{routing}</NavigationContainer>
  );
}
