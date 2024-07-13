import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { colorsDefault } from "@/constants/Colors";

const AgeTravelers = () => {
  const [minAge, setMinAge] = useState(1);
  const [maxAge, setMaxAge] = useState(1);

  return (
    <View>
      <Text style={styles.mainText}>Age range</Text>
      <View style={styles.ageRangeContainer}>
        <Text style={{ fontSize: 16 }}>From</Text>
        <Pressable
          onPress={() => {
            setMinAge(minAge > 1 ? minAge - 1 : 1);
          }}
        >
          <Text style={styles.ageController}>-</Text>
        </Pressable>
        <TextInput
          style={styles.inputAgeRange}
          keyboardType="numeric"
          value={minAge.toString()}
        />
        <Pressable onPress={() => setMinAge(minAge + 1)}>
          <Text style={styles.ageController}>+</Text>
        </Pressable>
      </View>
      <View style={styles.ageRangeContainer}>
        <Text style={{ fontSize: 16, paddingRight: 20 }}>To</Text>
        <Pressable
          onPress={() => setMaxAge(maxAge && maxAge > 1 ? maxAge - 1 : 1)}
        >
          <Text style={styles.ageController}>-</Text>
        </Pressable>
        <TextInput
          style={styles.inputAgeRange}
          keyboardType="numeric"
          value={maxAge.toString() ?? 1}
        />
        <Pressable onPress={() => setMaxAge(maxAge ? maxAge + 1 : 1)}>
          <Text style={styles.ageController}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AgeTravelers;

const styles = StyleSheet.create({
  mainText: {
    fontSize: 18,
  },
  ageRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    gap: 10,
  },
  inputAgeRange: {
    height: 30,
    backgroundColor: colorsDefault.secondary,
    width: 50,
    borderRadius: 10,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  ageController: {
    fontSize: 20,
  },
});
