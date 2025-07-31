import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import styles from "../../assets/styles/home.styles";
import { API_URL } from "../../constant/api";
export default function Home() {
  const { logout, token } = useAuthStore();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Get books from API
  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNum === 1) {
        setLoading(true);
      }
      const response = await axios.get(
        `${API_URL}/books?page=${pageNum}&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;

      if (!data || !data.books) {
        throw new Error(data.message || "Failed to fetch books");
      }

      setBooks((prevBooks) =>
        refresh ? data.books : [...prevBooks, ...data.books]
      );
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      if (refresh) {
        setRefreshing(false);
      }
      setLoading(false);
    }
  };
  // Fetch books on initial render and when page changes
  useEffect(() => {
    fetchBooks();
  }, [token]);

  // Handle pull-to-refresh
  const handleLoadMore = async () => {};
  //Render item for FlatList
  const rendemItem = ({ item }) => (
    <View style={styles.bookCard} key={item.id}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: item.user?.profileImage,
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
          <Text style={styles.username}>{item.user?.username}</Text>
        </View>
      </View>
      <View style={styles.bookImageContainer}>
        <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={rendemItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <Text>Hey</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
