import React from "react";
import { FlatList, StyleSheet } from "react-native";
import RecipeCard from "../screens/Recipes/RecipeCard";
import { RecipeResponseList } from "../utils/types";

export default function RecipeCardList({ recipes }: RecipeResponseList) {
  return (
    <FlatList
      style={styles.flatList}
      data={recipes}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <RecipeCard
          photo_url={item.photo_url}
          rating={item.rating}
          name={item.name}
          id={item.id}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginBottom: 35,
  },
});
