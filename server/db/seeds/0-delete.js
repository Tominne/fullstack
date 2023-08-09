exports.seed = async function (knex) {
  await knex('memes').del()
}
