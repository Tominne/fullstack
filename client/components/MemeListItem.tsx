import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deletememe, updatememe } from '../apis/memes'

interface Props {
  memeId: number
  memeName: string
  memeUrl: string
}

export default function MemeListItem({ memeId, memeName, memeUrl }: Props) {
  const [updating, setUpdating] = useState(false)
  const [rename, setRename] = useState(memeName)
  const [reUrl, setReUrl] = useState(memeUrl)

  const queryClient = useQueryClient()

  const deletememeMutation = useMutation(deletememe, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['memes'])
    },
  })

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    deletememeMutation.mutate({ memeId })
    console.log('deleting', memeId)
  }

  const updatememeMutation = useMutation(updatememe, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['memes'])
    },
  })

  const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    updatememeMutation.mutate({
      memeId,
      newmemeName: rename,
      newmemeUrl: reUrl,
    })

    console.log('submitting', rename, reUrl)

    setUpdating(false)
  }

  const handleStopUpdatingClick = () => {
    setUpdating(false)
    setRename(memeName)
    setReUrl(memeUrl)
  }

  const handleStartUpdatingClick = () => {
    setUpdating(true)
  }

  return (
    <>
      <div>
        {updating ? (
          <form onSubmit={handleUpdateSubmit} aria-label="Update meme Form">
            <label htmlFor="updateName">Rename: </label>
            <input
              type="text"
              name="memeName"
              id="updateName"
              value={rename}
              onChange={(e) => setRename(e.target.value)}
            />

            <label htmlFor="updateUrl">Url: </label>
            <input
              type="text"
              name="memeUrl"
              id="updateUrl"
              value={reUrl}
              onChange={(e) => setReUrl(e.target.value)}
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
