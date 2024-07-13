import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import FormInput from "@/components/FormInput";
import { colorsDefault } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import CustomCarousel from "@/components/MyCarousel";
import CityAttractions from "@/components/CityAttractions";
import {
  useGetCitiesByCountryIdQuery,
  useGetCountryByIdQuery,
} from "@/services/shopServices";

const CityPage = () => {
  const { id } = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [cityActivities, setCityActivities] = useState([]);
  const [country, setCountry] = useState({});

  const { data: citiesFilteredById, isLoading } =
    useGetCitiesByCountryIdQuery(id);

  const { data: countryData, isLoading: isLoadingCountryData } =
    useGetCountryByIdQuery(id);

  useEffect(() => {
    if (!isLoading && citiesFilteredById) {
      const cityActivitiesData = citiesFilteredById.flatMap((city) => {
        return city.activities.flatMap((activity) => activity.type);
      });
      const cityInfo = [...new Set(cityActivitiesData)];
      setCityActivities(cityInfo);
    }
    if (!isLoadingCountryData && countryData) {
      setCountry(countryData);
    }
  }, [citiesFilteredById, countryData, isLoading, isLoadingCountryData]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: country.countryImage }} />
          <Text style={styles.countryText}>{country.country}</Text>
        </View>
        <View style={styles.formInputContainer}>
          <FormInput
            color={colorsDefault.brown.default}
            onChangeValue={setSearchTerm}
            icon={<TabBarIcon name="search" size={24} />}
            placeholder="Search a city..."
          />
        </View>
        <CustomCarousel
          citiesFilteredById={citiesFilteredById}
          searchTerm={searchTerm}
        />
        <CityAttractions cityActivities={cityActivities} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CityPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 30,
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight : 70,
    paddingBottom: 30,
  },
  image: {
    height: 200,
    width: 300,
    borderRadius: 12,
  },
  countryText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  formInputContainer: {
    width: "100%",
  },
});
