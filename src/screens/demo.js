// import { Button, StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { colors } from "../helper/colors";
// import { icons } from "../helper/icons";
// import * as Animatable from "react-native-animatable";
// import { hp } from "../helper/Global/responsive";
// const Demo = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlay, setIsPlay] = useState(true);
//   const [isToggle, setIsToggle] = useState(true);
//   const [count, setCount] = useState(10);
//   let myInterval;
//   const data = [
//     {
//       label: "Stretch",
//       time: 3,
//       Activeimage: icons.search,
//       inActiveimage: icons.settings,
//     },
//     {
//       label: "Hold",
//       time: 4,
//       Activeimage: icons.hidepassword,
//       inActiveimage: icons.showpassword,
//     },
//     {
//       label: "Release",
//       time: 3,
//       Activeimage: icons.plus,
//       inActiveimage: icons.delete,
//     },
//   ];
//   useEffect(() => {
//     const interval = setInterval(() => {
//       //setOldCount(count);
//       setCount(count + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [count]);
//   // useEffect(() => {
//   //   if (isPlay == false) {
//   //     return () => clearInterval(myInterval);
//   //   } else {
//   //     if (currentIndex < 3) {
//   //       //let value = isToggle ? count : data[currentIndex]?.time + 1;
//   //       let value = isToggle ? count : data[currentIndex]?.time + 1;

//   //       myInterval = setInterval(() => {
//   //         if (value >= 0) {
//   //           value -= 1;
//   //           setCount(value);
//   //         }
//   //         if (value == 0) {
//   //           setCurrentIndex(currentIndex + 1);
//   //           setIsToggle(false);
//   //         }
//   //       }, 1000);
//   //     }

//   //     return () => clearInterval(myInterval);
//   //   }
//   // }, [currentIndex]);
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 20, color: colors.black }}>
//         {"currentIndex"}
//       </Text>
//       {/* <Text style={{ fontSize: 20, color: colors.black }}>{currentIndex}</Text> */}
//       <View style={{ height: hp(3), maxHeight: hp(3) }}>
//         <Animatable.Text
//           style={{
//             fontSize: 20,
//             color: colors.black,
//             backgroundColor: "yellow",
//           }}
//           animation="slideInDown"
//           iterationCount={100}
//           duration={1000}
//           //onAnimationEnd={() => setOldCount(count)}
//         >
//           {count}
//         </Animatable.Text>
//       </View>
//       <Animatable.Text
//         style={{
//           fontSize: 20,
//           color: colors.black,
//           backgroundColor: "yellow",
//         }}
//         animation="slideInDown"
//         iterationCount={100}
//         duration={1000}
//         //onAnimationEnd={() => setOldCount(count)}
//       >
//         {count - 1}
//       </Animatable.Text>
//       <Button
//         title={"SET TO ZERO"}
//         style={{ marginTop: 20 }}
//         onPress={() => {
//           setCount(0);
//         }}
//       />
//     </View>
//   );
// };

// export default Demo;

// const styles = StyleSheet.create({});
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, SafeAreaView, Text } from "react-native";
// import * as Animatable from "react-native-animatable";
// import { hp } from "../helper/Global/responsive";
// const Demo = () => {
//   const [count, setCount] = useState(0);
//   const [oldCount, setOldCount] = useState(count);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       //setOldCount(count);
//       setCount(count + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [count]);
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ height: hp(10), backgroundColor: "white" }}>
//         <Animatable.Text
//           style={styles.oldCount}
//           animation="slideInDown"
//           // iterationCount={100}
//           //duration={500}
//           //onAnimationEnd={() => setOldCount(count)}
//         >
//           {count}
//         </Animatable.Text>
//         {/* <Text style={styles.newCount}>{count}</Text> */}
//         {/* <Animatable.Text
//         style={styles.newCount}
//         animation="slideInUp"
//         iterationCount={1}
//         duration={500}
//       >
//         {count}
//       </Animatable.Text> */}
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,

//     justifyContent: "center",
//     alignItems: "center",
//   },
//   oldCount: {
//     fontSize: 48,
//     fontWeight: "bold",
//     color: "black",
//     transform: [{ translateY: 0 }],
//     position: "absolute",
//     backgroundColor: "yellow",
//     zIndex: 1,
//   },
//   newCount: {
//     fontSize: 48,
//     fontWeight: "bold",
//     color: "black",
//     transform: [{ translateY: 0 }],
//     // position: "absolute",
//     backgroundColor: "transparent",
//     zIndex: 0,
//   },
// });
// export default Demo;
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
const Demo = () => {
  const [count, setCount] = useState(0);
  const lastCountRef = useRef(count);
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(0);
      lastCountRef.current = count;
    });
  }, [count, animatedValue]);
  const digits = count
    .toString()
    .split("")
    .map((digit, index) => {
      const lastDigit = lastCountRef.current.toString()[index] || "0";
      const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -40 * (digit - lastDigit)],
      });
      return (
        <Animated.Text
          key={index}
          style={[styles.digit, { transform: [{ translateY }] }]}
        >
          {digit}
        </Animated.Text>
      );
    });
  return (
    <View style={styles.container}>
      <View style={styles.digitContainer}>{digits}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  digitContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  digit: {
    fontSize: 48,
    fontWeight: "bold",
    color: "green",
    marginHorizontal: 4,
  },
});
export default Demo;
