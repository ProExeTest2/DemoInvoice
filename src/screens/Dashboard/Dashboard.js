import { Alert, Image, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import strings from "../../helper/strings";
import { colors } from "../../helper/colors";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import { hp } from "../../helper/Global/responsive";
import auth from "@react-native-firebase/auth";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../redux/action/ProductAction";
import { getInvoiceActions } from "../../redux/action/InvoiceAction";
import firestore from "@react-native-firebase/firestore";
import { getCustomerAction } from "../../redux/action/CustomerAction";
import messaging from "@react-native-firebase/messaging";
import { icons } from "../../helper/icons";
import { sendNotification } from "../../helper/Global/functions";
import StringsOfLanguage from "../../helper/Localization/StringsOfLanguage";
const Dashboard = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customers = useSelector((state) => state?.customer?.CustomerData);
  const products = useSelector((state) => state?.product?.ProductData);
  const invoices = useSelector((state) => state?.invoice?.InvoiceData);

  const [token, setToken] = useState();

  const getFcmToken = async () => {
    try {
      const newFcmToken = await messaging().getToken();
      console.log("TOKEN:: ", newFcmToken);
      setToken(newFcmToken);
      return newFcmToken;
    } catch (error) {
      console.error("TOKEN ERROR:: ", error);
      return null;
    }
  };

  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getCurrentUser();
      let request = {
        onSuccess: (res) => {
          console.log("res iof ger customer :: ", res);
        },
        onFail: (err) => {
          console.log("Error iof ger customer :: ", err);
        },
      };

      firestore()
        .collection("Customer")
        .onSnapshot((snap) => {
          const temp = [];
          snap.forEach((doc) => {
            temp.push({ ...doc.data(), key: doc.id });
          });
          console.log("DOC ", temp.length);
          dispatch(getCustomerAction(temp));
        });

      firestore()
        .collection("Product")
        .onSnapshot((snap) => {
          const temp = [];
          snap.forEach((doc) => {
            temp.push({ ...doc.data(), key: doc.id });
          });
          console.log("DOC ", temp.length);
          dispatch(getProductAction(temp));
        });

      firestore()
        .collection("Invoice")
        .onSnapshot((snap) => {
          const temp = [];
          snap.forEach((doc) => {
            temp.push({ ...doc.data(), key: doc.id });
          });
          console.log("DOC ", temp.length);
          dispatch(getInvoiceActions(temp));
        });
    }
    //PushNotification.configure({})
  }, [isFocused]);

  const getCurrentUser = async () => {
    console.log("CURRENT ", auth().currentUser);
    //navigation.replace(auth().currentUser ? "" : "Login");
  };
  const cardOnPress = (routeName) => {
    navigation.navigate(routeName);
  };
  const getNotification = async () => {
    sendNotification(
      "IMAGE NOTIFICATION",
      "inbox style notifications are used to display multiple lines of content inside of a single notification. Depending on space, the device will show as many lines of text as possible, and hide the remainder.To set a small icon, add a smallIcon property to the notification body.",
      "Products"
      // require("../../../assets/Images/img1.jpeg")
    );
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <TitleHeader
        title={"Dashboard"}
        style={{ marginTop: hp(3.5) }}
        rightIcon={
          <Image
            source={icons.settings}
            style={{
              height: 30,
              width: 30,
            }}
          />
        }
        onPress={() => {
          navigation.openDrawer();
          //navigation.navigate("DrawerNavigation");
        }}
      />
      <View style={styles.cardcontainer}>
        <DashboardCard
          count={invoices?.length} //{invoices?.length}
          title={StringsOfLanguage.invoices}
          background={colors.card1}
          onPress={() => cardOnPress("Invoices")}
        />
        <DashboardCard
          count={customers?.length} //{customers?.length}
          title={StringsOfLanguage.customer}
          background={colors.card2}
          onPress={() => {
            cardOnPress("Customer");
          }}
        />
      </View>
      <View style={styles.cardcontainer}>
        <DashboardCard
          count={products?.length} //{products.length}
          title={StringsOfLanguage.products}
          background={colors.card3}
          onPress={() => {
            cardOnPress("Products");
          }}
        />
        <DashboardCard
          count={10}
          title={StringsOfLanguage.payments}
          background={colors.card4}
          onPress={() => {
            console.log("BEFORE0");
            getNotification();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(1.5),
  },
});
