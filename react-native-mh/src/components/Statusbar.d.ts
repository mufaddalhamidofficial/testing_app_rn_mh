import React from "react"
import { ColorValue, StatusBarProps, StatusBarStyle } from "react-native"

interface StatusbarProps {
  backgroundColor?: ColorValue
  props?: StatusBarProps
  barStyle?: StatusBarStyle
  hidden?: Boolean
}

export default function Statusbar(props: StatusbarProps): React.ReactNode
