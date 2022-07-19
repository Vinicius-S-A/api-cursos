/** //LESSONS
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('lessons', function (table) {
    table.integer('description').unsigned().notNullable()

    table.integer('link').unsigned().notNullable()

    table
      .integer('teacher')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('teachers')
      .onDelete('CASCADE')
      
      table
      .integer('cursoId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cursos')
      .onDelete('CASCADE')

  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('lessons', function (table) {
    table.dropForeign('description')
    table.dropColumn('description')

    table.dropForeign('link')
    table.dropColumn('link')

    table.dropForeign('teacher')
    table.dropColumn('teacher')

    table.dropForeign('cursoId')
    table.dropColumn('cursoId')

  })
}
