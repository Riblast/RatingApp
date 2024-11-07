import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { newRating, getFriendRating, getRating, getRatings } from '../controllers/ratings.js'

const router = express.Router()

router.get('/ratings', verifyToken, getRatings)
router.get('/ratings/:id', verifyToken, getRating)
router.post('/rating', verifyToken, newRating)
router.get('/ratings/:friendId', verifyToken, getFriendRating)

export default router
