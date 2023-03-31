//import liraries
import React, { Component } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../helper/colors";
const { height, width } = Dimensions.get("screen");
const CustomModal = (props) => {
  return (
    <>
      <Modal
        animationType={props.animation}
        transparent={props.transparentContainer}
        visible={props.visible}
        statusBarTranslucent
        presentationStyle={"overFullScreen"}
      >
        <TouchableWithoutFeedback onPress={() => props.outsideClick()}>
          <View style={[styles.mainContainer, { ...props.outerStyle }]}>
            <View style={{ ...styles.modalWrapper, ...props.modalStyle }}>
              <View style={styles.modalContainer}>{props.children}</View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "rgba(106,106,106,0.9)",
    flex: 1,
  },
  modalWrapper: {
    // justifyContent: 'center',
    // alignContent: 'center',
    // height: hp(26), //height / 1.5,
    // marginTop: hp(74), //height / 1.5,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "lightgray",
    borderStyle: "solid",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
    width: width,
    justifyContent: "space-evenly",
  },
});
export default CustomModal;
