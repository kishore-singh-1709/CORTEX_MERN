const Joi = require('joi');
const { min } = require('lodash');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const {statusSchema} = require('./status');
 
const ticketSchema = new mongoose.Schema({
    title:{type:String,minlength: 5,
      maxlength: 10,trim:true,required:true},
    description:{type:String,maxlength: 20},
    assignee:{type:String,required:true},
    startDate:{type: Date},
    endDate: {type:Date},
    progress:{type:String},
    status:{
        type:statusSchema,
        required:true
    },
    user:{
        type: new mongoose.Schema({
            name: {
              type: String,
              required: true,
              trim: true, 
              minlength: 5,
              maxlength: 50
            },
            date: { 
                type: Date, 
                required: true,
                default: Date.now
              }  
          })

    }
});

const Ticket = mongoose.model('Ticket',ticketSchema);

  function validateTicket(ticket) {
      const schema = {
        title: Joi.string().min(5).max(10).required(),
        description: Joi.string().max(20),
        assignee: Joi.string(),
        startDate:Joi.date(),
        endDate:Joi.date(),
        progress: Joi.string(),
        statusId: Joi.objectId().required(),
        userId: Joi.objectId().required()
      };
    return Joi.validate(ticket, schema);
  }

  module.exports.validateTicket = validateTicket;
  module.exports.Ticket = Ticket;