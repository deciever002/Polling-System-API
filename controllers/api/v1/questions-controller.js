const Question = require("../../../models/Question");
const mongoose = require('mongoose');
const Option = require("../../../models/options");

//Create an action in questions controller to add a question
module.exports.create = async function(req,res){
    try {
        //Grab the id and title of the question
        //Id is required because if we autogenerate id and icrement it by one
        //then there are chances we end up adding two same ids
        const {id,title} = req.body;

        //Find the document by id and if it already exists then prompt the user 
        //the question with this id cannot be added
        const isQuestionExists = await Question.findOne({id});

        if(isQuestionExists){
            return res.status(400).json({message: "Question already exists with this id"});
        }

        //Create the question
        await Question.create({
            id,
            title
        });

        return res.status(201).json({message: "Question added Successfully"});

    } catch (error) {
        //If there is some error then send the response with status code 500 
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"})
    }
}

//Create an action in questions controller to delete a question
module.exports.delete = async function(req,res){
    try {
        //find the id of the question to be deleted
        const id = parseInt(req.params.id);
        //check if the id is present in db to delete it
        const question = await Question.findOne({id}).populate('options');

        //if exists then delete it
        if(question){
            const options = await Option.find({qid: id});
            let isVotesExist = options.filter((option) => { return option.votes > 0 });
            if(isVotesExist.length > 0){
                return res.status(200).json({message: "Question cannot be deleted as it has more than one votes in its options"})
            }
            await Question.findOneAndRemove({id});
            await Option.deleteMany({qid: id});
            return res.status(200).json({message: "Question Deleted Successfully"});
        }

        //if not then notify the client the question doesn't exist
        return res.status(400).json({message: "The question which you are trying to delete doesn't exist"});
    } catch (error) {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    
}

//Create an action in questions controller to fetch a particular question
module.exports.fetchQuestion = async function(req,res){
    try {
        //grab the id from params parse it to integer value
        const id = req.params.id;
    
        //find the question with the id
        const question = await Question.findOne({id})
        .populate('options');
    
        //If question exists
        if(question){
            const options = question.options.map((option) => {
                return {
                    id: option.id,
                    text: option.text,
                    votes: option.votes,
                    link_to_vote: option.link_to_vote,
                }
            })
            return res.status(200).json({data: { id: question.id,title: question.title,options},message: "Question retrieved Successfully"});
        }
    
        return res.status(204).json({message: "Question not found"});
    } catch (error) {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

//Create an action in questions controller to add options to a question
module.exports.createOptions = async function(req,res){
    try {
        //grab the id of question to which you want to add options to
        const id = req.params.id

        //grab the necessary fields from body
        const {optionId,text} = req.body;
        //Add link to vote in options
        const link_to_vote = `http://localhost:${process.env.PORT}/api/v1/options/${optionId}/${id}/add_vote`

        //check if option already exists
        const isOptionExists = await Option.findOne({id: optionId,qid:id});
        
        if(isOptionExists){
            return res.status(400).json({message: "Option with this id already exists"});
        }

        //find the question and if it doesn't exist return from there
        const question = await Question.findOne({id});
        if(question === null){
            return res.status(400).json({message: "Trying to add options to question which doesn't exist"})
        }

        //Create the option for that question
        const option = await Option.create({id:optionId,text,link_to_vote,questionId:question._id,qid:id});
        //finally update the question by adding option id to the question
        await Question.findOneAndUpdate({id},{$push: { options: option._id }});

        return res.status(201).json({message: "Option Added Successfully"});
    } catch (error) {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}