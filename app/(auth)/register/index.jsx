import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colorsDefault } from "../../../constants/Colors";
import FormInput from "@/components/FormInput";
import ButtonPrimary from "@/components/ButtonPrimary";
import { Link, router } from "expo-router";
import { useSignUpMutation } from "@/services/authServices";
import CustomModal from "@/components/CustomModal";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { setUser } from "@/features/Auth/AuthSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmedPassword, setVisibleConfirmedPassword] =
    useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [
    triggerSignUp,
    { isError, error, isLoading, isSuccess: isSuccessSignUp, data },
  ] = useSignUpMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccessSignUp) {
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      );
      setModalVisible(!isModalVisible);
      router.push("/(tabs)/explore");
    }
  }, [isError, isLoading, isSuccessSignUp, error, data]);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      return;
    }

    try {
      await triggerSignUp({
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      });

      if (isError) {
        if (error.data.error.message === "EMAIL_EXISTS")
          alert("User already exists");
        else alert(error.data.error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handlePasswordConfirmedVisibility = () => {
    setVisibleConfirmedPassword(!visibleConfirmedPassword);
  };

  return (
    <View style={styles.signUpContainer}>
      <View>
        <FormInput
          label="Name"
          color={colorsDefault.brown.default}
          icon={
            <AntDesign
              name="user"
              size={24}
              color={colorsDefault.brown.default}
            />
          }
          value={formData.name}
          onChangeValue={(value) => handleChange("name", value)}
        />
        <FormInput
          label="Lastname"
          color={colorsDefault.brown.default}
          icon={
            <AntDesign
              name="user"
              size={24}
              color={colorsDefault.brown.default}
            />
          }
          value={formData.lastname}
          onChangeValue={(value) => handleChange("lastname", value)}
        />
        <FormInput
          label="E-mail"
          color={colorsDefault.brown.default}
          icon={
            <EvilIcons
              name="envelope"
              size={30}
              color={colorsDefault.brown.default}
            />
          }
          value={formData.email}
          onChangeValue={(value) => handleChange("email", value)}
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
          value={formData.password}
          onChangeValue={(value) => handleChange("password", value)}
          secureTextEntry={!visiblePassword}
        />
        <FormInput
          label="Confirm password"
          color={colorsDefault.brown.default}
          icon={
            <AntDesign
              name={!visibleConfirmedPassword ? "lock1" : "unlock"}
              size={24}
              color={colorsDefault.brown.default}
              onPress={handlePasswordConfirmedVisibility}
            />
          }
          value={formData.confirmPassword}
          onChangeValue={(value) => handleChange("confirmPassword", value)}
          secureTextEntry={!visibleConfirmedPassword}
        />
      </View>
      <View style={styles.signUpButtonContainer}>
        <ButtonPrimary
          title="Sign Up"
          handlePress={handleSubmit}
          disabled={isLoading}
        />
      </View>
      <View style={styles.signUpSignInContainer}>
        <View>
          <Text style={styles.signUpSignInText}>Already have an account?</Text>
        </View>
        <View style={styles.signUpSignInLinkContainer}>
          <Link href="/login">
            <Text style={styles.signUpSignInLink}>Sign in</Text>
          </Link>
        </View>
      </View>
      <CustomModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        isSuccessSignUp={isSuccessSignUp}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  signUpContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  signUpButtonContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  signUpSignInContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  signUpSignInText: {
    color: colorsDefault.brown.default,
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  signUpSignInLinkContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colorsDefault.brown.default,
    marginLeft: 3,
    marginTop: 2,
  },
  signUpSignInLink: {
    fontSize: 16,
    fontWeight: "600",
    color: colorsDefault.brown.default,
    paddingBottom: 2,
  },
});
