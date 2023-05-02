import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../helper/colors";
import Header from "../../components/PrestartrCompo/Header";
import NextSubmitButton from "../../components/PrestartrCompo/NextSubmitButton";
import ProgressBar from "../../components/PrestartrCompo/ProgressBar";
import ImagePicker from "../../components/PrestartrCompo/ImagePicker";
import CustomTextInput from "../../components/PrestartrCompo/CustomTextInput";
import ToggleButton from "../../components/PrestartrCompo/ToggleButton";
import tmp from "../../helper/Data/tmp.json";
import Swiper from "react-native-swiper";
import { useIsFocused } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { wp } from "../../helper/Global/responsive";
import SignatureScreen from "react-native-signature-canvas";
import EmailTextInput from "../../components/PrestartrCompo/EmailTextInput";
import CustomCheckBox from "../../components/PrestartrCompo/CustomCheckBox";
import CustomDateTime from "../../components/PrestartrCompo/CustomDateTime";
import CustomDropdown from "../../components/PrestartrCompo/CustomDropdown";
import Signature from "react-native-signature-canvas";

const DemoScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  const swiper = useRef(null);
  const phoneInput = useRef(null);
  const refSign = useRef();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [btnname, setbtnname] = useState("NEXT");
  const [ViewableItems, setViewableItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [SelectedAnswer, setSelectedAnswer] = useState([]);
  const [signature, setSign] = useState();
  const [label, setlabel] = useState("");
  const [Type, setType] = useState("");
  const [selectedImg, setSelectedImg] = useState([]);

  const [signature1, setSign1] = useState(null);

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
  let tempAnswer;

  useEffect(() => {
    if (isFocused) {
      let arr = [];
      console.log("TTT", tmp.data);
      tmp.data.filter((item) => {
        if (item.type != "header") {
          arr.push({
            ...item,
            selAns: "",
          });
        }
        setViewableItems(arr);
        setlabel(arr[0]?.label);
      });
    } else {
      console.log("in else is focused");
    }
  }, [isFocused]);

  const onImageSelect = (value) => {
    setSelectedImg([...selectedImg, value]);
    console.log("Image Value", value);
    ViewableItems[activeIndex].selAns = [...selectedImg, value];
  };

  const onChangeEmail = (value) => {
    ViewableItems[activeIndex].selAns = value;
  };

  const setCheckBox = (value) => {
    tempAnswer = value;
  };

  const onSelectDate = (value) => {
    console.log("Date ", value);
    ViewableItems[activeIndex].selAns = value;
  };

  const handleClear = async () => {
    await refSign.current.clearSignature();
    console.log("clear success!");
  };

  const handleOK = async (signature) => {
    console.log("handle ok", signature);
    await setSign(signature);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };
  const handleEnd = async () => {
    await refSign.current.readSignature();
  };
  const onPressNextSubmit = () => {
    console.log("inside next part...!");
    Type == "photo" ? (ViewableItems[activeIndex].selAns = selectedImg) : null;

    // Type == "signature"
    //   ? (ViewableItems[activeIndex].selAns = signature)
    //   : null;
    if (ViewableItems[activeIndex].selAns !== null || "") {
      setSelectedAnswer({
        ...SelectedAnswer,
        [label]: ViewableItems[activeIndex].selAns,
      });

      btnname === "SUBMIT"
        ? navigation.navigate("DemoAnswer", { allAnswer: SelectedAnswer })
        : swiper.current.scrollBy(1);
    }
  };

  const RenderField = ({ type, item }) => {
    switch (type) {
      // case "signature":
      //   return (
      //     <View style={{ flex: 1, alignItems: "center" }}>
      //       <Text style={styles.signatureclearbtn} onPress={handleClear}>
      //         Clear
      //       </Text>
      //       <Signature
      //         ref={refSign}
      //         onOK={handleOK}
      //         onEmpty={handleEmpty}
      //         webStyle={style}
      //         onEnd={handleEnd}
      //         scrollable={false}
      //         autoClear={false}
      //         //dataURL={signature}
      //       />
      //       {/* <Image
      //         resizeMode={"contain"}
      //         style={styles.image}
      //         source={{ uri: signature }}
      //       /> */}
      //     </View>
      //   );

      case "toggle":
        let v = item?.seloptions.split("|");
        options = [];
        v.map((i) => {
          options.push(i.slice(2));
        });
        ViewableItems[activeIndex].selAns == null
          ? (ViewableItems[activeIndex].selAns = options[0])
          : null;
        return (
          <ToggleButton
            options={options}
            onSelect={(item) => {
              ViewableItems[activeIndex].selAns = item;
            }}
            defaultValue={item?.selAns == "" ? options[0] : item.selAns}
          />
        );

      case "text":
      case "numeric":
        return (
          <CustomTextInput
            placeholder={"Type Here.."}
            onChangeText={(c) => {
              ViewableItems[activeIndex].selAns = c;
            }}
            keyboardType="number-pad"
            defaultValue={item?.selAns}
          />
        );

      case "textarea":
        return (
          <CustomTextInput
            placeholder={"Type Here.."}
            onChangeText={(c) => {
              //setTextInputValue(c);
              ViewableItems[activeIndex].selAns = c;
            }}
            defaultValue={item?.selAns}
          />
        );

      case "email":
        return (
          <EmailTextInput
            onChangeEmail={onChangeEmail}
            defaultValue={item?.selAns}
          />
        );

      case "phone":
        return (
          <>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="IN"
              layout="second"
              withShadow
              containerStyle={[styles.phoneNumberView, { width: wp(85) }]}
              textContainerStyle={{ paddingVertical: 0 }}
              onChangeFormattedText={(text) => {
                if (text?.length < 14) {
                  setPhoneNumber(text);
                  ViewableItems[activeIndex].selAns = text;
                } else {
                  Alert.alert("Enter Valid Phone number");
                }
              }}
            />
            <Text style={{ color: "red" }}>
              {phoneNumber?.length < 14 ? "" : "PhoneNumber is not valid"}
            </Text>
          </>
        );

      case "photo":
        return (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <ImagePicker onSelect={onImageSelect} />
            <FlatList
              style={
                {
                  //maxHeight: 110,
                  // marginBottom: 10,
                }
              }
              data={selectedImg}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Image style={styles.selectedimg} source={{ uri: item }} />
                );
              }}
            />
            {/* <Image style={styles.selectedimg} source={{ uri: selectedImage }} /> */}
          </View>
        );

      case "date":
        return (
          <CustomDateTime
            mode={"date"}
            onSelectDate={onSelectDate}
            format={"DD-MMM-YYYY"}
            defaultDate={item?.selAns == "" ? new Date() : item?.selAns}
          />
        );

      case "time":
        return (
          <CustomDateTime
            mode={"time"}
            onSelectDate={onSelectDate}
            format={"HH:MM:SS"}
          />
        );

      case "datetime":
        return (
          <CustomDateTime
            mode={"datetime"}
            onSelectDate={onSelectDate}
            format={"DD-MMM-YYYY HH:MM:SS"}
          />
        );

      case "select":
      case "contact":
      case "project":
      case "company":
      case "selectmulti":
        let m = item?.seloptions.split("|");
        options = [];
        let id = 0;
        m.map((i) => {
          options.push({ name: i, id: id });
          id++;
        });
        return (
          <CustomDropdown
            dataArray={options}
            onSelect={(value) => {
              ViewableItems[activeIndex].selAns = value;
            }}
          />
        );

      case "checkbox":
        let n = item?.seloptions.split("|");
        return (
          <CustomCheckBox title={item?.seloptions} setCheckBox={setCheckBox} />
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <Header
        onPressLeft={() => {
          activeIndex > 0 ? swiper.current.scrollBy(-1) : null;
        }}
      />
      <SafeAreaView style={styles.demomaincontainer}>
        <Text style={styles.countertext}>
          {activeIndex + 1} of {ViewableItems.length.toString()}
        </Text>

        <ProgressBar
          progressStatus={(activeIndex * 104) / ViewableItems.length}
        />

        <Swiper
          showsPagination={false}
          showsButtons={false}
          removeClippedSubviews={false}
          scrollEnabled={false}
          loop={false}
          ref={swiper}
          onIndexChanged={(index, item) => {
            setActiveIndex(index);
            Number(index + 1) === Number(ViewableItems.length)
              ? setbtnname("SUBMIT")
              : setbtnname("NEXT");
            setlabel(ViewableItems[index]?.label);
            setType(ViewableItems[index]?.type);
          }}
        >
          {ViewableItems?.map((item) => {
            return (
              <>
                <Text style={styles.label}>{item.label.toString()}</Text>
                <RenderField type={item.type.toString()} item={item} />
                {item.type.toString() === "signature" ? (
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text
                      style={styles.signatureclearbtn}
                      onPress={handleClear}
                    >
                      Clear
                    </Text>
                    <Signature
                      ref={refSign}
                      onOK={handleOK}
                      onEmpty={handleEmpty}
                      webStyle={style}
                      onEnd={handleEnd}
                      scrollable={false}
                      autoClear={false}
                      //dataURL={signature}
                    />
                  </View>
                ) : null}
              </>
            );
          })}
        </Swiper>

        <NextSubmitButton
          title={btnname}
          onPress={() => {
            onPressNextSubmit();
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  demomaincontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  countertext: {
    alignSelf: "center",
    color: colors.orange,
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 15,
  },
  label: {
    color: colors.black,
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  selectedimg: {
    height: 150,
    width: 150,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: colors.black,
    margin: 10,
  },
  phoneNumberView: {
    width: wp(90),
    borderRadius: 10,
    borderColor: colors.orange,
    borderWidth: 2,
  },
  selectedimg: {
    height: 100,
    width: 100,
    alignSelf: "center",
    margin: 5,
  },
  signatureclearbtn: {
    color: colors.textinputtextcolor,
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "flex-end",
  },
  preview: {
    backgroundColor: "#c6c3c3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  image: {
    width: 335,
    height: 200,
    borderWidth: 1,
    borderColor: "red",
  },
});
