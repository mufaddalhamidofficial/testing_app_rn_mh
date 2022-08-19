import { TouchableOpacity } from "react-native"
import React from "react"
import { Icon } from "react-native-elements"
import useUiHook from "../hooks/useUiHook"

export default function Checkbox({ selected, style, activeColor, inActiveColor, disabled, size, ...props }) {
  const {
    theme: {
      colors: { primary, disabled: disabledColor },
      checkboxStyles: {
        activeColor: defActiveColor,
        borderRadius,
        borderWidth,
        icon,
        inActiveColor: defInActiveColor,
        size: defSize,
        iconNode,
      },
    },
  } = useUiHook()
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[
        {
          borderWidth: borderWidth,
          borderColor: disabled
            ? disabledColor
            : selected
            ? activeColor || defActiveColor || primary
            : inActiveColor || defInActiveColor,
          height: size || defSize,
          width: size || defSize,
          borderRadius: borderRadius,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {selected
        ? // <SvgXml
          //  xml={`<svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.65356 3.5647L3.59503 5.50535L7.47633 1.62405" stroke="${
          //    disabled ? disabledColor : activeColor || primary
          //  }" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
          // />
          iconNode || (
            <Icon
              name={icon.name}
              type={icon.type}
              size={icon.size}
              color={disabled ? disabledColor : activeColor || defActiveColor || primary}
            />
          )
        : null}
    </TouchableOpacity>
  )
}
