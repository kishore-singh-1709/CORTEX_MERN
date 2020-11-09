const jwt = require('jsonwebtoken');
const config = require('config');
const { isNull, isUndefined } = require('lodash');

module.exports = function(req, res, next){

if(!config.get('requiresAuth')) return next();

const token = req.header('x-auth');

if(!token) return res.status(401).send('Token is missing');

try{
    const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
}catch(err){
    res.status(400).send('Invalid Token');
}
}
