import { StyleSheet, Text, View } from "react-native";
import React from "react";

import COLORS from "../constant/color.js";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 20,
            color: COLORS.primary,
          },
        ]}
      >
        Hello
      </Text>
      <Link href="/(auth)">Login Page</Link>
      <Link href="/(auth)/signup">Signup Page</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    color: "red",
  },
});

// 1:58 de kaldık youtubede
