const router = require('express').Router();
const User = require('../models/user');

router.route('/users')

    .get(function (req, res) {

        User.find().then(users => {
            res.json(users);
        }).catch(err => {
            console.log('Error getting users:', err);
            res.status(500).send({ message: 'Server error' });
        });

    })
    .post(function (req, res) {
        let user = new User();

        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.password = generatePass();
        user.country = req.body.country;
        user.city = req.body.city;

        User.findOne({ email: user.email }).then(aUser => {
            if (aUser) {
                res.status(409).send({ message: 'This email already exists' });
                aUser = null;
            } else { aUser = user; }

            return aUser;
        }).then(aUser => {
            if (aUser) aUser.save();

            return aUser;
        }).then(savedUser => {
            console.log('savedUser:', savedUser);

            if (savedUser) {
                res.json(savedUser);
            }
        }).catch(err => {
            console.log('Error saving new user:', err);
            res.status(500).send({ message: 'Server error' });
        });


    });

function generatePass() {
    let password = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let possibleletters = "BCDFGHJKLMNPQRSTVWXZbcdfghjklmnpqrstvwxz";
    let possiblevowels = "AEIOUYaeiouy";
    let possiblenumbers = "1234567890";

    for (let i = 0; i < 6; i++) {
        if ((i + 1) % 2) password += possibleletters.charAt(Math.floor(Math.random() * possibleletters.length));
        else password += possiblevowels.charAt(Math.floor(Math.random() * possiblevowels.length));
    }

    password += possiblenumbers.charAt(Math.floor(Math.random() * possiblenumbers.length));
    password += possiblenumbers.charAt(Math.floor(Math.random() * possiblenumbers.length));

    return password;
}

module.exports = router;