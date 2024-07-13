import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./tabs";
import AvatarCreator from "../screens/AvatarCreator";
import ChooseBody from "../screens/ChooseBody";
import Wardrobe from "../screens/Wardrobe";

// import Login from "../screens/Login";
// import Registration from "../screens/Registration";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainTabs" component={Tabs} />
        <Stack.Screen name="AvatarCreator" component={AvatarCreator} />
        <Stack.Screen name="ChooseBody" component={ChooseBody}/>
        <Stack.Screen name="Wardrobe" component={Wardrobe}/>
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ title: "Registration" }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
