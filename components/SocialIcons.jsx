import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const SocialIcons = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 30 }}>
      <Text style={{ fontSize: 18 }}>Join us</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 40,
          marginTop: 30,
        }}
      >
        <View
          style={[styles.socialIconContainer, { backgroundColor: "black" }]}
        >
          <AntDesign name="apple1" size={26} color="white" />
        </View>
        <View
          style={[styles.socialIconContainer, { backgroundColor: "#3B5998" }]}
        >
          <FontAwesome name="facebook-f" size={26} color="white" />
        </View>

        <View
          style={[styles.socialIconContainer, { backgroundColor: "#FF6868" }]}
        >
          <AntDesign name="google" size={26} color="white" />
        </View>
      </View>
    </View>
  );
};

export default SocialIcons;

const styles = StyleSheet.create({
  socialIconContainer: {
    padding: 15,
    borderRadius: 8,
    minWidth: 55,
    alignItems: "center",
  },
  imageIcon: {
    height: 22,
    width: 20,
  },
});
