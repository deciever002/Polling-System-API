//Router for URI /api/v1 
//Require all the dependencies
const express = require('express');
const router = express.Router();

//for questions redirect to question module and for option redirect to options module
router.use('/questions',require('./questions'));
router.use('/options',require('./options'));

//export the router
module.exports = router;