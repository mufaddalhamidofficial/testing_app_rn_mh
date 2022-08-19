import { ScaledSize } from "react-native"
import { Dispatch } from "redux"
import { showToast } from "../utils/utilFuncs"
import { NavigationHookReturn } from "./useNavigationHook"
import { UiHookReturn } from "./useUiHook"

interface AppHookReturn extends NavigationHookReturn, ScaledSize, UiHookReturn {
  dispatch: Dispatch<any>
  showToast: typeof showToast
}

export default function useAppHook(): AppHookReturn
