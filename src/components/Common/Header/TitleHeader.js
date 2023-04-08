import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp } from "../../../helper/Global/responsive";
import { colors } from "../../../helper/colors";

const TitleHeader = ({ title, style, onPress, rightIcon }) => {
  return (
    <View style={[styles.maincontainer, style]}>
      <Text style={styles.header}>{title}</Text>
      <Pressable onPress={onPress}>{rightIcon}</Pressable>
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.white,
    height: hp(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 43,
    color: "#000",
    fontWeight: "500",
    flex: 1,
  },
});
