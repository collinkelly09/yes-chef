import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useSigninMutation } from "../redux/apiSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import globalStyles from "../styles";
import { RootStackParamList } from "../utils/types";

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signin"
>;

type Props = { navigation: SigninScreenNavigationProp };

const SignInScreen = ({ navigation }: Props) => {
  const [signin, signinStatus] = useSigninMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    <View style={[styles.container, globalStyles.container]}>
      <Text style={styles.heading}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
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
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    width: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
  },
});

export default SignInScreen;
