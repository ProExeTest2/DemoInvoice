import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import Signature from "react-native-signature-canvas";
import CustomTimePicker from "../../components/PrestartrCompo/CustomTimePicker";
import EmailTextInput from "../../components/PrestartrCompo/EmailTextInput";
import CustomCheckBox from "../../components/PrestartrCompo/CustomCheckBox";
import CustomDateTime from "../../components/PrestartrCompo/CustomDateTime";

const DemoScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const swiper = useRef(null);
  const phoneInput = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [multiselect, setMultiSelect] = useState([]);
  const [btnname, setbtnname] = useState("NEXT");
  const [ViewableItems, setViewableItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [SelectedAnswer, setSelectedAnswer] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [label, setlabel] = useState("");
  const [Type, setType] = useState("");
  const [selectedImg, setSelectedImg] = useState([]);
  const style = `.m-signature-pad--footer
    .button {
      background-color: rgb(248,126,35;
      color:rgb(147,162,172);
    }`;

  let hour = 0;
  let minute = 0;
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
      tmp.data.filter((item) => {
        if (item.type != "header") {
          arr.push(item);
        }
        setViewableItems(arr);
        setlabel(arr[0]?.label);
      });
    }
  }, [isFocused]);

  const onOptionSelect = (item) => {
    tempAnswer = item;
  };

  const onImageSelect = (value) => {
    setSelectedImg(value);
    //tempAnswer = value;
  };

  const handleOK = (signature) => {
    //setSign(signature);
    tempAnswer = signature;
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const onHourSelect = (hr) => {
    hour = hr;
    tempAnswer = hr + ":" + minute;
  };

  const onMinuteSelect = (min) => {
    minute = min;
    tempAnswer = hour + ":" + min;
  };

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    const temparr = [];
    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = multiselectoptions.find(
        (item) => item.id === selectedItems[i]
      );
      temparr.push(tempItem.name);
    }
    setMultiSelect(temparr);
  };

  const onChangeEmail = (value) => {
    tempAnswer = value;
  };

  const setCheckBox = (value) => {
    tempAnswer = value;
  };

  const onSelectDate = (value) => {
    tempAnswer = value;
  };

  const RenderField = ({ type, item }) => {
    switch (type) {
      case "toggle":
        let v = item?.seloptions.split("|");
        options = [];
        v.map((i) => {
          options.push(i.slice(2));
        });
        return <ToggleButton options={options} onSelect={onOptionSelect} />;

      case "text":
      case "numeric":
        return (
          <CustomTextInput
            placeholder={"Type Here.."}
            onChangeText={(c) => {
              tempAnswer = c;
            }}
            keyboardType="number-pad"
          />
        );

      case "textarea":
        return (
          <CustomTextInput
            placeholder={"Type Here.."}
            onChangeText={(c) => {
              //setTextInputValue(c);
              tempAnswer = c;
            }}
          />
        );

      case "email":
        return <EmailTextInput onChangeEmail={onChangeEmail} />;

      case "phone":
        return (
          <>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="IN"
              layout="first"
              withShadow
              containerStyle={styles.phoneNumberView}
              textContainerStyle={{ paddingVertical: 0 }}
              onChangeFormattedText={(text) => {
                text?.length < 14 ? (tempAnswer = text) : "";
                //setPhoneNumber(text);
              }}
            />
            <Text style={{ color: "red" }}>
              {phoneNumber?.length < 14 ? "" : "PhoneNumber is not valid"}
            </Text>
          </>
        );

      case "photo":
        return (
          <>
            <ImagePicker onSelect={onImageSelect} />
            {/* <Image style={styles.selectedimg} source={{ uri: selectedImage }} /> */}
          </>
        );

      case "selectmulti":
        return (
          <MultiSelect
            hideTags
            items={multiselectoptions}
            uniqueKey="id"
            styleMainWrapper={[
              styles.phoneNumberView,
              { borderColor: colors.lightgray2 },
            ]}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Select Items"
            searchInputPlaceholderText="Search Items Here..."
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#000"
            tagTextColor="#CCC"
            selectedItemTextColor="#918E8E"
            selectedItemIconColor="#918E8E"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
            hideSubmitButton={true}
          />
        );

      case "date":
        return (
          <CustomDateTime
            mode={"date"}
            onSelectDate={onSelectDate}
            format={"DD-MMM-YYYY"}
          />
        );

      case "time":
        return (
          <CustomTimePicker
            onSelectHours={onHourSelect}
            onSelectMinute={onMinuteSelect}
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
        let m = item?.seloptions.split("|");
        tempAnswer = m[0];
        return (
          <SelectDropdown
            buttonStyle={{
              width: wp(80),
              borderColor: colors.orange,
              borderWidth: 2,
              borderRadius: 10,
            }}
            data={m}
            onSelect={(selectedItem, index) => {
              tempAnswer = selectedItem;
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        );

      case "checkbox":
        let n = item?.seloptions.split("|");
        return n.map((item) => (
          <CustomCheckBox title={item} setCheckBox={setCheckBox} />
        ));

      case "sign":
        return (
          <View style={{ flex: 1 }}>
            <Signature
              // style={{ height: hp(80), width: wp(70), backgroundColor: "red" }}
              onOK={handleOK}
              onEmpty={handleEmpty}
              descriptionText="Sign"
              clearText="Clear"
              confirmText="Save"
              webStyle={style}
              scrollable={false}
            />
          </View>
        );

      default:
        return <></>;
    }
  };

  const onPressNextSubmit = (value) => {
    // console.log("Before.....", label, value);

    setSelectedAnswer({
      ...SelectedAnswer,
      [label]: value,
    });
    let a = 6 + 6;
    //console.log(a);
    // console.log("After.....", label, SelectedAnswer);
  };

  return (
    <>
      <Header
        onPressLeft={() => {
          swiper.current.scrollBy(-1);
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
                <Text style={styles.label}>
                  {item.label.toString() +
                    "\n" +
                    item.type.toString() +
                    "\n" +
                    activeIndex.toString()}
                </Text>
                <RenderField type={item.type.toString()} item={item} />
              </>
            );
          })}
        </Swiper>

        <NextSubmitButton
          title={btnname}
          onPress={() => {
            onPressNextSubmit(Type == "selectmulti" ? multiselect : tempAnswer);

            btnname === "SUBMIT"
              ? navigation.navigate("DemoAnswer", { allAnswer: SelectedAnswer })
              : swiper.current.scrollBy(1);
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
    marginTop: 10,
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
    //width: wp(80),
    // height: 50,
    //backgroundColor: "white",
    borderRadius: 10,
    borderColor: colors.orange,
    borderWidth: 2,
  },
});
