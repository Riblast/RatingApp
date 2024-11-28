import { login, register, verifyTokenRequest } from '../controllers/auth.js'
import { validateSchema } from '../middleware/validate.js'
import { registerSchema, loginSchema } from '../models/auth.js'
import express from 'express'

const router = express.Router()

router.post('/register', validateSchema(registerSchema), register)

router.post('/login', validateSchema(loginSchema), login)

router.get('/verify', verifyTokenRequest)

export default router
