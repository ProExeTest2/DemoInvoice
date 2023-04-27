import DemoScreen from "../screens/Prestartr/DemoScreen";
import DemoAnswer from "../screens/Prestartr/DemoAnswer";
import DemoCompo from "../screens/Prestartr/DemoCompo";
import PdfView from "../screens/PdfView";

const { NavigationContainer } = require("@react-navigation/native");
const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator();
const PrestartrNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitle: "",
        }}
      >
        <Stack.Screen name="DemoScreen" component={DemoScreen} />
        <Stack.Screen name="PdfView" component={PdfView} />
        <Stack.Screen name="DemoCompo" component={DemoCompo} />
        <Stack.Screen name="DemoAnswer" component={DemoAnswer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default PrestartrNavigation;
