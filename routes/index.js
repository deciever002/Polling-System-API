//The ROOT router file route for /
//Require all the dependencies
const express = require('express');
const router = express.Router();

//for routes to /api/v1 redirect to api/v1 route
router.use('/api/v1',require('./api/v1'));
router.all('*',function(req,res){
    res.status(404).json({message: "Not Found"})
})

//export the router
module.exports = router;