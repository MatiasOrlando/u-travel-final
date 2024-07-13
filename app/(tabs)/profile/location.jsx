import { SafeAreaView } from "react-native";
import React from "react";
import LocationSelector from "@/components/LocationSelector";

const location = () => {
  return (
    <SafeAreaView>
      <LocationSelector />
    </SafeAreaView>
  );
};

export default location;
