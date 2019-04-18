const router = require('express').Router();
const user = require('./user');
const pet = require('./pet');
const pet_priv = require('./pet_priv');
const auth = require('./auth');

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();	//Sigue corriendo en las siguientes rutas
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.use(user);
router.use(pet);
router.use(auth);
router.use(pet_priv);

// FUNCTIONS FOR TRAINEDS

module.exports = router;