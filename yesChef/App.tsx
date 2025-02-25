import "./gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import HomeScreen from "./components/HomeScreen";
import SignInScreen from "./components/Signin";
import SignUpScreen from "./components/SignUp";
import { useGetUserQuery } from "./redux/apiSlice";
import { RootStackParamList } from "./utils/types";
import LogoutButton from "./components/menu/LogoutButton";
import CustomDrawerContent from "./components/menu/CustomDrawerContent";
import CustomHeader from "./components/menu/CustomHeader";

export default function App() {
  const { data: user, isLoading: userLoading } = useGetUserQuery();

  if (userLoading) return <Text>Loading user...</Text>;

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" /> */}
      {user ? (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ header: (props) => <CustomHeader {...props} /> }}
          />
          <Drawer.Screen name="Recipes" component={LogoutButton} />
          <Drawer.Screen name="Categories" component={HomeScreen} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <>
            <Stack.Screen
              name="Signin"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
