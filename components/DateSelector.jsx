import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateOfArrival,
  setDateOfDeparture,
} from "@/features/DatesTravel/DatesTravelSlice";

const DateSelector = () => {
  const dateOfArrival = useSelector(
    (state) => state.datesPicker.value.dateOfArrival
  );
  const dateOfDeparture = useSelector(
    (state) => state.datesPicker.value.dateOfDeparture
  );

  const [error, setError] = useState({ arrival: "", departure: "" });
  const dispatch = useDispatch();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleArrivalDateChange = (date) => {
    if (date < today) {
      setError({
        ...error,
        arrival: "Invalid Arrival date",
      });
    } else {
      setError({ ...error, arrival: "" });
      dispatch(setDateOfArrival(date));
    }
  };

  const handleDepartureDateChange = (date) => {
    if (date <= today || (dateOfArrival && date <= new Date(dateOfArrival))) {
      setError({
        ...error,
        departure: "Invalid Departure date",
      });
    } else {
      setError({ ...error, departure: "" });
      dispatch(setDateOfDeparture(date));
    }
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={styles.mainText}>Dates</Text>
      <View style={{ justifyContent: "center", flexDirection: "row", gap: 10 }}>
        <View style={{ width: "50%", minHeight: 65 }}>
          <DatePickerInput
            label="Arrival"
            value={dateOfArrival}
            onChange={handleArrivalDateChange}
            inputMode="start"
            style={{ backgroundColor: "white", height: 50 }}
            locale="en"
          />
          <Text style={styles.errorText}>{error.arrival || " "}</Text>
        </View>
        <View
          style={{
            width: "50%",
            alignItems: "flex-start",
            minHeight: 65,
            justifyContent: "flex-start",
          }}
        >
          <DatePickerInput
            label="Departure"
            value={dateOfDeparture}
            onChange={handleDepartureDateChange}
            inputMode="start"
            style={{
              backgroundColor: "white",
              height: 50,
            }}
            locale="en"
          />
          <Text style={styles.errorText}>{error.departure || " "}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 18,
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default DateSelector;
