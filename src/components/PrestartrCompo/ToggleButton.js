import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../helper/colors";
import { wp } from "../../helper/Global/responsive";

const ToggleButton = ({ options, onSelect }) => {
  const [isSelected, setIsSelected] = useState(0);
  useEffect(() => {
    onSelect(options[0]);
  }, []);

  return (
    <View style={styles.container}>
      {options?.map((item, index) => {
        return (
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor:
                  isSelected == index ? colors.green : colors.white,
              },
            ]}
            onPress={() => {
              setIsSelected(index);
              onSelect(item);
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  color: isSelected == index ? colors.white : colors.black,
                },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.lightgray2,
    flexDirection: "row",
    //marginVertical: 10,
    justifyContent: "space-evenly",
    //marginHorizontal: 12,
    alignSelf: "center",
  },

  title: {
    color: colors.white,
    fontWeight: "400",
    fontSize: 14,
  },
  btn: {
    paddingHorizontal: wp(8),
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
});
export default ToggleButton;
