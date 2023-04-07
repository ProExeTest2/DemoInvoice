import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { hp } from "../../helper/Global/responsive";
import { colors } from "../../helper/colors";
import { icons } from "../../helper/icons";
import { getRemoteConfigValue } from "../../helper/Global/functions";

const SplashScreen = ({ navigation }) => {
  const [value, setValue] = useState(null);
  console.log("value", value);

  useEffect(() => {
    setTimeout(() => {
      getConfigValue();
    }, 5000);
  }, []);
  const getConfigValue = async () => {
    console.log("12321223");
    let abcx = await getRemoteConfigValue().catch((e) => console.log(e));
    console.log("abcxabcx", abcx.asBoolean());
    if (abcx.asBoolean()) navigation.replace("OnBoard");
    else navigation.replace("Login");
    setValue(abcx.asBoolean());
  };

  return (
    <View style={styles.maincontainer}>
      <Image style={styles.logo} source={icons.appicon} />
      <Text style={styles.title}>DemoInvoice</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  maincontainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    height: hp(25),
    width: hp(20),
    resizeMode: "contain",
  },
  title: {
    fontSize: 25,
    color: colors.black,
  },
});
