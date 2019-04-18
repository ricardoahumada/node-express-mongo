const jwt_simple = require('jwt-simple');
const moment = require('moment');
const config = require('../config/jwt');

// Funciona pero al pasarle mal el token o en su ausencia, peta el servidor :|
exports.ensureAuth = function(req, res, next) {
    var userpayload = null;
    try{
        // console.log('REQ AUTH:', req.headers.authorization, req.url, req.method);
        if(!req.headers.authorization){
            if (req.url.indexOf('/trainings')>=0 && req.method=='GET'){
                console.log('GET to trainings without auth...');
            }else{
                return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación' });
            }
        }else{
            let token = req.headers.authorization.replace(/['"]+/g, '');
            //console.log('tk',token);
            userpayload = jwt_simple.decode(token, config.TOKEN_SECRET);
            if(userpayload.exp <= moment().unix()){
                return res.status(401).send({message: 'El token ha expirado'});
            }
        }
    }catch(ex){
        return res.status(403).send({message: 'Token no válido'});
    }

    req.user = userpayload;
    console.log('userpayload:',userpayload);
    next();
};
