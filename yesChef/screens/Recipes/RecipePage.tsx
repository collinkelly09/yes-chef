import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/types";
import { theme } from "../../theme";
import { useGetRecipeDetailsQuery } from "../../redux/apiSlice";
import Loading from "../../components/Loading";
import { starConversion } from "../../utils/conversion";
import RecipeDetailList from "./RecipeDetailList";

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
      {recipeData && (
        <View>
          <View style={styles.heading}>
            <Image
              source={{ uri: recipeData?.photo_url }}
              style={styles.image}
            />
            <View style={styles.headingText}>
              <Text style={[styles.title, styles.text]}>{recipeData.name}</Text>
              <Text style={[styles.time, styles.text]}>{recipeData.time}</Text>
              <Text style={styles.stars}>
                {starConversion(recipeData.rating)}
              </Text>
            </View>
          </View>
          <RecipeDetailList
            dataList={recipeData.ingredients}
            type="Ingredients"
          />
          <RecipeDetailList dataList={recipeData.steps} type="Steps" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.headerSpace,
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  heading: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  headingText: {
    gap: 5,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "cover",
    borderRadius: 15,
  },
  title: {
    color: theme.colorBlack,
    fontSize: 30,
  },
  time: {
    color: theme.colorGrey,
    fontSize: 25,
  },
  stars: {
    color: theme.colorOrange,
    fontSize: 25,
    paddingBottom: 3,
  },
  text: {
    fontFamily: theme.mainFont,
  },
  listHeader: {
    color: theme.colorGrey,
    fontSize: 25,
  },
  list: {
    flexDirection: "row",
  },
  listText: {
    color: theme.colorBlack,
    fontSize: 20,
  },
});
