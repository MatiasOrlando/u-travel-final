import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { colorsDefault } from "@/constants/Colors";
import { setMaxAge, setMinAge } from "@/features/AgeRange/AgeRangeSlice";
import { useDispatch, useSelector } from "react-redux";

const AgeTravelers = ({ errorMaxAge }) => {
  const minAge = useSelector((state) => state.ageRangeFilter.ageValues.minAge);
  const maxAge = useSelector((state) => state.ageRangeFilter.ageValues.maxAge);
  const dispatch = useDispatch();

  const isValidAge = (value) => {
    // Verificar si el valor es un número válido o está vacío
    return /^\d*$/.test(value);
  };

  const handleMinAgeChange = (value) => {
    if (isValidAge(value)) {
      dispatch(setMinAge(value));
    }
  };

  const handleMaxAgeChange = (value) => {
    if (isValidAge(value)) {
      dispatch(setMaxAge(value));
    }
  };

  const decreaseMinAge = () => {
    const newValue = parseInt(minAge) > 6 ? parseInt(minAge) - 1 : 6;
    dispatch(setMinAge(newValue.toString()));
  };

  const increaseMinAge = () => {
    const newValue = parseInt(minAge) + 1;
    dispatch(setMinAge(newValue.toString()));
  };

  const decreaseMaxAge = () => {
    const newValue = parseInt(maxAge) > 6 ? parseInt(maxAge) - 1 : 6;
    dispatch(setMaxAge(newValue.toString()));
  };

  const increaseMaxAge = () => {
    const newValue = parseInt(maxAge) + 1;
    dispatch(setMaxAge(newValue.toString()));
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
          value={minAge.toString()}
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
          value={maxAge.toString()}
          onChangeText={handleMaxAgeChange}
        />
        <Pressable onPress={increaseMaxAge}>
          <Text style={styles.ageController}>+</Text>
        </Pressable>
      </View>
      {minAge > maxAge && errorMaxAge && (
        <Text style={styles.errorText}>{errorMaxAge}</Text>
      )}
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 10,
  },
});
