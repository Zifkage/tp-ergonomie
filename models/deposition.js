const mongoose = require('mongoose');

const depositionSchema = mongoose.Schema({
  personne: { type: mongoose.Schema.Types.ObjectId, ref: 'Personne' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quartier: { type: String, required: false },
  ville: { type: String, required: false },
  departement: { type: String, required: true },
  categorie: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  m: { type: Boolean, required: false },
  f: { type: Boolean, required: false },
  ageAuteur: { type: Number, required: true },
  temoignage: { type: Boolean, default: false }
});

const Deposition = mongoose.model('Deposition', depositionSchema);

module.exports = Deposition;
