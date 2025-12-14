import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";

const API = "http://localhost:4000"; // change when you test on phone (use your PC IP)

export default function VerifyEmailScreen() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // If user opens email deep link: booklibraryapp://verify?token=...
  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      const parsed = Linking.parse(url);
      const t = (parsed.queryParams?.token as string) || "";
      if (t) setToken(t);
    });

    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const parsed = Linking.parse(initialUrl);
        const t = (parsed.queryParams?.token as string) || "";
        if (t) setToken(t);
      }
    })();

    return () => sub.remove();
  }, []);

  async function verify() {
    if (!token.trim())
      return Alert.alert("Missing", "Paste the token from your email.");
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim() }),
      });
      const data = await res.json();
      if (!res.ok) return Alert.alert("Error", data.message || "Failed");
      Alert.alert("Success", "Email verified! You can login now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.sub}>
        Open the link in your email, or paste the token below.
      </Text>

      <TextInput
        value={token}
        onChangeText={setToken}
        placeholder="Verification token"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        autoCapitalize="none"
      />

      <Pressable style={styles.btn} onPress={verify} disabled={loading}>
        <Text style={styles.btnText}>
          {loading ? "Verifying..." : "Verify"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0B1220", gap: 12 },
  title: { color: "#FFF", fontSize: 26, fontWeight: "800", marginTop: 10 },
  sub: { color: "rgba(255,255,255,0.75)", lineHeight: 20 },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFF",
  },
  btn: {
    backgroundColor: "#4F8CFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#FFF", fontWeight: "800", fontSize: 16 },
});
