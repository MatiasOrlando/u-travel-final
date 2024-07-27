import { StyleSheet, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/FormInput";
import { colorsDefault } from "@/constants/Colors";
import { TabBarIcon } from "@/components/TabBarIcon";
import CardCountry from "@/components/CardCountry";
import { router } from "expo-router";
import { useGetCountriesQuery } from "@/services/shopServices";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const { data: countries, isLoading } = useGetCountriesQuery();

  useEffect(() => {
    if (!isLoading && countries) {
      if (searchTerm.trim() !== "") {
        const searchQueryCountries = countries.filter(({ country }) =>
          country.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCountriesData(searchQueryCountries);
      } else {
        setCountriesData(countries);
      }
    }
  }, [searchTerm, countries, isLoading]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FormInput
          color={colorsDefault.brown.default}
          onChangeValue={setSearchTerm}
          icon={<TabBarIcon name="search" size={24} />}
          placeholder="Search a country..."
          placeholderTextColor={"#A9A9A9"}
        />
        <FlatList
          data={countriesData}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/explore/[cities]",
                  params: { id: item.id },
                })
              }
            >
              <CardCountry {...item} />
            </Pressable>
          )}
          keyExtractor={({ country }) => country || Math.random().toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    flex: 1,
    backgroundColor: "#EFEDEB",
  },
  innerContainer: {
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  flatListContent: {
    gap: 15,
    marginTop: 25,
    paddingBottom: 120,
  },
});
