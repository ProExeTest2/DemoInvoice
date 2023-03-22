import React from "react";
import MainNavigation from "./src/navigation/MainNavigation";
import persistReducer from "redux-persist/es/persistReducer";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./src/redux/reducer/index";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);
export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
