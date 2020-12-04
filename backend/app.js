const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const username = require('./privateData/username');
const password = require('./privateData/password');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// se connecte à la base 'pekocko' sur MongoDB grâce à l'identifiant et au mot de passe fournis
mongoose.connect(`mongodb+srv://${username()}:${password()}@cluster0.oylzo.mongodb.net/pekocko?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// headers permettant à l'application d'accéder à l'API malgré le CORS (s'applique à toutes les routes)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // permet l'accès à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// utilise body-parser et sa méthode 'json' pour transformer le corps de la requête en json exploitable
app.use(bodyParser.json());

// gère la ressource 'images' de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));
// route par défaut pour les sauces
app.use('/api/sauces', saucesRoutes);
// renforce l'authentification sur les routes relatives au user
app.use('/api/auth', userRoutes);

module.exports = app;