// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Alert,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { icons } from "../helper/icons";
import { navigationRef } from "../navigation/RootNavigation";
import { hp } from "../helper/Global/responsive";
import { colors } from "../helper/colors";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/action/UserLoginAction";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: async () => {
            await auth()
              .signOut()
              .then(() => {
                dispatch(logoutAction());
                navigation.replace("Login");
              })
              .catch((er) => console.log("ERRORs ", er));
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <Image source={icons.appicon} style={styles.sideMenuProfileIcon} />
      <Text
        style={{
          fontSize: 25,
          textAlign: "center",
          color: colors.black,
          fontWeight: "500",
        }}
        onPress={() => {}}
      >
        Invoice Demo
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          color: "black",
          fontWeight: "500",
          backgroundColor: colors.titletext,
          padding: 20,
        }}
        onPress={() => {
          logout();
        }}
      >
        Logout
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: hp(5),
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomDrawer;
