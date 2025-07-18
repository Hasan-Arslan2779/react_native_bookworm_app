import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../store/authStore";
export default function Home() {
  const { logout } = useAuthStore();
  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text style={{ fontSize: 25 }}>Çıkış</Text>
      </TouchableOpacity>
      <Text>Home</Text>
    </View>
  );
}
