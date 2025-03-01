import React, { useEffect, useState } from "react";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import {
  useListRecipesQuery,
  useListCategoriesQuery,
} from "../../redux/apiSlice";
// import { RootDrawerParamList, RootStackParamList } from "../utils/types";
import { theme } from "../../theme";
import HomeCategoryCard from "./HomeCategoryCard";
import HomeRecipeCard from "./HomeRecipeCard";
import Loading from "../Loading";
import RecipeCard from "../RecipeCard";

const HomeScreen = () => {
  // const [fontsLoaded] = useFonts({
  //   "InriaSerif-BoldItalic": require("../assets/fonts/InriaSerif-BoldItalic.ttf"),
  //   "Italianno-Regular": require("../assets/fonts/Italianno-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return undefined;
  // }

  const { data: recipeData, isLoading: recipeLoading } = useListRecipesQuery();
  const { data: categoryData, isLoading: categoryLoading } =
    useListCategoriesQuery();

  // if (recipeLoading || categoryLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.subheading}>Recipes</Text>
        {recipeData && (
          <HomeRecipeCard recipes={recipeData.recipes.slice(0, 16)} />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Categories</Text>
        {categoryData && (
          <HomeCategoryCard categories={categoryData.categories} />
        )}
      </View>

      <View>
        <Text style={styles.subheading}>Recently Added</Text>
        {recipeData && <RecipeCard recipes={recipeData.recipes.slice(0, 5)} />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 15,
  },
  section: {
    paddingBottom: 20,
  },
  subheading: {
    color: "#666666",
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 23,
    paddingBottom: 15,
  },
});

export default HomeScreen;
