import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { PORT } from './config/config.js'

import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import ratingRoutes from './routes/ratings.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

connectDB()

// Rutas
app.use('/api', authRoutes)
app.use('/api', ratingRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
