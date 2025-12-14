import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Landing">;

export default function LandingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Book Library</Text>
        <Text style={styles.title}>Discover your next favorite book.</Text>
        <Text style={styles.subtitle}>
          Save your reading list, track progress, and build your personal
          library.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryBtn,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.primaryText}>Dive In</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryBtn,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.secondaryText}>Create Account</Text>
        </Pressable>

        <Text style={styles.footerText}>
          By continuing, you agree to our Terms & Privacy Policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "#0B1220",
  },
  hero: {
    paddingTop: 80,
    gap: 12,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#EAF0FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
  },
  subtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 16,
    lineHeight: 22,
  },
  actions: {
    paddingBottom: 24,
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: "#4F8CFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryText: {
    color: "#EAF0FF",
    fontWeight: "700",
    fontSize: 16,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },
  footerText: {
    marginTop: 10,
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
