const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var examSchema = new Schema ({
    eID: {
        type: Number, 
        required: true, 
        unique: true},  
    eDescription: {
        type: String, 
        required: true,   
    },
    questionsNumber: {
        type: Number, 
        required: true,   
    },
    time: {
        type: Number, 
        required: true,   
    },
    qbID: {
        type: Number, 
        required: true,   
    },
    isRandom: {
        type: Boolean,
        required: true,   
    },
    dateAdded : { type: Date, default: Date.now },
})

const Exam = mongoose.model('Exam', examSchema);
autoIncrement.initialize(mongoose.connection);
examSchema.plugin(autoIncrement.plugin, { model: 'Exam', field: 'eID',startAt: 0 });

module.exports = {
    Exam
};
