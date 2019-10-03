const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Oh hey BYOB');
})

app.get('/api/v1/teams', (req, res) => {
  database('teams').select()
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
})  

app.get('/api/v1/players', (req, res) => {
  database('players').select()
    .then((players) => {
      res.status(200).json(players);
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
}) 

app.listen(app.get('port'), () => {
  console.log(`this is running on http://localhost:${app.get('port')}.`)
})