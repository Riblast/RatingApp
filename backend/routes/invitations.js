import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { acceptInvite, declineInvite, getNotifications, inviteUsers } from '../controllers/Invitations.js'

const router = express.Router()

router.post('/invitation', verifyToken, inviteUsers)
router.get('/notifications', verifyToken, getNotifications)
router.post('/invitation/:ratingId/accept', verifyToken, acceptInvite)
router.post('/invitation/:ratingId/decline', verifyToken, declineInvite)

export default router
