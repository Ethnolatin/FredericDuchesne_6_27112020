const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// applique les middlewares aux routes :
// - renforce l'authentification sur les routes relatives aux sauces ('auth')
// - accepte les téléchargements de fichier pour 'create' et 'modify' ('multer')
router.post('/:id/like', auth, saucesCtrl.likeSauce);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;