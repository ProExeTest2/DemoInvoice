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
import { useNavigation } from "@react-navigation/native";
import StringsOfLanguage from "../../../helper/Localization/StringsOfLanguage";

const Header = ({ isBack, isHelp, backtext, onBackPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.maincontainer}>
      <StatusBar backgroundColor={colors.statusbarBg} barStyle="default" />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {isBack && (
          <TouchableOpacity
            onPress={
              onBackPress
              //</View></View>navigation.goBack();
            }
          >
            <Text style={styles.backtext}>{backtext}</Text>
          </TouchableOpacity>
        )}
        {isHelp && (
          <Text style={styles.backtext}>{StringsOfLanguage.help}</Text>
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
  },
});
