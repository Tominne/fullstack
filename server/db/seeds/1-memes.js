/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('memes').del()
  await knex('memes').insert([
    {
      id: 1,
      meme_name: 'One Does Not Simply',
      meme_url: 'https://i.imgflip.com/1bij.jpg',
    },
    {
      id: 2,
      meme_name: 'Ancient Aliens',
      meme_url: 'https://i.imgflip.com/26am.jpg',
    },
  ])
}
