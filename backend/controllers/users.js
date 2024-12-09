import User from '../models/User.js'

export const userSearch = async (req, res) => {
  const { query } = req.query
  if (!query) return res.status(400).json({ message: 'Query parameter is required' })

  const users = await User.find({
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  }).select('id username email')

  res.json(users)
}
