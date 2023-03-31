import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { hp } from "../../../helper/Global/responsive";
import { colors } from "../../../helper/colors";
import strings from "../../../helper/strings";
import { useNavigation } from "@react-navigation/native";

const Header = ({ isBack, isHelp, backtext, onBackPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.maincontainer}>
      <StatusBar backgroundColor={colors.statusbarBg} barStyle="default" />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        {isBack && (
          <TouchableOpacity
            style={{
              height: hp(3),
            }}
            onPress={
              onBackPress
              //</View></View>navigation.goBack();
            }
          >
            <Text style={styles.backtext}>{backtext}</Text>
          </TouchableOpacity>
        )}
        {isHelp && (
          <Text style={[styles.backtext, { textAlign: "right" }]}>
            {strings.help}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  maincontainer: {
    width: Dimensions.get("screen").width,
    backgroundColor: "#fff",
    padding: 15,
  },
  backtext: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    flex: 1,
  },
});
