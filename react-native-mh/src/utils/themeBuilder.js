import { cloneDeep, merge } from "lodash"
import { DefaultTheme as RNPDefaultTheme } from "react-native-paper"

const defaultPrimaryColor = "#00f"

export const DefaultTheme = {
  colors: RNPDefaultTheme.colors,
  dark: false,
  fonts: { fontFamily: null },
  buttonStyles: {
    textStyle: { color: "#fff", fontSize: 15, fontWeight: "700" },
    defaultMode: "contained",
    containerStyle: {
      backgroundColor: defaultPrimaryColor,
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 18,
    },
    linear: false,
    linearProps: {
      colors: [defaultPrimaryColor, defaultPrimaryColor],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      useAngle: false,
      angle: 0.5,
      angleCenter: { x: 5, y: 5 },
    },
    shadow: false,
    shadowProps: {
      startColor: "#000",
      finalColor: "#000",
      distance: 10,
      offset: [0, 0],
      paintInside: true,
      sides: ["left", "right", "top", "bottom"],
      corners: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
    },
  },
  checkboxStyles: {
    inActiveColor: "#72767D",
    activeColor: defaultPrimaryColor,
    borderRadius: 6.5,
    size: 16,
    borderWidth: 1.5,
    icon: { name: "check", type: "material", size: 8 },
    iconNode: null,
  },
  headerStyles: {
    backgroundColor: "#fff",
    foregroundColor: "#000",
    height: 56,
    paddingHorizontal: 20,
    backIcon: { name: "arrow-back", type: "material", size: 24 },
    backIconNode: null,
    title: {
      style: { fontSize: 16, fontWeight: "700" },
      defaultCenter: false,
    },
    shadow: true,
    shadowProps: {
      startColor: "#0000001B",
      finalColor: "#00000000",
      distance: 5,
      radius: 0,
      offset: [0, 0],
      sides: ["bottom"],
    },
  },
  pickerSelectStyles: {
    color: "#000",
    icon: { name: "keyboard-arrow-down", type: "material", size: 24 },
    iconNode: null,
    defaultMode: "dropdown",
  },
  textInputStyles: {
    placeholderTextColor: "#00000061",
    selectionColor: defaultPrimaryColor + "55",
    style: { paddingVertical: 0, paddingHorizontal: 10, color: "#000" },
    changeHeadingOnFocus: false,
    changeFocusBorder: true,
    focusBorderWidth: 1,
    focusedColor: defaultPrimaryColor,
    headingStyle: { color: "#000", fontSize: 15, fontWeight: "400", paddingBottom: 12 },
    shadow: true,
    shadowProps: {
      startColor: "#0000000D",
      finalColor: "#00000000",
      distance: 4,
      offset: [0, 2],
      sides: ["bottom"],
    },
    borderRadius: 5,
    errorStyle: { marginTop: 2, fontSize: 12, fontWeight: "700" },
    leftError: false,
    leftErrorMarginHorizontal: 10,
    containerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 5,
      height: Platform.OS == "ios" ? 50 : null,
      alignItems: "center",
      backgroundColor: "#fff",
      flexDirection: "row",
      width: "100%",
    },
    defaultBorderColor: "transparent",
  },
}

export const createTheme = data => {
  return cloneDeep(merge(cloneDeep(DefaultTheme), cloneDeep(data)))
}
