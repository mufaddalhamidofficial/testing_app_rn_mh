import React from "react"
import { ColorValue, TouchableOpacityProps } from "react-native"

interface CheckboxProps extends TouchableOpacityProps {
  selected: Boolean
  activeColor?: ColorValue
  inActiveColor?: ColorValue
}

export default function Checkbox(props: CheckboxProps): React.ReactNode
