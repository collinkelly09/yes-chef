import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./components/Test";
import { useGetUserQuery } from "./redux/apiSlice";

export default function App() {
  const { isLoading: userLoading } = useGetUserQuery();

  if (userLoading) return <Text>Loading user...</Text>;

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      <Test />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
