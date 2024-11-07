import Rating from '../models/Rating.js'

export const getRating = async (req, res) => {

}

export const getRatings = async (req, res) => {

}

export const newRating = async (req, res) => {
  const { friendId, attribute, score, comment } = req.body
  const rating = new Rating({
    user: req.user.userId,
    friend: friendId,
    attribute,
    score,
    comment
  })
  await rating.save()
  res.status(201).json({ message: 'Rating added' })
}

export const getFriendRating = async (req, res) => {
  const ratings = await Rating.find({ friend: req.params.friendId })
  const averages = ratings.reduce((acc, rating) => {
    acc[rating.attribute] = acc[rating.attribute] || []
    acc[rating.attribute].push(rating.score)
    return acc
  }, {})

  for (const attr in averages) {
    averages[attr] = (averages[attr].reduce((a, b) => a + b, 0) / averages[attr].length).toFixed(2)
  }

  res.json({ averages })
}
