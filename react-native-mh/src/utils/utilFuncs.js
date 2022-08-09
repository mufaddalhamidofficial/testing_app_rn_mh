import React, { useCallback, useContext } from "react"
import { useWindowDimensions, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import moment from "moment"
import Toast from "react-native-toast-message"
import { useDispatch } from "react-redux"
import ThemeContext from "./ThemeContext"

export const showToast = (msg, type = "success", otherProps = {}) => Toast.show({ text1: msg, type, ...otherProps })

export function useNavigationHook() {
  const navigation = useNavigation()
  const route = useRoute()

  return { navigation, ...route }
}

export function useAppHook() {
  const navigation = useNavigationHook()
  const dispatch = useDispatch()
  const uiHook = useUiHook()

  return { navigation, ...uiHook, dispatch, showToast }
}

export function useUiHook() {
  const dimensions = useWindowDimensions()
  const sbw = useCallback(width => <View style={{ width }} />, [])
  const sbh = useCallback(height => <View style={{ height }} />, [])
  const { value: theme, update } = useContext(ThemeContext)
  const updateTheme = useCallback(update, [theme])

  return { ...dimensions, theme, updateTheme, sbw, sbh }
}

export function useTheme() {
  const { value: theme, update: updateTheme } = useContext(ThemeContext)
  return { theme, updateTheme }
}

export function randomDate(start, end) {
  return moment(start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()))
}
export function randomColor() {
  var colorInt = Math.floor(Math.random() * 16777215)
  var color = "#"

  color += colorInt.toString(16).padStart(6, "0")

  return color
}

export const sleep = ms => new Promise(r => setTimeout(r, ms))
