import React from "react"
import { DefaultTheme } from "./themeBuilder"

const ThemeContext = React.createContext({ value: DefaultTheme, update: theme => {} })

export default ThemeContext
