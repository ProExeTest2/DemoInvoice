import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";
import DatePicker from "react-native-date-picker";
import moment from "moment";

const CustomDateTime = ({ mode, onSelectDate, format }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <CustomTextInput
          editable={false}
          defaultValue={moment(date).format(format)}
        />
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={mode}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          onSelectDate(moment(date).format(format));
        }}
        onCancel={() => {
          setOpen(false);
        }}
        cancelText="Cancle"
        confirmText="Apply"
      />
    </>
  );
};

export default CustomDateTime;

const styles = StyleSheet.create({});
