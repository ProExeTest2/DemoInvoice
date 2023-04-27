import {
  Alert,
  Button,
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
import MultiSelect from "react-native-multiple-select";
import SelectDropdown from "react-native-select-dropdown";
import PhoneInput from "react-native-phone-number-input";
import { wp } from "../../helper/Global/responsive";
import SignatureScreen from "react-native-signature-canvas";
import EmailTextInput from "../../components/PrestartrCompo/EmailTextInput";
import CustomCheckBox from "../../components/PrestartrCompo/CustomCheckBox";
import CustomDateTime from "../../components/PrestartrCompo/CustomDateTime";
import DemoCompo from "./DemoCompo";
import CustomDropdown from "../../components/PrestartrCompo/CustomDropdown";

const DemoScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const swiper = useRef(null);
  const phoneInput = useRef(null);
  const refSign = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [multiselect, setMultiSelect] = useState([]);
  const [btnname, setbtnname] = useState("NEXT");
  const [ViewableItems, setViewableItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [SelectedAnswer, setSelectedAnswer] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [signature, setSign] = useState(null);
  const [label, setlabel] = useState("");
  const [Type, setType] = useState("");
  const [selectedImg, setSelectedImg] = useState([]);
  // const style = `.m-signature-pad--footer
  //   .button {
  //     background-color: rgb(248,126,35);
  //     color:#fff;
  //     fontWeight:'600';
  //   }`;
  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
  let tempAnswer;
  let options = ["Yes", "No"];
  let multiselectoptions = [
    { id: 1, name: "option1" },
    { id: 2, name: "option2" },
    { id: 3, name: "option3" },
    { id: 4, name: "option4" },
    { id: 5, name: "option5" },
  ];

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
      //refSign.current.getData(ViewableItems[activeIndex].selAns);
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
  let sig;
  const handleOK = (signature) => {
    //console.log("handleOK ", signature);
    setSign(signature);
    sig = signature.split(",");
    //console.log(" SIGNATURE ", sig[1]);
    ViewableItems[activeIndex].selAns = signature;
    //onOK(signature);
  };
  const handleEmpty = () => {
    refSign.current.draw(ViewableItems[activeIndex].selAns);
    console.log("Empty");
  };
  // Called after ref.current.clearSignature()
  const handleClear = () => {
    refSign.current.clearSignature();
    console.log("clear success!");
  };

  const handleConfirm = () => {
    console.log("end");
    refSign.current.readSignature();
  };

  const onPressNextSubmit = () => {
    console.log("inside next part...!");

    Type == "selectmulti"
      ? (ViewableItems[activeIndex].selAns = multiselect)
      : null;
    Type == "photo" ? (ViewableItems[activeIndex].selAns = selectedImg) : null;

    if (ViewableItems[activeIndex].selAns !== null || "") {
      console.log(
        "inside next if part...!",
        ViewableItems[activeIndex].selAns,
        ViewableItems[activeIndex].label
      );
      setSelectedAnswer({
        ...SelectedAnswer,
        [label]: ViewableItems[activeIndex].selAns,
      });
      btnname === "SUBMIT"
        ? navigation.navigate("DemoAnswer", { allAnswer: SelectedAnswer })
        : swiper.current.scrollBy(1);
    } else {
      console.log(
        "inside next else part...!",
        ViewableItems[activeIndex].selAns,
        ViewableItems[activeIndex].label
      );
      Alert.alert("ERROR", "Enter Valid Input...!");
    }
  };

  const RenderField = ({ type, item }) => {
    switch (type) {
      case "signature":
        let tempSign;
        return (
          <View style={{ flex: 1, alignItems: "center" }}>
            <SignatureScreen
              ref={refSign}
              onOK={handleOK}
              webStyle={style}
              onEmpty={handleEmpty}
              onGetData={() => {
                ViewableItems[activeIndex].selAns;
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Button title="Clear" onPress={handleClear} />
              <Button title="Confirm" onPress={handleConfirm} />
            </View>
            <Image
              resizeMode={"cover"}
              style={{
                width: 300,
                height: 180,
                paddingBottom: 20,
                borderWidth: 1,
                borderColor: "red",
                resizeMode: "contain",
              }}
              source={{ uri: signature }}
            />
          </View>
        );
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
          // <CustomTimePicker
          //   onSelectHours={onHourSelect}
          //   onSelectMinute={onMinuteSelect}
          // />
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
});
// <SelectDropdown
//   buttonStyle={{
//     width: wp(80),
//     borderColor: colors.orange,
//     borderWidth: 2,
//     borderRadius: 10,
//   }}
//   data={m}
//   defaultValue={item.selAns == "" ? m[0] : item.selAns}
//   onSelect={(selectedItem, index) => {
//     ViewableItems[activeIndex].selAns = selectedItem;
//   }}
//   buttonTextAfterSelection={(selectedItem, index) => {
//     return selectedItem;
//   }}
//   rowTextForSelection={(item, index) => {
//     return item;
//   }}
// />
// case "selectmulti":
//         return (
//           <MultiSelect
//             hideTags
//             items={multiselectoptions}
//             uniqueKey="id"
//             styleMainWrapper={[
//               styles.phoneNumberView,
//               { borderColor: colors.lightgray2 },
//             ]}
//             onSelectedItemsChange={onSelectedItemsChange}
//             selectedItems={selectedItems}
//             selectText="Select Items"
//             searchInputPlaceholderText="Search Items Here..."
//             onChangeInput={(text) => console.log(text)}
//             tagRemoveIconColor="#CCC"
//             tagBorderColor="#000"
//             tagTextColor="#CCC"
//             selectedItemTextColor="#918E8E"
//             selectedItemIconColor="#918E8E"
//             itemTextColor="#000"
//             displayKey="name"
//             searchInputStyle={{ color: "#CCC" }}
//             hideSubmitButton={true}
//           />
//         );
/*const onSelectedItemsChange = (selectedItems) => {
  setSelectedItems(selectedItems);
  const temparr = [];
  for (let i = 0; i < selectedItems.length; i++) {
    var tempItem = multiselectoptions.find(
      (item) => item.id === selectedItems[i]
    );
    temparr.push(tempItem.name);
  }
  setMultiSelect(temparr);
};*/
