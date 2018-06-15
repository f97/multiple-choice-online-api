const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var userSchema = new Schema({
    userID: {
        type: Number, 
        required: true, 
        unique: true},
	email: {
        type: String, 
        required: true, 
        unique: true},
	password: { 
        type: String, 
        required: true },
    role:  { 
        type: String, 
        required: true,
        default: 'user'},
    name: String,
    prename: String,
    school: String,
    class: String,
    description: String,
	dateAdded : { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { 
    model: 'User',
    field: 'userID',
    startAt: 0
});

module.exports = {
    User
};