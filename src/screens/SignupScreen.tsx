import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { API_BASE_URL } from "../config/api";

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    Alert.alert("Tap", "Sign Up clicked ✅"); // <-- keep temporarily

    if (loading) return;
    if (!name.trim() || !email.trim() || !password.trim()) {
      return Alert.alert("Missing", "Fill all fields.");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        return Alert.alert("Error", data.message || "Registration failed");

      Alert.alert("Success", "Check your email. Then verify.");
      navigation.navigate("VerifyEmail");
    } catch (e: any) {
      Alert.alert("Network error", e?.message || "Could not reach server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#0B1220" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create your account</Text>

        <View style={styles.form}>
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

          <Pressable
            onPress={handleSignup}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              loading && { opacity: 0.6 },
            ]}
            hitSlop={10}
          >
            <Text style={styles.primaryText}>
              {loading ? "Creating..." : "Sign Up"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 30 },
  title: { color: "#FFF", fontSize: 26, fontWeight: "800", marginTop: 10 },
  form: { marginTop: 16, gap: 12 },
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
