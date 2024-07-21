import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import ImageSelector from "@/components/ImageSelector";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useRouter } from "expo-router";
import { useDB } from "@/hooks/useDB";
import { clearUser } from "@/features/Auth/AuthSlice";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user } = useSelector((state) => state.auth.value);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const authUser = useAuth();
  const { truncateSessionTable } = useDB();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "android" && StatusBar.currentHeight) {
      setStatusBarHeight(StatusBar.currentHeight);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const validUser = await authUser();
        if (!validUser) {
          alert("You must log in to enter your profile section");
          router.replace("/");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSignOut = () => {
    try {
      truncateSessionTable();
      dispatch(clearUser());
      router.replace("/");
    } catch (error) {
      console.error(error);
      alert("Error while signing out, please try again");
    }
  };

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
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <ButtonPrimary title="Sign Out" handlePress={handleSignOut} />
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
