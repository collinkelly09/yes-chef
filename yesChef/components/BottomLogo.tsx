import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BottomLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logo}>
        {"  "}yesChef{"  "}
      </Text>
    </View>
  );
};

export default BottomLogo;

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 18,
  },
  logo: {
    fontFamily: "Italianno-Regular",
    fontSize: 75,
  },
});
