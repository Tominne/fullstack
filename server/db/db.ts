import db from './connection'
import { Meme, MemeData } from '../../models/meme'

export async function getAllMemes(): Promise<Meme[]> {
  const meme = await db<Meme>('memes').select(
    'memes.id',
    'meme_name as memeName',
    'meme_url as memeUrl'
  )
  return meme
}

export async function getMemeById(memeId: number): Promise<Meme> {
  const meme = await db('memes')
    .where('memes.id', memeId)
    .select('memes.id', 'meme_name as memeName', 'meme_url as memeUrl')
    .first()
  return meme
}

export async function addMeme(newMeme: MemeData): Promise<Meme> {
  const [meme] = await db('memes')
    .insert({
      meme_name: newMeme.memeName,
      meme_url: newMeme.memeUrl,
    })
    .returning('*')

  return meme
}

export async function deleteMeme(memeId: number): Promise<void> {
  await db('memes').where('memes.id', memeId).del()
}

export async function updateMeme(
  id: number,
  memeName: string,
  memeUrl: string
): Promise<Meme | undefined> {
  const [updatedMeme] = await db('memes')
    .where({
      id,
    })
    .update({
      Meme_name: memeName,
      meme_url: memeUrl,
    })
    .returning(['meme_name', 'meme_url'])

  return updatedMeme
}
