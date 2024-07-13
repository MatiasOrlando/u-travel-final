import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { usePathname } from "expo-router";

const _layoutAuth = () => {
  const pathname = usePathname();

  let backgroundImage;
  pathname === "/register"
    ? (backgroundImage = require("../../assets/images/register.png"))
    : (backgroundImage = require("../../assets/images/travelers.png"));

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#D4D4D4",
          alignItems: "center",
          paddingTop: pathname === "/register" ? 20 : 60,
          height: pathname === "/register" ? 330 : 392,
          width: 590,
          borderBottomRightRadius: 300,
          borderBottomLeftRadius: 300,
        }}
      >
        <Image
          style={
            pathname === "/register" ? styles.signUpAuth : styles.signInAuth
          }
          source={backgroundImage}
          resizeMode="cover"
        />
      </View>
      <Slot />
    </View>
  );
};

export default _layoutAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  signInAuth: {
    height: 300,
    width: 250,
  },
  signUpAuth: {
    height: 150,
    width: 370,
    marginTop: 80,
  },
});
