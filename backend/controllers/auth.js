import { SALT_ROUNDS } from '../config/config.js'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userExist = await User.findOne({ email })
    if (userExist) throw new Error('email alreaddy used')
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    const token = await createAccessToken({ userId: user._id })
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
    res.status(201).json({
      message: 'User registered',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = await createAccessToken({ userId: user._id })
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
