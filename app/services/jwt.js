const jwt = require('jwt-express');
const moment = require('moment');
const config = require('../config/jwt');

exports.createToken = function (user) {
    let userpayload = {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        perfil: user.perfil,
        center: user.center,
        country: user.country,
        city: user.city,
        iat: moment().unix(),
        exp: moment().add(5, 'days').unix()
    };
    return jwt.create(config.TOKEN_SECRET, userpayload);
};

