import { StyleSheet, Text, View } from "react-native";
import React from "react";
import strings from "../../helper/strings";

const TitleHeader = ({ title, style }) => {
  return <Text style={[styles.header, { style }]}>{title}</Text>;
};

export default TitleHeader;

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    marginVertical: 15,
    color: "#000",
    fontWeight: "400",
    backgroundColor: "#fff",
  },
});
