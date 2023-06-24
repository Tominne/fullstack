import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { getRecipeById } from '../apis/recipe'

export default function RecipeDetails() {
  const { recipeId } = useParams()

  const recipeDetailsQuery = useQuery(['recipes', recipeId], () =>
    getRecipeById(recipeId as string)
  )

  if (recipeDetailsQuery.isError) {
    return <div>There was an error getting your recipe</div>
  }

  if (recipeDetailsQuery.isLoading) {
    return <div>Loading your recipe</div>
  }

  return (
    <section className="recipe-details">
      <h2>Recipe Details</h2>
      <div>
        <p>Name: {recipeDetailsQuery.data.recipeName}</p>
        <p>Type: {recipeDetailsQuery.data.recipeType}</p>
      </div>
      <br />
      <h2>More to come...</h2>
    </section>
  )
}
