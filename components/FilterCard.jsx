import { StyleSheet, View } from "react-native";
import React from "react";
import { colorsDefault } from "@/constants/Colors";

const FilterCard = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default FilterCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: colorsDefault.gray.default,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});
