import { View, Image, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { starConversion } from "../../utils/conversion";

RecipeCard;

interface RecipeItem {
  id: number;
  name: string;
  photo_url: string | undefined;
  rating: number;
}

export default function RecipeCard({ name, photo_url, rating }: RecipeItem) {
  return (
    <View style={styles.recipeCard}>
      <Image source={{ uri: photo_url }} style={styles.image} />
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.stars}>{starConversion(rating)}</Text>
      </View>
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
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 20,
  },
  stars: {
    color: theme.colorOrange,
    fontSize: 17,
  },
});
