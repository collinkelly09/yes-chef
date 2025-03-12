import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { starConversion } from "../../utils/conversion";
import {
  HomeScreenNavigationProp,
  RecipesScreenNavigationProp,
} from "../../utils/types";

interface RecipeItem {
  id: number;
  name: string;
  photo_url: string | undefined;
  rating: number;
  time: string;
  navigation: HomeScreenNavigationProp | RecipesScreenNavigationProp;
}

export default function RecipeCard({
  name,
  photo_url,
  rating,
  time,
  id,
  navigation,
}: RecipeItem) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Recipe", { recipeId: id })}
    >
      <View style={styles.recipeCard}>
        <Image source={{ uri: photo_url }} style={styles.image} />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.stars}>{starConversion(rating)}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 15,
  },
  recipeCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    padding: 10,
    width: "auto",
    height: "auto",
    marginRight: 15,
    gap: 15,
    marginBottom: 10,
  },
  title: {
    color: theme.colorBlack,
    fontFamily: theme.mainFont,
    fontSize: 20,
  },
  stars: {
    color: theme.colorOrange,
    fontSize: 17,
    paddingBottom: 3,
  },
  time: {
    color: theme.colorGrey,
    fontFamily: theme.mainFont,
    fontSize: 16,
  },
});
