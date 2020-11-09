
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  isAdmin:{
    type: Boolean,
    default:false}
});
 /* GenerateJwtToken:- 
 [isAdmin/_id/name] variable encapsulated in User Schema and on JWT Token Creation,this variable is embedded
 [isAdmin/_id/name] -> Values accessed in Header x-auth */
usersSchema.methods.generateJwtToken = function(){
return jwt.sign({_id: this._id,name:this.name,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
}

const User = mongoose.model('Users', usersSchema);

  function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().max(50).required().email(),
      password: Joi.string().min(5).max(50).required(),
      isAdmin:Joi.boolean()
    };
    return Joi.validate(user, schema);
  }

  exports.validateUser = validateUser;
  exports.User = User;
