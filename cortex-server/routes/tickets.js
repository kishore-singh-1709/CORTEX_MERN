
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Ticket,validateTicket} = require('../models/tickets');
const {User} = require('../models/users');
const {Status} = require('../models/status');
const router = express.Router();

router.get('/*',async (req,res)=>{
const tickets = await Ticket.find();
res.send(tickets);
});

router.get('/:id',async (req,res)=>{
const ticket = await Ticket.findById(req.params.id);
if(!ticket) return res.status(404).send(`Given Movie Id: ${req.params.id} is not exist in DB`);
res.send(ticket);
});

//Secured REST - Requires Valid User
router.post('/',auth, async(req,res)=>{
    const {error} = validateTicket(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid User.');

    const status = await Status.findById(req.body.statusId);
    if (!status) return res.status(400).send('Invalid Status.');

    let addTicket = new Ticket({
        title: req.body.title,
        description:req.body.description,
        assignee:req.body.assignee,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        status:{
            _id: status.id,
            name:status.name
        },
        progress:req.body.progress,
        user:{
            _id: user.id,
            name:user.name
        }
    });
    addTicket = await addTicket.save();
    res.send(addTicket);
});

//Secured REST - Requires Valid User
router.put('/:id',auth,async (req,res)=>{
    const {error} = validateTicket(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid User.');
    
    const status = await Status.findById(req.body.statusId);
    if (!status) return res.status(400).send('Invalid Status.');

    const updTicket = await Ticket.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description:req.body.description,
        assignee:req.body.assignee,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        status:req.body.status,
        progress:req.body.progress,
        status:{
            _id: status.id,
            name:status.name
        },
        user:{
            _id: user.id,
            name:user.name
        }
    },{new:true});

    if(!updTicket) return res.status(404).send(`given customer: ${req.params.id} is not present in DB`);
    res.send(updTicket);
});

/*Deleting Ticket -> only admin can execute this REST Call.
 401 -> unauthorized
 403 -> forbidden [Valid user but don't have access to call this call*/

// Secured REST  - Requires Admin User
router.delete('/:id',[auth,admin],async (req,res)=>{
    const ticket = await Ticket.findByIdAndRemove(req.params.id);
    if(!ticket) return res.status(404).send(`Requested customer:${req.params.id} not exist in DB`);
    res.send(ticket);
});

  module.exports = router;