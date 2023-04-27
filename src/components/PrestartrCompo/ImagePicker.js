import {
  Image,
  Modal,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../helper/colors";
import { icons } from "../../helper/icons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { hp } from "../../helper/Global/responsive";

const ImagePicker = ({ onSelect }) => {
  const [img, setImg] = useState([]);
  const [IsShow, setIsShow] = useState(false);
  //const [modalVisible, setModalVisible] = useState(false);
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const captureImage = async () => {
    console.log("inside capture img");
    let options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, (response) => {
        responseData(response);
      });
    }
  };

  const chooseFile = (action) => {
    console.log("inside choose img");
    let options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      responseData(response, action);
    });
  };

  const responseData = (response) => {
    console.log("Response = ", response);
    let tempuri;
    if (response.didCancel) {
      alert("User cancelled camera picker");
      return;
    } else if (response.errorCode == "camera_unavailable") {
      alert("Camera not available on device");
      return;
    } else if (response.errorCode == "permission") {
      alert("Permission not satisfied");
      return;
    } else if (response.errorCode == "others") {
      alert(response.errorMessage);
      return;
    }
    response.assets.map((item) => {
      setImg([...img, item.uri]);
      onSelect(item.uri);
    });
  };

  return (
    <>
      <Pressable
        style={{ flexDirection: "row", marginBottom: 10 }}
        onPress={() => {
          setIsShow(true);
        }}
      >
        <Image style={styles.btnimg} source={icons.more} />
        <Text style={styles.btntitle}>Add More Photos</Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={IsShow}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsShow(!IsShow);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={styles.pickerbtn}
            onPress={() => {
              captureImage();
            }}
          >
            <Image style={styles.btnimg} source={icons.camera} />
            <Text style={styles.btntitle}>Take Photo</Text>
          </Pressable>

          <Pressable
            style={[
              styles.pickerbtn,
              {
                borderBottomColor: colors.black,
                borderBottomWidth: 1,
                borderTopColor: colors.black,
                borderTopWidth: 1,
              },
            ]}
            onPress={() => {
              chooseFile();
            }}
          >
            <Image style={styles.btnimg} source={icons.images} />
            <Text style={styles.btntitle}>Choose From Gallery</Text>
          </Pressable>

          <Pressable style={styles.pickerbtn} onPress={() => setIsShow(false)}>
            <Image
              style={[styles.btnimg, { height: 20, width: 20 }]}
              source={icons.cancel}
            />
            <Text style={styles.btntitle}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  pickercontainer: {
    justifyContent: "space-evenly",
    borderRadius: 10,
    borderColor: colors.lightgray2,
    borderWidth: 2,
  },
  centeredView: {
    margin: 20,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    verticalAlign: "middle",
    marginTop: hp(50),
  },
  pickerbtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  btntitle: {
    color: colors.orange,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 13,
  },
  btnimg: {
    height: 24,
    width: 24,
    tintColor: colors.orange,
  },
});
