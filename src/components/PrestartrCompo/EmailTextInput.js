import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";
import { validateEmail } from "../../helper/Global/functions";

const EmailTextInput = ({ onChangeEmail, defaultValue }) => {
  const [Email, setEmail] = useState("");
  return (
    <>
      <CustomTextInput
        placeholder={"Type Email Here.."}
        onChangeText={(c) => {
          setEmail(c);
          onChangeEmail(c);
        }}
        keyboardType="email-address"
        defaultValue={defaultValue}
      />
      <Text style={{ color: "red" }}>
        {Email == ""
          ? ""
          : validateEmail(Email)
          ? ""
          : "Email is not valid...!"}
      </Text>
    </>
  );
};

export default EmailTextInput;

const styles = StyleSheet.create({});
