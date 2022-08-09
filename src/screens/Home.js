import React from "react"
import { ScrollView, Text } from "react-native"
import { Button, DefaultTheme, useNavigationHook, useUiHook } from "../../react-native-mh"
import ButtonsTesting from "./ButtonsTesting"

export default function Home() {
  const { navigation } = useNavigationHook()
  const { theme, updateTheme, sbh, sbw, width } = useUiHook()

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
      <Text>{JSON.stringify(theme)}</Text>

      {sbh(20)}
      <Button onPress={() => updateTheme(DefaultTheme)} text="Change to default" />
      <ButtonsTesting />
      {sbh(20)}
      <Button onPress={() => navigation.navigate("Profile")} text="Go to Profile" />
      {sbh(20)}
      <Button onPress={() => navigation.navigate("Details")} text="Go to Details" />
      {sbh(20)}
    </ScrollView>
  )
}
