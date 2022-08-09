import React from "react"
import { ColorValue } from "react-native"

interface HeaderProps {
  onPress?: () => void
  title?: String
  backgroundColor?: ColorValue
  centerTitle?: Boolean
  titleColor?: ColorValue
  trailing?: React.ReactNode
  leading?: React.ReactNode
  showBackButton?: Boolean
  height?: Number
}

export default function Header(props: HeaderProps): React.ReactNode
