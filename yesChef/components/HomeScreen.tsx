import React, { useEffect, useState } from "react";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import { useListRecipesQuery, useListCategoriesQuery } from "../redux/apiSlice";
// import { RootDrawerParamList, RootStackParamList } from "../utils/types";
import { theme } from "../theme";

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

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.subheading]}>Recipes</Text>
        <View style={styles.categoryContainer}>
          {recipeData &&
            recipeData.recipes.map((recipe) => (
              <View key={recipe.id} style={styles.categoryCard}>
                <Text style={styles.text}>{recipe.name}</Text>
              </View>
            ))}
        </View>
      </View>

      <View>
        <Text style={[styles.text, styles.subheading]}>Categories</Text>
        <View style={styles.categoryContainer}>
          {categoryData &&
            categoryData.categories.slice(0, 6).map((category) => (
              <View key={category.id} style={styles.categoryCard}>
                <Text style={styles.text}>{category.name}</Text>
              </View>
            ))}
          <Text style={[styles.text, styles.more]}>More...</Text>
        </View>
      </View>

      <View>
        <Text style={[styles.text, styles.subheading]}>Recently Added</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 15,
  },
  subheading: {
    color: "#666666",
  },
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 23,
  },
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
    // backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
