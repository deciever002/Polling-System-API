const mongoose = require('mongoose');


//Question schema for adding questions to the polling system
const questionSchema = new mongoose.Schema({
    //id to track the question
    id:{
        type: Number,
        required: true,
        unique: true
    },
    //what is the question
    title: {
        type: String,
        required: true
    },
    //list of options
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        }
    ]
},{
    timestamps: true
});

//Created and updated mongoose model
const Question = mongoose.model('Question',questionSchema);

//exported question module
module.exports = Question;