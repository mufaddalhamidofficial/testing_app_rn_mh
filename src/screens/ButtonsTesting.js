import { View, Text } from "react-native"
import React from "react"
import { Button, DefaultTheme, randomColor, useTheme, useUiHook } from "../../react-native-mh"

export default function ButtonsTesting() {
  const { theme, updateTheme, sbh, sbw, width } = useUiHook()
  return (
    <View style={{ flex: 1 }}>
      {sbh(20)}
      <Button onPress={() => updateTheme({ buttonStyles: { defaultMode: "outlined" } })} text="Change to outlined" />
      {sbh(20)}
      <Button onPress={() => updateTheme({ buttonStyles: { defaultMode: "contained" } })} text="Change to contained" />
      {sbh(20)}
      <Button onPress={() => updateTheme({ buttonStyles: { defaultMode: "text" } })} text="Change to text" />
      {sbh(20)}
      <Button
        onPress={() =>
          updateTheme({ buttonStyles: { containerStyle: { borderRadius: Math.floor(Math.random() * 20) } } })
        }
        text="Change border radius"
      />
      {sbh(20)}
      <Button
        onPress={() =>
          updateTheme({
            buttonStyles: {
              linear: true,
              linearProps: {
                colors: [randomColor(), randomColor()],
                start: { x: Math.random(), y: Math.random() },
                end: { x: Math.random(), y: Math.random() },
                useAngle: Math.random() > 0.5,
                angle: Math.random(),
                angleCenter: { x: Math.random(), y: Math.random() },
              },
            },
          })
        }
        text="Change Linear"
      />
      {sbh(20)}
      <Button
        onPress={() =>
          updateTheme({
            buttonStyles: {
              shadow: true,
              shadowProps: {
                startColor: randomColor(),
                finalColor: randomColor(),
                distance: Math.random() * 10,
                paintInside: Math.random() > 0.5,
                offset: [Math.random(), Math.random()],
                radius: Math.random() * 10,
              },
            },
          })
        }
        text="Change Shadow"
        width={width - 60}
        style={{ paddingHorizontal: 10 }}
      />
      {sbh(20)}
      <Button disabled text="Disabled" />
      {sbh(20)}
      <Button text="Loading" loading />
    </View>
  )
}
