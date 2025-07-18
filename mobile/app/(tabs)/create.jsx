import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles"; // Assuming you have a styles.js file for styles
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constant/color";

const Create = () => {
  const [title, setTitle] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [rating, setRating] = React.useState(3);
  const [imageBase64, setImageBase64] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  //
  const router = useRouter();

  const pickImage = async () => {
    // Function to pick an image from the device
  };

  const handleSumbit = async () => {
    // Function to handle the submission of the form
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>
              Share your favorite reads with others
            </Text>
          </View>
          <View style={styles.form}>
            {/* BOOK TİTLE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor={COLORS.placeholderText}
                  placeholder="Enter book title"
                />
              </View>
            </View>
            {/* RATİNG */}
            <View style={styles.formGroup}></View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;
