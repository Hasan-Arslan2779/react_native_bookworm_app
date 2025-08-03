import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.styles"; // Adjust the import path as necessary
import { Image } from "expo-image"; // Import Image if you plan to use it
import { formatMemberSince } from "../../mobile/lib/utils"; // Adjust the import path as necessary
export default function ProfileHeader() {
  const { user } = useAuthStore(); // Assuming useAuthStore provides user data
  return (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: user?.profileImage }} // Assuming user.profileImage is a URL
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{user?.username}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
        <Text>
          🤝 Joined {formatMemberSince(user?.createdAt)}
          {/* Assuming you have a function to format the date */}
        </Text>
      </View>
    </View>
  );
}
