import { AppRegistry, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Common/Header/Header";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import strings from "../../helper/strings";
import { colors } from "../../helper/colors";
import CustomerList from "../../components/List/CustomerList";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import { hp } from "../../helper/Global/responsive";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCustomerAction } from "../../redux/action/CustomerAction";
import { Plus } from "../../helper/svgs";
function Customer({ navigation, route }) {
  const customers = useSelector((state) => state?.customer?.CustomerData);

  const [customerList, setCustomerList] = useState(customers);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    // if (isFocused) {
    //   console.log("focus ", isFocused);
    //   console.log("DATAs ", customers);
    // setCustomerList(customers);
    // }
  }, [customers]);

  console.log("customerList", customers);

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={"BACK"}
        onBackPress={() => navigation.goBack()}
      />
      <TitleHeader title={strings.customer} />
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
          icon={<Plus />}
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
