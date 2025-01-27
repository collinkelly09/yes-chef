import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import {
  useGetUserQuery,
  useListAllRecipesQuery,
  useSignoutMutation,
} from "../redux/apiSlice";
import { RootStackParamList } from "../utils/types";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const [signout, { isSuccess }] = useSignoutMutation();

  const handleSignout = () => {
    signout();
    if (isSuccess) navigation.navigate("Signin");
  };

  return (
    <View>
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
      <Button title="Signin" onPress={() => navigation.navigate("Signin")} />
      <Button title="Sign Out" onPress={handleSignout} />
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

export default HomeScreen;
