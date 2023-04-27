import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../helper/colors";
import CheckBox from "@react-native-community/checkbox";
import { icons } from "../../helper/icons";

const CustomCheckBox = ({ title, setCheckBox }) => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => {
          setIsChecked(!isChecked);
          isChecked ? setCheckBox(title) : setCheckBox("");
        }}
      >
        <Image
          style={{
            height: 24,
            width: 24,
            tintColor: colors.orange,
            marginRight: 10,
          }}
          source={isChecked ? icons.checkbox_checked : icons.checkbox_empty}
        />
      </Pressable>
      <Text style={styles.countertext}>{title}</Text>
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  countertext: {
    color: colors.orange,
    fontSize: 13,
    fontWeight: "400",
    color: colors.black,
  },
});
{
  /* <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => {
          setToggleCheckBox(newValue);
          setCheckBox(title);
        }}
      /> */
}
