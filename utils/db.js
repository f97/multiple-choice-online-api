'use strict';

var mongoose = require('mongoose');

const mlabURI = 'mongodb://huynhduckhoan:huynhduckhoan@ds143907.mlab.com:43907/multiple-choice-online'
const dbName = 'multiple-choice-online';

const con = mongoose.connect(mlabURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server")
	}
});

module.exports = con;
