const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User,validateUser} = require('../models/users');
const auth = require('../middleware/auth');
const router = express.Router();

//POST -> Register - {User =>name,email,password}
router.post('/*', async (req, res) => {
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //If already User exist, error thrown
  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send('User already exists..');

  user = new User(_.pick(req.body,['name','email','password','isAdmin']));

//Encrypt Password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);
  user = await user.save();

  const accessToken = user.generateJwtToken();
  res
  .header('x-auth',accessToken)
  .header('access-control-expose-headers','x-auth') //For Exposing JWT Token in Response Header
  .send({accessToken, _id:user._id, email:user.email, name:user.name});
});

router.get('/me',auth,async(req,res)=>{
const user = await User.findById(req.user._id);
res.send(_.pick(user,['_id','name','email']))
});

module.exports = router;