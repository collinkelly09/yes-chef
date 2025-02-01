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
import { RootStackParamList } from "../utils/types";
import { useFonts } from "expo-font";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

type Props = { navigation: SignUpScreenNavigationProp };

const SignUpScreen = ({ navigation }: Props) => {
  const [signin, signinStatus] = useSigninMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    "InriaSerif-BoldItalic": require("../assets/fonts/InriaSerif-BoldItalic.ttf"),
    "Italianno-Regular": require("../assets/fonts/Italianno-Regular.ttf"),
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
      <View>
        <Text style={[styles.heading, styles.text]}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.text]}>First Name</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.text]}>Username</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.text]}>Password</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.text]}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleSignIn}
          disabled={signinStatus.isLoading}
          style={styles.signIn}
          activeOpacity={0.6}
        >
          {signinStatus.isLoading ? (
            <Text style={[styles.buttonText, styles.text]}>Signing Up...</Text>
          ) : (
            <Text style={[styles.buttonText, styles.text]}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            {"  "}yesChef{"  "}
          </Text>
        </View>

        {/* <TouchableOpacity
          // onPress={handleSignIn}
          disabled={signinStatus.isLoading}
          style={styles.signUp}
          activeOpacity={0.6}
        >
          <Text style={[styles.buttonText, styles.text]}>Sign Up</Text>
        </TouchableOpacity> */}
      </View>
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
  // signUp: {
  //   flex: 1,
  //   alignSelf: "center",
  //   justifyContent: "flex-end",
  //   paddingBottom: 16,
  // },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingLeft: 18,
  },
  logo: {
    fontFamily: "Italianno-Regular",
    fontSize: 75,
  },
});

export default SignUpScreen;
