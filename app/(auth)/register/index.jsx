import { StyleSheet, Text, View, ScrollView } from "react-native";
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
import { Formik } from "formik";
import { signUpSchema } from "@/validations/signUpScheme";

const Register = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmedPassword, setVisibleConfirmedPassword] =
    useState(false);

  const [
    triggerSignUp,
    { isError, error, isLoading, isSuccess: isSuccessSignUp, data },
  ] = useSignUpMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccessSignUp && data) {
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      );
      setModalVisible(true);
      router.push("/(tabs)/explore");
    }
  }, [isError, error, isSuccessSignUp, data]);

  const handleSubmit = async (values) => {
    try {
      await triggerSignUp({
        email: values.email,
        password: values.password,
        returnSecureToken: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handlePasswordConfirmedVisibility = () => {
    setVisibleConfirmedPassword(!visibleConfirmedPassword);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 20 }}
    >
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.signUpContainer}>
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
              value={values.name}
              onChangeValue={handleChange("name")}
              onBlur={handleBlur("name")}
              error={touched.name && errors.name}
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
              value={values.lastname}
              onChangeValue={handleChange("lastname")}
              onBlur={handleBlur("lastname")}
              error={touched.lastname && errors.lastname}
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
              value={values.email}
              onChangeValue={handleChange("email")}
              onBlur={handleBlur("email")}
              error={touched.email && errors.email}
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
              value={values.password}
              onChangeValue={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry={!visiblePassword}
              error={touched.password && errors.password}
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
              value={values.confirmPassword}
              onChangeValue={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              secureTextEntry={!visibleConfirmedPassword}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <View style={styles.signUpButtonContainer}>
              <ButtonPrimary
                title="Sign Up"
                handlePress={handleSubmit}
                disabled={isLoading}
              />
            </View>
            <View style={styles.signUpSignInContainer}>
              <View>
                <Text style={styles.signUpSignInText}>
                  Already have an account?
                </Text>
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
        )}
      </Formik>
    </ScrollView>
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
    marginTop: 10,
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
