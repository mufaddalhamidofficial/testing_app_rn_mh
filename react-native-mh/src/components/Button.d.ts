import React from "react"
import { TextStyle, ColorValue, ViewStyle } from "react-native"
import { LinearGradientProps } from "react-native-linear-gradient"
import { ShadowProps } from "react-native-shadow-2"

interface ButtonProps {
  text: String
  render?: (textStyle: TextStyle) => React.ReactNode
  onPress?: () => void
  loading?: Boolean
  color?: ColorValue
  disabled?: Boolean
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  style?: ViewStyle
  mode?: "outlined" | "contained" | "text"
  linear?: boolean
  linearProps?: LinearGradientProps
  shadow?: boolean
  shadowProps?: ShadowProps
  width?: Number
}

export default function Button(props: ButtonProps): React.ReactNode
