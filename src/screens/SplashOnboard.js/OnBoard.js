import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef } from "react";
import { colors } from "../../helper/colors";
import { hp } from "../../helper/Global/responsive";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import { icons } from "../../helper/icons";
import Swiper from "react-native-swiper";
import strings from "../../helper/strings";

const OnBoard = ({ navigation }) => {
  const swiper = useRef(null);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
      <Swiper
        showsPagination={true}
        showsButtons={false}
        removeClippedSubviews={false}
        scrollEnabled={true}
        loop={false}
        ref={swiper}
        dot={
          <View style={Platform.OS == "ios" ? styles.dot : styles.androiddot} />
        }
        activeDot={
          <View
            style={
              Platform.OS == "ios" ? styles.activedot : styles.androidactivedot
            }
          />
        }
        buttonWrapperStyle={styles.wrapper}
        onIndexChanged={(index) => {
          console.log(index);
        }}
      >
        <View style={{ justifyContent: "center", flex: 1 }}>
          <View style={[styles.circlebg, { backgroundColor: colors.card1 }]}>
            <Image style={styles.emoji} source={icons.rupee} />
          </View>
          <Text style={styles.desc}>{strings.onboard1}</Text>
        </View>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <View style={[styles.circlebg, { backgroundColor: colors.card2 }]}>
            <Image style={styles.emoji} source={icons.showpassword} />
          </View>
          <Text style={styles.desc}>{strings.onboard2}</Text>
        </View>
      </Swiper>
      <CircleBlackButton
        containerStyle={styles.blackbtn}
        onPress={() => navigation.replace("Dashboard")}
        title={"S K I P"}
      />
    </View>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  circlebg: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    marginBottom: 70,
    justifyContent: "center",
    alignSelf: "center",
  },
  emoji: {
    height: 100,
    width: 100,
    margin: 40,
    alignSelf: "center",
    tintColor: colors.black,
  },
  blackbtn: {
    height: hp(10),
    width: hp(10),
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    backgroundColor: colors.white,
  },
  dot: {
    backgroundColor: colors.gray,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: hp(5),
  },
  androiddot: {
    backgroundColor: colors.gray,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: hp(5),
  },
  activedot: {
    backgroundColor: colors.black,
    width: 17,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: hp(5),
  },
  androidactivedot: {
    backgroundColor: colors.black,
    width: 17,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: hp(5),
  },
  wrapper: {
    backgroundColor: "transparent",
    flexDirection: "column",
    top: 0,
    left: 0,
  },
  desc: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    paddingHorizontal: 30,
    color: colors.black,
  },
});
