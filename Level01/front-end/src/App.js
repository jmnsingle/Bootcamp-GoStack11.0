import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';

export default function App() {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
      console.log(response.data);
    });
    console.log('chamou a funcao')
  }, []);

  function handleAddProject() {
    api.post('projects', {
      title: `New owner ${Date.now()}`,
      owner: "Owner of project",
    }).then(response => setProjects([...projects, response.data]));
  }

  return (
    <ul>
      {projects.map(project => <li key={project.id}>{project.title}</li>)}
      <button type='button' onClick={handleAddProject}>Add Project</button>
    </ul>
  );
}
