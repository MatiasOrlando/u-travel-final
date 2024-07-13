import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { colorsDefault } from "../../../constants/Colors";
import FormInput from "@/components/FormInput";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useSignInMutation } from "@/services/authServices";
import CustomModal from "@/components/CustomModal";
import { setUser } from "@/features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const index = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [
    triggerSignIn,
    { isSuccess: isSuccessSignIn, isLoading, isError, error, data },
  ] = useSignInMutation();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  useEffect(() => {
    if (isError) {
      setModalVisible(!isModalVisible);
    } else if (isSuccessSignIn) {
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      );
      router.push("/(tabs)/explore");
    }
  }, [isError, isLoading, isSuccessSignIn, error]);

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      return;
    }

    try {
      await triggerSignIn({
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <View style={styles.signInContainer}>
      <View style={styles.signInFormContainer}>
        <FormInput
          label="E-mail"
          color={colorsDefault.brown.default}
          icon={
            <AntDesign
              name="user"
              size={24}
              color={colorsDefault.brown.default}
            />
          }
          onChangeValue={(value) => {
            handleChange("email", value);
          }}
        />
        <FormInput
          label="Password"
          color={colorsDefault.brown.default}
          icon={
            <AntDesign
              name={!visiblePassword ? "lock1" : "unlock"}
              size={24}
              color={colorsDefault.brown.default}
              onPress={handlePasswordVisibility}
            />
          }
          additionalText="Forgot password?"
          onChangeValue={(value) => handleChange("password", value)}
          secureTextEntry={!visiblePassword}
        />
      </View>
      <View style={styles.signInButtonContainer}>
        <ButtonPrimary
          title="Sign In"
          handlePress={handleSubmit}
          disabled={isLoading}
        />
      </View>
      <View style={styles.signInSignUpContainer}>
        <View>
          <Text style={styles.signInSignUpText}>Don't have an account?</Text>
        </View>
        <View style={styles.signInSignUpLinkContainer}>
          <Link href="/register">
            <Text style={styles.signInSignUpLink}>Sign up</Text>
          </Link>
        </View>
      </View>
      <CustomModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        isSuccessSignIn={isSuccessSignIn}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  signInContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  signInFormContainer: {
    marginTop: 30,
  },
  signInButtonContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  signInSignUpContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  signInSignUpText: {
    color: colorsDefault.brown.default,
    fontSize: 16,
  },
  signInSignUpLinkContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colorsDefault.brown.default,
    marginLeft: 3,
    marginTop: 2,
  },
  signInSignUpLink: {
    fontSize: 16,
    fontWeight: "600",
    color: colorsDefault.brown.default,
    paddingBottom: 2,
  },
});
