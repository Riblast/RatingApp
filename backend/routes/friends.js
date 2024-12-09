import express from 'express'
import { friendResponse, friendRequest, friendSearch, getFriendRequest } from '../controllers/friends.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/friends/request', verifyToken, friendRequest)

router.get('/friends/request', verifyToken, getFriendRequest)

router.post('/friends/response', verifyToken, friendResponse)

router.get('/friends', verifyToken, friendSearch)

export default router
