import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../helper/colors";
import { hp, wp } from "../../helper/Global/responsive";
import { selectedLanguageAction } from "../../redux/action/UserLoginAction";
import { useDispatch } from "react-redux";
import StringsOfLanguages from "../../helper/Localization/StringsOfLanguage";
import Header from "../../components/Common/Header/Header";
import TitleHeader from "../../components/Common/Header/TitleHeader";
const ChooseLanguage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const lang = [
    { shortform: "hi", longform: "Hindi" },
    { shortform: "gu", longform: "Gujarati" },
    { shortform: "en", longform: "English" },
  ];
  const selectLanguage = (lan) => {
    //setSelectedLanguage(lan);
    StringsOfLanguages.setLanguage(lan);
    dispatch(selectedLanguageAction(lan));
    navigation.goBack();
    //navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        isBack={true}
        backtext={"BACK"}
        onBackPress={() => navigation.goBack()}
      />
      <TitleHeader title={"Choose Language"} />
      <View style={styles.maincontainer}>
        <Pressable
          style={styles.container}
          onPress={() => {
            selectLanguage("hi");
          }}
        >
          <Text style={styles.title}> Hindi </Text>
        </Pressable>
        <View style={styles.seperator} />
        <Pressable
          style={styles.container}
          onPress={() => {
            selectLanguage("gu");
          }}
        >
          <Text style={styles.title}> Gujarati </Text>
        </Pressable>
        <View style={styles.seperator} />
        <Pressable
          style={styles.container}
          onPress={() => {
            selectLanguage("en");
          }}
        >
          <Text style={styles.title}> English </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChooseLanguage;

const styles = StyleSheet.create({
  maincontainer: { flex: 1, padding: 20, backgroundColor: colors.white },
  header: {
    fontSize: 25,
    color: colors.black,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 31,
  },
  container: {
    marginVertical: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "500",
  },
  seperator: {
    height: hp(0.2),
    width: wp(80),
    backgroundColor: colors.lightgray2,
    // flex:1
  },
});
