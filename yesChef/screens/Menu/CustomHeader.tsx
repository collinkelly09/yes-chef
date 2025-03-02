import { DrawerHeaderProps } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";

export default function CustomHeader({ navigation }: DrawerHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <View style={styles.barType1}></View>
        <View style={styles.barType2}></View>
        <View style={styles.barType1}></View>
      </TouchableOpacity>
      <Text style={styles.logo}>
        {"  "}yesChef{"  "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    paddingTop: 45,
    paddingLeft: 20,
  },
  barType1: {
    width: 30,
    height: 4,
    backgroundColor: theme.colorOrange,
    borderRadius: 10,
    marginBottom: 5,
  },
  barType2: {
    width: 20,
    height: 4,
    backgroundColor: theme.colorOrange,
    borderRadius: 10,
    marginBottom: 5,
  },
  header: {
    flex: 1,
  },
  logo: {
    fontFamily: "Italianno-Regular",
    fontSize: 45,
    alignSelf: "center",
    height: 65,
    marginTop: -20,
  },
});
