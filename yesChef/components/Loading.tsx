import { Text, View, StyleSheet, Image } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/yesChef.png")} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
