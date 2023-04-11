import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Common/Header/Header";
import { colors } from "../../helper/colors";
import strings from "../../helper/strings";
import CustomerDetailsList from "../../components/List/CustomerDetailsList";
import { ScrollView } from "react-native-gesture-handler";
import BlackButton from "../../components/Button/BlackButton";
import { useDispatch } from "react-redux";
import { deleteCustomerAction } from "../../redux/action/CustomerAction";
import { Delete, Edit } from "../../helper/svgs";

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
          title={strings.customername}
          value={CustomerData?.customername}
        />
        <CustomerDetailsList
          title={strings.phonenumber}
          value={CustomerData?.phonenumber}
        />
        <CustomerDetailsList
          title={strings.emailaddress}
          value={CustomerData?.emailaddress}
        />
        <CustomerDetailsList
          title={strings.pannumber}
          value={CustomerData?.pannumber}
        />

        <Text style={styles.gsttitle}>GST Details</Text>

        <CustomerDetailsList
          title={strings.gstnumber}
          value={CustomerData?.gstnumber}
        />
        <CustomerDetailsList
          title={strings.gststate}
          value={CustomerData?.gststate}
        />
        <CustomerDetailsList
          title={strings.gststatecode}
          value={CustomerData?.gststatecode}
        />
        <CustomerDetailsList
          title={strings.billingaddress}
          value={
            CustomerData?.address +
            ", " +
            CustomerData?.town +
            ", " +
            CustomerData?.state
          }
        />
        <CustomerDetailsList
          title={strings.shippingaddress}
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
          icon={<Delete />}
          title={strings.delete}
          onPress={() => {
            deleteOnPress();
          }}
        />
        <BlackButton
          icon={<Edit />}
          title={strings.edit}
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
