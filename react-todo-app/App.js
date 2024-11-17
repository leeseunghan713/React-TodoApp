const Stack = createNativeStackNavigator();

import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Splashscreen from "./screens/Splashscreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import TestScreen from "./screens/TestScreen";
import TestLoginSuccessScreen from './screens/TestLoginSuccessScreen'
import TestLoginScreen from "./screens/TestLoginScreen";
import { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = useState(true);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Comfortaa-Regular": require("./assets/fonts/Comfortaa-Regular.ttf"),
    "Comfortaa-Bold": require("./assets/fonts/Comfortaa-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Splashscreen"
              component={Splashscreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="TestScreen"
              component={TestScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TestLoginScreen"
              component={TestLoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TestLoginSuccessScreen"
              component={TestLoginSuccessScreen}
              options={{ headerShown: false }}
            />

            
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
