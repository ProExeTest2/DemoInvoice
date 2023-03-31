import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import DashboardCard from "../../components/DashboardCard";
import strings from "../../helper/strings";
import { colors } from "../../helper/colors";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import { hp } from "../../helper/Global/responsive";
import auth from "@react-native-firebase/auth";
import { getCustomer, getInvoice } from "../../helper/Global/functions";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../redux/action/ProductAction";
import { getInvoiceActions } from "../../redux/action/InvoiceAction";

const Dashboard = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state?.customer?.CustomerData);
  const products = useSelector((state) => state?.product?.ProductData);
  const invoices = useSelector((state) => state?.invoice?.InvoiceData);
  // const invoicedata = invoices.InvoiceData;
  useEffect(() => {}, [customers]);
  useEffect(() => {}, [products]);
  useEffect(() => {}, [invoices]);
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
      dispatch(getCustomer(request));
      console.log("USER 1");
      dispatch(getInvoiceActions());
      console.log("USER 2");
      dispatch(getProductAction());
    }
  }, [isFocused]);

  const getCurrentUser = () => {
    navigation.replace(auth().currentUser ? "" : "Login");
  };

  const cardOnPress = (routeName) => {
    navigation.navigate(routeName);
  };
  console.log("customers at dashboard", invoices);
  return (
    <SafeAreaView style={styles.maincontainer}>
      <TitleHeader title={"Dashboard"} style={{ marginTop: hp(3.5) }} />
      <View style={styles.cardcontainer}>
        <DashboardCard
          count={invoices?.length}
          title={strings.invoices}
          background={colors.card1}
          onPress={() => cardOnPress("Invoices")}
        />
        <DashboardCard
          count={customers?.length}
          title={strings.customer}
          background={colors.card2}
          onPress={() => {
            cardOnPress("Customer");
          }}
        />
      </View>
      <View style={styles.cardcontainer}>
        <DashboardCard
          count={products.length}
          title={strings.products}
          background={colors.card3}
          onPress={() => {
            cardOnPress("Products");
          }}
        />
        <DashboardCard
          count={10}
          title={strings.payments}
          background={colors.card4}
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
