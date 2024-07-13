import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";
import { colorsDefault } from "@/constants/Colors";
import FilterCard from "./FilterCard";

const AddressItem = ({ location }) => {
  const onChangeLocation = () => {
    router.push("/profile");
  };

  return (
    <FilterCard>
      <View style={styles.card} onPress={() => {}}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{location.address}</Text>
        </View>
        <Pressable onPress={onChangeLocation}>
          <Entypo name="location" size={20} color={colorsDefault.brown.default}>
            <Text style={styles.textChange}>Change</Text>
          </Entypo>
        </Pressable>
      </View>
    </FilterCard>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 17,
  },
  textChange: {
    fontFamily: "Josefin",
    fontSize: 19,
    padding: 8,
  },
});
