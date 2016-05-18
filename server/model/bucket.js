var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bucketSchema = new Schema({
	nbNdr: Number,
	value: Number,
	unit: String,
	start_date: Date,
	end_date: Date
});

// the schema is useless so far
// we need to create a model using it
var Bucket = mongoose.model('Bucket', bucketSchema);

// make this available to our users in our Node applications
module.exports = Bucket;