import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";
import { getInvoiceActions } from "../redux/action/InvoiceAction";
import { colorCode, getCustomer } from "../helper/Global/functions";
import { getProductAction } from "../redux/action/ProductAction";
import { FlatList } from "react-native-gesture-handler";
const demo = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    //getCurrentUser();
    console.log("res iof ger customer :: ");
    // demopattern();
    let request = {
      onSuccess: (res) => {
        console.log("res iof ger customer :: ", res);
      },
      onFail: (err) => {
        console.log("Error iof ger customer :: ", err);
      },
    };
    dispatch(getInvoiceActions());
    dispatch(getCustomer(request));
    //console.log("USER 2", customerCollection());
    dispatch(getProductAction());
    setTimeout(() => {
      navigation.replace(auth().currentUser ? "Dashboard" : "Login");
    }, 1000);
  });
  //   const getCurrentUser = async () => {
  //     //navigation.replace(auth().currentUser ? "Login" : "Dashboard");
  //   };
  const DemoPattern = (item) => {
    let c = 1;
    for (let i = 0; i < item; i++) {
      for (let j = 0; j <= i; j++) {
        console.log("*");
        //if (j <= i)
        //else continue;
      }
      j = 1;
      if (i < item) {
        c++;
        return <Text style={{ fontSize: 20 }}>{item}</Text>;
      } else {
        c--;
        return (
          <View
            style={{ backgroundColor: colorCode(), height: 20, width: 20 }}
          />
        );
      }

      //console.log("\n");
    }
    //return 0;
  };
  const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: "gray", flex: 1 }}
        data={myArr}
        renderItem={({ item }) => <View>{DemoPattern(item)}</View>}
      />
    </View>
  );
};

export default demo;

const styles = StyleSheet.create({});
