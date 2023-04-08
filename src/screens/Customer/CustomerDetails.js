import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Common/Header/Header";
import { colors } from "../../helper/colors";
import CustomerDetailsList from "../../components/List/CustomerDetailsList";
import { ScrollView } from "react-native-gesture-handler";
import BlackButton from "../../components/Button/BlackButton";
import { icons } from "../../helper/icons";
import { useDispatch } from "react-redux";
import { deleteCustomerAction } from "../../redux/action/CustomerAction";
import StringsOfLanguage from "../../helper/Localization/StringsOfLanguage";

const CustomerDetails = ({ navigation, route }) => {
  const CustomerData = route?.params?.CustomerData;
  const dispatch = useDispatch();
  const deleteOnPress = () => {
    dispatch(deleteCustomerAction(route?.params?.CustomerData.key));
    navigation.goBack();
    console.log("DELETE", route?.params?.CustomerData.key);
  };
  const editOnPress = () => {
    navigation.navigate("AddCustomer", {
      CustomerData: CustomerData,
      work: "Update",
    });
    console.log("EDIT");
  };
  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={"BACK"}
        onBackPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>{CustomerData?.customername || "Name"}</Text>
      <ScrollView style={{ padding: 20 }}>
        <CustomerDetailsList
          title={StringsOfLanguage.customername}
          value={CustomerData?.customername}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.phonenumber}
          value={CustomerData?.phonenumber}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.emailaddress}
          value={CustomerData?.emailaddress}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.pannumber}
          value={CustomerData?.pannumber}
        />

        <Text style={styles.gsttitle}>GST Details</Text>

        <CustomerDetailsList
          title={StringsOfLanguage.gstnumber}
          value={CustomerData?.gstnumber}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.gststate}
          value={CustomerData?.gststate}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.gststatecode}
          value={CustomerData?.gststatecode}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.billingaddress}
          value={
            CustomerData?.address +
            ", " +
            CustomerData?.town +
            ", " +
            CustomerData?.state
          }
        />
        <CustomerDetailsList
          title={StringsOfLanguage.shippingaddress}
          value={
            CustomerData?.address1 +
            ", " +
            CustomerData?.town1 +
            ", " +
            CustomerData?.state1
          }
        />
      </ScrollView>
      <View style={styles.buttoncontainer}>
        <BlackButton
          icon={icons.delete}
          title={StringsOfLanguage.delete}
          onPress={() => {
            deleteOnPress();
          }}
        />
        <BlackButton
          icon={icons.edit}
          title={StringsOfLanguage.edit}
          onPress={() => {
            editOnPress();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomerDetails;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginTop: 18,
    alignSelf: "center",
  },
  detail: {
    fontSize: 10,
    color: colors.black,
  },
  gsttitle: {
    fontSize: 20,
    color: colors.titletext,
    marginVertical: 10,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
