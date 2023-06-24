import request from 'superagent'
import { Recipe, RecipeData } from '../../models/recipe'

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const recipeURL = '/api/v1/recipe'

// GET /api/v1/recipe
export async function getRecipes(): Promise<Recipe[]> {
  // await sleep(1000)
  const response = await request.get(recipeURL)
  console.log(response.body.recipe)
  return response.body.recipe
}

// GET /api/v1/recipe/:recipeId
export async function getRecipeById(recipeId: string): Promise<Recipe> {
  const response = await request.get(`${recipeURL}/${recipeId}`)
  return response.body.recipe
}

// POST /api/v1/recipe
export async function addRecipe(newRecipe: RecipeData): Promise<Recipe> {
  const response = await request.post(recipeURL).send({ newRecipe })
  console.log(response.body)
  return response.body.recipe
}
interface DeleteRecipe {
  recipeId: Recipe['id']
}
// DELETE /api/v1/recipe/:recipeId
export async function deleteRecipe({ recipeId }: DeleteRecipe): Promise<void> {
  await request.delete(`${recipeURL}/${recipeId}`)
}

interface UpdateRecipe {
  recipeId: Recipe['id']
  newRecipeName: Recipe['recipeName']
  newRecipeType: Recipe['recipeType']
}

export async function updateRecipe({
  recipeId,
  newRecipeName,
  newRecipeType,
}: UpdateRecipe): Promise<void> {
  await request
    .patch(`${recipeURL}/${recipeId}`)
    .send({ recipeName: newRecipeName, recipeType: newRecipeType })
}
