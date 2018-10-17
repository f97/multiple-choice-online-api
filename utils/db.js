'use strict';

var mongoose = require('mongoose');

const mlabURI = 'mongodb://f97:f97@nhom9-shard-00-00-z5b08.gcp.mongodb.net:27017,nhom9-shard-00-01-z5b08.gcp.mongodb.net:27017,nhom9-shard-00-02-z5b08.gcp.mongodb.net:27017/nhom9?ssl=true&replicaSet=Nhom9-shard-0&authSource=admin&retryWrites=true'

const con = mongoose.connect(mlabURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server")
	}
});

module.exports = con;