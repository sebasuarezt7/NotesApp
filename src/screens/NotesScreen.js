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

const NotesScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Load notes when screen opens
  useEffect(() => {
    loadNotes();
  }, []);

  // Load notes from storage
  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('@notes');
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  // Save notes
  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem('@notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
      Alert.alert('Error', 'Failed to save note');
    }
  };

  // Add new note
  const addNote = () => {
    if (newNote.trim() === '') {
      Alert.alert('Error', 'Please enter a note');
      return;
    }

    const note = {
      id: Date.now().toString(),
      text: newNote,
      date: new Date().toLocaleDateString(),
    };

    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setNewNote('');
  };

  // Delete a note
  const deleteNote = (id) => {
    Alert.alert('Delete Note', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
          saveNotes(updatedNotes);
        },
      },
    ]);
  };

  // Render a single note
  const renderNote = ({ item }) => (
    <View style={styles.noteItem}>
      <View style={styles.noteContent}>
        <Text style={styles.noteText}>{item.text}</Text>
        <Text style={styles.noteDate}>{item.date}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNote(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Notes</Text>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newNote}
          onChangeText={setNewNote}
          placeholder="Enter a new note..."
          multiline
        />

        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>


      {/* List */}
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notes yet. Add one above!</Text>
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

  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 16,
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

  noteItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },

  noteContent: {
    flex: 1,
  },

  noteText: {
    fontSize: 16,
    marginBottom: 4,
  },

  noteDate: {
    fontSize: 12,
    color: '#666',
  },

  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 6,
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40,
  },
});

export default NotesScreen;