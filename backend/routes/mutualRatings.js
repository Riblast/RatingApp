import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { createMutualRating, submitRatings, getResults, getMutualRatings, getMutualRating } from '../controllers/mutualRating.js'

const router = express.Router()

router.get('/mutualrating', verifyToken, getMutualRatings)

router.post('/mutualrating/create', verifyToken, createMutualRating)

router.post('/mutualrating/submit', verifyToken, submitRatings)

router.get('/mutualrating/results/:ratingId', verifyToken, getResults)

router.get('/mutualrating/:ratingId', verifyToken, getMutualRating)

export default router
