const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const tokenKey = require('../privateData/tokenkey');

// ajoute un nouvel utilisateur à la base de données
exports.signup = (req, res, next) => {
  // utilise la fonction de hachage 'bcrypt' pour chiffrer le mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      // ajoute l'utilisateur à la base de données
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// vérifie les informations d'identification de l'utilisateur
exports.login = (req, res, next) => {
  // vérifie l'existence de l'adresse e-mail dans la base
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error })
      }
      // vérifie le mot de passe
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error })
          }
          // renvoie l'identifiant userId depuis la base de données
          // et un jeton Web JSON signé et encodé à l'aide d'une clé secrète
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, `${tokenKey()}`, { expiresIn: '24h' })
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};