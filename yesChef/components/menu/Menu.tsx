import {
  DrawerContentComponentProps,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Menu({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <View style={styles.barType1}></View>
        <View style={styles.barType2}></View>
        <View style={styles.barType1}></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: { width: "f" },
  menuButton: {
    paddingTop: 45,
    paddingLeft: 20,
  },
  barType1: {
    width: 30,
    height: 4,
    backgroundColor: "#FF9D00",
    borderRadius: 10,
    marginBottom: 5,
  },
  barType2: {
    width: 20,
    height: 4,
    backgroundColor: "#FF9D00",
    borderRadius: 10,
    marginBottom: 5,
  },
});
