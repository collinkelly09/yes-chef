import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSigninMutation } from "../../redux/apiSlice";
import { theme } from "../../theme";
import { ErrorResponse, RootStackParamList } from "../../utils/types";
// import { useFonts } from "expo-font";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BottomLogo from "../../components/BottomLogo";
import { SignInSchema } from "../../utils/validationSchema";
import SignInInputField from "./SignInInputField";
import AuthNav from "./AuthNav";
import { ScrollView } from "react-native-gesture-handler";

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signin"
>;

type Props = { navigation: SigninScreenNavigationProp };
type SignInFormData = z.infer<typeof SignInSchema>;

const SignInScreen = ({ navigation }: Props) => {
  const [signin, signinStatus] = useSigninMutation();

  // const [fontsLoaded] = useFonts({
  //   "JacquesFrancois-Regular": require("../../assets/fonts/JacquesFrancois-Regular.ttf"),
  //   "Italianno-Regular": require("../../assets/fonts/Italianno-Regular.ttf"),
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.heading, styles.text]}>Sign In</Text>

          <SignInInputField
            errors={errors}
            control={control}
            text="Username"
            name="username"
          />

          <SignInInputField
            errors={errors}
            control={control}
            text="Password"
            name="password"
            secure={true}
          />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={signinStatus.isLoading}
            style={styles.submit}
            activeOpacity={0.6}
          >
            {signinStatus.isLoading ? (
              <Text style={[styles.buttonText, styles.text]}>
                Signing In...
              </Text>
            ) : (
              <Text style={[styles.buttonText, styles.text]}>Sign In</Text>
            )}
          </TouchableOpacity>

          <BottomLogo />
        </View>

        <AuthNav navigation={navigation} screen="signin" location="Sign Up" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colorWhite,
    paddingTop: 150,
    paddingBottom: 30,
    height: "auto",
  },
  text: {
    color: theme.colorBlack,
    fontFamily: theme.mainFont,
  },
  heading: {
    fontSize: 38,
    textAlign: "center",
    marginBottom: 35,
  },
  buttonText: {
    fontSize: 19,
  },
  submit: {
    alignSelf: "flex-end",
  },
  signUp: {
    alignSelf: "flex-end",
  },
});

export default SignInScreen;
