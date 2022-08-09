import { View, Text } from "react-native"
import React from "react"
import { Button, Checkbox, randomColor, useUiHook } from "../../react-native-mh"

export default function CheckboxTesting() {
  const { theme, updateTheme, sbh, sbw, width } = useUiHook()
  return (
    <View style={{ flex: 1 }}>
      {sbh(20)}
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Checkbox selected={true} />
        <Checkbox />
        <Checkbox disabled selected={true} />
        <Checkbox disabled />
      </View>
      {sbh(20)}
      <Button
        text="Change Active Color"
        onPress={() => updateTheme({ checkboxStyles: { activeColor: randomColor() } })}
      />
      {sbh(20)}
      <Button
        text="Change Inactive Color"
        onPress={() => updateTheme({ checkboxStyles: { inActiveColor: randomColor() } })}
      />
      {sbh(20)}
      <Button
        text="Change Border Radius"
        onPress={() =>
          updateTheme({ checkboxStyles: { borderRadius: (Math.random() * theme.checkboxStyles.size) / 2 } })
        }
      />
      {sbh(20)}
      <Button
        text="Change Size"
        onPress={() => {
          const size = Math.random() * 30
          updateTheme({ checkboxStyles: { size: size, icon: { size: size / 2 } } })
        }}
      />
    </View>
  )
}
