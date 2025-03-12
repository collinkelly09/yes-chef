import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Auth/Signin";
import SignUpScreen from "../screens/Auth/SignUp";
import HomeScreen from "../screens/Home/HomeScreen";
import RecipePage from "../screens/Recipes/RecipePage";
import Recipes from "../screens/Recipes/Recipes";
import { RootStackParamList } from "../utils/types";

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeStack = () => (
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

export const RecipeStack = () => (
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

export const AuthStack = () => (
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
);
