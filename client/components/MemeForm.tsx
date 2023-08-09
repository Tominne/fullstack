import { ChangeEvent, FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addmeme } from '../apis/memes'
import { MemeData } from '../../models/meme'

const initialFormData = {
  memeName: '',
  memeUrl: '',
}

export default function MemeForm() {
  const [form, setForm] = useState<MemeData>(initialFormData)

  const queryClient = useQueryClient()

  const addmemeMutation = useMutation(addmeme, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['memes'])
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addmemeMutation.mutate(form)
    setForm(initialFormData)
  }

  if (addmemeMutation.isError) {
    return <div>There was an error trying to add your meme</div>
  }

  if (addmemeMutation.isLoading) {
    return <div>Adding your meme</div>
  }

  return (
    <>
      <section id="add-meme-to-list" className="formContainer">
        <form onSubmit={handleSubmit} aria-label="Add meme Form">
          <p>
            <label htmlFor="memeName">Meme Title</label>
            <input
              type="text"
              id="memeName"
              onChange={handleChange}
              name="memeName"
              value={form.memeName}
              required
            />
          </p>
          <p>
            <label htmlFor="memeUrl">Image Url</label>
            <input
              type="text"
              id="memeUrl"
              onChange={handleChange}
              name="memeUrl"
              value={form.memeUrl}
              required
            />
          </p>
          <button type="submit">Add meme</button>
        </form>
      </section>
    </>
  )
}
