import { Alert, Keyboard, SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Common/Header/Header";
import strings from "../../helper/strings";
import { colors } from "../../helper/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FloatingLableTextInput from "../../components/FloatingLableTextInput";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import CheckBox from "react-native-check-box";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import {
  createCustomer,
  updateCustomer,
  validateEmail,
  validateGSTNumber,
  validatePancard,
  sendNotification,
} from "../../helper/Global/functions";
import { hp, wp } from "../../helper/Global/responsive";
import { useDispatch } from "react-redux";
import {
  createCustomerAction,
  updateCustomerAction,
} from "../../redux/action/CustomerAction";
import StringsOfLanguage from "../../helper/Localization/StringsOfLanguage";
const AddCustomer = ({ route, navigation }) => {
  const {
    phoneRef,
    emailRef,
    panRef,
    gstRef,
    gststateRef,
    gststatecodeRef,
    addressRef,
    townRef,
    stateRef,
    addressRef1,
    townRef1,
    stateRef1,
  } = useRef();
  const dispatch = useDispatch();
  const CustomerDetails = route?.params?.CustomerData;

  const [customername, setCustomername] = useState(
    CustomerDetails?.customername || ""
  );
  const [phonenumber, setPhoneNumber] = useState(
    CustomerDetails?.phonenumber || ""
  );
  const [emailaddress, setEmailAddress] = useState(
    CustomerDetails?.emailaddress || ""
  );
  const [pannumber, setPanNumber] = useState(
    CustomerDetails?.pannumber || "BNZPM2501F"
  ); //BNZPM2501F
  const [gstnumber, setGstNumber] = useState(
    CustomerDetails?.gstnumber || "22AAAAA0000A1Z5"
  ); //22AAAAA0000A1Z5
  const [gststate, setGstState] = useState(CustomerDetails?.gststate || "");
  const [gststatecode, setGstStateCode] = useState(
    CustomerDetails?.gststatecode || ""
  );
  const [address, setAddress] = useState(CustomerDetails?.address || "");
  const [town, setTown] = useState(CustomerDetails?.town || "");
  const [state, setState] = useState(CustomerDetails?.state || "");
  const [address1, setAddress1] = useState(CustomerDetails?.address1 || "");
  const [town1, setTown1] = useState(CustomerDetails?.town1 || "");
  const [state1, setState1] = useState(CustomerDetails?.state1 || "");
  const [asAbove, setAsAbove] = useState(false);

  useEffect(() => {
    isAddressSame();
    console.log("");
  }, [address1, town1, state1]);

  const isAddressSame = () => {
    if (address1 == address && town == town1 && state == state1) {
      setAsAbove(true);
    } else {
      setAsAbove(false);
    }
  };

  const checkboxOnSelect = () => {
    if (asAbove) {
      setTown1("");
      setAddress1("");
      setState1("");
    } else {
      setTown1(town);
      setAddress1(address);
      setState1(state);
    }
    setAsAbove(!asAbove);
  };
  const addCustomer = (task) => {
    if (
      (customername,
      phonenumber,
      emailaddress,
      pannumber,
      gstnumber,
      gststate,
      gststatecode,
      address,
      town,
      state,
      address1,
      town1,
      state1 != null)
    ) {
      if (task == "create") {
        dispatch(
          createCustomerAction({
            customername: customername,
            phonenumber: phonenumber,
            emailaddress: emailaddress,
            pannumber: pannumber,
            gstnumber: gstnumber,
            gststate: gststate,
            gststatecode: gststatecode,
            address: address,
            town: town,
            state: state,
            address1: address1,
            town1: town1,
            state1: state1,
          })
        );
        sendNotification(customername, "New Customer Created!");
        navigation.pop(2);
      } else if (task == "update") {
        dispatch(
          updateCustomerAction(
            {
              customername: customername,
              phonenumber: phonenumber,
              emailaddress: emailaddress,
              pannumber: pannumber,
              gstnumber: gstnumber,
              gststate: gststate,
              gststatecode: gststatecode,
              address: address,
              town: town,
              state: state,
              address1: address1,
              town1: town1,
              state1: state1,
            },
            CustomerDetails?.key
          )
        );
        navigation.pop(2);
      }
    } else {
      Alert.alert("Fill All Field");
    }
  };

  //const sendNotification = () => {};

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={StringsOfLanguage.cancle}
        onBackPress={() => navigation.goBack()}
      />
      <TitleHeader title={StringsOfLanguage.addcustomer} />
      <KeyboardAwareScrollView style={{ padding: 15 }}>
        <FloatingLableTextInput
          style={styles.textinput}
          label={StringsOfLanguage.customername}
          Value={customername}
          returnKeyType={"next"}
          editable={true}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            phoneRef?.current?.focus();
          }}
          onChangeText={(txt) => {
            setCustomername(txt);
          }}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            emailRef?.current?.focus();
          }}
          Value={phonenumber}
          label={StringsOfLanguage.phonenumber}
          editable={true}
          keyboardType="number-pad"
          onChangeText={(txt) => {
            setPhoneNumber(txt);
          }}
          blurOnSubmit={false}
          maxLength={10}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            validateEmail(emailaddress)
              ? panRef?.current?.focus()
              : console.log("Enter Email");
          }}
          Value={emailaddress}
          label={StringsOfLanguage.emailaddress}
          editable={true}
          keyboardType="email-address"
          onChangeText={(txt) => {
            setEmailAddress(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            validatePancard(pannumber)
              ? gstRef?.current?.focus()
              : console.log("Enter Pancard");
          }}
          Value={pannumber}
          label={StringsOfLanguage.pannumber}
          editable={true}
          onChangeText={(txt) => {
            setPanNumber(txt.toUpperCase());
          }}
          blurOnSubmit={false}
          maxLength={10}
        />

        <Text style={styles.title}>{StringsOfLanguage.customergstdetail}</Text>

        <FloatingLableTextInput
          style={styles.textinput}
          max
          returnKeyType={"next"}
          onSubmitEditing={() => {
            validateGSTNumber(gstnumber)
              ? gststateRef?.current?.focus()
              : console.log("Enter GST");
          }}
          Value={gstnumber}
          label={StringsOfLanguage.gstnumber}
          editable={true}
          onChangeText={(txt) => {
            setGstNumber(txt.toUpperCase());
          }}
          blurOnSubmit={false}
          maxLength={15}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            gststatecodeRef?.current?.focus();
          }}
          Value={gststate}
          label={StringsOfLanguage.gststate}
          editable={true}
          onChangeText={(txt) => {
            setGstState(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            addressRef?.current?.focus();
          }}
          Value={gststatecode}
          label={StringsOfLanguage.gststatecode}
          editable={true}
          onChangeText={(txt) => {
            setGstStateCode(txt);
          }}
          blurOnSubmit={false}
          maxLength={2}
        />

        <Text style={styles.title}>{StringsOfLanguage.billingaddress}</Text>

        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            townRef?.current?.focus();
          }}
          Value={address}
          label={StringsOfLanguage.address}
          editable={true}
          onChangeText={(txt) => {
            setAddress(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            stateRef?.current?.focus();
          }}
          Value={town}
          label={StringsOfLanguage.town}
          editable={true}
          onChangeText={(txt) => {
            setTown(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            addressRef1?.current?.focus();
          }}
          Value={state}
          label={StringsOfLanguage.state}
          editable={true}
          onChangeText={(txt) => {
            setState(txt);
          }}
          blurOnSubmit={false}
        />

        <CheckBox
          style={styles.checkbox}
          onClick={() => {
            checkboxOnSelect();
          }}
          isChecked={asAbove}
          rightText={StringsOfLanguage.shippingaddressasbilingaddress}
          rightTextStyle={styles.title}
          checkBoxColor={colors.gray}
        />

        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            townRef1?.current?.focus();
          }}
          Value={address1}
          label={StringsOfLanguage.address}
          editable={true}
          onChangeText={(txt) => {
            isAddressSame();
            setAddress1(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            stateRef1?.current?.focus();
          }}
          Value={town1}
          label={StringsOfLanguage.town}
          editable={true}
          onChangeText={(txt) => {
            setTown1(txt);
            isAddressSame();
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"done"}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          Value={state1}
          label={StringsOfLanguage.state}
          editable={true}
          onChangeText={(txt) => {
            setState1(txt);
            isAddressSame();
          }}
          blurOnSubmit={false}
        />
      </KeyboardAwareScrollView>

      <CircleBlackButton
        containerStyle={styles.btnsubmit}
        title={
          CustomerDetails != null || undefined
            ? strings.btnupdate
            : strings.btnsubmit
        }
        onPress={() =>
          CustomerDetails != null || undefined
            ? addCustomer("update")
            : addCustomer("create")
        }
      />
    </SafeAreaView>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    color: colors.titletext,
    fontWeight: "600",
    marginTop: 10,
    fontSize: 15,
  },
  textinput: {
    marginVertical: 10,
  },
  checkbox: {
    flex: 1,
    padding: 10,
  },
  btnsubmit: { height: hp(11.3), width: wp(23.7) },
});
