import React from "react";
import { FlatList, View } from "react-native";
import { RecipeResponseList } from "../../utils/types";
import RecentlyAddedRecipe from "./RecentlyAddedRecipe";

export default function HomeRecentlyAddedList({ recipes }: RecipeResponseList) {
  return (
    <View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <RecentlyAddedRecipe
            name={item.name}
            id={item.id}
            photo_url={item.photo_url}
            rating={item.rating}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
