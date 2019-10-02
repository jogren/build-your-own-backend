exports.up = (knex) => {
  return knex.schema.table('players', (table) => {
    table.string('name');
  })  
};

exports.down = (knex) => {
  return knex.schema.table('players', (table) => {
    table.dropColumn('name');
  })
};
