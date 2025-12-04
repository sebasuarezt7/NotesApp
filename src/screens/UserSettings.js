import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSettings = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Load settings when screen opens
  useEffect(() => {
    loadSettings();
  }, []);

  // Load saved settings
  const loadSettings = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('@username');
      const savedDarkMode = await AsyncStorage.getItem('@darkMode');
      const savedNotifications = await AsyncStorage.getItem('@notifications');

      if (savedUsername !== null) setUsername(savedUsername);
      if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true');
      if (savedNotifications !== null)
        setNotifications(savedNotifications === 'true');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  // Save all settings
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('@username', username);
      await AsyncStorage.setItem('@darkMode', darkMode.toString());
      await AsyncStorage.setItem('@notifications', notifications.toString());

      Alert.alert('Success', 'Settings saved!');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Settings</Text>

      {/* Username Input */}
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />

      {/* Dark Mode Switch */}
      <View style={styles.setting}>
        <Text style={styles.label}>Dark Mode:</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Notifications Switch */}
      <View style={styles.setting}>
        <Text style={styles.label}>Notifications:</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>

      {/* Notes Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Notes')}
      >
        <Text style={styles.buttonText}>Go To Notes</Text>
      </TouchableOpacity>

      {/* Favorites Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.buttonText}>Go To Favorites</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserSettings;