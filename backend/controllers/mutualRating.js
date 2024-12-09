import MutualRating from '../models/MutualRating.js'

export const getMutualRatings = async (req, res) => {
  const userId = req.user.userId

  try {
    const mutualRatings = await MutualRating.find({
      $or: [
        { creator: userId },
        { participants: { $elemMatch: { user: userId } } }
      ]
    })
      .populate('creator', 'username avatar')
      .populate('participants.user', 'username avatar')
      .sort({ createdAt: -1 })
    res.status(200).json(mutualRatings)
  } catch (error) {
    console.error('Error fetching mutualRatings:', error)
    res.status(500).json({ message: 'Failed to fetch mutualRatings.' })
  }
}

export const createMutualRating = async (req, res) => {
  try {
    const { title, attributes } = req.body
    const creatorId = req.user.userId

    if (!title || !attributes) {
      return res.status(400).json({ error: 'Title and attributes are required' })
    }

    const mutualRating = new MutualRating({
      title,
      attributes,
      creator: creatorId,
      participants: [
        { user: creatorId, hasRated: false, ratings: {} } // El creador también es participante
      ]
    })

    await mutualRating.save()

    res.status(201).json(mutualRating)
  } catch (error) {
    console.error('Error creating mutual rating:', error)
    res.status(500).json({ error: 'Error creating mutual rating', details: error.message })
  }
}

export const submitRatings = async (req, res) => {
  const { mutualRatingId, memberId, ratingAttributes } = req.body
  const raterId = req.user.userId

  try {
    const mutualRating = await MutualRating.findById(mutualRatingId)

    const participant = mutualRating.participants.find(p => p.user.toString() === memberId)
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found.' })
    }

    // Verificar si el rater ya ha calificado a este miembro
    const alreadyRated = participant.ratings.some(rating => rating.rater && rating.rater.toString() === raterId)
    if (alreadyRated) {
      return res.status(400).json({ message: 'You have already rated this member.' })
    }

    // Crear un nuevo rating
    const newRating = {
      rater: raterId,
      attributes: ratingAttributes
    }

    // Agregar la calificación al participante
    participant.ratings.push(newRating)

    // Marcar que el miembro ha sido calificado
    participant.hasRated = true

    // Guardar los cambios
    await mutualRating.save()

    res.status(200).json({ message: 'Rating submitted successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error.' })
  }
}

export const getResults = async (req, res) => {
  try {
    const { ratingId } = req.params
    const mutualRating = await MutualRating.findById(ratingId)
      .populate('participants.user', 'username')

    if (!mutualRating) return res.status(404).json({ error: 'MutualRating not found' })

    const results = mutualRating.participants.map(user => {
      // Agregar las calificaciones por atributo
      const userRatings = user.ratings.map(rating => ({
        rater: rating.rater,
        attributes: rating.attributes
      }))

      // Calcular los promedios de atributos
      const averages = mutualRating.attributes.reduce((acc, attr) => {
        const attrScores = userRatings
          .map(r => r.attributes.find(a => a.name === attr.name)?.value || 0)
          .filter(Boolean)
        acc[attr.name] = attrScores.length
          ? attrScores.reduce((a, b) => a + b, 0) / attrScores.length
          : 0
        return acc
      }, {})

      return { user: user.user.username, averages }
    })

    res.status(200).json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching results' })
  }
}

export const getMutualRating = async (req, res) => {
  const { ratingId } = req.params

  try {
    const mutualRating = await MutualRating.findById(ratingId).populate('participants.user', 'username avatar')
    res.status(200).json(mutualRating)
  } catch (error) {
    console.error('Error fetching mutualRatings:', error)
    res.status(500).json({ message: 'Failed to fetch mutualRatings.' })
  }
}

export const getMemberAverageRating = async (req, res) => {
  const { mutualRatingId, memberId } = req.params

  try {
    const mutualRating = await MutualRating.findById(mutualRatingId)
    const participant = mutualRating.participants.find(p => p.user.toString() === memberId)

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found.' })
    }

    // Calcular el promedio de las calificaciones de ese miembro
    const totalRatings = participant.ratings.reduce((acc, rating) => {
      rating.attributes.forEach(attr => {
        acc[attr.name] = (acc[attr.name] || 0) + attr.value
      })
      return acc
    }, {})

    const ratingCount = participant.ratings.length

    // Calcular el promedio de cada atributo
    const averageRatings = Object.keys(totalRatings).map(key => ({
      name: key,
      average: totalRatings[key] / ratingCount
    }))

    res.status(200).json({ averageRatings })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error.' })
  }
}
