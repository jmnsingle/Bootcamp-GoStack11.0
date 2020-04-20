import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import api from './src/services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => setProjects(response.data));
  }, []);

  async function handleAddProject() {
    const {data: project} = await api.post('projects', {
      title: `New project ${Date.now()}`,
      owner: 'Juliano Nogueira',
    });

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(projects) => projects.id}
          renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddProject}>
          <Text style={styles.text}>Adicionar novo projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  project: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 44,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
