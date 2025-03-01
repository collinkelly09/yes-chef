import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { RecipeResponseList } from "../../utils/types";
import { theme } from "../../theme";
import { starConversion } from "../../utils/conversion";

interface RecipeItem {
  id: number;
  name: string;
  photo_url: string | undefined;
  rating: number;
}

const RecipeItem = ({ name, photo_url, id, rating }: RecipeItem) => {
  return (
    <View>
      <View key={id} style={styles.recipeCard}>
        <Image source={{ uri: photo_url }} style={styles.image} />
        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.stars}>{starConversion(rating)}</Text>
      </View>
    </View>
  );
};

export default function HomeRecipeCard({ recipes }: RecipeResponseList) {
  return (
    <View style={styles.recipeContainer}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <RecipeItem
            name={item.name}
            id={item.id}
            photo_url={item.photo_url}
            rating={item.rating}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 15,
  },
  recipeContainer: {
    flexDirection: "row",
  },
  recipeCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    width: 100,
    height: 140,
    marginRight: 10,
  },
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 15,
  },
  stars: {
    color: theme.colorOrange,
    fontSize: 17,
  },
});
