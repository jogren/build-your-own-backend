const teamData = require('../../teamData');

const createTeam = (knex, team) => {
  return knex('teams').insert({
    name: team.name,
    gamesPlayed: team.gamesPlayed,
    goals: team.goals,
    assists: team.assists
  }, 'id')
    .then(teamId => {
      let playerPromises = [];

      team.players.forEach(player => {
        playerPromises.push(
          createPlayer(knex, {
            name: player.name,
            goals: player.goals,
            position: player.position,
            team_id: teamId[0]
          })
        )
      });

      return Promise.all(playerPromises)
    })
};

const createPlayer = (knex, player) => {
  return knex('players').insert(player)
}

exports.seed = (knex) => {
  return knex('players').del()
    .then(() => knex('teams').del())
    .then(() => {
      let teamPromises = [];

      teamData.forEach(team => {
        teamPromises.push(createTeam(knex, team))
      });

      return Promise.all(teamPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
