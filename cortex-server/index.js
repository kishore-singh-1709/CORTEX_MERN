const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
const tickets = require('./routes/tickets');
const users = require('./routes/users');
const status = require('./routes/status');
const signin = require('./routes/signin');
const internalErrorHandling = require('./middleware/internalErrorHandling');

const app = express();
// JWT private key must be present in ENV
// If not, App should not get started..!!!!
if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey Env Variable not set');
  process.exit(1);
}

//DB Connectivity
mongoose.connect(config.get('db'))
  .then(() => console.log(config.get('db_log')))
  .catch(err => console.error('Could not connect to MongoDB...',err));

app.use('/',cors());// Must Enable cors as first middleware
app.use(express.json());//inbuilt middleware for JSON mapping

//Routes
app.use('/api/tickets',tickets);
app.use('/api/users',users);
app.use('/api/status',status);
app.use('/api/signin',signin);
//For detailed Info, check comments in DBExceptionHandling file.
app.use(internalErrorHandling); // For 500 Internal Errors 
winston.add(winston.transports.File, {filename:'logfile.log'});

const port = process.env.PORT || config.get('port');
module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));