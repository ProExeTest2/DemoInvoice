import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../helper/colors";

const DemoAnswer = ({ route }) => {
  const data = route?.params?.allAnswer;
  //console.log("data", data);
  const [DataStore, setDataStore] = useState([]);
  useEffect(() => {
    const tmp = JSON.stringify(data)
      .replace("{", "")
      .replace("}", "")
      .split(",");
    setDataStore(tmp);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={DataStore}
        renderItem={({ item }) => {
          return (
            <Text
              style={{
                fontSize: 20,
                color: "black",
                borderBottomColor: colors.statusbarBg,
                borderWidth: 0.7,
                paddingVertical: 5,
              }}
            >
              {item.toString()}
            </Text>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default DemoAnswer;

const styles = StyleSheet.create({});
