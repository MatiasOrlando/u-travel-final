import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import imageHome from "../assets/images/home.png";
import { colorsDefault } from "@/constants/Colors";
import { Link, router } from "expo-router";
import SocialIcons from "@/components/SocialIcons";
import ButtonPrimary from "@/components/ButtonPrimary";
import { en, registerTranslation } from "react-native-paper-dates";
import { useDB } from "@/hooks/useDB";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

registerTranslation("en", en);

export default function HomeScreen() {
  const { initDB } = useDB();
  const authUser = useAuth();

  useEffect(() => {
    initDB();
    (async () => {
      try {
        const validUser = await authUser();
        if (validUser) router.replace(`/explore`);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.imgHome} source={imageHome} />
      </View>
      <View style={styles.welcomeContainer}>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ color: colorsDefault.vanilla.dark, fontSize: 30 }}>
            ¡Welcome to U travel!
          </Text>
          <View
            style={{
              marginTop: 20,
              width: "100%",
              padding: 30,
            }}
          >
            <ButtonPrimary
              style={{
                alignItems: "center",
                borderRadius: 8,
                paddingVertical: 7,
                width: "100%",
              }}
              onPress={() =>
                router.push({
                  pathname: "/register",
                  params: { type: "register" },
                })
              }
              title="Sign Up"
              fontSize={20}
            />
            <Pressable
              style={{
                backgroundColor: "white",
                alignItems: "center",
                padding: 20,
                borderRadius: 8,
                marginTop: 20,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
              }}
              onPress={() =>
                router.push({
                  pathname: "/(auth)/login",
                  params: { type: "login" },
                })
              }
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                }}
              >
                Sign In
              </Text>
            </Pressable>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <Link
                style={{
                  marginTop: 40,
                }}
                href={"/(tabs)/explore"}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colorsDefault.vanilla.dark,
                  }}
                >
                  Continue as guest
                </Text>
              </Link>
            </View>
            <SocialIcons />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    marginTop: 130,
    alignItems: "center",
  },
  imgHome: {
    height: 210,
    width: 260,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: "hidden",
  },
});
