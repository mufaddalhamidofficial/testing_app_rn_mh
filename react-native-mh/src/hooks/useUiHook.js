import React, { useCallback } from "react"
import { useWindowDimensions, View } from "react-native"
import useTheme from "./useTheme"

export default function useUiHook() {
  const dimensions = useWindowDimensions()
  const sbw = useCallback(width => <View style={{ width }} />, [])
  const sbh = useCallback(height => <View style={{ height }} />, [])
  const theme = useTheme()

  return { ...dimensions, ...theme, sbw, sbh }
}
