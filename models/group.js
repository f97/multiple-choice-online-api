const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var groupSchema = new Schema ({
    qgID: {
        type: Number, 
        required: true, 
        unique: true},  
    qbID: {
        type: String, 
        required: true,    
    },
    qgName: {
        type: String, 
        required: true,   
    },
    qgDescription: {
        type: String, 
    },
    dateAdded : { type: Date, default: Date.now },
})

const Group = mongoose.model('Group', groupSchema);
autoIncrement.initialize(mongoose.connection);
groupSchema.plugin(autoIncrement.plugin, { model: 'Group', field: 'qgID',startAt: 0 });

module.exports = {
    Group
};
