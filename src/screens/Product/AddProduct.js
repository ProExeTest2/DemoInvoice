import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Common/Header/Header";
import TitleHeader from "../../components/Common/Header/TitleHeader";
import FloatingLableTextInput from "../../components/FloatingLableTextInput";
import strings from "../../helper/strings";
import { colors } from "../../helper/colors";
import { icons } from "../../helper/icons";
import CircleBlackButton from "../../components/Common/CircleBlackButton";
import { hp } from "../../helper/Global/responsive";
import storage from "@react-native-firebase/storage";
import { useDispatch } from "react-redux";
import {
  createProductAction,
  updateProductAction,
} from "../../redux/action/ProductAction";
import { PERMISSIONS, check } from "react-native-permissions";
import * as ImagePicker from "react-native-image-picker";
import StringsOfLanguage from "../../helper/Localization/StringsOfLanguage";
const AddProduct = ({ route, navigation }) => {
  const ProductDetails = route?.params?.ProductDetail;
  const dispatch = useDispatch();
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [igst, setIgst] = useState("");
  const [hsncode, setHsncode] = useState("");
  const [productImage, setProductImage] = useState();
  const [productImagename, setProductImagename] = useState();
  const { descriptionRef, stockRef, priceRef, igstRef, hsncodeRef } = useRef();
  console.log(route?.params);
  useEffect(() => {
    if (ProductDetails) {
      setProductName(ProductDetails.productname);
      setDescription(ProductDetails.description);
      setStock(ProductDetails.stock.toString());
      setPrice(ProductDetails.price.toString());
      setIgst(ProductDetails.igst.toString());
      setHsncode(ProductDetails.hsncode.toString());
      setProductImage(ProductDetails.productimage);
    }
  }, []);

  //console.log("IMAGE ", productImage);
  const selectImage = async () => {
    let options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    const permissions =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    let isPermitted = await check(permissions);
    console.log("android ios permissions ", isPermitted);
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log("RESPONSE URI: ", source);
        response.assets.map((item) => {
          console.log("&&&&&", item.uri);
          console.log("RESPONSE assets URI: ", item.fileName);
          setProductImage(item.uri);
          setProductImagename(item.fileName);
        });
      }
    });
  };
  const addProduct = async (task) => {
    if (
      (productname,
      description,
      stock,
      price,
      igst,
      hsncode,
      productImage != null)
    ) {
      const filename = productImagename;
      const imageRef = storage().ref(`/ProductImage/${filename}`);
      console.log("upload image from add product", productImagename);
      const uploadUri =
        Platform.OS === "ios"
          ? productImage.replace("file://", "")
          : productImage.replace("file:///", "");
      console.log("uploadUri", uploadUri);
      const isUrl = uploadUri.match("https://");
      if (!isUrl) {
        await imageRef.putFile(uploadUri).catch((error) => {
          throw error;
        });
        await imageRef
          .getDownloadURL()
          .then((response) => {
            console.log("RESPONSE ", response);
            if (task == "create") {
              dispatch(
                createProductAction({
                  productname: productname,
                  description: description,
                  stock: stock,
                  price: price,
                  igst: igst,
                  hsncode: hsncode,
                  productimage: response,
                })
              );
              navigation.goBack();
            } else if (task == "update") {
              console.log("IN update,");
              dispatch(
                updateProductAction(
                  {
                    productname: productname,
                    description: description,
                    stock: stock,
                    price: price,
                    igst: igst,
                    hsncode: hsncode,
                    productimage: response,
                  },
                  ProductDetails.key
                )
              );
              navigation.pop(2);
            }
          })
          .catch((error) => {
            Alert.alert(error);
          });
      } else {
        console.log("isUrl", isUrl);
        dispatch(
          updateProductAction(
            {
              productname: productname,
              description: description,
              stock: stock,
              price: price,
              igst: igst,
              hsncode: hsncode,
              productimage: uploadUri,
            },
            ProductDetails.key
          )
        );
        navigation.pop(2);
      }
    } else {
      Alert.alert("Enter All Fields");
    }
  };
  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header
        isBack={true}
        backtext={StringsOfLanguage.back}
        onBackPress={() => navigation.goBack()}
      />
      <TitleHeader
        title={ProductDetails ? "Update Product" : StringsOfLanguage.addproduct}
      />
      <KeyboardAwareScrollView style={{ padding: 15 }}>
        <Text style={[styles.titletext, { fontSize: 21 }]}>
          {StringsOfLanguage.productdetail}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={[styles.titletext, { fontSize: 17 }]}>
            {StringsOfLanguage.choosefile}
          </Text>

          <Pressable
            style={styles.imageupload}
            onPress={() => {
              selectImage();
            }}
          >
            {productImage ? (
              <Image
                style={styles.imageupload}
                source={{ uri: productImage }}
              />
            ) : (
              <Image style={styles.uploadicon} source={icons.upload} />
              //   )
              // ) : (
              //   <Image style={styles.imageupload} source={{ uri: value }} />
            )}
          </Pressable>
        </View>
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            descriptionRef?.current?.focus();
          }}
          Value={productname}
          label={StringsOfLanguage.productname}
          editable={true}
          onChangeText={(txt) => {
            setProductName(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            stockRef?.current?.focus();
          }}
          Value={description}
          label={StringsOfLanguage.description}
          editable={true}
          onChangeText={(txt) => {
            setDescription(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            priceRef?.current?.focus();
          }}
          Value={stock}
          label={StringsOfLanguage.stock}
          editable={true}
          onChangeText={(txt) => {
            setStock(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            igstRef?.current?.focus();
          }}
          Value={price}
          label={StringsOfLanguage.price}
          editable={true}
          onChangeText={(txt) => {
            setPrice(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            hsncodeRef?.current?.focus();
          }}
          Value={igst}
          label={StringsOfLanguage.igst}
          editable={true}
          onChangeText={(txt) => {
            setIgst(txt);
          }}
          blurOnSubmit={false}
        />
        <FloatingLableTextInput
          style={styles.textinput}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            // descriptionRef?.current?.focus();
          }}
          Value={hsncode}
          label={StringsOfLanguage.hsncode}
          editable={true}
          onChangeText={(txt) => {
            setHsncode(txt);
          }}
          blurOnSubmit={false}
        />
      </KeyboardAwareScrollView>
      <CircleBlackButton
        containerStyle={{ height: hp(10) }}
        title={
          ProductDetails != null || undefined
            ? strings.btnupdate
            : strings.btnsubmit
        }
        onPress={() => {
          ProductDetails != null || undefined
            ? addProduct("update")
            : addProduct("create");
        }}
      />
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textinput: {
    marginVertical: 10,
  },
  uploadicon: {
    height: 36,
    width: 36,
  },
  imageupload: {
    borderRadius: 10,
    borderColor: colors.black,
    borderWidth: 1.5,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
  },
  titletext: {
    fontWeight: "500",
    color: colors.black,
  },

  image: { height: 100, width: 100 },
});
