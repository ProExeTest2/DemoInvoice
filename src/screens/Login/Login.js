import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingLableTextInput from "../../components/FloatingLableTextInput";
import strings from "../../helper/strings";
import { icons } from "../../helper/icons";
import { colors } from "../../helper/colors";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail } from "../../helper/Global/functions";
import { useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";
import { hp } from "../../helper/Global/responsive";
import { Hide, Show } from "../../helper/svgs";
// import Hide from "../../../assets/svgs/svgFiles/Hide";
// import Show from "../../../assets/svgs/svgFiles/Show";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("priyanka@proexe.in"); //priyanka@proexe.in
  const [password, setPassword] = useState("123456"); //123456
  const passwordRef = useRef();
  const [passwordShow, setPasswordShow] = useState(false);
  const loginUser = () => {
    if ((email && password !== null) || undefined) {
      if (validateEmail(email)) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => (user ? navigation.replace("Dashboard") : ""))
          .catch((error) => {
            console.log(error);
            if (error.code === "auth/invalid-email") Alert.alert(error.message);
            else if (error.code === "auth/user-not-found")
              Alert.alert("No User Found");
            else Alert.alert("Please check your email id or password");
          });
      } else {
        console.log("Enter valid email");
      }
    } else {
      Alert.alert("Enter Valid Credentials");
    }
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Image style={styles.appicon} source={icons.appicon} />

      <View style={{ justifyContent: "center", flex: 1, padding: 20 }}>
        <Text style={styles.title}>ELIT Login</Text>
        <KeyboardAwareScrollView>
          <FloatingLableTextInput
            mainContainerStyle={{ marginVertical: hp(4) }}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              validateEmail(email)
                ? passwordRef?.current?.focus()
                : console.log("Enter email");
            }}
            Value={email}
            label={strings.emailaddress}
            editable={true}
            keyboardType="email-address"
            onChangeText={(txt) => {
              setEmail(txt);
            }}
            blurOnSubmit={false}
          />
          <FloatingLableTextInput
            refs={passwordRef}
            returnKeyType={"done"}
            label={strings.password}
            editable={true}
            Value={password}
            onChangeText={(txt) => {
              setPassword(txt);
            }}
            blurOnSubmit={false}
            secureTextEntry={!passwordShow}
            PasswordSecure={
              passwordShow ? <Show /> : <Hide />
              //   <Image
              //     // source={passwordShow ? icons.showpassword : icons.hidepassword}
              //     // source={<Show />}
              //     source={passwordShow ? <Show /> : <Hide />}
              //     style={styles.passwordshowicon}
              //   />
            }
            onPress={() => {
              passwordShow ? setPasswordShow(false) : setPasswordShow(true);
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      <CircleBlackButton
        containerStyle={styles.blackbtn}
        title={"N E X T"}
        onPress={() => loginUser()}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: colors.black,
    marginTop: 20,
    marginBottom: 41,
  },
  appicon: {
    // alignSelf: "center",
    // flexDirection: "row",
    // alignItems: "center",
    // backgroundColor: "red",
    height: 190,
    width: 140,
    marginTop: 20,
  },
  passwordshowicon: { height: 24, width: 24, marginBottom: 15 },
  blackbtn: {
    height: hp(10),
    width: hp(10),
  },
});
