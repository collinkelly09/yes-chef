import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "../../theme";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

interface Props {
  props: DrawerContentComponentProps;
  name: string;
}

export default function MenuButton({ props, name }: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(name === "Home" ? "Main" : name)
        }
        activeOpacity={0.6}
      >
        <Text style={[styles.text]}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 21,
  },
});
