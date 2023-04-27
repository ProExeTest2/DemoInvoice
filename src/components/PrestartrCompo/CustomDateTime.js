import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { colors } from "../../helper/colors";
import NextSubmitButton from "./NextSubmitButton";
import { hp, wp } from "../../helper/Global/responsive";

const CustomDateTime = ({ mode, onSelectDate, format, defaultDate }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <CustomTextInput
          editable={false}
          defaultValue={moment(date).format(format)}
          borderColor={colors.border}
          style={{
            paddingHorizontal: 20,
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textinputtextcolor,
          }}
        />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <DatePicker
            //modal
            open={open}
            date={date}
            mode={mode}
            androidVariant="iosClone"
            onDateChange={(date) => setTempDate(date)}
            textColor={colors.textinputtextcolor}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              onSelectDate(moment(date).format(format));
            }}
            onCancel={() => {}}
            // cancelText="Cancle"
            // confirmText="Apply"
          />
          <View style={styles.btncontainer}>
            <NextSubmitButton
              style={{ height: hp(6), width: wp(35), alignItems: "center" }}
              title={"Apply"}
              onPress={() => {
                setOpen(false);
                setDate(tempDate);
                onSelectDate(moment(tempDate).format(format));
                setModalVisible(false);
              }}
            />
            <Pressable
              style={styles.canclebtn}
              onPress={() => {
                setModalVisible(false);
                setOpen(false);
              }}
            >
              <Text style={{ color: colors.orange, fontWeight: "bold" }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomDateTime;

const styles = StyleSheet.create({
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    borderColor: colors.border,
    borderWidth: 1.5,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 15,
    alignSelf: "center",
    marginTop: hp(25),
  },
  canclebtn: {
    borderColor: colors.orange,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: wp(35),
    height: hp(6),
  },
  btncontainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: wp(80),
  },
});
