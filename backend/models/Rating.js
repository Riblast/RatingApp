import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attribute: { type: String, required: true }, // por ejemplo, "amabilidad"
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
})

export default mongoose.model('Rating', ratingSchema)
