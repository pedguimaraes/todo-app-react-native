import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { useState } from 'react';
import db from '../database/database';

export default function CreateTask({ navigation }: any) {
  const [title, setTitle] = useState('');

  function saveTask() {
    db.runSync('INSERT INTO tasks (title) VALUES (?)', [title]);
    navigation.goBack();
  }

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Nova Tarefa</Text>

        <TextInput
          placeholder="Digite a tarefa"
          placeholderTextColor="#ccc"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={saveTask}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});