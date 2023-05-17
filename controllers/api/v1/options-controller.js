const Option = require('../../../models/options');

//Create an action in options controller to add a vote to an option
module.exports.addVote = async function(req,res){
    try {
        //grab the option id you want to vote
        const {id,qid} = req.params;

        // we cannot get here directly 
        // so there is no need to check if option exist or not
        // increment vote count to one
        await Option.findOneAndUpdate({id,qid},{$inc : {votes: 1}});

        return res.status(200).json({message: "Vote Added!"});

    } catch (error) {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

//Create an action in options controller to delete an option
module.exports.delete = async function(req,res){
    
    try {
        //grab the id from params
        const {id,qid} = req.params;
        
        //check if option already exists
        const isOptionExists = Option.findOne({id,qid});

        //if exists then find and delete it
        if(isOptionExists){
            await Option.findOneAndDelete({id,qid});
            return res.status(400).json({message: "Option Deleted!"});
        }

        //if not then just prompt the option doesn't exist
        return res.status(400).json({message: "Option not found!"});
    } catch (error) {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}