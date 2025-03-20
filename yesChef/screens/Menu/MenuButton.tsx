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
  const buttons: Record<string, string> = {
    HomeStack: "Home",
    RecipeStack: "Recipes",
  };

  const handleNavigation = (page: string) => {
    props.navigation.navigate(page);

    // Todo Type 'string' is not assignable to type 'never'
    // ! Name has a type of "RouteName extends string" but reads as never
    navigation.reset({ index: 0, routes: [{ name: buttons[page] }] });
  };

  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => handleNavigation(pageName)}
        activeOpacity={0.6}
      >
        <Text style={[styles.text]}>{buttons[pageName]}</Text>
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
