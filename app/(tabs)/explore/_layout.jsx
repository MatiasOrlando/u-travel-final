import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colorsDefault } from "@/constants/Colors";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[cities]"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={router.back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="citydetail"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={router.back} style={styles.btnNavigation}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="resultstrip"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={router.back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="bookingconfirmation"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({
  btnNavigation: {
    backgroundColor: colorsDefault.secondary,
    borderRadius: "100%",
    padding: 1,
  },
});
