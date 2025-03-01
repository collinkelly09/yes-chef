import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import { starConversion } from "../utils/conversion";
import { RecipeResponseList } from "../utils/types";

interface RecipeItem {
  id: number;
  name: string;
  photo_url: string | undefined;
  rating: number;
}

const RecipeItem = ({ name, photo_url, id, rating }: RecipeItem) => {
  return (
    // <View>
    <View key={id} style={styles.recipeCard}>
      <Image source={{ uri: photo_url }} style={styles.image} />
      <View>
        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.stars}>{starConversion(rating)}</Text>
      </View>
    </View>
    // </View>
  );
};

export default function RecipeCard({ recipes }: RecipeResponseList) {
  return (
    <View>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <RecipeItem
            name={item.name}
            id={item.id}
            photo_url={item.photo_url}
            rating={item.rating}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
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
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    padding: 10,
    width: "auto",
    height: "auto",
    marginRight: 15,
    gap: 10,
    marginBottom: 10,
  },
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 20,
  },
  stars: {
    color: theme.colorOrange,
    fontSize: 17,
  },
});
