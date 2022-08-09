import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import rootReducer from "./reducers"

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    debug: __DEV__,
    version: 1,
    blacklist: [],
  },
  rootReducer,
)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

export default store
