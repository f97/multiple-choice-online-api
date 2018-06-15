const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var bankSchema = new Schema ({
    qbID: {
        type: Number, 
        required: true, 
        unique: true},  
    qbName: {
        type: String, 
        required: true,   
    },
    qbDescription: {
        type: String, 
    },
    dateAdded : { type: Date, default: Date.now },
})

const Bank = mongoose.model('Bank', bankSchema);
autoIncrement.initialize(mongoose.connection);
bankSchema.plugin(autoIncrement.plugin, { model: 'Bank', field: 'qbID',startAt: 0 });

module.exports = {
    Bank
};
