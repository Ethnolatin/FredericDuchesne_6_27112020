const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const token = require('../privateData/token');

exports.signup = (req, res, next) => {
  // chiffre le mot de passe de l'utilisateur
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

exports.login = (req, res, next) => {
  // vérifie l'existence de l'adresse e-mail dans la base
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé..." })
      }
      // vérifie le mot de passe
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect..." })
          }
          // renvoie l'identifiant userID depuis la base de données
          // et un jeton Web JSON signé (contenant également l'identifiant userID)
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${token()}`,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};