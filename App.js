import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { DefaultTheme, Provider } from "./react-native-mh"
import { persistor, store } from "./redux"
import Details from "./src/screens/Details"
import Home from "./src/screens/Home"
import Profile from "./src/screens/Profile"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider defaultTheme={DefaultTheme} persistor={persistor} store={store} persistorLoading={null}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Home} name="Home" />
          <Stack.Screen component={Profile} name="Profile" />
          <Stack.Screen component={Details} name="Details" />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
