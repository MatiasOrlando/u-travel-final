import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";

const Interests = () => {
  const [travelerInterests, setTravelerInterests] = useState([]);
  const userInterests = [
    "Art",
    "Adventure",
    "Gastronomy",
    "Culture",
    "Sightseeing",
    "City",
    "Sports",
    "Relax",
    "Nature",
  ];

  const imageInterestsMap = {
    Art: require("../assets/images/art.png"),
    Adventure: require("../assets/images/adventure.png"),
    Gastronomy: require("../assets/images/gastronomy.png"),
    Culture: require("../assets/images/culture.png"),
    Sightseeing: require("../assets/images/sightseeing.png"),
    City: require("../assets/images/city.png"),
    Sports: require("../assets/images/sports.png"),
    Relax: require("../assets/images/relax.png"),
    Nature: require("../assets/images/nature.png"),
  };

  const handlePress = (el, index) => {
    setTravelerInterests((prevInterests) => {
      if (prevInterests.find((interest) => interest.el === el)) {
        return prevInterests.filter((interest) => interest.el !== el);
      } else {
        return [...prevInterests, { el, index }];
      }
    });
  };

  return (
    <View style={styles.interestsMainContainer}>
      <Text style={styles.mainText}>Interests</Text>
      <View style={styles.interestsContainer}>
        {userInterests.map((el, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(el, index)}
            style={[
              styles.gridItem,
              {
                backgroundColor: travelerInterests.some(
                  (interest) => interest.index === index
                )
                  ? "#74AD8C"
                  : "transparent",
              },
            ]}
          >
            <View style={styles.itemContent}>
              <Image
                source={imageInterestsMap[el]}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text>{el}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Interests;

const styles = StyleSheet.create({
  interestsMainContainer: {
    alignItems: "center",
    marginTop: 20,
    height: 300,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  gridItem: {
    width: "30%",
    margin: "1.5%",
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  itemContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    width: 50,
    height: 40,
  },
  mainText: {
    fontSize: 18,
    textAlign: "left",
    width: "100%",
  },
});
