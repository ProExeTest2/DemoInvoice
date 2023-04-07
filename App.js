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
import messaging from "@react-native-firebase/messaging";
import notifee, { EventType } from "@notifee/react-native";
import { AppRegistry, PermissionsAndroid } from "react-native";
import {
  useLinkTo,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import {
  isReadyRef,
  navigate,
  navigationRef,
} from "./src/navigation/RootNavigation";
import { getRemoteConfigValue } from "./src/helper/Global/functions";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

const persistor = persistStore(store);

export default function App() {
  const linkto = useLinkTo();
  useEffect(() => {
    request(PERMISSIONS.IOS.CAMERA).then((r) => console.log("IOS", r));
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
      }
    );
    return unsubscribe;
  }, []);

  const onMessage = async (remoteMessage) => {
    const { notification, data } = remoteMessage;
    const { title, body } = notification;
    notifee.displayNotification({
      title,
      body,
      data,
    });
  };

  const onForegroundEvent = ({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        break;
      case EventType.PRESS:
        const { notification } = detail;
        if (!notification || !notification.data) return;
        const { data } = notification;
        navigate("AddProduct");
    }
  };

  useEffect(() => {
    const unsubscribeNotifee = notifee.onForegroundEvent(onForegroundEvent);
    const unsubscribe = messaging().onMessage(onMessage);
    return () => {
      unsubscribe();
      unsubscribeNotifee();
    };
  }, []);

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
