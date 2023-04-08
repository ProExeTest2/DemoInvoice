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
import { colors } from "../../helper/colors";
import { icons } from "../../helper/icons";
import BlackButton from "../../components/Button/BlackButton";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getSelectedProductAction } from "../../redux/action/ProductAction";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import { hp } from "../../helper/Global/responsive";
import StringsOfLanguage from "../../helper/Localization/StringsOfLanguage";
const Products = ({ navigation, route }) => {
  const products = useSelector((state) => state.product);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [totalPriceCount, setTotalPriceCount] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  console.log("ALL PRODUCT ", allProducts);
  useEffect(() => {
    if (isFocused) {
      const temp = products?.ProductData?.map((currentValue, index) => {
        return {
          ...currentValue,
          isSelected: false,
          quantity: 0,
          index: index,
        };
      });
      console.log("DATAs ", products);
      setAllProducts(temp);
    }
  }, [isFocused]);
  console.log("ALL PRODUCTSsss", allProducts);
  const onPressMinus = (index) => {
    const temp = allProducts.map((currentValue, i) => {
      if (i === index) {
        const price = totalPriceCount - Number(currentValue?.price);
        setTotalPriceCount(price);
        const count = Number(currentValue?.quantity) - 1;
        console.log("COUNT ", currentValue?.quantity);
        if (count === 0) {
          return { ...currentValue, isSelected: false };
        } else {
          return { ...currentValue, quantity: count };
        }
      } else {
        return currentValue;
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
        console.log("...currentValue, quantity: count  ", currentValue, count);
        return { ...currentValue, quantity: count };
      } else {
        return currentValue;
      }
    });
    setAllProducts(temp);
    console.log("TEMP------", temp);
  };

  const doneOnPress = () => {
    let t = [];
    const temp = allProducts.map((currentValue) => {
      console.log("CURRENT VALUE 2222", currentValue);
      if (currentValue.quantity > 0) {
        t.push(currentValue);
        return { t };
        //return { ...currentValue, isSelected: true };
      } else {
        return { currentValue };
      }
    });
    console.log("TEMP___ ", t);
    dispatch(getSelectedProductAction(t));
  };

  const ProductList = ({
    productimage,
    productname,
    quantity,
    onPress,
    onPressMinus,
    onPressPlus,
    isSelected,
  }) => {
    return (
      <Pressable style={styles.listmaincontainer} onPress={onPress}>
        <Image
          style={[styles.avatar, { borderRadius: 25 }]}
          source={{ uri: productimage }}
        />
        <Text style={styles.title}>{productname}</Text>
        {isSelected ? (
          <View style={styles.quantityView}>
            <Pressable onPress={onPressMinus}>
              <Image source={icons.minus} style={styles.minusicon} />
            </Pressable>
            <Text style={styles.result}>{quantity}</Text>
            <Pressable onPress={onPressPlus}>
              <Image source={icons.plus} style={styles.minusicon} />
            </Pressable>
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={StringsOfLanguage.back}
        onBackPress={() => {
          if (route?.params?.selection == true) {
            dispatch(getSelectedProductAction(undefined));
            navigation.goBack();
          } else {
            navigation.goBack();
          }
        }}
      />
      <TitleHeader title={StringsOfLanguage.products} />
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
          return (
            <ProductList
              productname={item?.productname}
              productimage={item?.productimage}
              quantity={item?.quantity}
              isSelected={item?.isSelected}
              onPress={() => {
                if (route?.params?.selection == true) {
                  const temp = allProducts.map((currentValue) => {
                    console.log("CURRENT VALUE ", currentValue);
                    if (currentValue.index == index) {
                      return { ...currentValue, isSelected: true };
                    } else {
                      return currentValue;
                    }
                  });
                  console.log("TEMP Product screen", temp);
                  setAllProducts(temp);
                } else {
                  navigation.navigate("ProductDetails", {
                    ProductDetail: item,
                  });
                }
              }}
              onPressMinus={() => onPressMinus(index)}
              onPressPlus={() => onPressPlus(index)}
            />
          );
        }}
      />
      {!route?.params?.selection ? (
        <BlackButton
          style={{
            marginBottom: 30,
            zIndex: 1,
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
          }}
          icon={icons.addproduct}
          title={StringsOfLanguage.addproduct}
          onPress={() => {
            navigation.navigate("AddProduct");
          }}
        />
      ) : (
        <CircleBlackButton
          containerStyle={styles.blackbtn}
          onPress={() => {
            doneOnPress();
            navigation.goBack();
          }}
          title={"D O N E"}
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
  blackbtn: { height: hp(10), width: hp(10) },

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
/* {route?.params?.selection && (
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => setIsChecked(!isChecked)}
                  isChecked={isChecked}
                  checkBoxColor="royalblue"
                />
              )} */
