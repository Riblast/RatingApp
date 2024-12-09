import mongoose from 'mongoose'

const RatingSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título del rating
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      hasRated: { type: Boolean, default: false }
    }
  ],
  // Participantes
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Creador del rating
  attributes: [{ type: String, required: true }], // Lista de atributos a calificar
  invites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  scores: [
    {
      rater: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Quién calificó
      rated: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // A quién se calificó
      attribute: { type: String, required: true }, // Atributo calificado
      score: { type: Number, required: true, min: 1, max: 5 } // Puntuación (ej. 1-5)
    }
  ],
  category: { type: String },
  type: { type: String, default: 'rating' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Rating', RatingSchema)
