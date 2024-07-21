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
import { useDB } from "@/hooks/useDB";
import { signInSchema } from "@/validations/signInScheme";
import { Formik } from "formik";

const SignIn = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [
    triggerSignIn,
    { isSuccess: isSuccessSignIn, isLoading, isError, error, data },
  ] = useSignInMutation();

  const dispatch = useDispatch();
  const { insertSession } = useDB();

  useEffect(() => {
    if (isError) {
      setModalVisible(true);
    } else if (isSuccessSignIn && !isLoading) {
      try {
        insertSession({
          email: data.email,
          localId: data.localId,
          token: data.idToken,
        });
      } catch (error) {
        console.error(error);
      }
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      );
      router.push("/(tabs)/explore");
    }
  }, [isError, isLoading, isSuccessSignIn, error, data]);

  const handlePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleSubmit = async (values) => {
    try {
      await triggerSignIn({
        email: values.email,
        password: values.password,
        returnSecureToken: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signInSchema}
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
              additionalText="Forgot password?"
              value={values.password}
              onChangeValue={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry={!visiblePassword}
              error={touched.password && errors.password}
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
              <Text style={styles.signInSignUpText}>
                Don't have an account?
              </Text>
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
      )}
    </Formik>
  );
};

export default SignIn;

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
