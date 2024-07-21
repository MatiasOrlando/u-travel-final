import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { colorsDefault } from "@/constants/Colors";

const FormInput = ({
  label,
  color,
  icon,
  additionalText,
  onChangeValue,
  error,
  ...rest
}) => {
  return (
    <View style={styles.containerFormInput}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      <View style={styles.relativeContainer}>
        <TextInput
          style={[styles.textInputField, styles.paddingTop]}
          onChangeText={onChangeValue}
          {...rest}
        />
        <View style={styles.iconContainer}>
          <Text>{icon}</Text>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  containerFormInput: {
    marginTop: 15,
  },
  label: {
    fontSize: 18,
  },
  relativeContainer: {
    position: "relative",
  },
  textInputField: {
    height: 47,
    borderBottomWidth: 1,
    borderColor: colorsDefault.brown.default,
    paddingLeft: 30,
  },
  paddingTop: {
    paddingTop: 13,
  },
  iconContainer: {
    position: "absolute",
    top: 17,
  },
  additionalText: {
    textAlign: "right",
    paddingTop: 5,
  },
  errorText: {
    color: "red",
  },
});
