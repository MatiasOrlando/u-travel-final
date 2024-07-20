import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colorsDefault } from "@/constants/Colors";

const Counter = ({ dateOfArrival }) => {
  const [timeLeft, setTimeLeft] = useState({
    months: "00",
    days: "00",
    hours: "00",
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const arrivalDate = new Date(dateOfArrival);

    const totalMilliseconds = arrivalDate - now;

    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));

    const months = Math.floor(totalDays / 30);
    const formattedMonths = months < 10 ? `0${months}` : `${months}`;
    const days = totalDays % 30;
    const formattedDays = days < 10 ? `0${days}` : `${days}`;
    const hours = Math.floor(
      (totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

    setTimeLeft({
      months: formattedMonths,
      days: formattedDays,
      hours: formattedHours,
    });
  };

  useEffect(() => {
    calculateTimeLeft();

    const intervalId = setInterval(calculateTimeLeft, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(intervalId);
  }, [dateOfArrival]);

  return (
    <View style={styles.container}>
      <View style={styles.timeBlock}>
        <View style={styles.timeBlockNumbers}>
          <View style={styles.blockNumber}>
            <Text style={styles.text}>{timeLeft.months[0]}</Text>
          </View>
          <View style={styles.blockNumber}>
            <Text style={styles.text}>{timeLeft.months[1]}</Text>
          </View>
        </View>
        <Text style={styles.label}>Months</Text>
      </View>
      <View style={styles.timeBlock}>
        <View style={styles.timeBlockNumbers}>
          <View style={styles.blockNumber}>
            <Text style={styles.text}>{timeLeft.days[0]}</Text>
          </View>
          <View style={styles.blockNumber}>
            <Text style={styles.text}>{timeLeft.days[1]}</Text>
          </View>
        </View>
        <Text style={styles.label}>Days</Text>
      </View>
      <View style={styles.timeBlock}>
        <View style={styles.timeBlockNumbers}>
          <View style={styles.blockNumber}>
            <Text style={styles.text}>{timeLeft.hours[0]}</Text>
          </View>
          <View style={styles.blockNumber}>
            <Text style={styles.text}>{timeLeft.hours[1]}</Text>
          </View>
        </View>
        <Text style={styles.label}>Hours</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40,
  },
  timeBlock: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  timeBlockNumbers: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: colorsDefault.green.primary,
    fontWeight: "700",
  },
  blockNumber: {
    backgroundColor: "#EFEDEB",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
  },
  label: {
    color: colorsDefault.green.primary,
  },
});

export default Counter;
