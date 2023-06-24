import db from './connection'
import { Recipe, RecipeData } from '../../models/recipe'

export async function getAllRecipes(): Promise<Recipe[]> {
  const recipe = await db<Recipe>('recipes').select(
    'recipes.id',
    'recipe_name as recipeName',
    'recipe_type as recipeType'
  )
  return recipe
}

export async function getRecipeById(recipeId: number): Promise<Recipe> {
  const recipe = await db('recipes')
    .where('recipes.id', recipeId)
    .select(
      'recipes.id',
      'recipe_name as recipeName',
      'recipe_type as recipeType'
    )
    .first()
  return recipe
}

export async function addRecipe(newRecipe: RecipeData): Promise<Recipe> {
  const [recipe] = await db('recipes')
    .insert({
      recipe_name: newRecipe.recipeName,
      recipe_type: newRecipe.recipeType,
    })
    .returning('*')

  return recipe
}

export async function deleteRecipe(recipeId: number): Promise<void> {
  await db('recipes').where('recipes.id', recipeId).del()
}

export async function updateRecipe(
  id: number,
  recipeName: string,
  recipeType: string
): Promise<Recipe | undefined> {
  const [updatedRecipe] = await db('recipes')
    .where({
      id,
    })
    .update({
      recipe_name: recipeName,
      recipe_type: recipeType,
    })
    .returning(['recipe_name', 'recipe_type'])

  return updatedRecipe
}
