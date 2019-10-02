exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.integer('gamesPlayed');
      table.integer('goals');
      table.integer('assists');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('players', (table) => {
      table.increments('id').primary();
      table.integer('goals');
      table.string('position');
      table.integer('team_id').unsigned();
      table.foreign('team_id').references('teams.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('players'),
    knex.schema.dropTable('teams')
  ])
};