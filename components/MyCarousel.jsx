import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { router } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = ({ data }) => {
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/explore/citydetail",
          params: { id: item.city },
        })
      }
    >
      <View style={styles.card}>
        <Image
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          source={{ uri: item.cityImage }}
        />
        <Text style={[styles.title, { position: "absolute", fontWeight: 600 }]}>
          {item.city}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth - 160}
      inactiveSlideScale={0.95}
      inactiveSlideOpacity={0.7}
      contentContainerCustomStyle={{ overflow: "visible" }}
      containerCustomStyle={{ overflow: "visible" }}
    />
  );
};

const CustomCarousel = ({ citiesFilteredById, searchTerm }) => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if (citiesFilteredById) {
      const filteredCities = searchTerm.trim()
        ? citiesFilteredById.filter(({ city }) =>
            city.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : citiesFilteredById;
      setCities(filteredCities);
    }
  }, [searchTerm, citiesFilteredById]);

  return (
    <View style={styles.container}>
      <MyCarousel data={cities} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "#764ABC",
  },
  card: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth - 180,
    height: 150,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    color: "white",
  },
});

export default CustomCarousel;
