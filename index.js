// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/api', (req, res) => {
  res.send('Working!');
});

 server.get('/api/users', (req, res)=> {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: "The users information could not be retrieved." });
    })
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist."});
      }
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "The user information could not be retrieved." });
    })
})



server.listen(5000, () =>
  console.log(`Listening on port 5000`));