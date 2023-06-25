import request from 'superagent'
import { Meme, MemeData } from '../../models/meme'

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const memeURL = '/api/v1/meme'

//get meme
export async function getMemes(): Promise<Meme[]> {
  const response = await request.get(`${memeURL}/`)
  return response.body.meme
}

// GET /api/v1/meme/:memeId
export async function getmemeById(memeId: string): Promise<Meme> {
  const response = await request.get(`${memeURL}/${memeId}`)
  return response.body.meme
}

// POST /api/v1/meme
export async function addmeme(newmeme: MemeData): Promise<Meme> {
  const response = await request.post(memeURL).send({ newmeme })
  console.log(response.body)
  return response.body.meme
}
interface Deletememe {
  memeId: Meme['id']
}
// DELETE /api/v1/meme/:memeId
export async function deletememe({ memeId }: Deletememe): Promise<void> {
  await request.delete(`${memeURL}/${memeId}`)
}

interface Updatememe {
  memeId: Meme['id']
  newmemeName: Meme['memeName']
  newmemeUrl: Meme['memeUrl']
}

export async function updatememe({
  memeId,
  newmemeName,
  newmemeUrl,
}: Updatememe): Promise<void> {
  await request
    .patch(`${memeURL}/${memeId}`)
    .send({ memeName: newmemeName, memeUrl: newmemeUrl })
}
