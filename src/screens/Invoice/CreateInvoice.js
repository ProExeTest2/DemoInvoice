import {
  Alert,
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
import {
  getSelectedProductAction,
  updateProductAction,
} from "../../redux/action/ProductAction";

const CreateInvoice = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // const selectedcustomername = useSelector(
  //   (state) => state?.customer?.invoicecustomer
  // );
  const invoices = useSelector((state) => state?.invoice?.InvoiceData);
  // const invoicedata = invoices.InvoiceData;
  // let invoicenumber = 0;
  const [invoicenumber, setInvoicenumber] = useState(0);
  const [calender1Visible, setCalender1Visible] = useState(false);
  const [calender2Visible, setCalender2Visible] = useState(false);
  const selectedcustomername = useSelector(
    (state) => state?.customer?.invoicecustomer
  );
  const selectedproduct = useSelector(
    (state) => state?.product?.selectedproducts
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
  const [selectedproductname, setSelectedProductName] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      let maxArr = [];
      invoices.map(function (obj) {
        maxArr.push(obj.key);
      });
      let maxid = Math.max(...maxArr) + 1;
      setInvoicenumber(maxid);
      console.log("MAX ", maxid);
      selectedproductname.length = 0;
      console.log("selectedcustomername", selectedcustomername);
      setCustomerName(selectedcustomername?.customername);
      let total = 0;
      let temp = [];

      console.log("selectedproduct", selectedproduct);

      if (selectedproduct != undefined || {}) {
        selectedproduct?.map((item) => {
          total = total + item.price * item.quantity;
          console.log("ITEM ", item?.productname);
          temp?.push(item?.productname);
        });
      }
      setSelectedProductName(temp);
      setAmountDue(total);
    }
  }, [isFocused]);
  const closeOnClickOutside = true;
  console.log("ITEM---- ", selectedproductname);
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

  const addProductOnPress = () => {
    navigation.navigate("Products", { selection: true });
  };
  console.log("selectedproduct", selectedproduct);
  const saveInvoice = () => {
    console.log(
      "DATA ",
      invoicenumber,
      amountDue,
      invoiceDate,
      paymentDue,
      customername
    );
    if (
      (invoicenumber &&
        amountDue &&
        invoiceDate &&
        paymentDue &&
        customername != null) ||
      undefined
    ) {
      dispatch(
        createInvoiceActions(
          {
            invoicename: "invoice " + invoicenumber,
            total: amountDue, //total,
            amountDue: amountDue, //amountDue,
            invoiceDate: String(invoiceDate),
            paymentDue: String(paymentDue),
            customername: selectedcustomername.customername, //customername,
          },
          String(invoicenumber)
        )
      );
      selectedproduct.map((item) => {
        dispatch(
          updateProductAction(
            {
              productname: item?.productname,
              description: item?.description,
              stock: item?.stock - item.quantity,
              price: item?.price,
              igst: item?.igst,
              hsncode: item?.hsncode,
              productimage: item?.productimage,
            },
            item?.key
          )
        );
        console.log("PRODUCT ", { item });
      });
      navigation.pop(2);
    } else {
      Alert.alert("ERROR:: ");
    }
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={strings.cancle}
        isHelp={true}
        onBackPress={() => {
          dispatch(getSelectedCustomerAction({}));
          setCustomerName(strings.addcustomer);
          dispatch(getSelectedProductAction({}));
          setSelectedProductName(strings.addproduct);
          navigation.goBack();
        }}
      />
      <TitleHeader title={strings.createinvoice} />
      <ScrollView style={{ padding: 15 }}>
        <View>
          <View style={styles.textcontainer}>
            <Text style={styles.drafttext}>#invoice {invoicenumber}</Text>
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
              // maxDate={invoiceDate}
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
            title={
              selectedproductname?.join(",") || strings.additem
              // selectedproductname?.length == 0
              // ?strings.additem
              //   : selectedproductname?.join(" ,")
            }
            onPress={() => addProductOnPress()}
          />
        </View>

        <View style={[styles.textcontainer, { marginVertical: hp(2.5) }]}>
          <Text style={[styles.datetext, { fontSize: 22, fontWeight: "600" }]}>
            {strings.total}
          </Text>
          <Text style={styles.datetext}>{amountDue}</Text>
        </View>

        <View style={[styles.textcontainer, styles.amountduecontainer]}>
          <Text style={styles.dueamounttext}>{strings.amountdue}</Text>
          <View style={styles.textcontainer}>
            <Image style={styles.rupeeimg} source={icons.rupee} />
            <Text style={styles.dueamounttext}>{amountDue}</Text>
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
