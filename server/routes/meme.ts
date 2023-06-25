import express from 'express'
import * as db from '../db/db'
import { MemeData } from '../../models/meme'
import request from 'superagent'
const router = express.Router()

router.get('/memes', async (req, res) => {
  try {
    const response = await request.get('https://api.imgflip.com/get_memes')
    const meme = { meme: response.body.meme }
    res.json(meme)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('where are my memes!!!')
    }
  }
})

// GET /api/v1/meme
router.get('/', async (req, res) => {
  try {
    const meme = await db.getAllMemes()
    res.json({ meme })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ error: 'There was an error trying to get the memes' })
  }
})

// GET /api/v1/meme/:memeId
router.get('/:memeId', async (req, res) => {
  try {
    const memeId = Number(req.params.memeId)
    if (isNaN(memeId)) {
      res.sendStatus(400).json({ error: 'Invalid meme ID' })
      return
    }
    const meme = await db.getMemeById(memeId)
    res.json({ meme })
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({
      error: 'There was an error trying to get the meme',
    })
  }
})

// POST /api/v1/meme
router.post('/', async (req, res) => {
  try {
    const newmeme = req.body.newmeme as MemeData
    if (!newmeme) {
      res.sendStatus(400)
      return
    }
    const meme = await db.addMeme(newmeme)
    res.json({ meme })
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({
      error: 'There was an error trying to add your shark to the database',
    })
  }
})

// DELETE /api/v1/meme/
router.delete('/:memeId', async (req, res) => {
  try {
    const memeId = Number(req.params.memeId)
    if (isNaN(memeId)) {
      console.log('Invalid meme id')
      res.sendStatus(400).send('Bad request')
      return
    }
    await db.deleteMeme(memeId)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.patch('/:memeId', async (req, res) => {
  const memeId = parseInt(req.params.memeId)
  if (isNaN(memeId)) {
    console.log('Invalid meme id')
    res.sendStatus(400).send('Bad request')
    return
  }
  const memeName = req.body.memeName
  if (!memeName) {
    res.status(400).send('Bad request: meme Name is required')
    return
  }

  const memeUrl = req.body.memeUrl
  if (!memeUrl) {
    res.status(400).send('Bad request: meme Url is required')
    return
  }
  try {
    await db.updateMeme(memeId, memeName, memeUrl)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500).send('Could not update this meme')
  }
})

export default router
