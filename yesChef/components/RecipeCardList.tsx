import React from "react";
import { FlatList, StyleSheet } from "react-native";
import RecipeCard from "../screens/Recipes/RecipeCard";
import {
  HomeScreenNavigationProp,
  RecipeResponseList,
  RecipesScreenNavigationProp,
} from "../utils/types";

interface Props extends RecipeResponseList {
  navigation: HomeScreenNavigationProp | RecipesScreenNavigationProp;
}

export default function RecipeCardList({ recipes, navigation }: Props) {
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
          time={item.time}
          navigation={navigation}
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
