const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var examStudentSchema = new Schema({
    esID: {
        type: Number, 
        required: true, 
        unique: true},
    eID: {
        type: Number, 
        required: true,},
    userID: { 
        type: Number, 
        required: true },
    mark: { 
        type: Number, 
        required: true },
    numberQuestion: {
        type: Number,
        required: true,
    },
	dateAdded : { type: Date, default: Date.now },
})

const ExamStudent = mongoose.model('ExamStudent', examStudentSchema);
autoIncrement.initialize(mongoose.connection);
examStudentSchema.plugin(autoIncrement.plugin, { model: 'ExamStudent', field: 'esID',startAt: 0 });

module.exports = {
    ExamStudent
};