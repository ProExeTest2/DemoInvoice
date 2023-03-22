import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../helper/colors";
import { hp } from "../helper/Global/responsive";

const CircleBlackButton = ({ title, onPress, navigation }) => {
  return (
    <Pressable style={styles.maincontainer} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default CircleBlackButton;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    height: hp(11),
    width: hp(11),
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    margin: 30,
    right: 0,
    marginTop: hp(85),
  },
  title: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "500",
  },
});
