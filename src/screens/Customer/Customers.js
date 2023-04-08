import { AppRegistry, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Common/Header/Header";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import { colors } from "../../helper/colors";
import CustomerList from "../../components/List/CustomerList";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import { icons } from "../../helper/icons";
import { hp } from "../../helper/Global/responsive";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCustomerAction } from "../../redux/action/CustomerAction";
import StringsOfLanguage from "../../helper/Localization/StringsOfLanguage";
function Customer({ navigation, route }) {
  const customers = useSelector((state) => state?.customer?.CustomerData);

  const dispatch = useDispatch();
  useEffect(() => {}, [customers]);

  console.log("customerList", customers);

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={StringsOfLanguage.back}
        onBackPress={() => navigation.goBack()}
      />
      <TitleHeader title={StringsOfLanguage.customer} />
      <FlatList
        style={styles.list}
        data={customers}
        renderItem={({ item }) => {
          console.log("itemitem", route?.params?.selection);
          return (
            <CustomerList
              name={item?.customername}
              phonenumber={item?.phonenumber}
              onPress={() => {
                if (route?.params?.selection == true) {
                  //dispatch({ type: GET_SELECTED_CUSTOMER, payload: item });
                  navigation.goBack();
                  dispatch(getSelectedCustomerAction(item));
                } else {
                  navigation.navigate("CustomerDetails", {
                    CustomerData: item,
                  });
                }
              }}
            />
          );
        }}
      />
      {!route?.params?.selection && (
        <CircleBlackButton
          containerStyle={styles.blackbtn}
          onPress={() => navigation.navigate("AddCustomer")}
          icon={icons.plus}
        />
      )}
    </SafeAreaView>
  );
}

export default Customer;
//AppRegistry.registerComponent("Customer", () => Customer);
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  list: { paddingHorizontal: 5, marginTop: hp(1.8) },
  blackbtn: {
    height: hp(8),
    width: hp(8),
  },
});
