import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import LogoutButton from "./LogoutButton";
import { theme } from "../theme";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <Text></Text>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        activeOpacity={0.6}
      >
        <Text style={[styles.text]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Recipes")}
        activeOpacity={0.6}
      >
        <Text style={[styles.text]}>Recipes</Text>
      </TouchableOpacity>

      <LogoutButton {...props} styles={styles.logout} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logout: {
    alignSelf: "baseline",
  },
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 21,
  },
});
