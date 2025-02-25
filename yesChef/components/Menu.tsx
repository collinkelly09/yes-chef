import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const Menu = () => {
  return (
    <View>
      <TouchableOpacity style={styles.menuButton}>
        <View style={styles.barType1}></View>
        <View style={styles.barType2}></View>
        <View style={styles.barType1}></View>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuButton: {
    paddingTop: 15,
    paddingLeft: 20,
  },
  barType1: {
    width: 30,
    height: 4,
    backgroundColor: "#FF9D00",
    borderRadius: 10,
    marginBottom: 5,
  },
  barType2: {
    width: 20,
    height: 4,
    backgroundColor: "#FF9D00",
    borderRadius: 10,
    marginBottom: 5,
  },
});
