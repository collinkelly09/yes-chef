import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import LogoutButton from "./LogoutButton";
import { theme } from "../../theme";
import MenuButton from "./MenuButton";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.buttonList}>
        <MenuButton props={props} name="Home" />
        <MenuButton props={props} name="Recipes" />
        <MenuButton props={props} name="Categories" />
      </View>

      <LogoutButton {...props} styles={styles.logout} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonList: {
    marginTop: 15,
    gap: 5,
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
