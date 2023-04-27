import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../helper/colors";
import { icons } from "../../helper/icons";
const DemoCompo = ({ dataArray }) => {
  const [selectedItems, setSelectedItems] = useState(dataArray);
  const [IsShow, setIsShow] = useState(false);
  const [selectedname, setSelectedName] = useState([]);

  const SearchFilterFunction = (text) => {
    const newData = dataArray.filter(function (item) {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    text != null ? setSelectedItems(newData) : setSelectedItems(dataArray);
  };
  const onPressItem = (name) => {
    console.log("select item  ", name);
    const options = [];
    dataArray.map((item) => {
      options.push(item.name);
    });
    if (selectedname.includes(name)) {
      const newArray = selectedname.filter((i) => i !== name);
      setSelectedName(newArray);
      console.log("in if ", newArray);
    } else {
      const newArray = [...options, name];
      setSelectedName([...selectedname, name]);
      console.log("in else ", newArray);
    }
  };
  return (
    <View style={styles.maincontainer}>
      <Pressable
        style={styles.selectedoption}
        onPress={() => setIsShow(!IsShow)}
      >
        <Text style={styles.itemtxt}>
          {selectedname.length == 0 ? "Select Option" : selectedname.join(", ")}
        </Text>
        <Image style={styles.arrow} source={IsShow ? icons.up : icons.down} />
      </Pressable>

      {IsShow ? (
        <View
          style={{
            borderTopColor: colors.lightgray2,
            borderTopWidth: 1.5,
          }}
        >
          <TextInput
            style={styles.searchbar}
            placeholder="Search..."
            placeholderTextColor={colors.titletext}
            onChangeText={(c) => SearchFilterFunction(c)}
          />
          <FlatList
            style={{ borderTopColor: colors.statusbarBg, borderTopWidth: 1.5 }}
            data={selectedItems}
            renderItem={({ item, index }) => {
              console.log(item);
              return (
                <Pressable
                  onPress={() => {
                    onPressItem(item.name);
                  }}
                >
                  <Text style={styles.itemtxt}>{item.name}</Text>
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    borderColor: colors.lightgray2,
                    borderWidth: 0.7,
                  }}
                />
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DemoCompo;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: "white",
    borderColor: colors.lightgray2,
    borderWidth: 1.5,
    borderRadius: 15,
    margin: 10,
  },
  itemtxt: {
    fontSize: 18,
    color: colors.titletext,
    padding: 10,
  },
  searchbar: {
    borderColor: colors.lightgray2,
    borderRadius: 7,
    borderWidth: 1.5,
    fontSize: 15,
    color: "#000",
    height: 35,
    paddingVertical: 9,
    paddingHorizontal: 10,
    margin: 10,
    borderBottomColor: colors.lightgray2,
    borderBottomWidth: 1.5,
  },
  arrow: {
    height: 16,
    width: 14,
    margin: 10,
    tintColor: colors.titletext,
  },
  selectedoption: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
  },
});
