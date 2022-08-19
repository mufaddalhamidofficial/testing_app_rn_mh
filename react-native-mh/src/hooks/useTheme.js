import { useContext } from "react"
import ThemeContext from "./../utils/ThemeContext"

export default function useTheme() {
  const { value: theme, update: updateTheme } = useContext(ThemeContext)
  return { theme, updateTheme }
}
