import { DrawerHeaderProps } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Menu from "./Menu";

export default function CustomHeader({ navigation }: DrawerHeaderProps) {
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
