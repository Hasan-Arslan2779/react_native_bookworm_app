import axios from "axios";
import { router } from "expo-router";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Store Oluşturma
// Youte 2:54:13
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        "http://192.168.239.149:3000/api/auth/register", // Bilgisayarının IP adresi
        { username, email, password }
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data.message);
        router.replace("/");
      } else {
        console.log("Beklenmeyen durum", response.status);
      }
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("token", response.data.token);

      set({ token: response.data.token, user: response.data.user });
      return { succes: true };
    } catch (error) {
      set({ isLoading: false });
      if (error.response) {
        //Sunucudan gelen hata
        console.error("Hata yanıtı:", error.response.data);
      } else {
        // Ağ veya diğer hatalar
        console.error("İstek hatası:", error.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        "http://192.168.239.149:3000/api/auth/login", // Bilgisayarının IP adresi
        { email, password }
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data.message);
        router.replace("/");
      } else {
        console.log("Beklenmeyen durum", response.status);
      }
    } catch (error) {
      set({ isLoading: false });
      console.log("Girş yapılamadı Hata ", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
