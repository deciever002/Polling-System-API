//Router for URI /api/v1 
//Require all the dependencies
const express = require('express');
const router = express.Router();
const questionsController = require('../../../controllers/api/v1/questions-controller');
const { param, validationResult } = require('express-validator');

//all the routes to /questions/

//validator to validate and sanitize input fields
const validateNumberParam = [
    param('id').isNumeric().withMessage('Parmater must be a number'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

// route to create a question
router.post('/create',questionsController.create);
// route to add options to specific questions
router.post('/:id/options/create',questionsController.createOptions);
// route to delete a particular question
router.delete('/:id/delete',questionsController.delete);
// route to view particular question
router.get('/:id',validateNumberParam,questionsController.fetchQuestion);
router.all('*',function(req,res){
    res.status(404).json({message: "Not Found"})
})

//export the router
module.exports = router;