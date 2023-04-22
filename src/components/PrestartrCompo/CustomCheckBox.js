import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../helper/colors";
import CheckBox from "@react-native-community/checkbox";

const CustomCheckBox = ({ title, setCheckBox }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => {
          setToggleCheckBox(newValue);
          setCheckBox(title);
        }}
      />
      <Text style={[styles.countertext, { color: colors.black }]}>{title}</Text>
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  countertext: {
    alignSelf: "center",
    color: colors.orange,
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 15,
  },
});
