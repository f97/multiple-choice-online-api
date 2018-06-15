const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var questionItemSchema = new Schema ({
    qiID: {
        type: Number, 
        required: true, 
        unique: true},  
    qID: {
        type: Number, 
        required: true,    
    },
    qiContent: {
        type: String, 
        required: true,   
    },
    note: {
        type: String
    },
    answer: {
        type: Boolean,
        required: true,
    },
    dateAdded : { type: Date, default: Date.now },
})

const QuestionItem = mongoose.model('QuestionItem', questionItemSchema);
autoIncrement.initialize(mongoose.connection);
questionItemSchema.plugin(autoIncrement.plugin, { model: 'QuestionItem', field: 'qiID',startAt: 0 });

module.exports = {
    QuestionItem
};
