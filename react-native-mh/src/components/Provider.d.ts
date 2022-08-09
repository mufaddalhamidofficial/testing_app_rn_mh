import React from "react"
import { ColorValue, TouchableOpacityProps } from "react-native"
import { DefaultTheme } from "../utils/themeBuilder"

interface ProviderProps {
  children: React.ReactNode
  defaultTheme: typeof DefaultTheme
  store: any
  persistor: any
  persistorLoading?: React.ReactNode
  storeTheme?: Boolean
}

export default function Provider(props: ProviderProps): React.ReactNode
