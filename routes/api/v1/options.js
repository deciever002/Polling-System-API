//Router for URL /api/v1/questions
//Require all the dependencies
const express = require('express');
const router = express.Router();
const optionsController = require('../../../controllers/api/v1/options-controller');

//all the routes to /options/

// route to delete an option from question
router.delete('/:id/:qid/delete',optionsController.delete);
// route to add votes
router.get('/:id/:qid/add_vote',optionsController.addVote);


//export the router
module.exports = router;