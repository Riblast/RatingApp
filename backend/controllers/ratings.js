import Rating from '../models/Rating.js'

export const getRating = async (req, res) => {
  const { id } = req.params

  try {
    const rating = await Rating.findById(id)
      .populate('creator', 'username avatar') // Información del creador
      .populate('participants.user', 'username avatar') // Información de los participantes

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found.' })
    }

    res.status(200).json(rating)
  } catch (error) {
    console.error('Error fetching rating:', error)
    res.status(500).json({ message: 'Failed to fetch rating.' })
  }
}

export const getRatings = async (req, res) => {
  const userId = req.user.userId

  try {
    const ratings = await Rating.find({
      $or: [
        { creator: userId },
        { participants: { $elemMatch: { user: userId } } }
      ]
    })
      .populate('creator', 'username avatar')
      .populate('participants.user', 'username avatar')
      .sort({ createdAt: -1 })

    res.status(200).json(ratings)
  } catch (error) {
    console.error('Error fetching ratings:', error)
    res.status(500).json({ message: 'Failed to fetch ratings.' })
  }
}

export const createRating = async (req, res) => {
  const { title, attributes, category } = req.body
  const creatorId = req.user.userId

  if (!attributes || attributes.length === 0) {
    return res.status(400).json({ message: 'Attributes are required.' })
  }

  try {
    const rating = new Rating({
      title,
      attributes,
      category,
      creator: creatorId
    })

    await rating.save()
    res.status(201).json({ message: 'Rating created successfully.', rating })
  } catch (error) {
    console.error('Error creating rating:', error)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
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

export const addScore = async (req, res) => {
  const { ratingId } = req.params
  const { ratedId, attribute, score } = req.body
  const raterId = req.user.userId

  try {
    const rating = await Rating.findById(ratingId)

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found.' })
    }

    if (!rating.participants.includes(ratedId)) {
      return res.status(400).json({ message: 'Rated user is not a participant in this rating.' })
    }

    if (!rating.attributes.includes(attribute)) {
      return res.status(400).json({ message: 'Attribute is not part of this rating.' })
    }

    // Agregar el puntaje
    rating.scores.push({
      rater: raterId,
      rated: ratedId,
      attribute,
      score
    })

    await rating.save()
    res.status(200).json({ message: 'Score added successfully.', rating })
  } catch (error) {
    console.error('Error adding score:', error)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
}

export const getAttributeAverages = async (req, res) => {
  const { ratingId } = req.params

  try {
    const rating = await Rating.findById(ratingId).populate('participants.userId', 'username avatar')

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found.' })
    }

    const averages = rating.participants.map((participant) => {
      const scoresByAttribute = rating.attributes.map((attribute) => {
        const scores = rating.scores
          .filter((score) => score.rated.toString() === participant._id.toString() && score.attribute === attribute)
          .map((score) => score.score)

        const average = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0

        return { attribute, average }
      })

      return {
        participant: participant.username,
        scores: scoresByAttribute
      }
    })

    res.json(averages)
  } catch (error) {
    console.error('Error fetching averages:', error)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
}
