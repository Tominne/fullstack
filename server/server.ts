import express from 'express'
import path from 'path'
import memeRoutes from './routes/meme'

const server = express()

// Middleware (body parser)
server.use(express.json())

// Routes
server.use('/api/v1/meme', memeRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

export default server
