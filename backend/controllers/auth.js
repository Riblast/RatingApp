import { SALT_ROUNDS, JWT_SECRET } from '../config/config.js'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const userExist = await User.findOne({ email })
    if (userExist) return res.status(400).json(['the email is already in use'])
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = new User({ username, email, password: hashedPassword })
    await user.save()
    const token = await createAccessToken({ userId: user._id })
    res.cookie('access_token', token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
    return res.status(201).json({
      message: 'User registered',
      user: {
        id: user._id,
        name: user.username,
        email: user.email
      }
    })
  } catch (error) {
    return res.status(500).json([error.message])
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(['Invalid credentials'])
    }
    const token = await createAccessToken({ userId: user._id })
    res.cookie('access_token', token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
    res.json({
      id: user._id,
      name: user.username,
      email: user.email
    })
  } catch (error) {
    res.status(500).json([error.message])
  }
}

export const verifyTokenRequest = async (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json(['Unauthorized'])

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) return res.status(401).json(['Unauthorized'])

    const userfound = await User.findById(user.userId)

    if (!userfound) return res.status(403).json(['Unauthorized'])

    return res.json({
      id: userfound.id,
      username: userfound.username,
      email: userfound.email
    })
  })
}
