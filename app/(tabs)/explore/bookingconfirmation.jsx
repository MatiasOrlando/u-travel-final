import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { colorsDefault } from "@/constants/Colors";
import { useSelector } from "react-redux";

const bookingconfirmation = () => {
  const { localId } = useSelector((state) => state.auth.value);
  return (
    <View style={styles.container}>
      <View style={{ height: "100%", position: "relative" }}>
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
          <View
            style={{
              position: "relative",
              marginTop: 50,
              paddingHorizontal: 60,
            }}
          >
            <Text style={styles.filterOptionsTitle}>All Set!</Text>
            <Text style={{ marginTop: 20, textAlign: "center" }}>
              Your payment for your ideal itinerary has been received. Your
              reservations are now confirmed.
            </Text>
            <Text style={{ marginTop: 20, textAlign: "center", fontSize: 20 }}>
              Order Confirmation: {localId && localId.slice(-5)}
            </Text>
            <Text
              style={{
                marginTop: 20,
                textAlign: "center",
                color: colorsDefault.brown.default,
              }}
            >
              Have a wonderful trip!
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default bookingconfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  imgHome: {
    position: "absolute",
    height: 115,
    width: 115,
    zIndex: 50,
    top: 100,
    left: 40,
  },
  imgHome2: {
    position: "absolute",
    height: 150,
    width: 115,
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
  filterOptionsTitle: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 20,
    color: colorsDefault.brown.default,
  },
  cityTag: {
    color: colorsDefault.secondary,
    fontSize: 22,
    fontWeight: "700",
  },
  cityTagContainer: {
    position: "absolute",
    zIndex: 20,
    bottom: 90,
    paddingLeft: 50,
    backgroundColor: "rgba(194, 172, 147, 0.8)",
    width: "55%",
    left: 0,
    paddingVertical: 5,
  },
  viewResultsContainer: {
    marginBottom: 230,
    marginTop: 30,
    alignItems: "center",
  },
});
