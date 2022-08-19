import { useNavigation, useRoute } from "@react-navigation/native"

export default function useNavigationHook() {
  const navigation = useNavigation()
  const route = useRoute()

  return { navigation, ...route }
}
