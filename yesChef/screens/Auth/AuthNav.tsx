import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NativeNavigationProp } from "@react-navigation/native-stack";
import { z } from "zod";
import { RootParamList } from "../../utils/types";
import { SignUpSchema } from "../../utils/validationSchema";
import { theme } from "../../theme";

type SignUpScreenNavigationProp = NativeNavigationProp<RootParamList, "Signup">;

type SignInScreenNavigationProp = NativeNavigationProp<RootParamList, "Signin">;

type Props = {
  screen: "signup" | "signin";
  navigation: SignUpScreenNavigationProp | SignInScreenNavigationProp;
};

export default function AuthNav({ screen, navigation }: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        screen === "signup"
          ? navigation.goBack()
          : navigation.navigate("Signup")
      }
      style={styles.signIn}
      activeOpacity={0.6}
    >
      <Text style={[styles.buttonText, styles.text]}>Sign In</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colorBlack,
    fontFamily: theme.mainFont,
  },
  buttonText: {
    fontSize: 19,
  },
  signIn: {
    alignSelf: "flex-end",
  },
});
