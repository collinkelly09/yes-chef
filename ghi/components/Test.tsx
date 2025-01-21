import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useGetUserQuery, useListAllRecipesQuery } from "../redux/apiSlice";

// interface Recipe {
//   id: number;
//   name: string;
//   photo_url: string;
//   //   rating: number;
//   created_at: Date;
//   user_id: number;
// }

const Test = () => {
  // const [recipes, setData] = useState<Recipe[]>([]);
  // const apiUrl: string = process.env.EXPO_PUBLIC_API_URL;

  const { data: recipeData, isLoading: recipeLoading } =
    useListAllRecipesQuery();
  // const { data, isLoading } = useGetUserQuery();

  const getData = async () => {
    if (!recipeLoading && recipeData) {
      console.log(recipeData.recipes);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={getData} style={styles.button}>
        <Text style={{ color: "white" }}>Get</Text>
      </TouchableOpacity>
      {/* {recipes?.map((recipe) => (
        <Text>{recipe.name}</Text>
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 8,
  },
});

export default Test;
