exports.up = function (knex) {
  return knex.schema.table("products", (table) => {
    table.string("category").notNullable().defaultTo("drink");
  });
};

exports.down = function (knex) {
  return knex.schema.table("products", (table) => {
    table.dropColumn("category");
  });
};
