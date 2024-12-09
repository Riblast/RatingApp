import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { userSearch } from '../controllers/users.js'

const router = express.Router()

router.get('/users/search', verifyToken, userSearch)

export default router
