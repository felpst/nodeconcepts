const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  if(!customer)
  {
      return response.status(400).json({error: "User Account not found"});
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  // Complete aqui
  const { name, username } = request.body;

  const customerAlreadyExists = users.some((user) => user.username === username);

  if(customerAlreadyExists)
  {
      return res.status(400).json({ error: "Username already exists!"});
  };

  users.push({
    id: uuidv4(),
	  name, 
	  username, 
	  todos: []
  })

  return res.status(201).send(users[users.length - 1]);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  const todos = user.todos;

  response.send(todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { title, deadline } = request.body;
  const { username } = request.headers;

  const todo = {
    id: uuidv4(), 
	  title,
	  done: false, 
	  deadline: new Date(deadline), 
	  created_at: new Date(),
  }

  const user = users.find((user) => user.username === username);

  user.todos.push(todo);

  return response.send(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { username } = request.headers;
  const { title, deadline } = request.body;
  const { id } = response.params;

  const user = users.find((user) => user.username === username);

  

});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;