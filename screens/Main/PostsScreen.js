import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  // FlatList,
  // Image,
  // Text,
  // Button,
  // TouchableOpacity,
} from "react-native";
// import { Camera } from "expo-camera";

import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreen from "../nestedScreen/DefaultScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        component={DefaultScreen}
      ></NestedScreen.Screen>
      <NestedScreen.Screen
        name="Comment"
        component={CommentsScreen}
      ></NestedScreen.Screen>
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
      ></NestedScreen.Screen>
    </NestedScreen.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  btnPress: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: `#8a2be2`,
    minWidth: 80,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PostsScreen;
