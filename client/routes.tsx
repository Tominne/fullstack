import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<RecipeList />} />

    <Route path=":recipeId" element={<RecipeDetails />} />
  </Route>
)
