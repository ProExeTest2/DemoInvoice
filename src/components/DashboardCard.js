import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../helper/colors";
import { hp, wp } from "../helper/Global/responsive";

const DashboardCard = ({ count, title, background, onPress }) => {
  console.log("count====>", count);
  return (
    <Pressable
      style={[styles.maincontainer, { backgroundColor: background || "pink" }]}
      onPress={onPress}
    >
      <Text style={styles.counttext}>{count}</Text>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  maincontainer: {
    margin: 10,
    borderRadius: 8,
    height: hp(12),
    width: wp(40),
    paddingLeft: 15,
    justifyContent: "center",
  },
  counttext: {
    fontSize: 25,
    color: colors.white,
    fontWeight: "800",
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "500",
    marginVertical: 5,
  },
});
