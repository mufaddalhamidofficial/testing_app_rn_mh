import React from "react"
import { View, Text, SafeAreaView, StatusBar } from "react-native"
import { useAppHook } from "../utils/utilFuncs"

export default function Statusbar({ backgroundColor, props, barStyle = "dark-content", hidden }) {
  const { theme } = useAppHook()
  return (
    <View style={[{ backgroundColor: backgroundColor || theme.colors.background, barStyle }]}>
      <SafeAreaView style={{}}>
        <StatusBar
          translucent={false}
          backgroundColor={backgroundColor || theme.colors.background}
          barStyle={barStyle}
          hidden={hidden}
          {...props}
        />
      </SafeAreaView>
    </View>
  )
}
