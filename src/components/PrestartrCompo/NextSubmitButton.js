import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../helper/colors";

const NextSubmitButton = ({ title, onPress, style }) => {
  return (
    <Pressable style={[styles.btncontainer, { style }]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default NextSubmitButton;

const styles = StyleSheet.create({
  btncontainer: {
    backgroundColor: colors.orange,
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
  },
  title: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 15,
  },
});
