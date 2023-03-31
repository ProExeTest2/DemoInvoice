import React, { useEffect } from "react";
import MainNavigation from "./src/navigation/MainNavigation";
import persistReducer from "redux-persist/es/persistReducer";
import { applyMiddleware, createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./src/redux/reducer/index";
import { request, PERMISSIONS } from "react-native-permissions";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);
export default function App() {
  useEffect(() => {
    request(PERMISSIONS.IOS.CAMERA).then((r) => console.log("IOS", r));
  }, []);
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
