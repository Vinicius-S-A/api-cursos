/** //CURSOS
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('cursos', function (table) {
    table.integer('description').unsigned().notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('cursos', function (table) {
    table.dropForeign('description')
    table.dropColumn('description')
  })
}
