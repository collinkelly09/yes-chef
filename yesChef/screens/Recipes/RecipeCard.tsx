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
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.stars}>{starConversion(rating)}</Text>
        <Text style={styles.time}>10 - 20 Minutes</Text>
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
