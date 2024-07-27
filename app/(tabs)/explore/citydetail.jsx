import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { colorsDefault } from "@/constants/Colors";
import RangeSliderCustom from "@/components/RangeSliderCustom";
import FilterCard from "@/components/FilterCard";
import { useGetCityByIdQuery } from "@/services/shopServices";
import Interests from "@/components/Interests";
import TravelingCompany from "@/components/TravelingCompany";
import AgeTravelers from "@/components/AgeTravelers";
import DateSelector from "@/components/DateSelector";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { filteredActivities } from "@/utils/filteringRules";
import { setResultsFilteredActivities } from "@/features/FilteredActivities/FilteredActivitesSlice";
import { setCitySelected } from "@/features/CitySelection/CitySelectionSlice";
import { useClearFilters } from "@/hooks/useClearFilters";

const CityDetail = () => {
  const { id } = useLocalSearchParams();
  const { data: selectedCity, isLoading } = useGetCityByIdQuery(id);
  const dispatch = useDispatch();
  const removeAllFilters = useClearFilters();
  const [error, setError] = useState({
    errorDateOfArrival: "",
    errorDateOfDeparture: "",
    errorTravelingCompany: "",
    errorMaxAge: "",
    errorInterests: "",
  });

  //Redux Filter Values
  const dateOfArrival = useSelector(
    (state) => state.datesPicker.value.dateOfArrival
  );
  const dateOfDeparture = useSelector(
    (state) => state.datesPicker.value.dateOfDeparture
  );
  const citySelected = useSelector(
    (state) => state.citySelectedData.citySelected
  );
  const minAge = useSelector((state) => state.ageRangeFilter.ageValues.minAge);
  const maxAge = useSelector((state) => state.ageRangeFilter.ageValues.maxAge);

  const sliderBudgetValue = useSelector(
    (state) => state.budgetFilter.budgetValue
  );
  const travelerCompany = useSelector(
    (state) => state.travelersCompanyFilter.value
  );
  const travelerInterests = useSelector(
    (state) => state.interestsFilter.travelerInterests
  );
  //

  useEffect(() => {
    if (!isLoading && selectedCity) {
      dispatch(setCitySelected(selectedCity));
    }
  }, [id, selectedCity]);

  const filterActivitiesResults = () => {
    let errors = { ...error };

    errors.errorDateOfArrival = !dateOfArrival
      ? "Please select a date of arrival"
      : "";
    errors.errorDateOfDeparture = !dateOfDeparture
      ? "Please select a date of departure"
      : "";
    errors.errorTravelingCompany = !travelerCompany.travelersCompany
      ? "Please select a valid traveling group"
      : "";
    errors.errorMaxAge =
      maxAge < minAge ? "Maximum age must be greater than minimum age" : "";
    errors.errorInterests =
      travelerInterests.length < 3
        ? "Please select at least 3 travel interests"
        : "";

    setError(errors);
    // If errors stop fn execution
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    const resultsFilteredActivities = filteredActivities(
      selectedCity.activities,
      {
        budget: sliderBudgetValue,
        travelingCompany: travelerCompany,
        interests: travelerInterests,
        minAge: minAge,
        maxAge: maxAge,
      }
    );
    dispatch(setResultsFilteredActivities(resultsFilteredActivities));
    router.push(`/explore/resultstrip/`);
  };

  const clearAllFilters = () => {
    setError({
      errorDateOfArrival: "",
      errorDateOfDeparture: "",
      errorTravelingCompany: "",
      errorMaxAge: "",
      errorInterests: "",
    });
    removeAllFilters();
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "100%", position: "relative" }}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.imgHome}
            source={{ uri: citySelected?.cityImage }}
          />
          <View style={styles.cityTagContainer}>
            <Text style={styles.cityTag}>{citySelected?.city}</Text>
          </View>
        </View>
        <ScrollView style={styles.filterOptionsContainer}>
          <View>
            <Text style={styles.filterOptionsTitle}>
              Create my ideal itinerary
            </Text>
            <FilterCard>
              <DateSelector {...error} />
            </FilterCard>
            <FilterCard>
              <RangeSliderCustom />
            </FilterCard>
            <FilterCard>
              <TravelingCompany {...error} />
            </FilterCard>
            <FilterCard>
              <AgeTravelers {...error} />
            </FilterCard>
            <FilterCard>
              <Interests {...error} />
            </FilterCard>
            <View style={styles.viewResultsContainer}>
              <ButtonPrimary
                title="Remove all filters"
                handlePress={clearAllFilters}
                style={{ backgroundColor: colorsDefault.vanilla.dark }}
              />
              <ButtonPrimary
                title="View results"
                handlePress={filterActivitiesResults}
              />
            </View>
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
    paddingHorizontal: 3,
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
    gap: 20,
  },
});
