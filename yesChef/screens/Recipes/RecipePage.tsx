import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/types";

type RecipePageRouteProp = RouteProp<RootStackParamList, "Recipe">;

type RecipePageProps = {
  route: RecipePageRouteProp;
};

export default function RecipePage({ route }: RecipePageProps) {
  const { recipeId } = route.params;
  return (
    <View>
      <Text>RecipePage {recipeId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
