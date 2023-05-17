const mongoose = require('mongoose');

//Option schema for adding options to the questions
const optionsSchema = new mongoose.Schema({
    //id to track the option
    id:{
        type: Number,
        required: true,
    },
    //qid to track the question
    qid:{
        type: Number,
        required: true    
    },
    //what is the option
    text: {
        type: String,
        required: true
    },
    //votes to keep track of votes
    votes:{
        type: Number,
        default: 0
    },
    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    //link to vote
    link_to_vote: {
        type: String
    }
},{
    timestamps: true
});

//Created and updated mongoose model
const Option = mongoose.model('Option',optionsSchema);

//exported option module
module.exports = Option