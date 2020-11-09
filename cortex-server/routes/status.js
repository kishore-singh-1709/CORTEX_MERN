require('express-async-errors'); 
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Status,validateStatus} = require('../models/status');

const router = express.Router();

router.get('/*', async (req, res) => {
  const statusList = await Status.find().sort('name');
  res.send(statusList);
});

//For detailed Info, check comments in DBExceptionHandling file.
router.get('/:id', [auth,admin],async (req, res) => {
  const status = await Status.findById(req.params.id);
  if (!status) return res.status(404).send('The status with the given ID was not found.');
  res.send(status);
});

// Secured REST  - Requires Admin User
router.post('/',[auth,admin], async (req, res) => {
  const { error } = validateStatus(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let status = new Status({ name: req.body.name });
  status = await status.save();
  
  res.send(status);
});

//Secured REST - Requires Admin User
router.put('/:id',[auth,admin], async (req, res) => {
  const { error } = validateStatus(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const status = await Status.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!status) return res.status(404).send('The status with the given ID was not found.');
  
  res.send(status);
});

/*Deleting Status -> only admin can execute this REST Call.
 401 -> unauthorized
 403 -> forbidden [Valid user but don't have access to call this call*/

// Secured REST  - Requires Admin User
router.delete('/:id',[auth,admin], async (req, res) => {
  const status = await Status.findByIdAndRemove(req.params.id);

  if (!status) return res.status(404).send('The status with the given ID was not found.');

  res.send(status);
});

module.exports = router;