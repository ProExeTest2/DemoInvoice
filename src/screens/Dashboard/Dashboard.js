import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header/Header";
import DashboardCard from "../../components/DashboardCard";
import strings from "../../helper/strings";
import { colors } from "../../helper/colors";
import TitleHeader from "../../components/Header/TitleHeader";
import { isIos } from "../../helper/Global/responsive";

const Dashboard = ({ navigation }) => {
  const addCustomerOnPress = () => {};
  return (
    <View style={styles.maincontainer}>
      <Header isBack={true} style={{ marginTop: isIos ? 30 : 1 }} />
      <TitleHeader title={"Dashboard"} />
      <View style={styles.cardcontainer}>
        <DashboardCard
          count={10}
          title={strings.invoices}
          background={colors.card1}
        />
        <DashboardCard
          count={10}
          title={strings.customer}
          background={colors.card2}
        />
      </View>
      <View style={styles.cardcontainer}>
        <DashboardCard title={strings.products} background={colors.card3} />
        <DashboardCard
          count={10}
          title={strings.payments}
          background={colors.card4}
        />
      </View>
      <Button
        title={strings.addcustomer}
        onPress={() => navigation.navigate("AddCustomer")}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardcontainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
