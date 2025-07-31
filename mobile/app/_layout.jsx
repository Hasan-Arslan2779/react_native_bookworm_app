import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { user, token, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSigned = user && token;

    if (!isSigned && !inAuthScreen) {
      setTimeout(() => {
        router.replace("/(auth)");
      }, 1000);
    } else if (isSigned && !inAuthScreen) {
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 1000);
    }
  }, [token, user]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
