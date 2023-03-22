import {
  Alert,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingLableTextInput from "../../components/FloatingLableTextInput";
import strings from "../../helper/strings";
import { icons } from "../../helper/icons";
import { colors } from "../../helper/colors";
import CircleBlackButton from "../../components/CircleBlackButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail } from "../../helper/Global/functions";
import { useDispatch } from "react-redux";
import { saveloginAction } from "../../redux/action/UserLoginAction";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState(""); //aaa@a.in
  const [password, setPassword] = useState(""); //1234567
  const passwordRef = useRef();
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const loginUser = () => {
    // if ((email && password !== null) || undefined) {
    //   dispatch(saveloginAction({ email: email, password: password }));
    //   navigation.navigate("AddCustomer");
    // } else {
    //   Alert.alert("Enter Valid Credentials");
    // }
    navigation.navigate("AddCustomer");
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Image style={styles.appicon} source={icons.appicon} />
      <View style={{ justifyContent: "center", flex: 1, padding: 20 }}>
        <Text style={styles.title}>ELIT Login</Text>
        <KeyboardAwareScrollView>
          <FloatingLableTextInput
            mainContainerStyle={{ marginVertical: 40 }}
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
              <Image
                source={passwordShow ? icons.showpassword : icons.hidepassword}
                style={{ height: 24, width: 24, marginBottom: 15 }}
              />
            }
            onPress={() => {
              passwordShow ? setPasswordShow(false) : setPasswordShow(true);
            }}
          />
        </KeyboardAwareScrollView>
      </View>
      <CircleBlackButton title={"N E X T"} onPress={() => loginUser()} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
    // justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: colors.black,
    marginTop: 20,
    marginBottom: 41,
  },
  appicon: {
    height: 190,
    width: 140,
    // backgroundColor: "red",
    // position: "absolute",
    // zIndex: 1,
    marginTop: 20,
  },
});
