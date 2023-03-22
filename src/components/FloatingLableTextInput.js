import React, { useState } from "react";
import {
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { hp, isIos, wp } from "../helper/Global/responsive";
import { colors } from "../helper/colors";

const FloatingTitleTextInput = ({
  label,
  mainContainerStyle,
  returnKeyType,
  refs,
  onSubmitEditing,
  autoFocus,
  Value,
  editable,
  onChangeText,
  PasswordSecure,
  onPress,
  secureTextEntry,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const getFocus = new Animated.Value(Value !== "" ? 1 : 0);

  Animated.timing(getFocus, {
    toValue: isFocused || Value !== "" ? 1 : 0,
    duration: 200,
  }).start();

  const animatedLabelStyle = {
    top: getFocus.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 0],
    }),
    fontSize: getFocus.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 15],
    }),
  };

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      <Animated.Text style={[styles.labelStyle, animatedLabelStyle]}>
        {label}
      </Animated.Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={Value}
          autoFocus={autoFocus}
          ref={refs}
          editable={editable}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          style={styles.textInput}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={colors.black}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={onPress}>{PasswordSecure}</TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    //width: isIos ? wp(48.92) : wp(70),
    width: "100%",
    alignSelf: "center",
    paddingTop: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    height: 50,
    marginVertical: 10,
  },
  labelStyle: {
    position: "absolute",
    // left: 0,
    color: colors.gray,
    fontSize: 15,
    fontWeight: "500",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  textInput: {
    height: hp(6), //hp(5.15),
    fontSize: 20,
    color: colors.black,
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default FloatingTitleTextInput;
