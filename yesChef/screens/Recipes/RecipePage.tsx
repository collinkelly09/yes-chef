import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/types";
import { theme } from "../../theme";
import { useGetRecipeDetailsQuery } from "../../redux/apiSlice";
import Loading from "../../components/Loading";

type RecipePageRouteProp = RouteProp<RootStackParamList, "Recipe">;

type RecipePageProps = {
  route: RecipePageRouteProp;
};

export default function RecipePage({ route }: RecipePageProps) {
  const { recipeId } = route.params;

  const { data: recipeData, isLoading: recipeLoading } =
    useGetRecipeDetailsQuery({ recipeId });

  if (recipeLoading) return <Loading />;

  return (
    <View style={styles.container}>
      {recipeData && <Text>{recipeData.name}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.headerSpace,
  },
});
