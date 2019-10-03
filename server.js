const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());

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

app.get('/api/v1/teams/:id', (req, res) => {
  database('teams').where('id', req.params.id).select()
    .then((teams) => {
      if(teams.length) {
        res.status(200).json(teams);
      } else {
        res.status(404).json({
          error: `Could not find team with id ${req.params.id}`
        });
      }
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

app.get('/api/v1/players/:id', (req, res) => {
  database('players').where('id', req.params.id).select()
    .then((players) => {
      if(players.length) {
        res.status(200).json(players);
      } else {
        res.status(404).json({ error: `Could not find player with id ${req.params.id}` })
      }
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
})

app.delete('/api/v1/players/:id', (req, res) => {
  database('players').where('id', req.params.id).del()
    .then((player) => {
      if(player) {
        res.status(200).json({ message: `You successfully deleted player with id ${req.params.id}`})
      } else {
        res.status(404).json({ error: `Could not find player with id ${req.params.id}` })
      }
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
})

app.post('/api/v1/teams', (req, res) => {
  const team = req.body;

  for (let requiredParameter of ["name", "gamesPlayed", "goals", "assists"]) {
    if(!team[requiredParameter]) {
      return res
      .status(422)
      .send({ error: `Expected format: { name: <string>, gamesPlayed: <number>, goals: <number>, assists: <number }. You are missing a ${requiredParameter} property.` })
    }
  }

  database('teams').insert(team, 'id')
    .then((team) => {
      res.status(201).json({ id: team[0]})
    })
    .catch((error) => {
      res.status(500).json({ error })
    });
});

app.post('/api/v1/players', (req, res) => {
  const player = req.body;

  for (let requiredParameter of ['name', 'goals', 'position']) {
    if(!player[requiredParameter]) {
      return res
        .status(422)
        .send({ error: `Expected format: { name: <string>, goals: <number>, position: <string>. You are missing a ${requiredParameter} property. }` })
    }
  }

  database('players').insert(player, 'id')
    .then((player) => {
      res.status(201).json({ id: player[0] })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`this is running on http://localhost:${app.get('port')}.`)
})