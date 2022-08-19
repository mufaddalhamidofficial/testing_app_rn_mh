import React from "react"
import { Platform, StyleSheet, View } from "react-native"
import { Icon } from "react-native-elements"
import RNPickerSelect from "react-native-picker-select"
import useTheme from "../hooks/useTheme"

export default function PickerSelect({ size, style, color, mode, ...props }) {
  const {
    theme: {
      pickerSelectStyles: { color: defColor, icon, iconNode, defaultMode },
    },
  } = useTheme()
  return (
    <RNPickerSelect
      placeholder={{}}
      {...props}
      Icon={() => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: Platform.OS == "android" ? 32 : 24,
            width: Platform.OS == "android" ? 32 : 24,
          }}
        >
          {iconNode || <Icon {...icon} size={size || icon.size || 24} color={color ?? defColor} />}
        </View>
      )}
      pickerProps={{ ...(props?.pickerProps || {}), mode: mode || defaultMode }}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug
      style={{
        ...(style || {}),
        placeholder: { color: "#000", ...(style?.placeholder || {}) },
        inputAndroid: {
          paddingVertical: 5,
          paddingLeft: 10,
          paddingRight: 30,
          color: color ?? defColor,
          ...(style?.inputAndroid || {}),
        },
        inputIOSContainer: {
          paddingVertical: 10,
          paddingLeft: 10,
          paddingRight: 30,
          justifyContent: "center",
          ...(style?.inputIOSContainer || {}),
        },
        inputIOS: { color: color, ...(style?.inputIOS || {}) },
        iconContainer: { marginRight: 5, marginTop: 2, ...(style?.iconContainer || {}) },
      }}
    />
  )
}
