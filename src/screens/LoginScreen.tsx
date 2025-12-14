import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // Later: call your API
    console.log("Login:", { email, password });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>

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

      <Pressable style={styles.primaryBtn} onPress={handleLogin}>
        <Text style={styles.primaryText}>Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don’t have an account? Create one</Text>
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
  link: { color: "rgba(255,255,255,0.75)", marginTop: 6 },
});
