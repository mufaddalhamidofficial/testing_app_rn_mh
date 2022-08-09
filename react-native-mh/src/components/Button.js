import { cloneDeep } from "lodash"
import React from "react"
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Shadow } from "react-native-shadow-2"
import { useTheme } from "../utils/utilFuncs"
import { useAppHook } from "../utils/utilFuncs"
import TextFormatted from "./TextFormatted"

export default function Button({
  text,
  render,
  onPress,
  loading,
  mode,
  color,
  disabled,
  containerStyle = {},
  textStyle = {},
  style = {},
  linear,
  linearProps,
  shadow,
  shadowProps,
  width,
}) {
  const {
    theme: {
      buttonStyles,
      colors: { disabled: disabledColor, primary },
      ...theme
    },
  } = useTheme()

  linear ?? (linear = buttonStyles.linear)
  shadow ?? (shadow = buttonStyles.shadow)
  mode ?? (mode = buttonStyles.defaultMode)

  const textColor =
    mode == "contained"
      ? textStyle?.color ?? buttonStyles.textStyle?.color ?? "#fff"
      : disabled
      ? disabledColor
      : color ?? containerStyle.backgroundColor ?? buttonStyles.containerStyle.backgroundColor ?? primary

  return (
    <TouchableOpacity style={style} disabled={disabled || loading} onPress={loading ? null : onPress}>
      <ButtonContainer
        color={color}
        disabled={disabled}
        mode={mode}
        linear={linear}
        shadow={shadow}
        custContainerStyle={containerStyle || {}}
        custLinearProps={linearProps || {}}
        custShadowProps={shadowProps || {}}
        defContainerStyle={buttonStyles.containerStyle || {}}
        defLinearProps={buttonStyles.linearProps || {}}
        defShadowProps={buttonStyles.shadowProps || {}}
        width={width}
      >
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          render?.([buttonStyles.textStyle ?? {}, textStyle, { color: textColor }]) || (
            <TextFormatted style={[buttonStyles.textStyle ?? {}, textStyle, { color: textColor }]}>
              {text}
            </TextFormatted>
          )
        )}
      </ButtonContainer>
    </TouchableOpacity>
  )
}

function ButtonContainer({
  children,
  linear = false,
  shadow = false,
  mode,
  defLinearProps = {},
  defShadowProps = {},
  defContainerStyle = {},
  custLinearProps = {},
  custShadowProps = {},
  custContainerStyle = {},
  disabled,
  color,
  width,
  ...props
}) {
  const {
    theme: {
      colors: { disabled: disabledColor, primary },
    },
  } = useTheme()

  const containerStyle = [
    { width: width },
    { alignItems: "center", justifyContent: "center" },
    defContainerStyle,
    custContainerStyle,
    mode == "outlined"
      ? {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: disabled
            ? disabledColor
            : color ?? custContainerStyle.backgroundColor ?? defContainerStyle.backgroundColor ?? primary,
        }
      : mode == "contained"
      ? {
          backgroundColor: linear
            ? "transparent"
            : disabled
            ? disabledColor
            : color ?? custContainerStyle.backgroundColor ?? defContainerStyle.backgroundColor ?? primary,
        }
      : {
          backgroundColor: "transparent",
        },
  ]
  if (linear && mode == "contained") {
    if (shadow && !disabled) {
      return (
        <Shadow
          startColor={defShadowProps?.startColor}
          finalColor={defShadowProps?.finalColor}
          distance={defShadowProps?.distance}
          radius={defContainerStyle.borderRadius}
          offset={defShadowProps?.offset}
          paintInside={defShadowProps?.paintInside}
          sides={defShadowProps?.sides}
          corners={defShadowProps?.corners}
          {...custShadowProps}
          viewStyle={{ width: "100%" }}
        >
          <LinearGradient {...defLinearProps} {...custLinearProps} style={containerStyle}>
            {children}
          </LinearGradient>
        </Shadow>
      )
    }
    return (
      <LinearGradient
        {...defLinearProps}
        {...custLinearProps}
        colors={disabled ? [disabledColor, disabledColor] : custLinearProps.colors ?? defLinearProps.colors}
        style={containerStyle}
      >
        {children}
      </LinearGradient>
    )
  }

  if (shadow && !disabled && mode == "contained") {
    return (
      <View style={{ flexDirection: "column", alignItems: "stretch", backgroundColor: "yellow" }}>
        <Shadow
          startColor={defShadowProps?.startColor}
          finalColor={defShadowProps?.finalColor}
          distance={defShadowProps?.distance}
          radius={defShadowProps?.radius}
          offset={defShadowProps?.offset}
          paintInside={defShadowProps?.paintInside}
          sides={defShadowProps?.sides}
          corners={defShadowProps?.corners}
          {...custShadowProps}
          viewStyle={{ width: "100%" }}
        >
          <View style={containerStyle}>{children}</View>
        </Shadow>
      </View>
    )
  }
  return <View style={containerStyle}>{children}</View>
}
