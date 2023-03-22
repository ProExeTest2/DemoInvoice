import { Keyboard, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import strings from "../../helper/strings";
import { colors } from "../../helper/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FloatingLableTextInput from "../../components/FloatingLableTextInput";
import CircleBlackButton from "../../components/CircleBlackButton";
import CheckBox from "react-native-check-box";
import TitleHeader from "../../components/Header/TitleHeader";
import {
  validateEmail,
  validateGSTNumber,
  validatePancard,
} from "../../helper/Global/functions";
const AddCustomer = () => {
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

  const [customername, setCustomername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [pannumber, setPanNumber] = useState(""); //BNZPM2501F
  const [gstnumber, setGstNumber] = useState("");
  const [gststatecode, setGstStateCode] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [address1, setAddress1] = useState("");
  const [town1, setTown1] = useState("");
  const [state1, setState1] = useState("");
  const [asAbove, setAsAbove] = useState(false);

  const checkboxOnSelect = () => {
    setAsAbove(!asAbove);
    if (!asAbove) {
      setTown1(town);
      setAddress1(address);
      setState1(state);
    } else {
      setTown1("");
      setAddress1("");
      setState1("");
    }
  };
  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header isBack={true} backtext={strings.cancle} />
      <KeyboardAwareScrollView style={{ padding: 15 }}>
        <TitleHeader title={strings.addcustomer} />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            phoneRef?.current?.focus();
          }}
          Value={customername}
          label={strings.customername}
          editable={true}
          onChangeText={(txt) => {
            setCustomername(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            emailRef?.current?.focus();
          }}
          Value={phonenumber}
          label={strings.phonenumber}
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
          label={strings.emailaddress}
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
          label={strings.pannumber}
          editable={true}
          onChangeText={(txt) => {
            setPanNumber(txt.toUpperCase());
          }}
          blurOnSubmit={false}
          maxLength={10}
        />
        <Text style={styles.title}>{strings.customergstdetail}</Text>
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
          label={strings.gstnumber}
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
          Value={gststatecode}
          label={strings.gststate}
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
          label={strings.gststatecode}
          editable={true}
          onChangeText={(txt) => {
            setGstStateCode(txt);
          }}
          blurOnSubmit={false}
          maxLength={2}
        />
        <Text style={styles.title}>{strings.billingaddress}</Text>
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            townRef?.current?.focus();
          }}
          Value={address}
          label={strings.address}
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
          label={strings.town}
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
          label={strings.state}
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
          rightText={strings.shippingaddress}
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
          label={strings.address}
          editable={true}
          onChangeText={(txt) => {
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
          label={strings.town}
          editable={true}
          onChangeText={(txt) => {
            setTown1(txt);
            setAsAbove(false);
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
          label={strings.state}
          editable={true}
          onChangeText={(txt) => {
            setState1(txt);
          }}
          blurOnSubmit={false}
        />
      </KeyboardAwareScrollView>
      <CircleBlackButton title={"S U B M I T"} onPress={() => loginUser()} />
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
});
