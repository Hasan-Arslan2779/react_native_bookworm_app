import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.styles";
import COLORS from "../constant/color";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have this package installed

export default function LogoutButton() {
  const { logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => logout(),
        style: "destructive",
      },
    ]);
  };
  return (
    <TouchableOpacity onPress={confirmLogout} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}
