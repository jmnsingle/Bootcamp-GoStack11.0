const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logResquest(req, res, next) {
  const { method, url } = req;

  const logLabel = `Method [${method}] - URL: ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ err: "Project ID not found" });
  }

  return next();
}

app.use(logResquest);
app.use('/projects/:id', validateProjectId);

app.post('/projects', (req, res) => {
  const { title, owner } = req.body;
  
  const project = { id: uuid(), title, owner };
  
  projects.push(project);
  
  return res.json(project);
});

app.get('/projects', (req, res) => {
  const { title } = req.query;

  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;

  res.json(results);
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({err: "Project not found"});
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  res.json(project);
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json('Project not found');
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();

});

app.listen('3333', () => console.log('Server running on port 3333'));