import React from "react";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="location"
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={router.back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="addresslist"
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={router.back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;
