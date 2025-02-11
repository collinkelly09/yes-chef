import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import {
  useGetUserQuery,
  useListRecipesQuery,
  useSignoutMutation,
} from "../redux/apiSlice";
import { RootStackParamList } from "../utils/types";
import { theme } from "../theme";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const [signout, { isLoading }] = useSignoutMutation();

  const handleSignout = () => {
    signout();
    // if (isSuccess) {
    navigation.navigate("Signin");
    // }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSignout}
        style={styles.signOut}
        activeOpacity={0.6}
        disabled={isLoading}
      >
        <Text style={[styles.buttonText, styles.text]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingRight: 15,
  },
  button: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 19,
  },

  signOut: {
    alignSelf: "flex-end",
  },
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
  },
});

export default HomeScreen;
