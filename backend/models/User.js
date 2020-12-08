const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

// crée le schéma de données pour un utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// utilise le pluggin mongoose-unique-validator pour s'assurer
// du caractère unique de l'adresse e-mail
userSchema.plugin(uniqueValidator);

// exporte le schéma comme modèle
module.exports = mongoose.model('User', userSchema);