import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import {
  useGetUserQuery,
  useListRecipesQuery,
  useSignoutMutation,
} from "../redux/apiSlice";
import { RootDrawerParamList, RootStackParamList } from "../utils/types";
import { theme } from "../theme";
import Menu from "./menu/Menu";

// type HomeScreenNavigationProp = DrawerNavigationProp<
//   RootDrawerParamList,
//   "Home"
// >;
// type Props = { navigation: HomeScreenNavigationProp };

const HomeScreen = () => {
  const [signout, { isLoading }] = useSignoutMutation();

  const handleSignout = () => {
    signout();
  };

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
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
