import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

//

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { user, token, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  //

  useEffect(() => {
    if (isCheckingAuth) return;
    const inAuthScreen = segments[0] === "(auth)";
    const isSigned = user && token;

    if (!isSigned && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSigned && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [token, user, segments]);

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
