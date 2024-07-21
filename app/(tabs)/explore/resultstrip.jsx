import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colorsDefault } from "@/constants/Colors";
import FilterCard from "@/components/FilterCard";
import { priceAssignationPerActivity } from "@/utils/priceActivitiesAssignation";
import ButtonPrimary from "@/components/ButtonPrimary";
import { usePostBookingOrderMutation } from "@/services/shopServices";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { clearCitySelected } from "@/features/CitySelection/CitySelectionSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResultsTrip = () => {
  const authUser = useAuth();
  const dispatch = useDispatch();
  const citySelected = useSelector(
    (state) => state.citySelectedData.citySelected
  );
  const resultsItinerary = useSelector(
    (state) => state.resultsFilteredActivitiesData.resultsFilteredActivities
  );
  const sliderBudgetValue = useSelector(
    (state) => state.budgetFilter.budgetValue
  );
  const { user, localId } = useSelector((state) => state.auth.value);
  const [triggerPostBookingOrder, result] = usePostBookingOrderMutation();

  // Assign random prices to filtered activities
  const activitiesWithRandomPricesIncluded = priceAssignationPerActivity(
    resultsItinerary,
    sliderBudgetValue
  );

  // totalPrice acitivities
  const totalPrice = activitiesWithRandomPricesIncluded.reduce(
    (acc, el) => acc + el.price,
    0
  );

  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;

  const bookingData = {
    itinerary: activitiesWithRandomPricesIncluded,
    user,
    total: totalPrice,
    localId,
    orderDate: formattedDate,
    city: citySelected.city,
  };

  const confirmBookingOrder = () => {
    (async () => {
      try {
        const validUser = await authUser();
        if (!validUser) {
          alert("You must log in to confirm your Booking");
        } else {
          triggerPostBookingOrder({
            itinerary: activitiesWithRandomPricesIncluded,
            user,
            total: totalPrice,
            localId,
            orderDate: formattedDate,
            city: citySelected.city,
          });
          router.replace("/explore/bookingconfirmation");
          dispatch(clearCitySelected());

          // Async storage for user's bookings
          try {
            const existingBookings = await AsyncStorage.getItem("userBookings");
            let bookings = [];

            if (existingBookings) {
              bookings = JSON.parse(existingBookings);
            }

            await AsyncStorage.setItem(
              "userBookings",
              JSON.stringify([...bookings, bookingData])
            );
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.resultsContainer}>
          <Image
            style={styles.resultsTripImage}
            source={require("../../../assets/images/results-trip.png")}
            resizeMode="cover"
          />
          <View style={styles.centerAlign}>
            <Text style={styles.itineraryTitle}>¡My Ideal Itinerary!</Text>
          </View>
          <View style={{ height: "100%" }}>
            {activitiesWithRandomPricesIncluded.length > 0 ? (
              <FlatList
                data={activitiesWithRandomPricesIncluded}
                renderItem={({ item: { activity, price }, index }) => (
                  <Pressable>
                    <FilterCard>
                      <View style={styles.experienceBadge}>
                        <Text style={styles.experienceText}>
                          Experience {index + 1}
                        </Text>
                      </View>
                      <View style={styles.activityInfo}>
                        <Text>{activity.name}</Text>
                        <Text>${price}</Text>
                      </View>
                    </FilterCard>
                  </Pressable>
                )}
                keyExtractor={({ activity }) => activity.name.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 10,
                }}
                ListFooterComponent={() => (
                  <View style={styles.footerContainer}>
                    <View style={{ marginBottom: 15 }}>
                      <Text style={{ fontWeight: "700" }}>
                        Total: ${totalPrice}
                      </Text>
                    </View>
                    <ButtonPrimary
                      title="Book Now"
                      handlePress={confirmBookingOrder}
                    />
                  </View>
                )}
              />
            ) : (
              <View style={styles.noOptionsContainer}>
                <Text style={styles.centerText}>Ops....</Text>
                <Text style={styles.centerText}>
                  No available options, Please try again setting new filters.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultsTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  resultsContainer: {
    height: Platform.OS === "ios" ? 500 : 600,
  },
  resultsTripImage: {
    marginTop: Platform.OS === "ios" ? "" : 50,
    height: 150,
    width: 370,
  },
  centerAlign: {
    alignItems: "center",
  },
  itineraryTitle: {
    color: colorsDefault.brown.default,
    fontSize: 20,
  },
  experienceBadge: {
    backgroundColor: "#FF6868",
    position: "absolute",
    top: 10,
    width: 150,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  experienceText: {
    textAlign: "right",
    paddingRight: 10,
    paddingVertical: 3,
    color: colorsDefault.secondary,
  },
  activityInfo: {
    paddingTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noOptionsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    height: 200,
    gap: 10,
  },
  centerText: {
    textAlign: "center",
  },
  footerContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
});
