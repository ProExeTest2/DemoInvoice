/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import notifee, { EventType } from "@notifee/react-native";
import { navigate, navigationRef } from "./src/navigation/RootNavigation";
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
    // Update external API
    navigate("AddProduct");

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});
AppRegistry.registerComponent(appName, () => App);
