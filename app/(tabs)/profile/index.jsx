import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import React, { useEffect } from "react";
import ImageSelector from "@/components/ImageSelector";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useRouter } from "expo-router";
import { useDB } from "@/hooks/useDB";
import { clearUser } from "@/features/Auth/AuthSlice";
import { useAuth } from "@/hooks/useAuth";
import FilterCard from "@/components/FilterCard";

const Profile = () => {
  const { user } = useSelector((state) => state.auth.value);
  const authUser = useAuth();
  const { truncateSessionTable } = useDB();
  const dispatch = useDispatch();
  const router = useRouter();

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
        {
          marginTop: Platform.OS === "ios" ? 80 : StatusBar.currentHeight + 30,
        },
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
          <FilterCard>
            <View style={{ width: "100%", paddingHorizontal: 20, gap: 20 }}>
              <Text style={styles.userInfo}>
                Username:{" "}
                {user.split("@")[0].charAt(0).toUpperCase() +
                  user.split("@")[0].slice(1)}
              </Text>
              <Text style={styles.userInfo}>Email: {user}</Text>
            </View>
          </FilterCard>
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
