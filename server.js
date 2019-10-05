const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
// Setting the port to whatever is in the environment variable PORT, or 3000 if there's nothing there.
app.use(express.json());
// this allows us to parse application/json

app.get('/', (req, res) => {
  res.send('Oh hey BYOB');
  // This is essentially a test for the root route and will respond with "Oh hey BYOB" when a get request is made to the homepage
})

app.get('/api/v1/teams', (req, res) => {
  // get request for standard teams endpoint
  database('teams').select()
  // queries the teams database
    .then((teams) => {
      res.status(200).json(teams);
      // if the request is successful, a 200 status code is returned along with all the teams data
    })
    .catch((error) => {
      res.status(500).json({ error });
      // if the request is unsuccessful, a 500 status code is returned along with an error object with an error message
    })
})  

app.get('/api/v1/teams/:id', (req, res) => {
  // get request for a specific team
  database('teams').where('id', req.params.id).select()
  // goes through the teams database and finds the team where the id matches the id at the end of the endpoint. It then selects this item
    .then((teams) => {
      if(teams.length) {
        res.status(200).json(teams);
        // if the request is successful and a team is found, a 200 status code is returned along with that team's data
      } else {
        res.status(404).json({
          error: `Could not find team with id ${req.params.id}`
        // if the id doesn't match any teams in the database, an error message is returned with the attempted ID
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
      // if the server is not running or crashes a 500 status code is returned along with an error message
    })
})  

app.get('/api/v1/players', (req, res) => {
  // get request for standard players endpoint
  database('players').select()
    .then((players) => {
      res.status(200).json(players);
      // if the request is successful, a 200 status code is returned along with all the players data
    })
    .catch((error) => {
      res.status(500).json({ error });
      // if the request is unsuccessful, a 500 status code is returned along with an error object with an error message
    })
}) 

app.get('/api/v1/players/:id', (req, res) => {
  // get request for a specific player
  database('players').where('id', req.params.id).select()
    // goes through the players database and finds the player where the id matches the id at the end of the endpoint. It then selects this item
    .then((players) => {
      if(players.length) {
        res.status(200).json(players);
        // if the request is successful and a player is found, a 200 status code is returned along with that player's data
      } else {
        res.status(404).json({ error: `Could not find player with id ${req.params.id}` })
        // if the id doesn't match any players in the database, an error message is returned with the attempted ID
      }
    })
    .catch((error) => {
      res.status(500).json({ error })
      // if the server is not running or crashes a 500 status code is returned along with an error message
    })
})

app.delete('/api/v1/players/:id', (req, res) => {
  // delete request for a specific player
  database('players').where('id', req.params.id).del()
  // goes through the players database and matches that player's id with the one passed in the endpoint. If found it is deletes that player data.
    .then((player) => {
      if(player) {
        res.status(200).json({ message: `You successfully deleted player with id ${req.params.id}`})
        // If a match is found, a 200 status code is returned and a message stating the deleted id is returned
      } else {
        res.status(404).json({ error: `Could not find player with id ${req.params.id}` })
        // If a match is not found, an error message is returned stating that a match could not be found.
      }
    })
    .catch((error) => {
      res.status(500).json({ error })
      // if the server is not running or crashes a 500 status code is returned along with an error message
    })
})

app.post('/api/v1/teams', (req, res) => {
  // post request for the teams database
  const team = req.body;
  // saves the request body in a team variable

  for (let requiredParameter of ["name", "gamesPlayed", "goals", "assists"]) {
    // similar to your standard four loop, this will loop through the provided array
    if(!team[requiredParameter]) {
      // if the request body doesn't include on the of the string in the array an error with be thrown.
      return res
      .status(422)
      .send({ error: `Expected format: { name: <string>, gamesPlayed: <number>, goals: <number>, assists: <number }. You are missing a ${requiredParameter} property.` })
      // An error is returned specifying the particular parameter that was not provided
    }
  }

  database('teams').insert(team, 'id')
  // attempts to insert the request body into the teams database, the database gives the new item an id which is returned.
    .then((team) => {
      res.status(201).json({ id: team[0]})
      // if the request is successful a 201 status code is returned along with the new id.
    })
    .catch((error) => {
      res.status(500).json({ error })
      // if the request fails, a 500 status code is returned along with an error message.
    });
});

app.post('/api/v1/players', async (req, res) => {
  // post request for the players endpoint
  let player = req.body;
  // saves the request body in a player variable
  let targetTeam = await database('teams').where('name', player.team).first();
  // searches the teams database for a team where the team name matches the player team passed through in the request. It then selects this team and saves it to the variable targetTeam
  let playerToInsert = {goals: player.goals, position: player.position, name: player.name, team_id: targetTeam.id }
  // structures the new player to be inserted into the players database

  for (let requiredParameter of ['name', 'goals', 'position', 'team']) {
    // Same as the post request for teams, this is a way of setting required parameters. If any of the parameters are not given in the request then an error with be thrown specifying the missing parameter.
    if(!player[requiredParameter]) {
      return res
        .status(422)
        .send({ error: `Expected format: { name: <string>, goals: <number>, position: <string>, team: <string>. You are missing a ${requiredParameter} property. }` })
    }
  }

  database('players').insert(playerToInsert, 'id')
  // attempts to insert the new player into the players database. The new player is given an id by the database which is returned.
    .then((player) => {
      res.status(201).json({ id: player[0] })
      // if the request is successful, a 201 status code is returned along with the new id.
    })
    .catch((error) => {
      res.status(500).json({ error })
      // if the request is unsuccessful, a 500 status code is returned along with an error message.
    })
})

app.listen(app.get('port'), () => {
  // Tells the app to listen for and accept connections at port 3000.
  console.log(`this is running on http://localhost:${app.get('port')}.`)
  // console.log if connection is made
})