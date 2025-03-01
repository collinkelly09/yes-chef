import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CategoryResponseList } from "../../utils/types";
import { theme } from "../../theme";

export default function HomeCategoryCard({ categories }: CategoryResponseList) {
  return (
    <View style={styles.categoryContainer}>
      {categories.slice(0, 6).map((category) => (
        <View key={category.id} style={styles.categoryCard}>
          <Text style={styles.text}>{category.name}</Text>
        </View>
      ))}
      <Text style={[styles.text, styles.more]}>More...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  more: {
    alignSelf: "center",
    marginLeft: "auto",
  },
  categoryCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 23,
  },
});
