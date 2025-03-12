import "./gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { useGetUserQuery } from "./redux/apiSlice";
import CustomDrawerContent from "./screens/Menu/CustomDrawerContent";
import CustomHeader from "./screens/Menu/CustomHeader";

import { RootDrawerParamList } from "./utils/types";
import { AuthStack, HomeStack, RecipeStack } from "./Navigation/Stacks";

export default function App() {
  const { data: user, isLoading: userLoading } = useGetUserQuery();

  if (userLoading) return <Text>Loading user...</Text>;

  const Drawer = createDrawerNavigator<RootDrawerParamList>();

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
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
