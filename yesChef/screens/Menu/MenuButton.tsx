import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "../../theme";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../utils/types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  props: DrawerContentComponentProps;
  pageName: keyof RootDrawerParamList;
}

export default function MenuButton({ props, pageName }: Props) {
  // Todo REFACTOR ONCE MORE STACKS ARE ADDED
  const handleNavigation = (page: string) => {
    if (page === "Main") {
      props.navigation.navigate(page);

      // Todo Type 'string' is not assignable to type 'never'
      // Todo FIX TYPING ISSUE
      // ! Name has a type of "RouteName extends string" but reads as never
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } else {
      props.navigation.navigate(page);
    }
  };

  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => handleNavigation(pageName)}
        activeOpacity={0.6}
      >
        <Text style={[styles.text]}>
          {pageName === "Main" ? "Home" : pageName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colorBlack,
    fontFamily: theme.mainFont,
    fontSize: 21,
  },
});
