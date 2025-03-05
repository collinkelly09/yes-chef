import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CategoryResponseList, RootStackParamList } from "../../utils/types";
import { theme } from "../../theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

type CategoryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Category"
>;

interface Props extends DrawerContentComponentProps {
  name: string;
  id: number;
}

export default function HomeCategoryCard({ navigation, name, id }: Props) {
  return (
    <View style={styles.categoryCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Category", { categoryId: id })}
      >
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginRight: 15,
  },
  categoryCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  text: {
    color: theme.colorBlack,
    fontFamily: theme.mainFont,
    fontSize: 23,
  },
});
