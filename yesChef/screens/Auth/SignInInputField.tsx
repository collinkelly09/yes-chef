import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { theme } from "../../theme";

interface Props {
  errors: FieldErrors<{
    username?: string;
    password?: string;
  }>;
  control: Control<{
    username: string;
    password: string;
  }>;
  text: string;
  name: "username" | "password";
  secure?: boolean;
}

export default function SignInInputField({
  errors,
  control,
  text,
  name,
  secure,
}: Props) {
  const secureText = secure ?? false;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputText}>{text}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureText}
          />
        )}
      />
      {errors.username && <Text>{errors[name]?.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 19,
  },
});
