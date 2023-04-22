import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";

function Demo() {
  const [selectedNum, setSelectedNum] = useState(100);
  const time = useTime();

  const allPrimes = useMemo(() => {
    const result = [];
    for (let counter = 2; counter < selectedNum; counter++) {
      if (isPrime(counter)) {
        result.push(counter);
      }
    }
    return result;
  }, [selectedNum]);

  function useTime() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
      const intervalId = window.setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => {
        window.clearInterval(intervalId);
      };
    }, []);
    return time;
  }

  function isPrime(n) {
    const max = Math.ceil(Math.sqrt(n));
    if (n === 2) {
      return true;
    }
    for (let counter = 2; counter <= max; counter++) {
      if (n % counter === 0) {
        return false;
      }
    }
    return true;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <Text>{moment(time).format("hh:mm:ss a")}</Text>
      <TextInput
        style={{ backgroundColor: "lightgray", width: "100%" }}
        placeholder="Enter Number Here...!"
        keyboardType="number-pad"
        onChangeText={(num) => {
          setSelectedNum(num);
        }}
      />
      <Text>{allPrimes.join(", ")}</Text>
    </SafeAreaView>
  );
}

export default Demo;
