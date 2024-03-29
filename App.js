import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./components/Login";
import Pocetna from "./components/Pocetna";
import OAplikaciji from "./components/OAplikaciji";
import Obavestenja from "./components/Obavestenja";
import Popusti from "./components/Popusti";
import Isum from "./components/Isum";
import Lams from "./components/Lams";
import Zimbra from "./components/Zimbra";
import Podesavanja from "./components/Podesavanja";
import Kontakt from "./components/Kontakt";
import registerNNPushToken from "native-notify";

//BG FETCH
// import * as BackgroundFetch from "expo-background-fetch";
// import * as TaskManager from "expo-task-manager";

//
const Stack = createNativeStackNavigator();

const App = () => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };
  registerNNPushToken(2597, "6KYr95bAzqbUAG4d1yry86");
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pocetna"
          component={Pocetna}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Obavestenja"
          component={Obavestenja}
          options={{
            headerShown: true,
            headerBackTitle: "Nazad",
            headerStyle: { backgroundColor: "#c9093d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Popusti"
          component={Popusti}
          options={{
            headerShown: true,
            headerBackTitle: "Nazad",
            headerStyle: { backgroundColor: "#c9093d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Isum"
          component={Isum}
          options={{
            headerShown: true,
            headerBackTitle: "Nazad",
            headerStyle: { backgroundColor: "#c9093d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Lams"
          component={Lams}
          options={{
            headerShown: true,
            headerBackTitle: "Nazad",
            headerStyle: { backgroundColor: "#c9093d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Zimbra"
          component={Zimbra}
          options={{
            headerShown: true,
            headerBackTitle: "Nazad",
            headerStyle: { backgroundColor: "#c9093d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Podesavanja"
          component={Podesavanja}
          options={{
            headerShown: true,
            headerBackTitle: "Nazad",
            headerStyle: { backgroundColor: "#c9093d" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="OAplikaciji"
          component={OAplikaciji}
          options={{
            headerShown: true,
            headerBackTitle: "Nazad",
            headerStyle: { backgroundColor: "#c9093d" },
            headerTintColor: "white",
            title: "O Aplikaciji",
          }}
        />
        <Stack.Screen
          name="Kontakt"
          component={Kontakt}
          options={{
            headerShown: true,
            headerBackTitle: "Nazad",
            headerStyle: { backgroundColor: "#c9093d" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
