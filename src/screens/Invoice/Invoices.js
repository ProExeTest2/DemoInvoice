import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../helper/colors";
import Header from "../../components/Common/Header/Header";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import strings from "../../helper/strings";
import InvoicesList from "../../components/List/InvoicesList";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import { hp } from "../../helper/Global/responsive";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { Plus, Plus_White, Search } from "../../helper/svgs";

const Invoices = ({ navigation }) => {
  const invoices = useSelector((state) => state?.invoice?.InvoiceData);
  //const [invoices, setInvoices] = useState();
  const [isPaid, setIsPaid] = useState(false);

  console.log("INVOICES ", invoices);
  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={"MENU"}
        isHelp={true}
        onBackPress={() => navigation.goBack()}
      />
      <TitleHeader
        title={strings.invoices}
        onPress={() => {}}
        rightIcon={<Search />}
      />
      {/* // /><Image style={styles.searchicon} source={icons.search} /> */}
      <View style={styles.optionbuttoncontainer}>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: !isPaid ? colors.white : colors.lightgray },
          ]}
          onPress={() => setIsPaid(false)}
        >
          <Text style={styles.buttontext}>{strings.unpaid}</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: isPaid ? colors.white : colors.lightgray },
          ]}
          onPress={() => setIsPaid(true)}
        >
          <Text style={styles.buttontext}>{strings.paid}</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>{strings.overdue}</Text>
      <FlatList
        style={{ flex: 1 }}
        data={invoices}
        renderItem={({ item }) => {
          return (
            <InvoicesList
              name={item?.customername}
              price={item?.amountDue}
              invoice={item?.invoicename}
              duetime={"Due 25 Days ago"}
            />
          );
        }}
      />
      <Text style={styles.title}>{strings.viewed}</Text>

      <CircleBlackButton
        containerStyle={styles.blackbtn}
        onPress={() => navigation.navigate("CreateInvoice")}
        icon={<Plus_White />}
        //icon={icons.plus}
      />
    </SafeAreaView>
  );
};

export default Invoices;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  optionbuttoncontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightgray,
    margin: hp(2),
    borderRadius: 10,
    padding: 5,
  },
  buttontext: {
    fontSize: 17,
    color: colors.black,
  },
  button: { width: "50%", alignItems: "center", borderRadius: 10, padding: 10 },
  title: {
    fontSize: 16,
    color: colors.titletext,
    fontWeight: "500",
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  searchicon: { height: 26, width: 26 },
  blackbtn: { height: hp(9), width: hp(9) },
});
