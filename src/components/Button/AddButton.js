import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { icons } from "../../helper/icons";
import { colors } from "../../helper/colors";

const AddButton = ({ title, onPress }) => {
  return (
    <View style={styles.maincontainer}>
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.imagecontainer} onPress={onPress}>
        <Image style={styles.image} source={icons.longrightarrow} />
      </Pressable>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 13,
    borderColor: colors.lightgray2,
    borderWidth: 1.5,
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.black,
    marginLeft: 5,
  },
  imagecontainer: {
    padding: 14,
    borderRadius: 11,
    backgroundColor: colors.lightgray,
  },
  image: {
    height: 18,
    width: 18,
  },
});
