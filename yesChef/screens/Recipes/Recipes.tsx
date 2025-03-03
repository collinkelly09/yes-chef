import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import RecipeCardList from "../../components/RecipeCardList";
import { useListRecipesQuery } from "../../redux/apiSlice";
import Loading from "../../components/Loading";
import { theme } from "../../theme";

export default function Recipes() {
  const { data: recipeData, isLoading: recipeLoading } = useListRecipesQuery();
  if (recipeLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipes</Text>
      {recipeData && <RecipeCardList recipes={recipeData.recipes} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 0.9,
    marginTop: theme.headerSpace,
    paddingLeft: 15,
  },
  heading: {
    color: theme.colorGrey,
    fontFamily: theme.mainFont,
    fontSize: 23,
    paddingBottom: 15,
  },
});
