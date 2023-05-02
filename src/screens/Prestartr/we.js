import React, { useRef, useState } from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";
import Signature from "react-native-signature-canvas";

const App = () => {
  const [signature, setSign] = useState(null);
  const refSign = useRef();
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
  // const style = `.m-signature-pad--footer
  //   .button {
  //     background-color: red;
  //     color: #FFF;
  //   }`;
  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <Image
        resizeMode={"contain"}
        style={styles.image}
        source={{ uri: signature }}
      />

      <Signature
        ref={refSign}
        onOK={handleOK}
        onEmpty={handleEmpty}
        webStyle={style}
        onEnd={handleEnd}
        autoClear={false}
        //dataURL={signature}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default App;
