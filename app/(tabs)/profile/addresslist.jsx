import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AddressItem from "@/components/AddressItem";
import { useGetLocationQuery } from "@/services/shopServices";

const ListAddress = () => {
  const { localId } = useSelector((state) => state.auth.value);
  const { data: location } = useGetLocationQuery(localId);
  return (
    <SafeAreaView>
      {location && <AddressItem location={location} />}
    </SafeAreaView>
  );
};

export default ListAddress;

const styles = StyleSheet.create({});
