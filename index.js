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
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "The user information could not be retrieved." });
    })
});

server.post('/api/users', (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
  }
  const created_at = new Date();
  const updated_at = created_at;
  db.insert({ name, bio, created_at, updated_at })
    .then(data => {
      res.status(201).json({
          id: data.id,
          name,
          bio,
          created_at,
          updated_at,
      });
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the user to the database." })
    })
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      } else {
        res.status(200).json({ message: `The user with id ${id} has now been removed from the database.`});
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed."})
    });
});

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const name = req.body.name;
  const bio = req.body.bio;
  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user."});
  }
  db.update(id, user)
      .then(data => {
        if (!data) {
          res.status(404).json({ message: "The user with the specified ID does not exist."});
        }
        res.status(200).json({ user: {...user, id }})
      })
      .catch(error => {
        res.status(500).json({ error: "The user information could not be modified."});
      })
});

server.listen(5000, () =>
  console.log(`Listening on port 5000`));
