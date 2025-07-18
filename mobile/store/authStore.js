import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        "http://192.168.155.149:3000/api/auth/register", // <-- Doğru endpoint!
        { username, email, password }
      );

      // Axios hata durumunda otomatik olarak catch'e düşer, burada kontrol gerekmez
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("token", response.data.token);

      set({
        token: response.data.token,
        user: response.data.user,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Kayıt sırasında hata oluştu",
      };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(
        "http://192.168.155.149:3000/api/auth/login",
        { email, password }
      );

      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("token", response.data.token);

      set({
        token: response.data.token,
        user: response.data.user,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Giriş sırasında hata oluştu",
      };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
