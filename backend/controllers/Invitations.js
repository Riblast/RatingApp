import Rating from '../models/Rating.js'
import MutualRating from '../models/MutualRating.js'

export const inviteUsers = async (req, res) => {
  const { ratingId, invitedUsers } = req.body

  try {
    const rating = await Rating.findById(ratingId)
    const mutualRating = rating ? null : await MutualRating.findById(ratingId)

    if (rating || mutualRating) {
      const targetRating = rating || mutualRating

      targetRating.invites.push(...invitedUsers.filter(userId => !targetRating.invites.includes(userId)))

      await targetRating.save()

      res.status(200).json({
        message: 'Invitations sent successfully.',
        rating: targetRating
      })
    } else {
      return res.status(404).json({ message: 'Rating not found.' })
    }
  } catch (error) {
    console.error('Error inviting users:', error)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
}

export const acceptInvite = async (req, res) => {
  const { ratingId } = req.params
  const userId = req.user.userId

  try {
    const rating = await Rating.findById(ratingId)
    const mutualRating = rating ? null : await MutualRating.findById(ratingId)

    if (rating || mutualRating) {
      const targetRating = rating || mutualRating

      if (!targetRating.invites.includes(userId)) {
        return res.status(400).json({ message: 'You are not invited to this rating.' })
      }

      // Mover de invites a participants
      targetRating.invites = targetRating.invites.filter(id => id.toString() !== userId)
      if (!targetRating.participants.some(participant => participant.user._id.toString() === userId)) {
        targetRating.participants.push({ user: userId, hasRated: false }) // Asegúrate de que el objeto tenga la estructura correcta
      }

      await targetRating.save()
      res.status(200).json({ message: 'Invite accepted successfully.', targetRating })
    } else {
      return res.status(404).json({ message: 'Rating not found.' })
    }
  } catch (error) {
    console.error('Error accepting invite:', error)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
}

export const declineInvite = async (req, res) => {
  const { ratingId } = req.params
  const userId = req.user.userId

  try {
    const rating = await Rating.findById(ratingId)
    const mutualRating = rating ? null : await MutualRating.findById(ratingId)

    if (rating || mutualRating) {
      const targetRating = rating || mutualRating

      if (!targetRating.invites.includes(userId)) {
        return res.status(400).json({ message: 'You are not invited to this rating.' })
      }

      // Remover de invites
      targetRating.invites = targetRating.invites.filter(id => id.toString() !== userId)

      await targetRating.save()
      res.status(200).json({ message: 'Invite declined successfully.', targetRating })
    } else {
      return res.status(404).json({ message: 'Rating not found.' })
    }
  } catch (error) {
    console.error('Error declining invite:', error)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
}

export const getNotifications = async (req, res) => {
  const userId = req.user.userId

  try {
    const ratings = await Rating.find({ invites: userId }).populate('creator', 'username avatar')

    const mutualRatings = await MutualRating.find({ invites: userId }).populate('creator', 'username avatar')

    const allRatings = [...ratings, ...mutualRatings]

    const notifications = allRatings.map(rating => ({
      type: 'invitation',
      message: `You have been invited to join the rating "${rating.title}" by ${rating.creator.username}.`,
      ratingId: rating._id,
      creator: rating.creator,
      createdAt: rating.createdAt
    }))

    res.status(200).json(notifications)
  } catch (error) {
    console.error('Error fetching notifications:', error)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
}
