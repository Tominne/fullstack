import { ChangeEvent, FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addRecipe } from '../apis/recipe'
import { RecipeData } from '../../models/recipe'

const initialFormData = {
  recipeName: '',
  recipeType: '',
}

export default function RecipeForm() {
  const [form, setForm] = useState<RecipeData>(initialFormData)

  const queryClient = useQueryClient()

  const addRecipeMutation = useMutation(addRecipe, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['recipes'])
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addRecipeMutation.mutate(form)
    setForm(initialFormData)
  }

  if (addRecipeMutation.isError) {
    return <div>There was an error trying to add your recipe</div>
  }

  if (addRecipeMutation.isLoading) {
    return <div>Adding your recipe</div>
  }

  return (
    <>
      <section id="add-recipe-to-list" className="formContainer">
        <form onSubmit={handleSubmit} aria-label="Add Recipe Form">
          <p>
            <label htmlFor="recipeName">Recipe Name</label>
            <input
              type="text"
              id="recipeName"
              onChange={handleChange}
              name="recipeName"
              value={form.recipeName}
              required
            />
          </p>
          <p>
            <label htmlFor="recipeType">Recipe Type</label>
            <input
              type="text"
              id="recipeType"
              onChange={handleChange}
              name="recipeType"
              value={form.recipeType}
              required
            />
          </p>
          <button type="submit">Add Recipe</button>
        </form>
      </section>
    </>
  )
}
