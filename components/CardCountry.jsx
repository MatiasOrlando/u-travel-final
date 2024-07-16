import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { colorsDefault } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const CardCountry = ({ country, countryImage }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{country}</Text>
      <Image
        style={styles.cardImage}
        source={{ uri: countryImage }}
        resizeMode="cover"
      />
    </View>
  );
};

export default CardCountry;

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    width: width * 0.43,
    height: height * 0.2,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardText: {
    position: "absolute",
    bottom: 15,
    backgroundColor: "#C2AC93C9",
    fontSize: 20,
    width: "100%",
    zIndex: 50,
    paddingLeft: 10,
    color: colorsDefault.secondary,
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },
});
