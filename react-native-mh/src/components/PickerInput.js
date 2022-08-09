import React, { useState } from "react"
import { Platform, StyleSheet, TextInput as RNTextInput, View } from "react-native"
import { Shadow } from "react-native-shadow-2"
import { SvgXml } from "react-native-svg"
import { useAppHook, useTheme } from "../utils/utilFuncs"
import PickerSelect from "./PickerSelect"
import TextFormatted from "./TextFormatted"
import TextInput from "./TextInput"

export default function PickerInput({ ...props }) {
  return (
    <TextInput
      {...props}
      renderTextInput={() => <PickerSelect {...props} />}
      containerStyle={{ ...(props.containerStyle || {}), paddingVertical: 8 }}
    />
  )
}
