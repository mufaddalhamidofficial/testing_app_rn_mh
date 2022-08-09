import React, { useState } from "react"
import { Platform, StyleSheet, TextInput as RNTextInput, View } from "react-native"
import { Shadow } from "react-native-shadow-2"
import { SvgXml } from "react-native-svg"
import { useAppHook, useTheme } from "../utils/utilFuncs"
import TextFormatted from "./TextFormatted"

export default function TextInput({
  heading,
  onChangeText,
  error,
  setError,
  style,
  headingStyle,
  readOnly,
  leftError,
  renderTextInput,
  parentContainerStyle,
  left,
  right,
  containerStyle,
  render,
  shadowVisible,
  disabled,
  ...props
}) {
  const {
    theme: {
      colors,
      textInputStyles: {
        placeholderTextColor,
        selectionColor,
        style: defStyle,
        changeHeadingOnFocus,
        changeFocusBorder,
        focusBorderWidth,
        focusedColor,
        headingStyle: defHeadingStyle,
        shadow,
        shadowProps,
        borderRadius,
        errorStyle,
        containerStyle: defContainerStyle,
        leftError: defLeftError,
        leftErrorMarginHorizontal,
        defaultBorderColor,
      },
    },
  } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const textInputProps = {
    editable: !readOnly,
    caretHidden: false,
    placeholderTextColor: placeholderTextColor,
    selectionColor: selectionColor,
    ...props,
    style: [defStyle, style],
    onChangeText: txt => {
      onChangeText?.(txt)
      setError?.(null)
    },
    onFocus: () => {
      props?.onFocus?.()
      setIsFocused(true)
    },
    onBlur: () => {
      props?.onBlur?.()
      setIsFocused(false)
    },
  }
  return (
    <View style={[{ opacity: disabled ? 0.5 : 1 }, parentContainerStyle]}>
      {!!heading && (
        <TextFormatted
          style={[
            defHeadingStyle,
            {
              color: isFocused && changeHeadingOnFocus ? focusedColor : defHeadingStyle?.color,
            },
            headingStyle,
          ]}
        >
          {heading}
        </TextFormatted>
      )}
      <Shadow
        viewStyle={{ backgroundColor: "#fff", borderRadius: borderRadius }}
        radius={(shadowVisible || shadow) && !disabled ? borderRadius : 1}
        distance={(shadowVisible || shadow) && !disabled ? shadowProps.distance : 0}
        offset={(shadowVisible || shadow) && !disabled ? shadowProps.offset : [0, 0]}
        startColor={(shadowVisible || shadow) && !disabled ? shadowProps.startColor : "#0000"}
        finalColor={(shadowVisible || shadow) && !disabled ? shadowProps.finalColor : "#0000"}
      >
        {render ? (
          render(textInputProps, isFocused)
        ) : (
          <View
            style={[
              defContainerStyle,
              {
                borderWidth: focusBorderWidth,
                borderColor: error ? colors.error : isFocused && changeFocusBorder ? focusedColor : defaultBorderColor,
              },
              containerStyle,
            ]}
          >
            {!!left && left}
            <View style={{ flex: 1 }}>
              {renderTextInput ? renderTextInput(textInputProps) : <RNTextInput {...textInputProps} />}
            </View>
            {!!right && right}
          </View>
        )}
      </Shadow>
      {!!error && typeof error === "string" && (
        <TextFormatted
          style={[
            errorStyle,
            { marginHorizontal: leftError ?? defLeftError ? 0 : leftErrorMarginHorizontal, color: colors.error },
          ]}
        >
          {error}
        </TextFormatted>
      )}
    </View>
  )
}
