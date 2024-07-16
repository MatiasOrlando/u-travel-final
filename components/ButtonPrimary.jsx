import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colorsDefault } from "../constants/Colors";

const ButtonPrimary = ({ title, handlePress, style, fontSize, ...rest }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btnPrimary,
        style,
        { opacity: pressed ? 0.6 : 1 },
      ]}
      onPress={handlePress}
      {...rest}
    >
      <Text
        style={{
          textAlign: "center",
          color: colorsDefault.secondary,
          paddingVertical: 15,
          fontSize: fontSize ? fontSize : 18,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: colorsDefault.green.primary,
    borderRadius: 10,
    width: 300,
  },
});
