// Navigation.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Chat from "../screens/Chat";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ title: "Chat" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
