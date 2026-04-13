import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import db from '../database/database';

export default function EditTask({ route, navigation }: any) {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);

  function updateTask() {
    db.runSync('UPDATE tasks SET title = ? WHERE id = ?', [title, task.id]);
    navigation.goBack();
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title="Atualizar" onPress={updateTask} />
    </View>
  );
}