import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { showToast as showToastFunc } from "../utils/utilFuncs"
import useNavigationHook from "./useNavigationHook"
import useUiHook from "./useUiHook"

export default function useAppHook() {
  const navigation = useNavigationHook()
  const dispatch = useDispatch()
  const uiHook = useUiHook()
  const showToast = useCallback(() => showToastFunc(), [])

  return { navigation, ...uiHook, dispatch, showToast }
}
