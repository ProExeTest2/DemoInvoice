import { Alert, Linking, Platform } from "react-native";
import {
  check,
  request,
  RESULTS,
  requestMultiple,
} from "react-native-permissions";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { GET_CUSTOMER, GET_INVOICE } from "../../redux/action/types";
import { useState } from "react";
import notifee, { AndroidStyle } from "@notifee/react-native";
import { icons } from "../icons";
import remoteConfig from "@react-native-firebase/remote-config";
import { navigate } from "../../navigation/RootNavigation";
const customerCollection = firestore().collection("Customer");
const productCollection = firestore().collection("Product");
const invoiceCollection = firestore().collection("Invoice");

export const validateEmail = (email) => {
  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  if (!strongRegex.test(email)) {
    //Alert.alert("Email not valid");
    return false;
  } else {
    //Alert.alert("Email is valid");
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

export const colorCode = () => {
  return (
    "rgb(" +
    (Math.floor(Math.random() * 256) + 100) +
    "," +
    (Math.floor(Math.random() * 256) + 50) +
    "," +
    Math.floor(Math.random() * 256 + 50) +
    ")"
  );
};

export async function checkMultiplePermissions(permissions) {
  let isPermissionGranted = false;
  const statuses = await requestMultiple(permissions);
  for (var index in permissions) {
    if (statuses[permissions[index]] === RESULTS.GRANTED) {
      isPermissionGranted = true;
    } else {
      isPermissionGranted = false;
      break;
    }
  }
  return isPermissionGranted;
}

export const createCustomer = (customer) => {
  customerCollection
    .doc()
    .set(customer)
    .then(() => {
      Alert.alert("a new customer added");
    })
    .catch((er) => {
      console.log("error", er);
    });
};

export const updateCustomer = (customer, key) => {
  customerCollection
    .doc(key)
    .update(customer)
    .then(() => {
      console.log("customer updated!");
    });
};

export const getCustomer = () => {
  //export const getCustomer = (request) => async (dispatch) => {
  const temp = [];
  customerCollection.onSnapshot((snap) => {
    snap.forEach((doc) => {
      temp.push({ ...doc.data(), key: doc.id });
    });
    console.log("DOC ", temp.length);
    return temp;
  });
  //console.log("TEMP Customer", temp);
  // if (request?.onSuccess) {
  //   request?.onSuccess(temp);
  // }
  console.log("TEMP Customer", temp);
  //dispatch({ type: GET_CUSTOMER, payload: temp });
};

export const deleteCustomer = (key) => {
  customerCollection
    .doc(key)
    .delete()
    .then(() => {
      console.log("customer deleted!");
    });
};

export const createProduct = (product) => {
  productCollection
    .doc()
    .set(product)
    .then(() => {
      Alert.alert("a new product added");
    })
    .catch((er) => {
      console.log("error", er);
    });
};

export const getProduct = () => {
  const temp = [];
  productCollection.onSnapshot((snap) => {
    snap.forEach((doc) => {
      temp.push({ ...doc.data(), key: doc.id });
      // console.log("doc data ", doc.data());
    });
  });
  return temp;
};

export const updateProduct = (product, key) => {
  console.log("hello", product, key);
  productCollection
    .doc(key)
    .update(product)
    .then(() => {
      console.log("Product updated!");
    })
    .catch((er) => console.log("Product not updated!", er));
};

export const deleteProduct = (key) => {
  productCollection
    .doc(key)
    .delete()
    .then(() => {
      console.log("Product deleted!");
    });
};

export const createInvoice = (invoice, key) => {
  invoiceCollection
    .doc(key)
    .set(invoice)
    .then(() => {
      Alert.alert("a new invoice added");
    })
    .catch((er) => {
      console.log("error", er);
    });
};

export const getInvoice = () => {
  const temp = [];
  invoiceCollection.onSnapshot((snap) => {
    snap.forEach((doc) => {
      temp.push({ ...doc.data(), key: doc.id });
      // console.log("doc data ", doc.data());
    });
  });
  console.log("temp invoices ", temp);

  return temp;
};

export const getmaxInvoice = () => {
  let users = [];
  invoiceCollection
    .orderBy("key", "desc")
    .get()
    .then((qs) => console.log("QS ", qs));
  //setData(users);
  //console.log("MAX2===> ", users.length);
  //});
};

export const uploadImage = async (imageData) => {
  const filename = imageData.filename;
  const imageRef = storage().ref(`/ProductImage/${filename}`);
  console.log("upload image from function", imageRef);
  const uploadUri =
    Platform.OS === "ios"
      ? imageData.uri.replace("file://", "")
      : imageData.uri.replace("file:///", ""); //imageData.uri;
  console.log(uploadUri);
  await imageRef.putFile(uploadUri).catch((error) => {
    //Alert.alert(error);
    throw error;
  });
  const url = await imageRef
    .getDownloadURL()
    .then((response) => {
      console.log("RESPONSE ", response);

      return response;
    })
    .catch((error) => {
      //console.log("ERROR ", error);
      throw error;
    });
  //setImgDownloadUrl(url);
  //Alert.alert(url);
};

export const sendNotification = async (
  title,
  body,
  mainComponent,
  bigPicture,
  bigText,
  styleType
) => {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    sound: "notification",
  });

  await notifee.displayNotification({
    title:
      '<p style="color: #4caf50;"><b>' + title + "</span></p></b></p> &#128576",
    body: body,
    android: {
      channelId,
      smallIcon: "ic_small_icon",
      largeIcon: require("../../../assets/Images/img1.jpeg"),
      sound: "notification",
      pressAction: {
        id: "default",
        //mainComponent: mainComponent,
      },
      actions: [
        {
          title: "Reply",
          icon: "https://my-cdn.com/icons/reply.png",
          pressAction: {
            id: "reply",
          },
          input: {
            allowFreeFormInput: true, // set to false
            choices: ["Yes", "No", "Maybe"],
            placeholder: "Reply...",
          }, // enable free text input
        },
        {
          title: "Delete",
          icon: "https://my-cdn.com/icons/reply.png",
          pressAction: {
            id: "reply",
          },
          input: {
            allowFreeFormInput: true, // set to false
            choices: ["Yes", "No", "Maybe"],
            placeholder: "Reply...",
          }, // enable free text input
        },
      ],
    },
    ios: {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
      attachments: [
        {
          url: icons.rupee,
        },
        {
          url: "../notification.mp3",
          thumbnailTime: 3,
        },
      ],
    },
  });
};

export const handleClick = () => {
  console.log("handleClick called---------");
  // navigationRef?.current?.navigate("AddProduct");
  navigate("AddProduct");
};

export const getRemoteConfigValue = async () => {
  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: 1000,
  });
  await remoteConfig().setDefaults({ OnBoard_Show: "true" });
  return remoteConfig()
    .fetchAndActivate()
    .then(() => {
      remoteConfig().fetch(1);
    })
    .then(() => remoteConfig().getValue("OnBoard_Show"));

  // .then(() => remoteConfig().getAll());
};
