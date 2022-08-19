import { ScaledSize } from "react-native"
import { ThemeHookReturn } from "./useTheme"

interface UiHookReturn extends ScaledSize, ThemeHookReturn {
  sbw: (width: number) => React.ReactNode
  sbh: (height: number) => React.ReactNode
}
export default function useUiHook(): UiHookReturn
