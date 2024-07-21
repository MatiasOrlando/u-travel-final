import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import bookingsImage from "../../assets/images/bookings-image.png";
import { colorsDefault } from "@/constants/Colors";
import { useGetBookingsByUserQuery } from "@/services/shopServices";
import { useAuth } from "@/hooks/useAuth";
import { Link, useRouter } from "expo-router";
import FilterCard from "@/components/FilterCard";

export default function Bookings() {
  const authUser = useAuth();
  const router = useRouter();
  const [validUser, setValidUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await authUser();
        if (!user) {
          alert("Please Sign in or Sign up to check your bookings");
          router.replace("/");
        } else {
          setValidUser(user);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const { data: userBookings, isLoading } = useGetBookingsByUserQuery(
    validUser?.email,
    {
      skip: !validUser,
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.imgBooking} source={bookingsImage} />
      </View>
      <View style={styles.welcomeContainer}>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ color: colorsDefault.vanilla.dark, fontSize: 30 }}>
            My reservations
          </Text>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            {isLoading ? (
              <Text>Loading...</Text>
            ) : userBookings?.length > 0 ? (
              <FlatList
                data={userBookings}
                renderItem={({
                  item: { itinerary, total, orderDate, city },
                  index,
                }) => (
                  <Pressable>
                    <FilterCard>
                      <View style={styles.experienceBadge}>
                        <Text style={styles.experienceText}>
                          Booking {index + 1}
                        </Text>
                      </View>
                      <View>
                        <Link
                          style={{
                            textAlign: "right",
                            color: colorsDefault.brown.default,
                          }}
                          href={`/explore/citydetail?id="${city}"`}
                        >
                          <Text> {city}</Text>
                        </Link>
                      </View>
                      <View style={styles.activityInfo}>
                        {itinerary.map((experience, index) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                              key={`${experience}-${index}`}
                            >
                              <Text style={styles.bullet}>•</Text>
                              <Text>{experience.activity.name}</Text>
                            </View>
                          );
                        })}
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 5,
                          }}
                        >
                          <Text style={{}}>{orderDate ? orderDate : ""}</Text>
                          <Text style={{ fontWeight: "700" }}>${total}</Text>
                        </View>
                      </View>
                    </FilterCard>
                  </Pressable>
                )}
                keyExtractor={(item, index) => `${index}-${item.city}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 100,
                }}
              />
            ) : (
              <View style={styles.noOptionsContainer}>
                <Link href={"/explore"} style={styles.centerText}>
                  You have not made any reservations yet. Please click here to
                  start booking...
                </Link>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bullet: {
    fontSize: 20,
    color: "black",
    paddingRight: 5,
  },
  container: {
    flex: 1,
  },
  imgContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  imgBooking: {
    height: 180,
    width: 240,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: "hidden",
  },
  resultsContainer: {
    height: 500,
  },
  resultsTripImage: {
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "column",
    gap: 3,
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
});
