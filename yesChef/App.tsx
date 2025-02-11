import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import HomeScreen from "./components/HomeScreen";
import SignInScreen from "./components/Signin";
import SignUpScreen from "./components/SignUp";
import { useGetUserQuery } from "./redux/apiSlice";
import { RootStackParamList } from "./utils/types";

export default function App() {
  const { isLoading: userLoading } = useGetUserQuery();

  if (userLoading) return <Text>Loading user...</Text>;

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
