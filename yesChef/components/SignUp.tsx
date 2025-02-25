import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignupMutation } from "../redux/apiSlice";
import { theme } from "../theme";
import { ErrorResponse, RootStackParamList } from "../utils/types";
import { useFonts } from "expo-font";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "../utils/validationSchema";
import BottomLogo from "./BottomLogo";
import * as SplashScreen from "expo-splash-screen";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

type Props = { navigation: SignUpScreenNavigationProp };
type SignUpFormData = z.infer<typeof SignUpSchema>;

// SplashScreen.preventAutoHideAsync();

const SignUpScreen = ({ navigation }: Props) => {
  const [signup, signinStatus] = useSignupMutation();

  // const [fontsLoaded] = useFonts({
  //   "InriaSerif-BoldItalic": require("../assets/fonts/InriaSerif-BoldItalic.ttf"),
  //   "Italianno-Regular": require("../assets/fonts/Italianno-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return undefined;
  // }
  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     setAppIsReady(true);
  //   }
  // }, [fontsLoaded]);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     // Hide the splash screen once the app is ready
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null; // Return null or a loading indicator while the app is not ready
  // }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const credentials = {
        name: data.firstName,
        username: data.username,
        password: data.password,
      };
      await signup(credentials).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", (error as ErrorResponse).data.detail);
      }
    }
  };

  errors.password && Alert.alert("Error", errors.password.message);

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.heading, styles.text]}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.text]}>First Name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.firstName && <Text>{errors.firstName?.message}</Text>}
        </View>

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
        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.text]}>Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
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
          {errors.confirmPassword && (
            <Text>{errors.confirmPassword?.message}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={signinStatus.isLoading}
          style={styles.signUp}
          activeOpacity={0.6}
        >
          {signinStatus.isLoading ? (
            <Text style={[styles.buttonText, styles.text]}>Signing Up...</Text>
          ) : (
            <Text style={[styles.buttonText, styles.text]}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <BottomLogo />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Signin")}
        style={styles.signIn}
        activeOpacity={0.6}
      >
        <Text style={[styles.buttonText, styles.text]}>Sign In</Text>
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
    alignSelf: "flex-end",
  },
});

export default SignUpScreen;
