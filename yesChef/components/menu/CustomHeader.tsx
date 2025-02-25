import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Menu from "./Menu";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";

export default function CustomHeader({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}) {
  return (
    <View>
      <View style={styles.header}>
        <Menu navigation={navigation} />
        <Text style={styles.logo}> yesChef </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  logo: {
    fontFamily: "Italianno-Regular",
    fontSize: 45,
    alignSelf: "center",
    width: 125,
    height: 65,
    marginTop: 20,
  },
});
