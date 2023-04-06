// import { createNavigationContainerRef } from "@react-navigation/native";
// import * as React from "react";

// export const navigationRef = createNavigationContainerRef(); //React.createRef();

// // export function navigate(name, params) {
// //   navigationRef.current?.navigate(name, params);
// // }
// // export const isReadyRef = React.createRef();
// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }

import { createRef } from "react";
import { CommonActions } from "@react-navigation/native";

export const navigationRef = createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export const commonActions = (name, params) =>
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    })
  );
