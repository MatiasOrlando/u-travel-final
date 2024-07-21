import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonPrimary from "./ButtonPrimary";
import { googleMapsApiKey } from "@/database/googlemaps";
import { colorsDefault } from "@/constants/Colors";
import MapPreview from "./MapPreview";

import * as Location from "expo-location";
import { usePostLocationMutation } from "@/services/shopServices";
import { router } from "expo-router";

const LocationSelector = () => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [address, setAddres] = useState("");
  const [error, setError] = useState("");
  const { localId } = useSelector((state) => state.auth.value);

  const [triggerPostLocation, result] = usePostLocationMutation();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();
          setAddres(data.results[0].formatted_address);
        }
      } catch (error) {}
    })();
  }, [location]);

  const onConfirmAddress = () => {
    const date = new Date();
    router.push("/profile/addresslist");

    triggerPostLocation({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: address,
        updatedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      },
      localId: localId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Address</Text>
      {location ? (
        <>
          <Text style={styles.text}>
            Lat: {location.latitude}, long: {location.longitude}.
          </Text>

          <MapPreview location={location} />
          <View style={styles.formattedAddress}>
            <Text style={styles.address}>Formatted address: {address}</Text>
            <ButtonPrimary
              handlePress={onConfirmAddress}
              title="Confirm address"
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.noLocationContainer}>
            <Text>{error}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingVertical: 20,
    fontFamily: "Josefin",
    fontSize: 18,
  },
  noLocationContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colorsDefault.green,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    padding: 10,
    fontSize: 16,
  },
  formattedAddress: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    gap: 20,
  },
});
