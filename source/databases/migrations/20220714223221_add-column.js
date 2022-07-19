/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('teachers', function (table) {
    table.integer('avatarUrl').unsigned().notNullable()
  })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.down = function (knex) {
  return knex.schema.dropTable('teachers', function (table) {
    table.dropForeign('avatarUrl')
    table.dropColumn('avatarUrl')
  })
}
