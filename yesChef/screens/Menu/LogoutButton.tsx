import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSignoutMutation } from "../../redux/apiSlice";
import { theme } from "../../theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../utils/types";

export default function LogoutButton(props: any) {
  const [signout, { isLoading }] = useSignoutMutation();

  const handleSignout = () => {
    signout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSignout}
        style={styles.signOut}
        activeOpacity={0.6}
        disabled={isLoading}
      >
        <Text style={[styles.text]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingRight: 15,
    paddingBottom: 12,
  },
  signOut: {
    alignSelf: "flex-end",
  },
  text: {
    color: theme.colorBlack,
    fontFamily: "InriaSerif-BoldItalic",
    fontSize: 15,
  },
});
