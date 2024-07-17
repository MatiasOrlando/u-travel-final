import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import ImageSelector from "@/components/ImageSelector";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useRouter } from "expo-router";
import { useDB } from "@/hooks/useDB";
import {
  clearUser,
  setUser,
  setIsAuthenticated,
} from "@/features/Auth/AuthSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth.value);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const { getSession, truncateSessionTable } = useDB();
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
        const session = await getSession();
        if (session) {
          const userData = session;
          dispatch(
            setUser({
              email: userData.email,
              localId: userData.localId,
              idToken: userData.token,
            })
          );
          dispatch(setIsAuthenticated(true));
        } else {
          alert("You must log in to enter your profile section");
          dispatch(setIsAuthenticated(false));
          router.replace("/");
        }
      } catch (error) {
        console.error(error);
        dispatch(setIsAuthenticated(false));
      }
    })();
  }, []);

  const handleSignOut = () => {
    try {
      truncateSessionTable();
      dispatch(clearUser());
      dispatch(setIsAuthenticated(false));
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
