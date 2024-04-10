import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    try {
      signInAnonymously(auth)
        .then(() => {
          navigation.navigate("Chat", { email: email });
        })
        .catch((error) => {
          Alert.alert("Login Error", error.message);
        });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Real-Time Chat App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingBottom: 100
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;
