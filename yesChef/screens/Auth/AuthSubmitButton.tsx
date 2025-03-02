import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { z } from "zod";
import { SignInSchema, SignUpSchema } from "../../utils/validationSchema";
import { UseFormHandleSubmit } from "react-hook-form";

type SignUpFormData = z.infer<typeof SignUpSchema>;
type SignInFormData = z.infer<typeof SignInSchema>;

interface Props {
  onSubmit: (data: SignUpFormData | SignInFormData) => Promise<void>;
  handleSubmit:
    | UseFormHandleSubmit<
        {
          firstName: string;
          username: string;
          password: string;
          confirmPassword: string;
        },
        undefined
      >
    | UseFormHandleSubmit<
        {
          username: string;
          password: string;
        },
        undefined
      >;
  isLoading: boolean;
  action: string;
}

export default function AuthSubmitButton({
  handleSubmit,
  onSubmit,
  isLoading,
  action,
}: Props) {
  return (
    <TouchableOpacity
      onPress={handleSubmit(onSubmit)}
      disabled={isLoading}
      style={styles.submit}
      activeOpacity={0.6}
    >
      {isLoading ? (
        <Text style={[styles.buttonText, styles.text]}>
          Signing {action}...
        </Text>
      ) : (
        <Text style={[styles.buttonText, styles.text]}>Sign {action}</Text>
      )}
    </TouchableOpacity>
  );
}

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
});
