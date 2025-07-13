import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../constant/color.js";
const SafeScreen = ({ children }) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {children}
    </View>
  );
};

export default SafeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
