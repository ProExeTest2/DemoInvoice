import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../helper/colors";
import { colorCode } from "../../helper/Global/functions";
import Header from "../../components/Common/Header/Header";
import CustomerDetailsList from "../../components/List/CustomerDetailsList";
import strings from "../../helper/strings";
import BlackButton from "../../components/Button/BlackButton";
import { icons } from "../../helper/icons";
import { hp } from "../../helper/Global/responsive";
import { useIsFocused } from "@react-navigation/native";
import StringsOfLanguage from "../../helper/Localization/StringsOfLanguage";

const ProductDetails = ({ route, navigation }) => {
  const ProductDetail = route?.params?.ProductDetail;

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={StringsOfLanguage.back}
        onBackPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>{ProductDetail?.productname}</Text>
      {ProductDetail?.productimage ? (
        <Image
          style={styles.avatar}
          source={{ uri: ProductDetail?.productimage }}
        />
      ) : (
        <View style={[styles.avatar, { backgroundColor: colorCode() }]}>
          <Text style={styles.letter}>
            {ProductDetail?.productname.charAt(0)}
          </Text>
        </View>
      )}

      <View style={{ padding: hp(2), flex: 1 }}>
        <CustomerDetailsList
          title={StringsOfLanguage.productname}
          value={ProductDetail?.productname}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.stock}
          value={ProductDetail?.stock}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.description}
          value={ProductDetail?.description}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.price}
          value={ProductDetail?.price}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.igst}
          value={ProductDetail?.igst}
        />
        <CustomerDetailsList
          title={StringsOfLanguage.hsncode}
          value={ProductDetail?.hsncode}
        />
      </View>
      <View style={styles.buttoncontainer}>
        <BlackButton
          title={StringsOfLanguage.addstock}
          onPress={() => {
            //deleteOnPress();
          }}
        />
        <BlackButton
          icon={icons.edit}
          title={StringsOfLanguage.edit}
          onPress={() => {
            navigation.navigate("AddProduct", { ProductDetail: ProductDetail });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 25,
    color: colors.black,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 15,
  },
  letter: {
    fontSize: 50,
    color: colors.black,
    fontWeight: "bold",
  },
  avatar: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
