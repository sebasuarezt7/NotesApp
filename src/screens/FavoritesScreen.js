import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState('');

  // Load favorites when screen opens
  useEffect(() => {
    loadFavorites();
  }, []);

  // Load saved favorites
  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('@favorites');
      if (saved !== null) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Save favorites to storage
  const saveFavorites = async (updated) => {
    try {
      await AsyncStorage.setItem('@favorites', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Add new favorite item
  const addFavorite = () => {
    if (newFavorite.trim() === '') {
      Alert.alert('Error', 'Please enter an item');
      return;
    }

    const item = {
      id: Date.now().toString(),
      name: newFavorite,
    };

    const updated = [...favorites, item];
    setFavorites(updated);
    saveFavorites(updated);

    setNewFavorite('');
  };

  // Remove favorite item
  const removeFavorite = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    saveFavorites(updated);
  };

  // Render each item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>⭐ {item.name}</Text>
      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Favorites</Text>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newFavorite}
          onChangeText={setNewFavorite}
          placeholder="Add a favorite item..."
        />

        <TouchableOpacity style={styles.button} onPress={addFavorite}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No favorites yet!</Text>
        }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  homeButton: {
    backgroundColor: '#555',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },

  itemText: {
    fontSize: 16,
  },

  removeText: {
    color: '#ff3b30',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});

export default FavoritesScreen;