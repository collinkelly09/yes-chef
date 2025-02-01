import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useSigninMutation } from "../redux/apiSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme";
import { RootStackParamList } from "../utils/types";
import { useFonts } from "expo-font";

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signin"
>;

type Props = { navigation: SigninScreenNavigationProp };

const SignInScreen = ({ navigation }: Props) => {
  const [signin, signinStatus] = useSigninMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    "InriaSerif-BoldItalic": require("../assets/fonts/InriaSerif-BoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      const credentials = { username, password };

      await signin(credentials).unwrap();

      // Alert.alert("Success", "You are logged in!");
      navigation.navigate("Home");
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert("Error", err.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Button
        title={signinStatus.isLoading ? "Signing In..." : "Sign In"}
        onPress={handleSignIn}
        disabled={signinStatus.isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colorWhite,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: theme.colorWhite,
    height: 40,
    width: 150,
    borderColor: theme.colorBlack,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
  },
  text: {
    color: theme.colorBlack,
    fontStyle: "italic",
    fontWeight: "bold",
    fontFamily: "InriaSerif-BoldItalic",
  },
});

export default SignInScreen;
