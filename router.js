import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import PostsScreen from "./screens/Main/PostsScreen";
import ProfileScreen from "./screens/Main/ProfileScreen";
import CreatePostsScreen from "./screens/Main/CreatePostsScreen";

const TabStack = createMaterialBottomTabNavigator();

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <TabStack.Navigator
      tabBarOptions={{ showLabel: false }}
    >
      <TabStack.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons
              name="local-post-office"
              size={24}
              color={color}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <TabStack.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="pluscircleo"
              size={28}
              color={color}
            />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <TabStack.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color={color}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </TabStack.Navigator>
  );
};
