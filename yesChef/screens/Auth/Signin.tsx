import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSigninMutation } from "../../redux/apiSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../../theme";
import { ErrorResponse, RootStackParamList } from "../../utils/types";
import { useFonts } from "expo-font";
import BottomLogo from "../../components/BottomLogo";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SignInSchema } from "../../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./AuthInputField";
import AuthSubmitButton from "./AuthSubmitButton";

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signin"
>;

type Props = { navigation: SigninScreenNavigationProp };
type SignInFormData = z.infer<typeof SignInSchema>;

const SignInScreen = ({ navigation }: Props) => {
  const [signin, signinStatus] = useSigninMutation();

  // const [fontsLoaded] = useFonts({
  //   "InriaSerif-BoldItalic": require("../assets/fonts/InriaSerif-BoldItalic.ttf"),
  //   "Italianno-Regular": require("../assets/fonts/Italianno-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return undefined;
  // }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const credentials = {
        username: data.username,
        password: data.password,
      };

      await signin(credentials).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", (error as ErrorResponse).data.detail);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.heading, styles.text]}>Sign In</Text>

        <InputField
          errors={errors}
          control={control}
          text="Username"
          name="username"
        />

        <InputField
          errors={errors}
          control={control}
          text="Password"
          name="password"
          secure={true}
        />

        <AuthSubmitButton
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={signinStatus.isLoading}
          action="In"
        />

        <BottomLogo />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={styles.signIn}
        activeOpacity={0.6}
      >
        <Text style={[styles.buttonText, styles.text]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colorWhite,
    paddingTop: 150,
    paddingBottom: 30,
  },
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
  },
  heading: {
    fontSize: 38,
    textAlign: "center",
    marginBottom: 35,
  },
  buttonText: {
    fontSize: 19,
  },
  signIn: {
    alignSelf: "flex-end",
  },
  signUp: {
    justifyContent: "flex-end",
  },
});

export default SignInScreen;
