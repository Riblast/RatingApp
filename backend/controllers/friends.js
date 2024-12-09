import Friend from '../models/Friend.js'
import User from '../models/User.js'

export const friendRequest = async (req, res) => {
  const { username } = req.body
  const requesterId = req.user.userId // Obtenido del token de autenticación

  if (!username) {
    return res.status(400).json({ message: 'Username is required' })
  }

  // Buscar al usuario por nombre de usuario
  const recipient = await User.findOne({ username })
  if (!recipient) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (recipient.id === requesterId) {
    return res.status(400).json({ message: 'You cannot send a friend request to yourself' })
  }

  // Verificar si ya existe una solicitud de amistad entre los usuarios
  const existingRequest = await Friend.findOne({
    $or: [
      { requester: requesterId, recipient: recipient.id },
      { requester: recipient.id, recipient: requesterId }
    ]
  })

  if (existingRequest) {
    return res.status(400).json({ message: 'Friendship request already exists' })
  }

  // Crear la solicitud de amistad
  const friendRequest = new Friend({ requester: requesterId, recipient: recipient.id })
  await friendRequest.save()

  res.status(201).json({ message: `Friend request sent to ${username}` })
}

export const friendResponse = async (req, res) => {
  const { requestId, action } = req.body // action puede ser "accept" o "reject"

  const friendRequest = await Friend.findById(requestId)
  if (!friendRequest || friendRequest.recipient.toString() !== req.user.userId) {
    return res.status(404).json({ message: 'Friend request not found' })
  }

  if (action === 'accept') {
    friendRequest.status = 'accepted'
  } else if (action === 'reject') {
    friendRequest.status = 'rejected'
  } else {
    return res.status(400).json({ message: 'Invalid action' })
  }

  await friendRequest.save()
  res.status(200).json({ message: `Friend request ${action}ed` })
}

export const friendSearch = async (req, res) => {
  const userId = req.user.userId

  const friends = await Friend.find({
    $or: [
      { requester: userId, status: 'accepted' },
      { recipient: userId, status: 'accepted' }
    ]
  }).populate('requester recipient', 'id username email')

  const friendList = friends.map(f => {
    const friend = f.requester.id === userId ? f.recipient : f.requester
    if (!friend) {
      res.json('no tienes amigos agregados')
    }
    return { id: friend.id, username: friend.username, email: friend.email }
  })

  res.json(friendList)
}

export const getFriendRequest = async (req, res) => {
  const userId = req.user.userId // El ID del usuario autenticado (usando JWT o alguna autenticación)

  // Buscar todas las solicitudes pendientes donde el usuario sea el receptor
  const pendingRequests = await Friend.find({ recipient: userId, status: 'pending' })
    .populate({
      path: 'requester',
      select: 'username name avatar'
    }) // Llenamos la información del solicitante
  res.json(pendingRequests)
}
