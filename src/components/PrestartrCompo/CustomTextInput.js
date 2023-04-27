import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../helper/colors";

const CustomTextInput = (props) => {
  const {
    placeholder,
    onChangeText,
    keybordType,
    maxLength,
    editable,
    defaultValue,
    borderColor,
    style,
  } = props;
  return (
    <TextInput
      style={[
        styles.textinput,
        { borderColor: borderColor || colors.orange, paddingHorizontal: 15 },
        style,
      ]}
      placeholderTextColor={colors.lightgray2}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keybordType}
      maxLength={maxLength}
      // keyboardType="name-phone-pad"
      editable={editable}
      defaultValue={defaultValue}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: colors.textinputbg,
    borderColor: colors.orange,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    padding: 7,
    alignItems: "center",
    color: "black",
  },
});
