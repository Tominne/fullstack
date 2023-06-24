import express from 'express'
import * as db from '../db/db'
import { RecipeData } from '../../models/recipe'

const router = express.Router()

// GET /api/v1/recipe
router.get('/', async (req, res) => {
  try {
    const recipe = await db.getAllRecipes()
    res.json({ recipe })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ error: 'There was an error trying to get the recipes' })
  }
})

// GET /api/v1/recipe/:recipeId
router.get('/:recipeId', async (req, res) => {
  try {
    const recipeId = Number(req.params.recipeId)
    if (isNaN(recipeId)) {
      res.sendStatus(400).json({ error: 'Invalid recipe ID' })
      return
    }
    const recipe = await db.getRecipeById(recipeId)
    res.json({ recipe })
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({
      error: 'There was an error trying to get the recipe',
    })
  }
})

// POST /api/v1/recipe
router.post('/', async (req, res) => {
  try {
    const newRecipe = req.body.newRecipe as RecipeData
    if (!newRecipe) {
      res.sendStatus(400)
      return
    }
    const recipe = await db.addRecipe(newRecipe)
    res.json({ recipe })
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({
      error: 'There was an error trying to add your shark to the database',
    })
  }
})

// DELETE /api/v1/recipe/
router.delete('/:recipeId', async (req, res) => {
  try {
    const recipeId = Number(req.params.recipeId)
    if (isNaN(recipeId)) {
      console.log('Invalid recipe id')
      res.sendStatus(400).send('Bad request')
      return
    }
    await db.deleteRecipe(recipeId)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.patch('/:recipeId', async (req, res) => {
  const recipeId = parseInt(req.params.recipeId)
  if (isNaN(recipeId)) {
    console.log('Invalid recipe id')
    res.sendStatus(400).send('Bad request')
    return
  }
  const recipeName = req.body.recipeName
  if (!recipeName) {
    res.status(400).send('Bad request: Recipe Name is required')
    return
  }

  const recipeType = req.body.recipeType
  if (!recipeType) {
    res.status(400).send('Bad request: Recipe Type is required')
    return
  }
  try {
    await db.updateRecipe(recipeId, recipeName, recipeType)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500).send('Could not update this recipe')
  }
})

export default router
