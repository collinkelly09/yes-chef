import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSigninMutation } from "../redux/apiSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme";
import { ErrorResponse, RootStackParamList } from "../utils/types";
import { useFonts } from "expo-font";
import BottomLogo from "./BottomLogo";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SignInSchema } from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
    // if (!username || !password) {
    //   Alert.alert("Error", "Please enter both username and password");
    //   return;
    // }

    try {
      const credentials = {
        username: data.username,
        password: data.password,
      };

      await signin(credentials).unwrap();

      // Alert.alert("Success", "You are logged in!");
      navigation.navigate("Home");
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

        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.text]}>Username</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.username && <Text>{errors.username?.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.text]}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={signinStatus.isLoading}
          style={styles.signIn}
          activeOpacity={0.6}
        >
          {signinStatus.isLoading ? (
            <Text style={[styles.buttonText, styles.text]}>Signing In...</Text>
          ) : (
            <Text style={[styles.buttonText, styles.text]}>Sign In</Text>
          )}
        </TouchableOpacity>

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
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: theme.colorWhite,
    height: 50,
    width: 250,
    borderColor: theme.colorBlack,
    borderWidth: 2,
    borderRadius: 25,
    paddingLeft: 8,
  },
  inputText: {
    fontSize: 19,
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
