import "./gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { useGetUserQuery } from "./redux/apiSlice";
import SignInScreen from "./screens/Auth/Signin";
import SignUpScreen from "./screens/Auth/SignUp";
import HomeScreen from "./screens/Home/HomeScreen";
import CustomDrawerContent from "./screens/Menu/CustomDrawerContent";
import CustomHeader from "./screens/Menu/CustomHeader";
import RecipePage from "./screens/Recipes/RecipePage";
import Recipes from "./screens/Recipes/Recipes";
import { RootDrawerParamList, RootStackParamList } from "./utils/types";

export default function App() {
  const { data: user, isLoading: userLoading } = useGetUserQuery();

  if (userLoading) return <Text>Loading user...</Text>;

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

  const HomeStack = () => (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recipes"
        component={Recipes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  const RecipeStack = () => (
    <Stack.Navigator initialRouteName="Recipes">
      <Stack.Screen
        name="Recipes"
        component={Recipes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {user ? (
        <Drawer.Navigator
          initialRouteName="HomeStack"
          drawerContent={(props) => (
            <CustomDrawerContent user={user} {...props} />
          )}
        >
          <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ header: (props) => <CustomHeader {...props} /> }}
          />
          <Drawer.Screen
            name="RecipeStack"
            component={RecipeStack}
            options={{ header: (props) => <CustomHeader {...props} /> }}
          />
        </Drawer.Navigator>
      ) : (
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
