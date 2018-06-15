const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var examStudentDetailSchema = new Schema({
    esdID: {
        type: Number, 
        required: true, 
        unique: true},
    userID: {
        type: Number, 
        required: true,},
    eID: { 
        type: Number, 
        required: true },
    qID: { 
        type: Number, 
        required: true },
    qiID: { 
        type: Number, 
        required: true },
	dateAdded : { type: Date, default: Date.now },
})

const ExamStudentDetail = mongoose.model('ExamStudentDetail', examStudentDetailSchema);
autoIncrement.initialize(mongoose.connection);
examStudentDetailSchema.plugin(autoIncrement.plugin, { model: 'ExamStudentDetail', field: 'esdID',startAt: 0 });

module.exports = {
    ExamStudentDetail
};