import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { mockAnimes } from '../services/mockData';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen({ navigation }) {

  const handleLogout = async () => {
    // We don't have a direct way to reset the AppNavigator state here without context/redux,
    // so for a simple app we might just delete token. A real app uses a global state.
    await SecureStore.deleteItemAsync('userToken');
    // We'd typically dispatch a signout event here.
    // For this boilerplate, the user might need to restart the app.
    alert("Çıkış yapıldı, uygulamayı yeniden başlatın.");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AnimeDetail', { anime: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockAnimes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 150,
  },
  cardContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  logoutButton: {
    padding: 15,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.danger,
    fontWeight: 'bold',
  }
});
