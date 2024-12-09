import mongoose from 'mongoose'

const mutualRatingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      ratings: [
        {
          rater: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Usuario que da el rating
          attributes: [
            {
              name: { type: String, required: true },
              value: { type: Number, required: true, min: 0, max: 5 }
            }
          ]
        }
      ]
    }
  ],
  attributes: [
    {
      name: { type: String, required: true } // Atributo general (ej. "lindo", "facha")
    }
  ],
  invites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  type: { type: String, default: 'usersRating' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('MutualRating', mutualRatingSchema)
