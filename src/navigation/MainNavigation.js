import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitle: "",
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
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
