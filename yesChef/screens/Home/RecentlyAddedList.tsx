import React from "react";
import { FlatList, View } from "react-native";
import {
  RecipeListResponse,
  HomeScreenNavigationProp,
} from "../../utils/types";
import RecentlyAddedRecipe from "./RecentlyAddedRecipe";

type Props = {
  navigation: HomeScreenNavigationProp;
  recipes: RecipeListResponse[];
};

export default function HomeRecentlyAddedList({ recipes, navigation }: Props) {
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
            navigation={navigation}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
