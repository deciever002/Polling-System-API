//set the port
require('dotenv').config();

//require all the dependencies
const express = require('express');
const db = require('./config/mongoose');

//Intialize instance of express
const app = express();

// in this project i have used json body parser to parse the body
app.use(express.json());

//all the route incoming to / will be directed to routes
app.use('/',require('./routes/index'));

//Listen on defined port
app.listen(process.env.PORT,() => {
    console.log(`Server listening on PORT ${process.env.PORT}`);
});