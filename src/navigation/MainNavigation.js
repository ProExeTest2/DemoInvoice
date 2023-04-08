import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Dashboard from "../screens/Dashboard/Dashboard";
import AddCustomer from "../screens/Customer/AddCustomer";
import CustomerDetails from "../screens/Customer/CustomerDetails";
import Customer from "../screens/Customer/Customers";
import Products from "../screens/Product/Products";
import ProductDetails from "../screens/Product/ProductDetails";
import AddProduct from "../screens/Product/AddProduct";
import CreateInvoice from "../screens/Invoice/CreateInvoice";
import Invoices from "../screens/Invoice/Invoices";
import OnBoard from "../screens/SplashOnboard.js/OnBoard";
import SplashScreen from "../screens/SplashOnboard.js/SplashScreen";
import ChooseLanguage from "../screens/Settings/ChooseLanguage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import { colors } from "../helper/colors";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        itemStyle: { marginVertical: 5 },
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: "Dashboard",
          drawerLabelStyle: { color: colors.card2, fontSize: 18 },
        }}
        component={Dashboard}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Choose Language",
          drawerLabelStyle: { color: colors.card2, fontSize: 18 },
        }}
        name="ChooseLanguage"
        component={ChooseLanguage}
      />
    </Drawer.Navigator>
  );
};

const MainNavigation = () => {
  // const navigation = useNavigation();
  // const [initialRoute, setInitialRoute] = useState("Dashboard");
  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //     //navigation.navigate("Products");
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //         //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //     });
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitle: "",
        }}
      >
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnBoard" component={OnBoard} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="Invoices" component={Invoices} />
        <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Customer" component={Customer} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
        {/* <Stack.Screen name="" component={}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
