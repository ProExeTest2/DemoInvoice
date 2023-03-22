import { Alert } from "react-native";

export const validateEmail = (email) => {
  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  if (!strongRegex.test(email)) {
    Alert.alert("Email not valid");
    return false;
  } else {
    Alert.alert("Email is valid");
    return true;
  }
};

export const validatePancard = (pannumber) => {
  let regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (!regex.test(pannumber)) {
    Alert.alert("PAN not valid");
    return false;
  } else {
    Alert.alert("PAN is valid");
    return true;
  }
};

export const validateGSTNumber = (gstnumber) => {
  let regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!regex.test(gstnumber)) {
    Alert.alert("GST not valid");
    return false;
  } else {
    Alert.alert("GST is valid");
    return true;
  }
};
