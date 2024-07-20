import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { colorsDefault } from "@/constants/Colors";
import { useSelector } from "react-redux";
import Counter from "@/components/Counter";

const BookingConfirmation = () => {
  const { localId } = useSelector((state) => state.auth.value);
  const { dateOfArrival } = useSelector((state) => state.datesPicker.value);
  console.log(dateOfArrival);

  return (
    <View style={styles.container}>
      <View style={styles.relativeContainer}>
        <Image
          style={styles.imgHome}
          source={require("../../../assets/images/booking-confirmed.png")}
        />
        <Image
          style={styles.imgHome2}
          source={require("../../../assets/images/order-confirmed.png")}
        />
        <View style={styles.imgContainer}>
          <Text>Booking successfully confirmed</Text>
        </View>
        <ScrollView style={styles.filterOptionsContainer}>
          <View style={styles.scrollContent}>
            <View>
              <Text style={styles.filterOptionsTitle}>All Set!</Text>
              <Text style={styles.centeredText}>
                Your payment for your ideal itinerary has been received. Your
                reservations are now confirmed.
              </Text>
              <Text style={styles.orderConfirmationText}>
                Order Confirmation: {localId && localId.slice(-5)}
              </Text>
              <Text style={styles.wonderfulTripText}>
                Have a wonderful trip!
              </Text>
            </View>
            <View>
              <Counter dateOfArrival={dateOfArrival} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  relativeContainer: {
    height: "100%",
    position: "relative",
  },
  imgContainer: {
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  imgHome: {
    position: "absolute",
    height: 115,
    width: 100,
    zIndex: 50,
    top: 100,
    left: 40,
  },
  imgHome2: {
    position: "absolute",
    height: 150,
    width: 100,
    zIndex: 50,
    top: 80,
    right: 40,
  },
  filterOptionsContainer: {
    position: "absolute",
    top: 170,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    height: "100%",
  },
  scrollContent: {
    position: "relative",
    marginTop: 40,
    paddingHorizontal: 60,
  },
  filterOptionsTitle: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 20,
    color: colorsDefault.brown.default,
  },
  centeredText: {
    marginTop: 20,
    textAlign: "center",
  },
  orderConfirmationText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
  },
  wonderfulTripText: {
    marginTop: 20,
    textAlign: "center",
    color: colorsDefault.brown.default,
  },
});
