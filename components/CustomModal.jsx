import { StyleSheet, Text, View, Modal, Button } from "react-native";
import React from "react";

const CustomModal = ({ isModalVisible, setModalVisible, isSuccessSignUp }) => {
  const handleModalClose = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        width: "100%",
      }}
    >
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>
              {isSuccessSignUp
                ? "Account successfully created"
                : "Invalid credentials"}
            </Text>

            <Button
              title={!isSuccessSignUp ? "Try again" : "Continue"}
              onPress={handleModalClose}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
