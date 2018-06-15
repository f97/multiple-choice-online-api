const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var questionSchema = new Schema ({
    qID: {
        type: Number, 
        required: true, 
        unique: true},  
    qbID: {
        type: Number, 
        required: true,    
    },
    type: {
        type: String, 
        required: true,   
    },
    qContent: {
        type: String, 
        required: true,   
    },
    dateAdded : { type: Date, default: Date.now },
})

const Question = mongoose.model('Question', questionSchema);
autoIncrement.initialize(mongoose.connection);
questionSchema.plugin(autoIncrement.plugin, { model: 'Question', field: 'qID',startAt: 0 });

module.exports = {
    Question
};
