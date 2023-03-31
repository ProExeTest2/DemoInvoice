import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../helper/colors";
import { wp } from "../../helper/Global/responsive";

const CustomerDetailsList = ({ title, value }) => {
  return (
    <View style={styles.maincontainer}>
      <Text style={[styles.detail, { width: wp(35) }]}>{title}</Text>
      <Text style={[styles.detail, { width: wp(65) }]}>
        {":  "}
        {value}
      </Text>
    </View>
  );
};

export default CustomerDetailsList;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
  },
  detail: {
    fontSize: 15,
    color: colors.black,
    width: "45%",
    marginVertical: 13,
    fontWeight: "500",
  },
});
