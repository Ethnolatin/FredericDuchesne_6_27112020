const express = require('express');
const router = express.Router();
const pwValidation = require ('../middleware/pw-valid')
const userCtrl = require('../controllers/user');

// définit les routes relatives à l'utilisateur
// applique à la route signup le middleware pwValidation qui vérifie la sureté du mot de passe
router.post('/signup', pwValidation, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;