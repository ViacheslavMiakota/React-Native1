import React, { useState, useEffect } from "react";
import {} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useRoute } from "../router";

const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector(
    (state) => state.auth
  );

  const routing = useRoute(stateChange);
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
};

export default Main;
