const express = require('express');
const router = express.Router();
const pwValidation = require ('../middleware/pw-valid')
const userCtrl = require('../controllers/user');

router.post('/signup', pwValidation, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;