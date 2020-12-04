const Sauce = require('../models/Sauce');
const likesManagement = require('../likesManagement');
const fs = require('fs');

// crée une nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée"}))
    .catch(error => res.status(400).json({ error }));
};

// met à jour la sauce avec l'ID fourni
exports.modifySauce = (req, res, next) => {
  // gère l'éventuelle image
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  // met à jour la sauce
  Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
    .then(sauce => res.status(200).json({ message: "Sauce modifiée" }))
    .catch(error => res.status(400).json({ error }));
};

// supprime la sauce avec l'ID fourni
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      // détecte et supprime l'éventuelle image
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        // supprime la sauce
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée" }))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// renvoie la sauce avec l'ID fourni
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// renvoie le tableau de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

// définit le statut "j'aime" pour l'userID fourni
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      likesManagement(sauce, req.body.userId, req.body.like);
      sauce.save()
        .then(() => res.status(200).json({ message: "Vote enregistré" }))
        .catch(error => res.status(400).json({ error }))
    })    
    .catch(error => res.status(500).json({ error }));
}