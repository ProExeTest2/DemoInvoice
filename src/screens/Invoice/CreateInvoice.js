import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Common/Header/Header";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import { colors } from "../../helper/colors";
import strings from "../../helper/strings";
import AddButton from "../../components/Button/AddButton";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import { hp } from "../../helper/Global/responsive";
import { icons } from "../../helper/icons";
import { Calendar } from "react-native-calendars";
import CustomModal from "../../components/CustomModal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getSelectedCustomerAction } from "../../redux/action/CustomerAction";
import { createInvoiceActions } from "../../redux/action/InvoiceAction";

const CreateInvoice = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // const selectedcustomername = useSelector(
  //   (state) => state?.customer?.invoicecustomer
  // );
  const invoicesq = useSelector((state) => state?.invoice);
  // const invoicedata = invoices.InvoiceData;
  const [calender1Visible, setCalender1Visible] = useState(false);
  const [calender2Visible, setCalender2Visible] = useState(false);
  const [invoicename, setInvoiceName] = useState(
    "invoice " + route.params.newInvoiceID
  );
  const [total, setTotal] = useState();
  const [amountDue, setAmountDue] = useState();
  const [invoiceDate, setInvoiceDate] = useState(
    moment().format("DD, MMM, YYYY")
  );
  const [paymentDue, setPaymentdue] = useState(
    moment().add(1, "month").format("DD, MMM, YYYY")
  );
  const [customername, setCustomerName] = useState(strings.addcustomer);
  const invoices = useSelector((state) => state?.invoice?.InvoiceData);
  // useEffect(() => {}, [selectedcustomername]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("selectedcustomername", selectedcustomername);
      setCustomerName(selectedcustomername?.customername);
    } else {
      // dispatch(getSelectedCustomerAction({}));
      // setCustomerName(strings.addcustomer);
    }
  }, [isFocused]);
  const closeOnClickOutside = true;
  const invoiceDateOnPress = () => {
    setCalender1Visible(true);
    setCalender2Visible(false);
  };
  const paymentDueOnPress = () => {
    setCalender1Visible(false);
    setCalender2Visible(true);
  };
  const addCustomerOnPress = () => {
    navigation.navigate("Customer", { selection: true });
  };
  const selectedcustomername = useSelector(
    (state) => state?.customer?.invoicecustomer
  );
  const addProductOnPress = () => {
    navigation.navigate("Products", { selection: true });
    // console.log("selectedcustomername", selectedcustomername);
  };

  const saveInvoice = () => {
    // if (
    //   (invoicename &&
    //     total &&
    //     amountDue &&
    //     invoiceDate &&
    //     paymentDue &&
    //     customername != null) ||
    //   undefined
    // ) {

    dispatch(
      createInvoiceActions({
        invoicename: invoicename,
        total: "5000", //total,
        amountDue: "5000", //amountDue,
        invoiceDate: "30-MAR-2023", //invoiceDate,
        paymentDue: "30-APR-2023", //paymentDue,
        customername: "panchal", //customername,
      })
    );

    // }
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={strings.cancle}
        isHelp={true}
        onBackPress={() => navigation.goBack()}
      />
      <TitleHeader title={strings.createinvoice} />
      <ScrollView style={{ padding: 15 }}>
        <View>
          <View style={styles.textcontainer}>
            <Text style={styles.drafttext}>#{invoicename}</Text>
            <Text style={styles.drafttext}>{strings.draft}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.projectnametext}>{strings.projectname}</Text>
            <Text style={styles.projectnametext}>{strings.posonumber}</Text>
          </View>

          <View style={[styles.textcontainer, { marginTop: hp(3) }]}>
            <Text style={styles.datetext}>{strings.invoicedate}</Text>
            <Pressable
              style={styles.textcontainer}
              onPress={() => invoiceDateOnPress()}
            >
              <Text style={styles.datetext}>{invoiceDate}</Text>
              <Image style={styles.rightarrow} source={icons.shortrightarrow} />
            </Pressable>
          </View>
          <CustomModal
            animation="slide"
            visible={calender1Visible}
            transparentContainer={true}
            modalStyle={{
              height: hp(50),
            }}
            outerStyle={{
              justifyContent: "center",
            }}
            outsideClick={() => {
              if (closeOnClickOutside) {
                setCalender1Visible(false);
              }
            }}
          >
            <Calendar
              maxDate={invoiceDate}
              onDayPress={(day) => {
                console.log("selected day", day);
                setInvoiceDate(
                  moment(day).subtract(1, "month").format("DD, MMM, YYYY")
                );
                setPaymentdue(
                  moment(day).add(1, "month").format("DD, MMM, YYYY")
                );
                setCalender1Visible(false);
              }}
              hideExtraDays
              onMonthChange={(month) => {
                console.log("month changed", month);
              }}
            />
          </CustomModal>

          <View style={styles.saperator} />
          <View style={[styles.textcontainer, { marginBottom: hp(3) }]}>
            <Text style={styles.datetext}>{strings.paymentdue}</Text>
            <Pressable
              style={styles.textcontainer}
              onPress={() => paymentDueOnPress()}
            >
              <Text style={styles.datetext}>{paymentDue}</Text>
              <Image style={styles.rightarrow} source={icons.shortrightarrow} />
            </Pressable>
          </View>
          <CustomModal
            animation="slide"
            visible={calender2Visible}
            transparentContainer={true}
            modalStyle={{
              height: hp(42),
            }}
            outerStyle={{
              justifyContent: "center",
            }}
            outsideClick={() => {
              if (closeOnClickOutside) {
                setCalender2Visible(false);
              }
            }}
          >
            <Calendar
              minDate={paymentDue}
              onDayPress={(day) => {
                console.log("selected day", day);
                setPaymentdue(
                  moment(day).subtract(1, "month").format("DD, MMM, YYYY")
                );
                setCalender2Visible(false);
              }}
              hideExtraDays
              onMonthChange={(month) => {
                console.log("month changed", month);
              }}
            />
          </CustomModal>

          <AddButton
            title={customername || strings.addcustomer}
            onPress={() => addCustomerOnPress()}
          />
          <AddButton
            title={strings.additem}
            onPress={() => addProductOnPress()}
          />
        </View>

        <View style={[styles.textcontainer, { marginVertical: hp(2.5) }]}>
          <Text style={[styles.datetext, { fontSize: 22, fontWeight: "600" }]}>
            {strings.total}
          </Text>
          <Text style={styles.datetext}>{"000"}</Text>
        </View>

        <View style={[styles.textcontainer, styles.amountduecontainer]}>
          <Text style={styles.dueamounttext}>{strings.amountdue}</Text>
          <View style={styles.textcontainer}>
            <Image style={styles.rupeeimg} source={icons.rupee} />
            <Text style={styles.dueamounttext}>000</Text>
          </View>
        </View>
      </ScrollView>
      <CircleBlackButton
        containerStyle={styles.blackbtn}
        onPress={() => saveInvoice()}
        title={strings.btnsend}
      />
    </SafeAreaView>
  );
};

export default CreateInvoice;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  projectnametext: {
    color: colors.titletext,
    fontWeight: "600",
    marginTop: 10,
    fontSize: 15,
  },
  textinput: {
    marginVertical: 10,
  },
  drafttext: {
    color: colors.black,
    fontWeight: "400",
    fontSize: 23,
  },
  textcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datetext: { fontSize: 19, fontWeight: "400", color: colors.black },
  dueamounttext: {
    fontSize: 19,
    fontWeight: "400",
    color: colors.black,
  },
  amountduecontainer: {
    backgroundColor: colors.lightgray,
    paddingVertical: 17,
    paddingHorizontal: 25,
    borderRadius: 13,
  },
  saperator: {
    height: 1.7,
    backgroundColor: colors.lightgray,
    marginVertical: 10,
  },
  blackbtn: { height: hp(10), width: hp(10) },
  rupeeimg: { height: 28, width: 28 },
  rightarrow: { height: 10, width: 10, marginLeft: 10 },
});
