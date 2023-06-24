exports.seed = async function (knex) {
  await knex('recipes').del()
}
