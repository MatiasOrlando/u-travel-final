import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateOfArrival,
  setDateOfDeparture,
} from "@/features/DatesTravel/DatesTravelSlice";

const DateSelector = ({ errorDateOfArrival, errorDateOfDeparture }) => {
  const dateOfArrival = useSelector(
    (state) => state.datesPicker.value.dateOfArrival
  );
  const dateOfDeparture = useSelector(
    (state) => state.datesPicker.value.dateOfDeparture
  );

  const [error, setError] = useState({ arrival: "", departure: "" });
  const dispatch = useDispatch();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const adjustDateForLocal = (date) => {
    const localDate = new Date(date);
    const timezoneOffsetMinutes = localDate.getTimezoneOffset();
    localDate.setMinutes(localDate.getMinutes() - timezoneOffsetMinutes);
    localDate.setUTCHours(0, 0, 0, 0);
    return localDate;
  };

  const handleArrivalDateChange = (date) => {
    const adjustedDate = adjustDateForLocal(date);
    if (
      adjustedDate < today ||
      (dateOfDeparture && adjustedDate >= new Date(dateOfDeparture))
    ) {
      setError({
        ...error,
        arrival: "Invalid Arrival date",
      });
    } else {
      setError({ ...error, arrival: "" });
      dispatch(setDateOfArrival(adjustedDate));
    }
  };

  const handleDepartureDateChange = (date) => {
    const adjustedDate = adjustDateForLocal(date);
    if (
      adjustedDate <= today ||
      (dateOfArrival && adjustedDate <= new Date(dateOfArrival))
    ) {
      setError({
        ...error,
        departure: "Invalid Departure date",
      });
    } else {
      setError({ ...error, departure: "" });
      dispatch(setDateOfDeparture(adjustedDate));
    }
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={styles.mainText}>Dates</Text>
      <View>
        <View
          style={{ justifyContent: "center", flexDirection: "row", gap: 10 }}
        >
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
            <Text style={styles.errorText}>{error.departure || ""}</Text>
          </View>
        </View>
        <View>
          {!dateOfArrival && errorDateOfArrival && (
            <View>
              <Text style={styles.errorText}>{errorDateOfArrival}</Text>
            </View>
          )}
          {!dateOfDeparture && errorDateOfDeparture && (
            <View>
              <Text style={styles.errorText}>{errorDateOfDeparture}</Text>
            </View>
          )}
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
