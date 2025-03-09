import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { UserResponse } from "../../utils/types";
import LogoutButton from "./LogoutButton";
import MenuButton from "./MenuButton";

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  user: UserResponse;
}

export default function CustomDrawerContent({
  user,
  ...props
}: CustomDrawerContentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.hi}>Hi {user.name}</Text>
      <View style={styles.buttonList}>
        <MenuButton props={props} pageName="Main" />
        <MenuButton props={props} pageName="Recipes" />
      </View>

      <LogoutButton {...props} styles={styles.logout} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  hi: {
    fontFamily: "Italianno-Regular",
    fontSize: 65,
    color: theme.colorOrange,
    marginTop: 10,
    textDecorationLine: "underline",
  },
  container: {
    flex: 1,
  },
  buttonList: {
    paddingLeft: 15,
    gap: 5,
  },
  logout: {
    alignSelf: "baseline",
  },
  text: {
    color: theme.colorBlack,
    fontFamily: theme.mainFont,
    fontSize: 21,
  },
});
