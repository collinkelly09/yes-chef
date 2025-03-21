import React from "react";

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

import { HomeScreenNavigationProp } from "../../utils/types";
// import { useFonts } from "expo-font";

type Props = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: Props) => {
  // const [fontsLoaded] = useFonts({
  //   "JacquesFrancois-Regular": require("../../assets/fonts/JacquesFrancois-Regular.ttf"),
  //   "Italianno-Regular": require("../../assets/fonts/Italianno-Regular.ttf"),
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
          <RecentlyAddedList
            recipes={recipeData.recipes.slice(0, 10)}
            navigation={navigation}
          />
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
        {recipeData && (
          <RecipeCardList
            recipes={recipeData.recipes}
            navigation={navigation}
          />
        )}
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
