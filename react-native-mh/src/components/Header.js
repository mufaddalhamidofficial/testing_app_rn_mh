import React from "react"
import { TouchableOpacity, View } from "react-native"
import { useAppHook, useUiHook } from "../utils/utilFuncs"
import TextFormatted from "./TextFormatted"
import { Icon } from "react-native-elements"
import { Shadow } from "react-native-shadow-2"

export default function Header({
  onPress,
  title,
  titleColor,
  backgroundColor,
  trailing,
  leading,
  showBackButton = true,
  centerTitle,
  height,
}) {
  const {
    sbw,
    navigation,
    theme: {
      colors,
      headerStyles: {
        backgroundColor: defBackgroundColor,
        foregroundColor,
        height: defHeight,
        paddingHorizontal,
        backIcon,
        backIconNode,
        title: titleProps,
        shadow,
        shadowProps,
      },
    },
  } = useAppHook()
  return (
    <Shadow
      viewStyle={{ width: "100%" }}
      startColor={shadowProps.startColor}
      finalColor={shadowProps.finalColor}
      distance={!shadow ? 0 : shadowProps.distance}
      radius={!shadow ? 0 : shadowProps.radius}
      offset={!shadow ? [0, 0] : shadowProps.offset}
      sides={!shadow ? [] : shadowProps.sides}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: paddingHorizontal || 20,
          backgroundColor: backgroundColor || defBackgroundColor,
          height: height || defHeight,
        }}
      >
        <View style={{ zIndex: 20 }}>
          {!showBackButton || !!leading ? (
            !!leading && leading
          ) : (
            <TouchableOpacity onPress={onPress || (() => navigation.goBack())}>
              {backIconNode || <Icon {...backIcon} color={titleColor || backIcon.color || foregroundColor} />}
            </TouchableOpacity>
          )}
        </View>
        {sbw(15)}
        <TextFormatted
          {...titleProps}
          style={[
            titleProps.style,
            { color: titleColor || foregroundColor },
            centerTitle ?? titleProps.defaultCenter
              ? { position: "absolute", left: 0, right: 0, textAlign: "center" }
              : {},
          ]}
        >
          {title}
        </TextFormatted>

        <View style={{ flex: 1 }} />
        {!!trailing && (
          <View style={{ position: "absolute", right: 0, flexDirection: "row", alignItems: "center" }}>{trailing}</View>
        )}
      </View>
    </Shadow>
  )
}
