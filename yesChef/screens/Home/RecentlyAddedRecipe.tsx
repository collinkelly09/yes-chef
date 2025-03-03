import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { starConversion } from "../../utils/conversion";

interface RecentlyAddedRecipe {
  id: number;
  name: string;
  photo_url: string | undefined;
  rating: number;
}

export default function RecentlyAddedRecipe({
  name,
  photo_url,
  id,
  rating,
}: RecentlyAddedRecipe) {
  return (
    <View style={styles.recipeCard}>
      <Image source={{ uri: photo_url }} style={styles.image} />
      <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.stars}>{starConversion(rating)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 15,
  },
  recipeCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    width: 100,
    height: 140,
    marginRight: 10,
  },
  text: {
    color: theme.colorBlack,
    fontFamily: theme.mainFont,
    fontSize: 15,
  },
  stars: {
    color: theme.colorOrange,
    fontSize: 17,
  },
});
