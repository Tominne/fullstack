import express from 'express'
import path from 'path'
import recipeRoutes from './routes/recipe'

const server = express()

// Middleware (body parser)
server.use(express.json())

// Routes
server.use('/api/v1/recipe', recipeRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  server.get('/api/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

export default server
