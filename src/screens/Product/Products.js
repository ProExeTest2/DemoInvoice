import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Common/Header/Header";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import strings from "../../helper/strings";
import { colors } from "../../helper/colors";
import { icons } from "../../helper/icons";
import BlackButton from "../../components/Button/BlackButton";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getSelectedProductAction } from "../../redux/action/ProductAction";
import CheckBox from "react-native-check-box";
const Products = ({ navigation, route }) => {
  const products = useSelector((state) => state.product);
  const isFocused = useIsFocused();
  const [totalPriceCount, setTotalPriceCount] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  console.log("ALL PRODUCT ", allProducts);
  useEffect(() => {
    if (isFocused) {
      const temp = products?.ProductData?.map((currentValue) => {
        return {
          ...currentValue,
          isSelected: false,
          quantity: 0,
        };
      });
      console.log("DATAs ", products);
      setAllProducts(temp);
    }
  }, [isFocused]);

  const onPressMinus = (index) => {
    const temp = allProducts.map((currentValue, i) => {
      if (i === index) {
        const price = totalPriceCount - Number(currentValue?.price);
        setTotalPriceCount(price);
        const count = Number(currentValue?.quantity) - 1;
        console.log("COUNT ", currentValue?.quantity);
        return { ...currentValue, quantity: count };
      }
    });
    setAllProducts(temp);
  };

  const onPressPlus = (index) => {
    const temp = allProducts.map((currentValue, i) => {
      console.log("COUNTfdfdfd ", currentValue);
      if (i === index) {
        const price = totalPriceCount + Number(currentValue?.price);
        setTotalPriceCount(price);
        const count = Number(currentValue?.quantity) + 1;

        return { ...currentValue, quantity: count };
      }
    });
    setAllProducts(temp);
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={"BACK"}
        onBackPress={() => {
          if (route?.params?.selection == true) {
            //navigation.goBack();
            const temp = allProducts.map((currentValue) =>
              // currentValue.quantity > 0
              console.log("CURRENT VALUE ", currentValue.quantity)
            );
            console.log("TEMP product screen 1", temp);
            // dispatch(getSelectedProductAction(temp));
          }
        }}
      />
      <TitleHeader title={strings.products} />
      {route?.params?.selection && (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.total, { color: colors.black }]}>Total</Text>
          <Text style={[styles.total, { color: colors.gray }]}>
            {totalPriceCount}
          </Text>
        </View>
      )}
      <FlatList
        style={{ paddingHorizontal: 5, zIndex: 0, flex: 1 }}
        data={allProducts}
        renderItem={({ item, index }) => {
          //console.log("ITEM ", item);
          return (
            <Pressable
              style={styles.listmaincontainer}
              onPress={() => {
                if (route?.params?.selection == true) {
                  //navigation.goBack();
                  console.log("ITEM ", item);
                  const temp = allProducts.map((currentValue) => {
                    currentValue.quantity >= 0;
                  });
                  console.log("TEMP Product screen", temp);
                  setIsChecked(true);
                  // dispatch(getSelectedProductAction(temp));
                } else {
                  navigation.navigate("ProductDetails", {
                    ProductDetail: item,
                  });
                }
              }}
            >
              {/* {route?.params?.selection && (
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => setIsChecked(!isChecked)}
                  isChecked={isChecked}
                  checkBoxColor="royalblue"
                />
              )} */}
              <Image
                style={[styles.avatar, { borderRadius: 25 }]}
                source={{ uri: item?.productimage }}
              />
              <Text style={styles.title}>{item?.productname}</Text>
              {isChecked && (
                <View style={styles.quantityView}>
                  <Pressable onPress={() => onPressMinus(index)}>
                    <Image source={icons.minus} style={styles.minusicon} />
                  </Pressable>
                  <Text style={styles.result}>{item?.quantity}</Text>
                  <Pressable onPress={() => onPressPlus(index)}>
                    <Image source={icons.plus} style={styles.minusicon} />
                  </Pressable>
                </View>
              )}
            </Pressable>
          );
        }}
      />
      {!route?.params?.selection && (
        <BlackButton
          style={{
            marginBottom: 30,
            zIndex: 1,
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
          }}
          icon={icons.addproduct}
          title={strings.addproduct}
          onPress={() => {
            navigation.navigate("AddProduct");
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  minusicon: {
    height: 16,
    width: 16,
  },
  result: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  quantityView: {
    flexDirection: "row",
    alignItems: "center",
  },
  listmaincontainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    borderColor: colors.titletext,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 0.5,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: colors.black,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flex: 1,
  },
  avatar: {
    height: 55,
    width: 55,

    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
