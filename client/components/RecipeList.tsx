import { getRecipes } from '../apis/recipe'
import { Link } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import RecipeForm from './RecipeForm'
import RecipeListItem from './RecipeListItem'

export default function RecipeList() {
  const {
    data: recipeList,
    isError,
    isLoading,
  } = useQuery(['recipes'], getRecipes)

  if (isError) {
    return <div>There was an error loading recipes</div>
  }

  if (!recipeList || isLoading) {
    return <div>Loading recipes...</div>
  }

  return (
    <>
      <section className="recipe-list">
        <h2>Recipe List</h2>
        <div>
          {recipeList.map((recipe) => (
            <div key={recipe.id}>
              <h3>
                <Link to={`${recipe.id}`} id="link">
                  {recipe.recipeName}
                </Link>
              </h3>
              <div>
                <RecipeListItem
                  key={recipe.id}
                  recipeId={recipe.id}
                  recipeName={recipe.recipeName}
                  recipeType={recipe.recipeType}
                />
                <br />
              </div>
            </div>
          ))}
        </div>

        <h2>Add A Recipe</h2>
        <RecipeForm />
      </section>
    </>
  )
}
