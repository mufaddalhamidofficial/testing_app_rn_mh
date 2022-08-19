import React from "react"
import { View, Text, SafeAreaView, StatusBar } from "react-native"
import useTheme from "../hooks/useTheme"

export default function Statusbar({ backgroundColor, props, barStyle = "dark-content", hidden }) {
  const {
    theme: {
      colors: { background },
    },
  } = useTheme()
  return (
    <View style={[{ backgroundColor: backgroundColor || background, barStyle }]}>
      <SafeAreaView style={{}}>
        <StatusBar
          translucent={false}
          backgroundColor={backgroundColor || background}
          barStyle={barStyle}
          hidden={hidden}
          {...props}
        />
      </SafeAreaView>
    </View>
  )
}
