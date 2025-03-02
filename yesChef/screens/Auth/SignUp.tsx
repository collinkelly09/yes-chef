import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import BottomLogo from "../../components/BottomLogo";
import { useSignupMutation } from "../../redux/apiSlice";
import { theme } from "../../theme";
import { ErrorResponse, RootStackParamList } from "../../utils/types";
import { SignUpSchema } from "../../utils/validationSchema";
import SignUpInputField from "./SignUpInputField";
// import AuthSubmitButton from "./AuthSubmitButton";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

type Props = { navigation: SignUpScreenNavigationProp };
type SignUpFormData = z.infer<typeof SignUpSchema>;

const SignUpScreen = ({ navigation }: Props) => {
  const [signup, signinStatus] = useSignupMutation();

  //   const [fontsLoaded] = useFonts({
  //     "InriaSerif-BoldItalic": require("../../assets/fonts/InriaSerif-BoldItalic.ttf"),
  //     "Italianno-Regular": require("../../assets/fonts/Italianno-Regular.ttf"),
  //   });

  //   if (!fontsLoaded) {
  //     return undefined;
  //   }

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

        <SignUpInputField
          errors={errors}
          control={control}
          text="First Name"
          name="firstName"
        />

        <SignUpInputField
          errors={errors}
          control={control}
          text="Username"
          name="username"
        />

        <SignUpInputField
          errors={errors}
          control={control}
          text="Password"
          name="password"
          secure={true}
        />

        <SignUpInputField
          errors={errors}
          control={control}
          text="Confirm Password"
          name="confirmPassword"
          secure={true}
        />

        {/* <AuthSubmitButton
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={signinStatus.isLoading}
          action="Up"
        /> */}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={signinStatus.isLoading}
          style={styles.submit}
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
        onPress={() => navigation.goBack()}
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
  buttonText: {
    fontSize: 19,
  },
  submit: {
    alignSelf: "flex-end",
  },
  signIn: {
    alignSelf: "flex-end",
  },
});

export default SignUpScreen;
