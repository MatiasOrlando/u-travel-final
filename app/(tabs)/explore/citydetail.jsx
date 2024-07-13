import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { colorsDefault } from "@/constants/Colors";
import RangeSliderCustom from "@/components/RangeSliderCustom";
import FilterCard from "@/components/FilterCard";
import { useGetCityByIdQuery } from "@/services/shopServices";
import Interests from "@/components/Interests";
import TravelingCompany from "@/components/TravelingCompany";
import AgeTravelers from "@/components/AgeTravelers";
import DateSelector from "@/components/DateSelector";

const CityDetail = () => {
  const { id } = useLocalSearchParams();
  const { data: selectedCity, isLoading } = useGetCityByIdQuery(id);
  const [cityDisplay, setCityDisplay] = useState({});

  useEffect(() => {
    if (!isLoading && selectedCity) {
      const { city, cityImage } = selectedCity;
      setCityDisplay({ city, cityImage });
    }
  }, [id, selectedCity]);

  return (
    <View style={styles.container}>
      <View style={{ height: "100%", position: "relative" }}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.imgHome}
            source={{ uri: cityDisplay?.cityImage }}
          />
          <View style={styles.cityTagContainer}>
            <Text style={styles.cityTag}>{cityDisplay?.city}</Text>
          </View>
        </View>
        <ScrollView style={styles.filterOptionsContainer}>
          <View>
            <Text style={styles.filterOptionsTitle}>
              Create my ideal itinerary
            </Text>
            <FilterCard>
              <DateSelector />
            </FilterCard>
            <RangeSliderCustom />
            <FilterCard>
              <TravelingCompany />
            </FilterCard>
            <FilterCard>
              <AgeTravelers />
            </FilterCard>
            <FilterCard style={{ marginBottom: 250 }}>
              <Interests />
            </FilterCard>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CityDetail;

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
    height: 250,
    width: "100%",
  },
  filterOptionsContainer: {
    position: "absolute",
    top: 200,
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
});
