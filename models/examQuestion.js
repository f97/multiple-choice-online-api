const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var examQuestionSchema = new Schema ({
    eqID: {
        type: Number, 
        required: true, 
        unique: true
    },  
    eID: {
        type: Number, 
        required: true,
    },
    qID: {
        type: Number, 
        required: true, 
    },
    dateAdded : { type: Date, default: Date.now },
})

const ExamQuestion = mongoose.model('ExamQuestion', examQuestionSchema);
autoIncrement.initialize(mongoose.connection);
examQuestionSchema.plugin(autoIncrement.plugin, { model: 'ExamQuestion', field: 'eqID',startAt: 0 });

module.exports = {
    ExamQuestion
};
