import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' },
      (error, token) => {
        if (error) reject(error)
        resolve(token)
      })
  })
}
