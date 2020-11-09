
const Joi = require('joi');
const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Status = mongoose.model('Status', statusSchema);

  function validateStatus(status) {
    const schema = {
      name: Joi.string().required()
    };
  
    return Joi.validate(status, schema);
  }

  exports.validateStatus = validateStatus;
  exports.Status = Status;
  exports.statusSchema = statusSchema;
