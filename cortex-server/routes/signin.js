const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');

const router = express.Router();

//POST -> signIn - validate(User)
router.post('/*', async (req, res) => {
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //If User doesn't exist, error thrown
  let user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Email not registered...');

  //If Password is invalid, error thrown
  let isValidPwd = await bcrypt.compare(req.body.password,user.password);
  if(!isValidPwd) return res.status(400).send(`Password doesn't matches with Email...`);

  const accessToken = user.generateJwtToken();
  res.send({accessToken, name: user['name'],userId: user['_id'] });
});


function validateUser(req){
    const schema = {
        email: Joi.string().max(50).required().email(),
        password: Joi.string().min(5).max(50).required()
      };
      return Joi.validate(req, schema);
}

module.exports = router;