import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../helper/colors";
import { hp } from "../../helper/Global/responsive";

const BlackButton = ({ icon, title, onPress, style }) => {
  return (
    <Pressable style={[styles.maincontainer, style]} onPress={onPress}>
      {icon && <Image style={styles.buttonicon} source={icon} />}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default BlackButton;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: hp(8),
    paddingVertical: 20,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "500",
    marginLeft: 9,
  },
  buttonicon: {
    height: 26,
    width: 26,
    tintColor: colors.white,
  },
});
