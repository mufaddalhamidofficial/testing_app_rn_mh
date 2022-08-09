import { View, Text } from "react-native"
import React from "react"
import { Button, DefaultTheme, randomColor, TextInput, useTheme, useUiHook } from "../../react-native-mh"

export default function TextInputTesting() {
  const { theme, updateTheme, sbh, sbw, width } = useUiHook()
  return (
    <View style={{ flex: 1 }}>
      {sbh(5)}
      <TextInput placeholder="Hello" heading="Hello" value="Text" />
      {sbh(5)}
      <TextInput placeholder="Hello" heading="Hello" />
      {sbh(5)}
      <TextInput disabled placeholder="Hello" heading="Hello" />
      {sbh(5)}
      <TextInput readOnly placeholder="Hello" heading="Hello" />
      {sbh(5)}
      <TextInput error="Hello error" placeholder="Hello" heading="Hello" />
      {sbh(5)}
      <TextInput error="Hello left error" leftError placeholder="Hello" heading="Hello" />

      {/* <Button onPress={() => updateTheme({  })} text="Change to text" /> */}
    </View>
  )
}
