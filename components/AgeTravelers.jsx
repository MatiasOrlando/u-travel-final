import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { colorsDefault } from "@/constants/Colors";

const AgeTravelers = () => {
  const [minAge, setMinAge] = useState("6");
  const [maxAge, setMaxAge] = useState("6");

  const isValidAge = (value) => {
    // Verificar si el valor es un número válido o está vacío
    return /^\d*$/.test(value);
  };

  const handleMinAgeChange = (value) => {
    if (isValidAge(value)) {
      setMinAge(value);
    }
  };

  const handleMaxAgeChange = (value) => {
    if (isValidAge(value)) {
      setMaxAge(value);
    }
  };

  const decreaseMinAge = () => {
    const newValue = parseInt(minAge) > 12 ? parseInt(minAge) - 1 : 12;
    setMinAge(newValue.toString());
  };

  const increaseMinAge = () => {
    const newValue = parseInt(minAge) + 1;
    setMinAge(newValue.toString());
  };

  const decreaseMaxAge = () => {
    const newValue = parseInt(maxAge) > 12 ? parseInt(maxAge) - 1 : 12;
    setMaxAge(newValue.toString());
  };

  const increaseMaxAge = () => {
    const newValue = parseInt(maxAge) + 1;
    setMaxAge(newValue.toString());
  };

  return (
    <View>
      <Text style={styles.mainText}>Age range</Text>
      <View style={styles.ageRangeContainer}>
        <Text style={{ fontSize: 16 }}>From</Text>
        <Pressable onPress={decreaseMinAge}>
          <Text style={styles.ageController}>-</Text>
        </Pressable>
        <TextInput
          style={styles.inputAgeRange}
          keyboardType="numeric"
          value={minAge}
          onChangeText={handleMinAgeChange}
        />
        <Pressable onPress={increaseMinAge}>
          <Text style={styles.ageController}>+</Text>
        </Pressable>
      </View>
      <View style={styles.ageRangeContainer}>
        <Text style={{ fontSize: 16, paddingRight: 20 }}>To</Text>
        <Pressable onPress={decreaseMaxAge}>
          <Text style={styles.ageController}>-</Text>
        </Pressable>
        <TextInput
          style={styles.inputAgeRange}
          keyboardType="numeric"
          value={maxAge}
          onChangeText={handleMaxAgeChange}
        />
        <Pressable onPress={increaseMaxAge}>
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
