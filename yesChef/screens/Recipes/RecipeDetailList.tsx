import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../../theme";
import { IngredientResponse, StepResponse } from "../../utils/types";

interface Props {
  type: "Ingredients" | "Steps";
  dataList: IngredientResponse[] | StepResponse[];
}

export default function RecipeDetailList({ dataList, type }: Props) {
  const isIngredient = (
    data: IngredientResponse | StepResponse
  ): data is IngredientResponse => {
    return (data as IngredientResponse).quantity !== undefined;
  };

  return (
    <View>
      {dataList.length > 0 && (
        <View>
          <Text style={[styles.text, styles.listHeader]}>{type}</Text>
          {dataList.map((data, index) => (
            <View style={styles.list} key={index}>
              <Text style={[styles.itemMarker, styles.listText, styles.text]}>
                {type === "Ingredients" ? "\u2022" : `${index + 1}.`}
              </Text>

              <Text style={[styles.text, styles.listText]}>
                {isIngredient(data)
                  ? `${data.quantity} ${data.name}`
                  : data.name}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.mainFont,
  },
  listHeader: {
    color: theme.colorGrey,
    fontSize: 25,
  },
  list: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.8,
    paddingBottom: 10,
  },
  listText: {
    color: theme.colorBlack,
    fontSize: 20,
  },
  itemMarker: {
    paddingRight: 8,
    paddingLeft: 15,
  },
});
