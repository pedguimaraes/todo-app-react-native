import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { useEffect, useState } from 'react';
import db, { initDB } from '../database/database';

export default function Home({ navigation }: any) {
  const [tasks, setTasks] = useState<any[]>([]);

  function loadTasks() {
    const result = db.getAllSync('SELECT * FROM tasks');
    setTasks(result);
  }

  function deleteTask(id: number) {
    db.runSync('DELETE FROM tasks WHERE id = ?', [id]);
    loadTasks();
  }

 useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    loadTasks();
  });

  return unsubscribe;
}, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Minhas Tarefas</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create')}
        >
          <Text style={styles.buttonText}>+ Nova Tarefa</Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.taskText}>{item.title}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Edit', { task: item })}
                >
                  <Text style={styles.edit}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={{ color: 'red'}}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10
  },
  taskText: {
    color: '#fff',
    fontSize: 16
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  edit: {
    color: '#4CAF50'
  },
  delete: {
    color: '#FF5252'
  }
});