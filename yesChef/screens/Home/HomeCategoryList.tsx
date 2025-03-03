import { FlatList, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { CategoryResponseList } from "../../utils/types";
import HomeCategoryCard from "./HomeCategoryCard";

export default function HomeCategoryList({ categories }: CategoryResponseList) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      directionalLockEnabled={true}
      alwaysBounceVertical={false}
    >
      <FlatList
        contentContainerStyle={styles.list}
        data={categories}
        numColumns={Math.ceil(categories.length / 2)}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <HomeCategoryCard name={item.name} id={item.id} />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { alignSelf: "flex-start", gap: 10 },
});
