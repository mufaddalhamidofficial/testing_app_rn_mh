import { DefaultTheme } from "./../utils/themeBuilder"

interface ThemeHookReturn {
  theme: typeof DefaultTheme
  updateTheme: (theme: typeof DefaultTheme) => void
}

export default function useTheme(): ThemeHookReturn
