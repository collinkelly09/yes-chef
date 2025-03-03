import React from "react";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  useListCategoriesQuery,
  useListRecipesQuery,
} from "../../redux/apiSlice";
import RecentlyAddedList from "./RecentlyAddedList";
import RecipeCardList from "../../components/RecipeCardList";
import Loading from "../../components/Loading";
import { theme } from "../../theme";
import HomeCategoryList from "./HomeCategoryList";

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

  if (recipeLoading || categoryLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.subheading}>Recently Added</Text>
        {recipeData && (
          <RecentlyAddedList recipes={recipeData.recipes.slice(0, 10)} />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Categories</Text>
        {categoryData && (
          <HomeCategoryList categories={categoryData.categories} />
        )}
      </View>

      <View style={styles.favorites}>
        <Text style={styles.subheading}>Favorites</Text>
        {recipeData && <RecipeCardList recipes={recipeData.recipes} />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: theme.headerSpace,
    paddingLeft: 15,
  },
  section: {
    paddingBottom: 20,
  },
  subheading: {
    color: theme.colorGrey,
    fontFamily: theme.mainFont,
    fontSize: 23,
    paddingBottom: 15,
  },
  favorites: {
    height: Dimensions.get("window").height * 0.5,
  },
});

export default HomeScreen;
