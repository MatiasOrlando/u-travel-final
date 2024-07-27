import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { colorsDefault } from "@/constants/Colors";
import FilterCard from "./FilterCard";
import { useSelector, useDispatch } from "react-redux";
import { setBudgetValue } from "../features/BudgetFilter/BudgetFilterSlice";

const RangeSliderCustom = () => {
  const sliderBudgetValue = useSelector(
    (state) => state.budgetFilter.budgetValue
  );
  const dispatch = useDispatch();
  return (
    <>
      <Text style={styles.mainText}>My Budget</Text>
      <View style={styles.rangeContainer}>
        <Slider
          style={{
            width: 250,
            height: 40,
            marginTop: 10,
            marginHorizontal: "auto",
          }}
          minimumValue={500}
          maximumValue={3500}
          value={sliderBudgetValue}
          step={100}
          onValueChange={(value) => dispatch(setBudgetValue(value))}
          minimumTrackTintColor={colorsDefault.green.primary}
        />
        <Text style={styles.priceRange}>{`$500 - $${sliderBudgetValue}`}</Text>
      </View>
    </>
  );
};

export default RangeSliderCustom;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: colorsDefault.gray.default,
    borderRadius: 10,
  },
  rangeContainer: {},
  mainText: {
    fontSize: 18,
  },
  priceRange: {
    fontSize: 16,
  },
});
