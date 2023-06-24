/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()
  await knex('recipes').insert([
    {
      id: 1,
      recipe_name: 'Chocolate Chip Cookies',
      recipe_type: 'Cookie',
    },
    {
      id: 2,
      recipe_name: 'Cup Cakes',
      recipe_type: 'Cake',
    },
    {
      id: 3,
      recipe_name: 'Vanilla cake',
      recipe_type: 'Cake',
    },
    {
      id: 4,
      recipe_name: 'Pumpkin Soup',
      recipe_type: 'Lunch',
    },
    {
      id: 5,
      recipe_name: 'Chicken Roast',
      recipe_type: 'Dinner',
    },
  ])
}
