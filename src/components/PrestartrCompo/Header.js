import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { wp } from "../../helper/Global/responsive";
import { colors } from "../../helper/colors";
import { icons } from "../../helper/icons";

const Header = ({ onPressLeft }) => {
  return (
    <View style={styles.headermaincontainer}>
      <StatusBar backgroundColor={colors.orangestatusbar} />
      <Pressable onPress={onPressLeft}>
        <Image style={styles.icon} source={icons.back} />
      </Pressable>
      <Text style={styles.header}>Header</Text>
      <Image style={styles.icon} source={icons.cancel} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headermaincontainer: {
    flexDirection: "row",
    height: getStatusBarHeight() + 30,
    width: wp(100),
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
  },
  icon: {
    height: 16,
    width: 16,
    tintColor: colors.white,
  },
  header: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
});
