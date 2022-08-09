import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native"
import { Moment } from "moment"
import { ScaledSize } from "react-native"
import { Dispatch } from "redux"
import { DefaultTheme, DefaultTheme as theme } from "./themeBuilder"

export function showToast(msg: String, type?: String, otherProps?: Object): void

interface NavigationHookReturn extends RouteProp<ParamListBase> {
  navigation: NavigationProp<ReactNavigation.RootParamList>
}

interface UiHookReturn extends ScaledSize {
  theme: typeof theme
  updateTheme: (theme: typeof DefaultTheme) => void
  sbw: (width: number) => React.ReactNode
  sbh: (height: number) => React.ReactNode
}

interface AppHookReturn extends NavigationHookReturn, ScaledSize, UiHookReturn {
  dispatch: Dispatch<any>
  showToast: typeof showToast
}

export function useAppHook(): AppHookReturn

export function useNavigationHook(): NavigationHookReturn

export function useUiHook(): UiHookReturn

export function randomDate(start: Moment, end: Moment): Moment
export function randomColor(): String

export function sleep(ms: Number): Promise<void>

export function useTheme(): { theme: typeof DefaultTheme; updateTheme: (theme: typeof DefaultTheme) => void }
