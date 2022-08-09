import { cloneDeep, merge } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import ThemeContext from "../utils/ThemeContext"
import { Provider as RRProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Provider as PaperProvider } from "react-native-paper"
import { createTheme } from "../utils/themeBuilder"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Provider({
  children,
  defaultTheme,
  storeTheme = true,
  store,
  persistor,
  persistorLoading,
  ...props
}) {
  const [theme, setTheme] = useState()

  const getStoredTheme = useCallback(async () => {
    const storedTheme = await AsyncStorage.getItem("mhTheme")
    setTheme(storedTheme ? createTheme(JSON.parse(storedTheme)) : createTheme(defaultTheme))
  }, [])
  useEffect(() => {
    getStoredTheme()
  }, [])

  const checkAndStoreTheme = useCallback(async () => {
    const newTheme = JSON.stringify(theme)
    const storedTheme = await AsyncStorage.getItem("mhTheme")
    if (!!theme && storedTheme != newTheme) {
      AsyncStorage.setItem("mhTheme", newTheme)
    }
  }, [theme])

  useEffect(() => {
    checkAndStoreTheme()
  }, [theme])

  return (
    <RRProvider store={store}>
      <PersistGate persistor={persistor} loading={persistorLoading || null}>
        <PaperProvider theme={theme}>
          <ThemeContext.Provider
            value={{
              value: theme,
              update: th => setTheme(val => cloneDeep(merge(cloneDeep(val), cloneDeep(th)))),
            }}
          >
            {!!theme ? children : persistorLoading || null}
          </ThemeContext.Provider>
        </PaperProvider>
      </PersistGate>
    </RRProvider>
  )
}
