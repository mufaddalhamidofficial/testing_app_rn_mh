import React from "react"
import { ColorValue } from "react-native"
import { PickerSelectProps } from "react-native-picker-select"

interface CustomPickerSelectProps extends PickerSelectProps {
  size?: Number

  color?: ColorValue
  mode?: "dialog" | "dropdown"
}

export default function PickerSelect(props: CustomPickerSelectProps): React.ReactNode
