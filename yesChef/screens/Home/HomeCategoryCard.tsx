import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CategoryResponseList } from "../../utils/types";
import { theme } from "../../theme";

export default function HomeCategoryCard({
  name,
  id,
}: {
  name: string;
  id: number;
}) {
  return (
    <View style={styles.categoryCard}>
      <Text style={styles.text}>{name}</Text>
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
