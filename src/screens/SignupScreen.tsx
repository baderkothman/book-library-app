import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup() {
    // Later: call your API
    console.log("Signup:", { name, email, password });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full name"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        secureTextEntry
      />

      <Pressable style={styles.primaryBtn} onPress={handleSignup}>
        <Text style={styles.primaryText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0B1220", gap: 12 },
  title: { color: "#FFF", fontSize: 26, fontWeight: "800", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFF",
  },
  primaryBtn: {
    backgroundColor: "#4F8CFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  primaryText: { color: "#FFF", fontWeight: "800", fontSize: 16 },
});
