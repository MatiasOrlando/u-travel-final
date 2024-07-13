import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import ImageSelector from "@/components/ImageSelector";
import { useSelector } from "react-redux";
import ButtonPrimary from "@/components/ButtonPrimary";
import { router } from "expo-router";

const Profile = () => {
  const { user } = useSelector((state) => state.auth.value);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === "android" && StatusBar.currentHeight) {
      setStatusBarHeight(StatusBar.currentHeight);
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        { marginTop: Platform.OS === "ios" ? 80 : statusBarHeight || 200 },
      ]}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          gap: 25,
        }}
      >
        <ImageSelector />
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <ButtonPrimary
            title="Set my address"
            handlePress={() => router.push("/profile/location")}
          />
        </View>
        {user && (
          <View style={{ width: "100%", paddingHorizontal: 60, gap: 20 }}>
            <Text style={styles.userInfo}>Username: {user.split("@")[0]}</Text>
            <Text style={styles.userInfo}>Email: {user}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btnAddress: {
    marginTop: 20,
  },
  userInfo: {
    fontSize: 18,
  },
});
