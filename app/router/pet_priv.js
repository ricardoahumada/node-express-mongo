const router = require('express').Router();
const Pet = require('../models/pet');

const md_auth = require('../middlewares/authentication');

router.route('/pets_priv')
    .get(md_auth.ensureAuth, function (req, res) {

        Pet.find().then(pets => {
            res.json(pets);
        }).catch(err => {
            console.log('Error getting pets:', err);
            res.status(500).send({ message: 'Server error' });
        });

    })
    .post(function (req, res) {
        let pet = new Pet();

        pet.name = req.body.name;
        pet.foto = req.body.foto;
        pet.edad = req.body.edad;

        pet.save().then(savedPet => {
            console.log('savedPet:', savedPet);
            if (savedPet) {
                res.json(savedPet);
            }
        }).catch(err => {
            console.log('Error saving new pet:', err);
            res.status(500).send({ message: 'Server error' });
        });


    });


router.route('/pets/:pid')
    .get(function(req, res){
        // res.json({data:'hola:'+req.params.pid});
        Pet.findById(req.params.pid).then(data=>{
            res.json(data);
        }).catch(err => {
            console.log('Error getting pets:', err);
            res.status(500).send({ message: 'Server error' });
        });
        
    });

module.exports = router;