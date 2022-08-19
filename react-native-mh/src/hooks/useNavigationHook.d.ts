import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native"

interface NavigationHookReturn extends RouteProp<ParamListBase> {
  navigation: NavigationProp<ReactNavigation.RootParamList>
}
export default function useNavigationHook(): NavigationHookReturn
