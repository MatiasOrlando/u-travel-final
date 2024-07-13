import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { colorsDefault } from "@/constants/Colors";

const CityAttractions = ({ cityActivities }) => {
  return (
    <View>
      <Text
        style={{
          color: colorsDefault.brown.default,
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Read more about..
      </Text>
      <ScrollView horizontal style={{ overflow: "visible" }}>
        {cityActivities &&
          cityActivities.map((activity) => (
            <View
              key={activity}
              style={{
                marginRight: 20,
                position: "relative",
                height: 120,
                width: 250,
              }}
            >
              <Text
                style={{
                  position: "absolute",
                  zIndex: 20,
                  color: colorsDefault.secondary,
                  fontSize: 16,
                  bottom: 10,
                  backgroundColor: colorsDefault.vanilla.dark,
                  width: "100%",
                  paddingLeft: 15,
                  paddingVertical: 2,
                }}
              >
                {activity.charAt(0).toLocaleUpperCase() + activity.slice(1)}
              </Text>
              <Image
                resizeMode="cover"
                style={{ width: 250, borderRadius: 10 }}
                source={require("../assets/images/london-eye.png")}
              />
            </View>
          ))}
        <View>
          <Text></Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CityAttractions;

const styles = StyleSheet.create({});
