const mongoose = require('mongoose');

const personneSchema = mongoose.Schema({
  deposition: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deposition' }],
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  addresse: { type: String, required: true },
  numero:{ type: String, required: true }
});

const Personne = mongoose.model('Personne', personneSchema);

module.exports = Personne;