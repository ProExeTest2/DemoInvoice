import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../helper/colors";
import { hp } from "../../helper/Global/responsive";

const CircleBlackButton = ({
  title,
  onPress,
  textStyle,
  icon,
  containerStyle,
}) => {
  return (
    <Pressable style={[styles.maincontainer, containerStyle]} onPress={onPress}>
      {icon ? (
        <Image style={styles.btnicon} source={icon} />
      ) : (
        <Text style={[styles.title, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};
export default CircleBlackButton;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    margin: 30,
    right: 0,
    marginTop: hp(85),
  },
  title: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
  btnicon: {
    tintColor: colors.white,
    height: 28,
    width: 28,
  },
});
