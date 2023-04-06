import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../helper/colors";
import { hp, wp } from "../../helper/Global/responsive";

const InvoicesList = ({ name, price, invoice, duetime }) => {
  return (
    <View style={styles.maincontainer}>
      <View style={styles.avatar}>
        <Text style={styles.char}>{name?.charAt(0)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.nameprice}>{name}</Text>
        <Text style={styles.invoicedue}>{"#" + invoice}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.nameprice}>{"$" + price + ".00"}</Text>
        <Text style={styles.invoicedue}>{duetime}</Text>
      </View>
    </View>
  );
};

export default InvoicesList;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: 15,
  },
  avatar: {
    height: hp(6),
    width: hp(6),
    backgroundColor: colors.lightgray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  char: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.black,
  },
  nameprice: { fontSize: 20, fontWeight: "400", color: colors.black },
  invoicedue: { fontSize: 16, color: colors.black },
});
