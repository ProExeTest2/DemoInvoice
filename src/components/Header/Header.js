import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp } from "../../helper/Global/responsive";
import { colors } from "../../helper/colors";
import strings from "../../helper/strings";

const Header = ({ navigation, isBack, title, isHelp, backtext }, props) => {
  // const {} = props;
  //const back = isBack || false;
  return (
    <View style={styles.maincontainer}>
      <StatusBar backgroundColor={colors.statusbarBg} barStyle="default" />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        {isBack && <Text style={styles.backtext}>{backtext}</Text>}
        {/* <Text style={styles.backtext}>Back</Text> */}
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
