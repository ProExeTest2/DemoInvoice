import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../../helper/colors";

const Progressbar = ({ progressStatus }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inner, { width: progressStatus + "%" }]} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: colors.lightgray,
  },

  inner: {
    width: "100%",
    height: 7,
    borderRadius: 5,
    backgroundColor: colors.orange,
  },
});
export default Progressbar;
