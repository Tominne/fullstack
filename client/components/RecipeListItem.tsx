import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteRecipe, updateRecipe } from '../apis/recipe'

interface Props {
  recipeId: number
  recipeName: string
  recipeType: string
}

export default function RecipeListItem({
  recipeId,
  recipeName,
  recipeType,
}: Props) {
  const [updating, setUpdating] = useState(false)
  const [rename, setRename] = useState(recipeName)
  const [retype, setRetype] = useState(recipeType)

  const queryClient = useQueryClient()

  const deleteRecipeMutation = useMutation(deleteRecipe, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['recipes'])
    },
  })

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    deleteRecipeMutation.mutate({ recipeId })
    console.log('deleting', recipeId)
  }

  const updateRecipeMutation = useMutation(updateRecipe, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['recipes'])
    },
  })

  const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    updateRecipeMutation.mutate({
      recipeId,
      newRecipeName: rename,
      newRecipeType: retype,
    })

    console.log('submitting', rename, retype)

    setUpdating(false)
  }

  const handleStopUpdatingClick = () => {
    setUpdating(false)
    setRename(recipeName)
    setRetype(recipeType)
  }

  const handleStartUpdatingClick = () => {
    setUpdating(true)
  }

  return (
    <>
      <div>
        {updating ? (
          <form onSubmit={handleUpdateSubmit} aria-label="Update Recipe Form">
            <label htmlFor="recipeName">Rename: </label>
            <input
              type="text"
              name="recipeName"
              id="recipeName"
              value={rename}
              onChange={(e) => setRename(e.target.value)}
            />

            <label htmlFor="recipeType">Type: </label>
            <input
              type="text"
              name="recipeType"
              id="recipeType"
              value={retype}
              onChange={(e) => setRetype(e.target.value)}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleStopUpdatingClick}>
              Stop
            </button>
          </form>
        ) : (
          <p>
            <button onClick={handleDeleteClick}>Delete</button>
            <button onClick={handleStartUpdatingClick}>Update</button>
          </p>
        )}
      </div>
    </>
  )
}
