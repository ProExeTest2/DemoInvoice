import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../helper/colors";
import { colorCode } from "../../helper/Global/functions";
const CustomerList = ({ name, phonenumber, onPress }) => {
  return (
    <Pressable style={styles.maincontainer} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: colorCode() }]}>
        <Text style={[styles.title, { fontSize: 20, fontWeight: "bold" }]}>
          {name?.charAt(0)}
        </Text>
      </View>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{phonenumber}</Text>
      </View>
    </Pressable>
  );
};

export default CustomerList;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: colors.lightgray2,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 0.5,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    color: colors.black,
    paddingHorizontal: 15,
    fontWeight: "500",
  },
  avatar: {
    height: 55,
    width: 55,
    borderRadius: 27,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  minusicon: {
    height: 16,
    width: 16,
  },
  result: {
    fontSize: 20,
    marginHorizontal: 10,
  },
});
